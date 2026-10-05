// Run: node scripts/test-agent.cjs. Providers are mocked; no email or model requests leave this test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...args) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, parent, ...args);
};
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);

const { askAgent } = require("../src/data/agent-kb.ts");
assert.match(askAgent("Tell me about ORBI").answer, /ORBI/);
assert.match(askAgent("tell me more", "project:2").answer, /Composio/);
assert.match(askAgent("tell me more", "project:1").answer, /English and Persian acoustic models/);
assert.match(askAgent("Does he know Docker?").answer, /Yes.*docker/is);
assert.match(askAgent("Does he know C++?").answer, /Yes/i);
assert.match(askAgent("Does he have experience with Kubernetes?").answer, /can't confirm/i);
assert.match(askAgent("What is Wahab's salary?").answer, /isn't confirmed/i);
assert.match(askAgent("How many projects?").answer, /9 projects/);
assert.match(askAgent("How long has he worked at Blue Group?").answer, /exact start month/i);

(async () => {
  // Verify the real API's model context and malformed input handling without an external model call.
  const { POST } = require("../src/app/api/agent/route.ts");
  const { NextRequest } = require("next/server");
  const api = (body) => POST(new NextRequest("http://localhost/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
  assert.equal((await api({ messages: "invalid" })).status, 400);
  process.env.GROQ_API_KEY = "test-api-key";
  delete process.env.GROQ_MODEL;
  global.fetch = async (url, init) => {
    assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
    const body = JSON.parse(init.body);
    assert.equal(body.model, "openai/gpt-oss-120b");
    assert.equal(body.include_reasoning, false);
    assert.match(body.messages[0].content, /English and Persian acoustic models/);
    assert.match(body.messages[0].content, /Langfuse/);
    assert.match(body.messages[0].content, /Never invent/);
    assert.equal(body.tools, undefined);
    assert.equal(body.messages.at(-1).content, "How does ORBI work?");
    return Response.json({ choices: [{ message: { content: "ORBI connects workspace tools through Composio." } }] });
  };
  assert.equal((await (await api({ messages: [{ role: "user", content: "How does ORBI work?" }] })).json()).mode, "llm");
  global.fetch = async () => new Response("Unavailable", { status: 503 });
  assert.equal((await (await api({ messages: [{ role: "user", content: "Tell me about ORBI" }] })).json()).mode, "kb-fallback");
  delete process.env.GROQ_API_KEY;
  const booking = await (await api({ messages: [{ role: "user", content: "book an appointment" }], bookingAction: { type: "confirm" } })).json();
  assert.match(booking.reply.answer, /cannot schedule/);
  assert.equal(booking.reply.booking, undefined);
  console.log("PASS: grounded answers, project follow-ups, unknown facts, Groq context, API validation, provider fallback, removed email and booking actions. No external requests sent.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
