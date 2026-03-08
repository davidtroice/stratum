// pages/api/assess.js
// ─────────────────────────────────────────────
// Serverless API proxy for Stratum's AI assessment.
// Keeps the Anthropic API key secure on the server side.
// Browser calls /api/assess → this function → Anthropic API
// ─────────────────────────────────────────────

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured. Add ANTHROPIC_API_KEY to your Vercel environment variables." });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system:
          "You are Stratum's AI career assessment engine. You know the contemporary art world deeply — galleries, residencies, art fairs, institutions, collectors, press. Be honest, specific, and direct. Respond with valid JSON only. Start with { and end with }. No markdown, no explanation, no preamble.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Anthropic API error" });
    }

    // Extract text content from response
    const raw = data.content.map((b) => b.text || "").join("");
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return res.status(500).json({ error: "Could not parse JSON from AI response." });
    }

    const assessment = JSON.parse(match[0]);
    return res.status(200).json(assessment);

  } catch (err) {
    console.error("Assessment API error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
