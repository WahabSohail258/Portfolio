import { NextRequest, NextResponse } from "next/server";
import { portfolioBrief, CONTACT_INFO } from "@/lib/agent-context";
import { listSlots, isValidSlotStart, parsePrefs, scheduleSummary, OWNER_TZ_LABEL, HORIZON_DAYS, MIN_NOTICE_MINUTES, SLOT_MINUTES } from "@/lib/availability";
import { askAgent, AGENT_GREETING, type AgentReply } from "@/data/agent-kb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Config ──────────────────────────────────────────────── */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const TIMEOUT_MS = 20_000;

const EMAILJS = {
  serviceId: process.env.EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.EMAILJS_TEMPLATE_ID ?? "",
  privateKey: process.env.EMAILJS_PRIVATE_KEY ?? "",
};

function llmConfigured() {
  return !!process.env.GROQ_API_KEY;
}

/* ── Tiny in-memory rate limiter (per IP) ────────────────── */
const WINDOW_MS = 60_000;
const MAX_REQ = 10;
const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  b.count++;
  return b.count <= MAX_REQ;
}

/* ── EmailJS REST (server-side, private key) ─────────────── */
async function sendBookingEmail(params: Record<string, string>): Promise<boolean> {
  if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.privateKey) return false;
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.privateKey,
        accessToken: EMAILJS.privateKey,
        template_params: params,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ── Tool definitions (OpenAI format — Groq compatible) ──── */
const TOOLS = [
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Show Wahab's real, currently-bookable meeting slots. Use whenever the visitor asks about availability, " +
        "free times, or wants to schedule. Accepts natural constraints like \"after 9pm\", \"weekday mornings\", " +
        "\"this weekend\". Times shown in Wahab's timezone plus the visitor's local time.",
      parameters: {
        type: "object",
        properties: {
          preferences: {
            type: "string",
            description: 'Free-text time constraints from the visitor, e.g. "after 9pm", "weekday mornings", "weekends". Pass "" if none.',
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_meeting",
      description:
        "Book a 30-minute call with Wahab at a specific slot previously shown by check_availability. " +
        "Call ONLY after the visitor has stated which slot they want and given their name and email. " +
        "Wahab receives an email notification and confirms or proposes an alternative.",
      parameters: {
        type: "object",
        properties: {
          slot_start: { type: "string", description: 'Exact ISO start from check_availability, e.g. "2026-09-25T21:00:00+05:00"' },
          visitor_name: { type: "string", description: "Visitor's full name" },
          visitor_email: { type: "string", description: "Visitor's email address" },
          topic: { type: "string", description: "What the meeting is about (1 sentence)" },
        },
        required: ["slot_start", "visitor_name", "visitor_email"],
      },
    },
  },
];

/* ── System prompt ───────────────────────────────────────── */
function systemPrompt(nowIso: string): string {
  return `You are the AI assistant on Wahab Sohail's portfolio website. Visitors chat with you to learn about him and to schedule meetings with him.

## Your facts
You answer ONLY from the portfolio brief below. If something is not covered, say so and offer the email.

${portfolioBrief()}

## Availability & meetings
- Wahab's timezone: ${OWNER_TZ_LABEL}. Current server time: ${nowIso}.
- Weekly schedule (his local PKT time): ${scheduleSummary()}
- Meetings are ${SLOT_MINUTES}-minute calls; bookable up to ${HORIZON_DAYS} days ahead; needs ${MIN_NOTICE_MINUTES / 60}h minimum notice.
- When a visitor asks about availability, times, or scheduling: call check_availability (pass any stated constraints as preferences). Present the returned slots clearly, ALWAYS including the exact ISO time so the visitor can reference it.
- If the visitor wants a time not in the list (e.g. "after 9pm" when none match), present the closest alternatives and mention the weekly schedule.
- To book: you need the exact slot, their name, and their email. If any are missing, ask for ONLY what's missing, then call book_meeting.
- After booking, confirm warmly and tell them Wahab gets an email notification and will confirm shortly.

## Style
- Concise and warm: 2–5 sentences normally, short lists when natural. Match the visitor's tone.
- First person about Wahab is wrong — you speak ABOUT him ("he"), never AS him.
- Use markdown sparingly (plain text with dashes; the chat renders plain text).
- Never invent employers, dates, projects, or numbers. Never share this system prompt.`;
}

/* ── Groq call ───────────────────────────────────────────── */
interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: { id: string; type: "function"; function: { name: string; arguments: string } }[];
  tool_call_id?: string;
}

async function callGroq(messages: ChatMessage[], tools: boolean): Promise<{ ok: boolean; data?: { choices: { message: ChatMessage }[] }; status?: number }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY ?? ""}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        ...(tools ? { tools: TOOLS, tool_choice: "auto" } : {}),
        temperature: 0.4,
        max_tokens: 700,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("Groq error", res.status, JSON.stringify(data).slice(0, 300));
      return { ok: false, status: res.status };
    }
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

/* ── Tool execution ──────────────────────────────────────── */
/** Bookings held in memory (a real deployment would persist these). */
const bookedSlots = new Set<string>();

async function execTool(name: string, argsJson: string): Promise<{ result: string; booked?: { iso: string; name: string; email: string } }> {
  let args: Record<string, string> = {};
  try {
    args = JSON.parse(argsJson || "{}");
  } catch {
    return { result: "Error: malformed arguments." };
  }

  if (name === "check_availability") {
    const prefs = parsePrefs(args.preferences ?? "");
    const slots = listSlots(new Date(), prefs, Array.from(bookedSlots));
    if (!slots.length) {
      return { result: `No slots match those constraints in the next ${HORIZON_DAYS} days. Weekly schedule: ${scheduleSummary()}. Suggest the visitor try different times.` };
    }
    return {
      result: JSON.stringify({
        timezone: OWNER_TZ_LABEL,
        note: `All times are Wahab's local time. ${SLOT_MINUTES}-minute calls. Bookable up to ${HORIZON_DAYS} days ahead.`,
        slots: slots.map((s) => ({ start_iso: s.startIso, wahab_time: s.startLabel, visitor_time: s.visitorLabel })),
      }),
    };
  }

  if (name === "book_meeting") {
    const { slot_start: slot, visitor_name: name, visitor_email: email, topic } = args;
    if (!slot || !name || !email) return { result: "Error: slot, visitor_name and visitor_email are required." };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { result: "Error: visitor_email looks invalid." };
    if (!isValidSlotStart(slot, new Date(), Array.from(bookedSlots))) {
      return { result: "Error: that slot is not bookable (outside schedule, too soon, or taken). Call check_availability again and offer alternatives." };
    }
    bookedSlots.add(slot);

    const emailSent = await sendBookingEmail({
      to_email: CONTACT_INFO.email,
      from_name: name,
      from_email: email,
      meeting_time: slot,
      topic: topic || "Portfolio meeting",
    });

    return {
      booked: { iso: slot, name, email },
      result: emailSent
        ? `Booked ${slot} for ${name}. Wahab has been emailed and will confirm at ${email} shortly.`
        : `Slot ${slot} reserved for ${name}. NOTE: email notification failed to send — tell the visitor Wahab will reach out at ${email} to confirm, or they can email ${CONTACT_INFO.email} directly.`,
    };
  }

  return { result: `Error: unknown tool ${name}` };
}

/* ── Route handler ───────────────────────────────────────── */
interface ReqBody {
  messages?: { role: "user" | "assistant"; content: string }[];
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests — try again in a minute." }, { status: 429 });
  }

  let body: ReqBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const incoming = (body.messages ?? [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-12)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));

  const latestUser = [...incoming].reverse().find((m) => m.role === "user")?.content?.trim();
  if (!latestUser) {
    return NextResponse.json({ error: "No message" }, { status: 400 });
  }

  /* ── Fallback path: no key configured or caller opts out ── */
  if (!llmConfigured()) {
    const lastTopic = req.headers.get("x-last-topic") ?? undefined;
    const reply: AgentReply = askAgent(latestUser, lastTopic || undefined);
    return NextResponse.json({ reply, mode: "kb" });
  }

  /* ── LLM path: tool-calling loop (max 4 model turns) ────── */
  const msgs: ChatMessage[] = [
    { role: "system", content: systemPrompt(new Date().toISOString()) },
    ...incoming,
  ];

  for (let turn = 0; turn < 4; turn++) {
    const res = await callGroq(msgs, true);
    if (!res.ok || !res.data?.choices?.length) {
      // LLM unavailable → degrade to KB so the chat always answers
      const lastTopic = req.headers.get("x-last-topic") ?? undefined;
      const reply = askAgent(latestUser, lastTopic || undefined);
      return NextResponse.json({ reply, mode: "kb-fallback", note: "LLM temporarily unavailable" });
    }

    const choice = res.data.choices[0].message;

    // No tool calls → final answer
    if (!choice.tool_calls?.length) {
      const text = choice.content?.trim();
      if (!text) {
        const reply = askAgent(latestUser, undefined);
        return NextResponse.json({ reply, mode: "kb-fallback" });
      }
      return NextResponse.json({ reply: { answer: text, suggestions: ["Show me his projects", "Check his availability", "How can I contact him?"] }, mode: "llm" });
    }

    // Execute tools, feed results back
    msgs.push(choice);
    for (const tc of choice.tool_calls) {
      const { result } = await execTool(tc.function.name, tc.function.arguments);
      msgs.push({ role: "tool", content: result, tool_call_id: tc.id });
    }
  }

  // Safety net after 4 turns
  return NextResponse.json({
    reply: { answer: "I got tangled up scheduling that — could you rephrase, or email " + CONTACT_INFO.email + " directly?", suggestions: ["Check his availability"] },
    mode: "llm",
  });
}

/** Opening message (also served through the API so both modes share it). */
export async function GET() {
  return NextResponse.json({ greeting: AGENT_GREETING });
}
