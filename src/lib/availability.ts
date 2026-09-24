/**
 * Availability engine for the portfolio agent.
 *
 * Produces real bookable slots in Wahab's timezone (Asia/Karachi, UTC+5),
 * honoring an owner-defined weekly schedule and freeform preferences parsed
 * from the conversation ("after 9pm", "morning", "weekday evenings"...).
 *
 * Pure functions — no DOM, no network. Also runs server-side in the API route.
 */

/** Wahab's timezone — PKT, UTC+5, no DST in Pakistan. */
export const OWNER_TZ_OFFSET_MIN = 5 * 60; // +05:00
export const OWNER_TZ_LABEL = "PKT (UTC+5)";

/** Weekly schedule in PKT. 0=Sun..6=Sat; hours are 24h PKT. */
export const WEEKLY_SCHEDULE: Record<number, { start: number; end: number }[]> = {
  0: [{ start: 17, end: 22 }], // Sun: 5pm–10pm
  1: [{ start: 20, end: 23 }], // Mon: 8pm–11pm (day job + NUST)
  2: [{ start: 20, end: 23 }], // Tue
  3: [{ start: 20, end: 23 }], // Wed
  4: [{ start: 20, end: 23 }], // Thu
  5: [{ start: 17, end: 23 }], // Fri: 5pm–11pm
  6: [{ start: 10, end: 22 }], // Sat: 10am–10pm
};

export const SLOT_MINUTES = 30;
/** How many days ahead the agent will offer slots. */
export const HORIZON_DAYS = 14;
/** Minimum notice before a meeting can be booked (owner needs lead time). */
export const MIN_NOTICE_MINUTES = 12 * 60;

export interface OwnerSlot {
  /** ISO 8601 with explicit +05:00 offset, e.g. "2026-09-25T21:00:00+05:00" */
  startIso: string;
  endIso: string;
  /** PKT wall-clock, e.g. "Fri 9:00 PM" */
  startLabel: string;
  /** Visitor's timezone label, e.g. "Sat 1:30 AM (your time, UTC+4:30)" */
  visitorLabel?: string;
}

/* ── time helpers (offset math, no Intl dependency) ───────── */

/** Convert a UTC timestamp to PKT wall-clock parts. */
function pktParts(d: Date) {
  const shifted = new Date(d.getTime() + OWNER_TZ_OFFSET_MIN * 60_000);
  return {
    y: shifted.getUTCFullYear(),
    m: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    dow: shifted.getUTCDay(), // 0=Sun..6=Sat in PKT
    h: shifted.getUTCHours(),
    min: shifted.getUTCMinutes(),
  };
}

/** Build an ISO string with explicit +05:00 offset for a PKT wall-clock moment. */
function pktIso(y: number, m: number, day: number, h: number, min: number): string {
  // UTC instant = wall clock − offset
  const utc = Date.UTC(y, m, day, h, min) - OWNER_TZ_OFFSET_MIN * 60_000;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}-${pad(m + 1)}-${pad(day)}T${pad(h)}:${pad(min)}:00+05:00`;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function fmt12(h: number, min: number): string {
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${ampm}`;
}

/** Visitor's UTC offset in minutes from a UTC instant (handles DST correctly). */
function visitorOffsetMin(d: Date): number {
  return -d.getTimezoneOffset();
}

function visitorTzLabel(d: Date): string {
  const off = visitorOffsetMin(d);
  const sign = off >= 0 ? "+" : "−";
  const abs = Math.abs(off);
  const hh = Math.floor(abs / 60);
  const mm = abs % 60;
  return `UTC${sign}${hh}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
}

/* ── preference parsing ───────────────────────────────────── */

export interface SlotPrefs {
  notBeforeHour?: number; // "after 9pm" → 21
  notAfterHour?: number; // "before noon" → 12
  weekdaysOnly?: boolean;
  weekendsOnly?: boolean;
}

export function parsePrefs(q: string): SlotPrefs {
  const s = q.toLowerCase();
  const prefs: SlotPrefs = {};

  const amPm = /(after|from|past|later than|not before)\s+(?:the\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/.exec(s);
  if (amPm) {
    let h = parseInt(amPm[2], 10) % 24;
    if (amPm[4] === "pm" && h < 12) h += 12;
    if (amPm[4] === "am" && h === 12) h = 0;
    prefs.notBeforeHour = h;
  }
  const before = /(before|no later than|until|till)\s+(?:the\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/.exec(s);
  if (before) {
    let h = parseInt(before[2], 10) % 24;
    if (before[4] === "pm" && h < 12) h += 12;
    if (before[4] === "am" && h === 12) h = 0;
    prefs.notAfterHour = h;
  }
  if (!amPm && /morning/.test(s)) prefs.notBeforeHour = Math.max(prefs.notBeforeHour ?? 0, 8);
  if (!amPm && /afternoon/.test(s)) prefs.notBeforeHour = Math.max(prefs.notBeforeHour ?? 0, 12);
  if (!amPm && /(evening|night)/.test(s)) prefs.notBeforeHour = Math.max(prefs.notBeforeHour ?? 0, 17);
  if (/weekday/.test(s)) prefs.weekdaysOnly = true;
  if (/weekend/.test(s)) prefs.weekendsOnly = true;

  return prefs;
}

function slotMatchesPrefs(startPktHour: number, dow: number, prefs: SlotPrefs): boolean {
  if (prefs.notBeforeHour !== undefined && startPktHour < prefs.notBeforeHour) return false;
  if (prefs.notAfterHour !== undefined && startPktHour + 1 > prefs.notAfterHour) return false;
  if (prefs.weekdaysOnly && (dow === 0 || dow === 6)) return false;
  if (prefs.weekendsOnly && dow !== 0 && dow !== 6) return false;
  return true;
}

/* ── slot generation ──────────────────────────────────────── */

/**
 * List the next bookable slots, earliest first.
 * @param now          current instant (defaults to Date.now())
 * @param prefs        parsed constraints
 * @param takenIso     ISO start times already booked (to avoid double-booking)
 */
export function listSlots(
  now: Date = new Date(),
  prefs: SlotPrefs = {},
  takenIso: string[] = []
): OwnerSlot[] {
  const taken = new Set(takenIso);
  const out: OwnerSlot[] = [];
  const nowMs = now.getTime();

  for (let dayOffset = 0; dayOffset <= HORIZON_DAYS; dayOffset++) {
    // Anchor at noon PKT for each upcoming day to enumerate that PKT day's windows
    const noonPkt = new Date(nowMs + OWNER_TZ_OFFSET_MIN * 60_000);
    noonPkt.setUTCDate(noonPkt.getUTCDate() + dayOffset);
    const { y, m, day } = pktParts(noonPkt);
    const dow = pktParts(noonPkt).dow;

    const windows = WEEKLY_SCHEDULE[dow] ?? [];
    for (const w of windows) {
      for (let h = w.start; h < w.end; h++) {
        for (let min = 0; min < 60; min += SLOT_MINUTES) {
          const startUtcMs = Date.UTC(y, m, day, h, min) - OWNER_TZ_OFFSET_MIN * 60_000;
          if (startUtcMs < nowMs + MIN_NOTICE_MINUTES * 60_000) continue;
          if (!slotMatchesPrefs(h, dow, prefs)) continue;
          const startIso = pktIso(y, m, day, h, min);
          if (taken.has(startIso)) continue;
          const endUtcMs = startUtcMs + SLOT_MINUTES * 60_000;
          const endPkt = new Date(endUtcMs + OWNER_TZ_OFFSET_MIN * 60_000);
          const visitor = new Date(startUtcMs);
          out.push({
            startIso,
            endIso: pktIso(endPkt.getUTCFullYear(), endPkt.getUTCMonth(), endPkt.getUTCDate(), endPkt.getUTCHours(), endPkt.getUTCMinutes()),
            startLabel: `${DAYS[dow]} ${fmt12(h, min)} ${OWNER_TZ_LABEL}`,
            visitorLabel: `${DAYS[new Date(visitor.getTime() + visitorOffsetMin(visitor) * 60_000).getUTCDay()]} ${fmt12(
              new Date(visitor.getTime() + visitorOffsetMin(visitor) * 60_000).getUTCHours(),
              new Date(visitor.getTime() + visitorOffsetMin(visitor) * 60_000).getUTCMinutes()
            )} (your time, ${visitorTzLabel(visitor)})`,
          });
          if (out.length >= 8) return out;
        }
      }
    }
  }
  return out;
}

/**
 * Validate a proposed start time: must be on a :00/:30 boundary, inside a
 * scheduled window, within horizon, and respect min notice.
 */
export function isValidSlotStart(startIso: string, now: Date = new Date(), takenIso: string[] = []): boolean {
  const t = new Date(startIso).getTime();
  if (Number.isNaN(t)) return false;
  const nowMs = now.getTime();
  if (t < nowMs + MIN_NOTICE_MINUTES * 60_000) return false;
  if (t > nowMs + HORIZON_DAYS * 24 * 60 * 60_000) return false;
  if (takenIso.includes(startIso)) return false;

  const p = pktParts(new Date(t));
  if (p.min !== 0 && p.min !== 30) return false;
  const windows = WEEKLY_SCHEDULE[p.dow] ?? [];
  return windows.some((w) => p.h >= w.start && (p.h < w.end || (p.h === w.end - 1 && p.min + SLOT_MINUTES <= 60)));
}

/** What the schedule means in words — shown to the LLM so it can explain availability. */
export function scheduleSummary(): string {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return Object.entries(WEEKLY_SCHEDULE)
    .map(([d, ws]) => `${names[Number(d)]}: ${ws.map((w) => `${fmt12(w.start, 0)}–${fmt12(w.end, 0)}`).join(", ")}`)
    .join("; ");
}
