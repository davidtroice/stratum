// pages/api/generate-statement.js
// Serverless API proxy for Stratum's Portfolio & Statement Builder.
// Handles text + base64 image inputs securely on the server side.
// Browser calls /api/generate-statement → this function → Anthropic API

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured." });
  }

  const { images, discipline, level, levelLabel, tone, toneLabel, existingStatement, cv, extraNotes } = req.body;

  const textPrompt = `You are an expert art world writer who crafts professional artist statements and CVs for gallery submissions, grant applications, and residency proposals.

${images && images.length > 0 ? `Analyse the ${images.length} artwork image(s) provided and the artist's context below.` : "Using the artist's context below (no images provided),"} Then generate:

1. ARTIST STATEMENT (250–350 words)
2. SHORT STATEMENT (80–100 words, for bio sections and fair catalogues)
3. CV STRUCTURE (formatted professional CV template with placeholder sections)
4. 3 GALLERY PITCH OPENERS (one-paragraph openers for cold outreach emails)

ARTIST CONTEXT:
- Discipline: ${discipline || "Visual Artist"}
- Career Level: ${levelLabel}
- Desired tone: ${toneLabel}
${existingStatement ? `- Existing statement to refine/build from:\n${existingStatement}` : ""}
${cv ? `- CV/exhibition history notes:\n${cv}` : ""}
${extraNotes ? `- Additional notes from artist:\n${extraNotes}` : ""}

INSTRUCTIONS:
- Analyse the visual themes, materials, mood, scale, and conceptual territory visible in the images
- Write in a voice that matches the tone requested
- The statement should feel authored by the artist, not written about them
- Reference specific formal or conceptual elements visible in the work
- Avoid art world clichés: "explores", "questions", "investigates", "unpacks", "navigates"
- Use precise, specific language

Respond ONLY in this exact JSON format, no preamble, no markdown fences:
{
  "visualAnalysis": "2-3 sentence analysis of what you see in the work — themes, materials, mood, formal qualities",
  "statement": "Full 250-350 word artist statement",
  "shortStatement": "80-100 word short statement",
  "cv": "Formatted CV structure as plain text with sections and placeholders",
  "pitchOpeners": ["pitch opener 1", "pitch opener 2", "pitch opener 3"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  // Build message content — text + optional images
  const content = [];

  if (images && images.length > 0) {
    images.forEach(img => {
      content.push({
        type: "image",
        source: { type: "base64", media_type: img.mediaType, data: img.base64 }
      });
    });
  }

  content.push({ type: "text", text: textPrompt });

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
        max_tokens: 2000,
        messages: [{ role: "user", content }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Anthropic API error" });
    }

    const raw = data.content.map(b => b.text || "").join("");
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return res.status(500).json({ error: "Could not parse response from AI." });
    }

    const result = JSON.parse(match[0]);
    return res.status(200).json(result);

  } catch (err) {
    console.error("Statement API error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
