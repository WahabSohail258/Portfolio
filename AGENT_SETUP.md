# Enable the Groq portfolio assistant

The assistant answers questions about Wahab's experience, skills, and projects, including ORBI and SpeakWell. It uses the full portfolio data and conversation history. Email sending and appointment booking have been removed from the assistant.

1. Create an API key at https://console.groq.com/keys.
2. Add it to the existing `.env.local`:

```env
GROQ_API_KEY=your_actual_key
GROQ_MODEL=openai/gpt-oss-120b
```

Only `GROQ_API_KEY` is required; the model setting is optional. Keep the key private and do not commit `.env.local`.

3. Restart the development server. For a production preview, run `npm run build` then `npm run start`.
4. For the live site, add `GROQ_API_KEY` to Vercel ? Project ? Settings ? Environment Variables, then redeploy.

Ask ?What did he build in ORBI?? and then ?Tell me more.? Without a valid key, or if Groq fails, the assistant uses the local portfolio knowledge base. Model responses require a live configured key to verify.

The existing Contact section is separate from the assistant. Its optional EmailJS settings do not affect Groq.

Run `npm run test:agent` for the automated checks. They mock the provider and send no external messages.

Reference: https://console.groq.com/docs/text-chat
