import { useState } from "react";

const PRESETS = {
  emerging: {
    disciplines: ["Painting"],
    years: "2", solo: "0", group: "1-5", venue: "artist-run",
    press: "none", gallery: "none", income: "under-10k",
    statement: "My paintings investigate the emotional residue of domestic spaces — the way light falls on worn furniture, the marks left by ordinary life. Working in oil on linen, I build surfaces slowly, layering and removing until the image feels both present and disappearing. I'm interested in what we overlook in the everyday.",
    cv: "BFA Goldsmiths 2023. Two group shows in London artist-run spaces. Selected for a graduate residency 2024."
  },
  midcareer: {
    disciplines: ["Painting", "Sculpture"],
    years: "8", solo: "3-7", group: "6-20", venue: "commercial-gallery",
    press: "local", gallery: "none", income: "10-50k",
    statement: "My work explores the tension between memory and materiality — how physical surfaces accumulate history while simultaneously erasing it. Working primarily in oil and mixed media, I build up and scrape back layers to create surfaces that feel both geological and intimate. Recent work focuses on post-industrial landscapes of southern Spain, examining what remains when industry leaves a place.",
    cv: "Solo shows at Galería Espacio in Madrid and Studio Voltaire, London. Group shows at CRAC Alsace, Camden Arts Centre. Residency at Hangar Barcelona 2022. Reviewed in El País and Time Out London."
  },
  established: {
    disciplines: ["Installation", "Video"],
    years: "18", solo: "8+", group: "20+", venue: "non-profit",
    press: "national", gallery: "one", income: "50-150k",
    statement: "My installations and video works occupy the threshold between documentary and fiction — using found footage, testimony, and architectural intervention to examine how collective memory is constructed and contested. I am particularly interested in how official narratives erase the minor, the local, and the personal. Recent commissions have addressed post-conflict sites across the former Yugoslavia and the urban redevelopment zones of São Paulo.",
    cv: "Represented by Galerie Chantal Crousel, Paris. Solo shows at Kunsthalle Wien, MACBA Barcelona, Tramway Glasgow. Group shows: Liverpool Biennial, Manifesta 13. Residencies: DAAD Berlin, Cité des Arts Paris. Reviewed in Frieze, Artforum, Le Monde. Works in collections of Tate Modern and Fonds National d'Art Contemporain."
  }
};

const DISCIPLINES = ["Painting", "Drawing", "Sculpture", "Installation", "Photography", "Video"];
const LEVEL_COLORS = { 1: "#7a8fa6", 2: "#697b6c", 3: "#c8a84b", 4: "#b04518", 5: "#4a1a08" };
const LOADING_STEPS = [
  "Reading exhibition signals",
  "Evaluating artist statement",
  "Calculating career level",
  "Identifying strengths & gaps",
  "Generating missions",
  "Mapping your roadmap"
];

const sel = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  color: "#f4efe6", fontFamily: "monospace", fontSize: "12px", padding: "10px 12px", outline: "none"
};
const lbl = {
  display: "block", fontSize: "9px", letterSpacing: "0.28em",
  textTransform: "uppercase", color: "#a09890", marginBottom: "8px"
};

function Section({ icon, title, children }) {
  return (
    <div style={{ border: "1px solid rgba(200,168,75,0.1)", marginBottom: "20px" }}>
      <div style={{ padding: "12px 18px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(200,168,75,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "24px", height: "24px", background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>{icon}</div>
        <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#f4efe6" }}>{title}</div>
      </div>
      <div style={{ padding: "18px" }}>{children}</div>
    </div>
  );
}

function Signal({ type, text }) {
  const ok = type === "strength";
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1px solid ${ok ? "#697b6c" : "#b04518"}`, background: ok ? "rgba(105,123,108,0.15)" : "rgba(176,69,24,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", color: ok ? "#697b6c" : "#b04518", flexShrink: 0, marginTop: "2px" }}>
        {ok ? "✓" : "!"}
      </div>
      <div style={{ fontSize: "12px", color: "#a09890", lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

export default function Assessment({ isPro = false, canRun = true, assessCount = 0, onRun, onUpgrade }) {
  const [form, setForm] = useState({ disciplines: [], years: "", solo: "", group: "", venue: "", press: "", gallery: "", income: "", statement: "", cv: "" });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const loadPreset = (key) => {
    const p = PRESETS[key];
    setForm({ disciplines: [...p.disciplines], years: p.years, solo: p.solo, group: p.group, venue: p.venue, press: p.press, gallery: p.gallery, income: p.income, statement: p.statement, cv: p.cv });
    setResult(null); setError("");
  };

  const toggleDiscipline = (d) => setForm(f => ({ ...f, disciplines: f.disciplines.includes(d) ? f.disciplines.filter(x => x !== d) : [...f.disciplines, d] }));

  const runAssessment = async () => {
    if (!canRun) { onUpgrade && onUpgrade(); return; }
    if (!form.statement.trim()) { setError("Please add your artist statement."); return; }
    if (!form.disciplines.length) { setError("Please select at least one discipline."); return; }
    onRun && onRun(); // increment counter in parent
    setError(""); setLoading(true); setResult(null); setLoadingStep(0);

    const stepInterval = setInterval(() => setLoadingStep(s => Math.min(s + 1, LOADING_STEPS.length - 1)), 700);

    const prompt = `Assess this artist's career and return a JSON profile.

ARTIST DATA:
- Disciplines: ${form.disciplines.join(", ")}
- Years active: ${form.years || "unspecified"}
- Solo exhibitions: ${form.solo || "unspecified"}
- Group exhibitions: ${form.group || "unspecified"}
- Highest venue: ${form.venue || "unspecified"}
- Press: ${form.press || "unspecified"}
- Gallery representation: ${form.gallery || "unspecified"}
- Annual income: ${form.income || "unspecified"}
- Statement: "${form.statement}"
- CV notes: "${form.cv || "none"}"

THE 5 STRATUM LEVELS:
1 = "The Foundation" — just starting, first group shows, no solo, no press
2 = "The Local Presence" — 1-2 solo shows, local press, small sales
3 = "The Emerging Voice" — 3-7 solo shows, commercial gallery, regional press, residencies
4 = "The Market Artist" — gallery rep, art fairs, international shows, major grants
5 = "The Institutional Artist" — biennials, museum shows, permanent collections, monograph

Return ONLY valid JSON, no markdown, starting with { and ending with }:
{
  "level": <1-5>,
  "level_name": "<name>",
  "level_subtitle": "<10 word description>",
  "level_summary": "<2 sentences honest assessment>",
  "scores": { "exhibition": <0-100>, "statement": <0-100>, "market": <0-100>, "visibility": <0-100> },
  "strengths": [{"text": "<strength>"}, {"text": "<strength>"}, {"text": "<strength>"}],
  "gaps": [{"text": "<gap>"}, {"text": "<gap>"}, {"text": "<gap>"}],
  "statement_critique": { "overall": "<one sentence>", "good": ["<what works>", "<what works>"], "improve": ["<improve>", "<improve>"] },
  "missions": [
    {"priority": "high", "type": "<type>", "title": "<title>", "rationale": "<1-2 sentences>", "xp": <100-400>},
    {"priority": "high", "type": "<type>", "title": "<title>", "rationale": "<1-2 sentences>", "xp": <100-400>},
    {"priority": "med",  "type": "<type>", "title": "<title>", "rationale": "<1-2 sentences>", "xp": <50-200>},
    {"priority": "med",  "type": "<type>", "title": "<title>", "rationale": "<1-2 sentences>", "xp": <50-200>},
    {"priority": "low",  "type": "<type>", "title": "<title>", "rationale": "<1-2 sentences>", "xp": <50-150>}
  ],
  "next_level_name": "<next level name>",
  "next_level_gates": ["<requirement>", "<requirement>", "<requirement>"]
}`;

    try {
      // ── Calls our own serverless function, not Anthropic directly ──
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");

      clearInterval(stepInterval);
      setLoadingStep(LOADING_STEPS.length);
      setResult(data);
    } catch (e) {
      clearInterval(stepInterval);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const color = result ? (LEVEL_COLORS[result.level] || "#c8a84b") : "#c8a84b";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", minHeight: "100vh", fontFamily: "monospace", background: "#0a0908", color: "#f4efe6", paddingTop: "52px" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* LEFT PANEL */}
      <div style={{ background: "#111009", borderRight: "1px solid rgba(200,168,75,0.12)", display: "flex", flexDirection: "column", height: "calc(100vh - 52px)", overflowY: "auto", position: "sticky", top: "52px" }}>
        <div style={{ padding: "22px 28px 16px", borderBottom: "1px solid rgba(200,168,75,0.1)" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#a09890" }}>AI Assessment Engine</div>
        </div>

        <div style={{ padding: "18px 28px", flex: 1, overflowY: "auto" }}>
          {/* Presets */}
          <div style={{ marginBottom: "18px" }}>
            <div style={lbl}>Load Sample Artist</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[["emerging","Emerging"],["midcareer","Mid-Career"],["established","Established"]].map(([k,label]) => (
                <button key={k} onClick={() => loadPreset(k)} style={{ flex: 1, padding: "7px 4px", background: "transparent", border: "1px solid rgba(200,168,75,0.25)", color: "#a09890", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(200,168,75,0.08)", marginBottom: "18px" }} />

          {/* Disciplines */}
          <div style={{ marginBottom: "16px" }}>
            <div style={lbl}>Discipline</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {DISCIPLINES.map(d => {
                const on = form.disciplines.includes(d);
                return (
                  <button key={d} onClick={() => toggleDiscipline(d)} style={{ padding: "5px 10px", border: `1px solid ${on ? "#c8a84b" : "rgba(255,255,255,0.08)"}`, background: on ? "#c8a84b" : "transparent", color: on ? "#0a0908" : "#a09890", fontFamily: "monospace", fontSize: "10px", cursor: "pointer", transition: "all 0.15s" }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={lbl}>Years Active</label>
            <input type="number" value={form.years} onChange={e => setForm(f => ({ ...f, years: e.target.value }))} placeholder="e.g. 8" style={sel} />
          </div>

          {[
            { label: "Solo Exhibitions",      key: "solo",    opts: [["0","None yet"],["1-2","1–2"],["3-7","3–7"],["8+","8+"]] },
            { label: "Group Exhibitions",     key: "group",   opts: [["1-5","1–5"],["6-20","6–20"],["20+","20+"]] },
            { label: "Highest Venue",         key: "venue",   opts: [["artist-run","Artist-run / DIY"],["commercial-gallery","Commercial gallery"],["non-profit","Kunsthalle / Non-profit"],["museum","Museum"]] },
            { label: "Press Coverage",        key: "press",   opts: [["none","None"],["local","Local / regional"],["national","National art press"],["international","International"]] },
            { label: "Gallery Representation",key: "gallery", opts: [["none","No representation"],["one","One gallery"],["multiple","Multiple galleries"]] },
            { label: "Annual Art Income",     key: "income",  opts: [["under-10k","Under $10k"],["10-50k","$10k–$50k"],["50-150k","$50k–$150k"],["150k+","$150k+"]] },
          ].map(({ label, key, opts }) => (
            <div key={key} style={{ marginBottom: "14px" }}>
              <label style={lbl}>{label}</label>
              <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={sel}>
                <option value="">Select...</option>
                {opts.map(([v,l]) => <option key={v} value={v} style={{ background: "#111009" }}>{l}</option>)}
              </select>
            </div>
          ))}

          <div style={{ marginBottom: "14px" }}>
            <label style={lbl}>Artist Statement <span style={{ color: "#b04518" }}>*required</span></label>
            <textarea value={form.statement} onChange={e => setForm(f => ({ ...f, statement: e.target.value }))} rows={5} placeholder="Paste your artist statement..." style={{ ...sel, resize: "vertical", lineHeight: "1.6" }} />
          </div>
          <div>
            <label style={lbl}>CV Notes (optional)</label>
            <textarea value={form.cv} onChange={e => setForm(f => ({ ...f, cv: e.target.value }))} rows={3} placeholder="Residencies, awards, collections..." style={{ ...sel, resize: "vertical", lineHeight: "1.6" }} />
          </div>
        </div>

        <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(200,168,75,0.1)" }}>
          {/* Free tier usage indicator */}
          {!isPro && (
            <div style={{ padding: "8px 12px", background: assessCount >= 1 ? "rgba(176,69,24,0.1)" : "rgba(200,168,75,0.06)", border: `1px solid ${assessCount >= 1 ? "rgba(176,69,24,0.3)" : "rgba(200,168,75,0.15)"}`, fontSize: "9px", color: assessCount >= 1 ? "#b04518" : "#706860", letterSpacing: "0.12em", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
              <span>{assessCount >= 1 ? "Free assessment used — upgrade for unlimited" : "1 free assessment remaining"}</span>
              <span style={{ color: assessCount >= 1 ? "#b04518" : "#c8a84b" }}>{assessCount}/1</span>
            </div>
          )}
          {error && <div style={{ padding: "10px 12px", background: "rgba(176,69,24,0.12)", border: "1px solid rgba(176,69,24,0.3)", color: "#c0603a", fontSize: "11px", lineHeight: 1.5, marginBottom: "10px", wordBreak: "break-word" }}>{error}</div>}
          <button onClick={runAssessment} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#1a1714" : canRun ? "#c8a84b" : "#b04518", border: loading ? "1px solid #c8a84b" : "none", color: loading ? "#c8a84b" : "#0a0908", fontFamily: "monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Analyzing…" : canRun ? "Run AI Assessment →" : "✦ Upgrade for Unlimited Assessments"}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ padding: "36px 40px", overflowY: "auto" }}>
        {!loading && !result && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.2, textAlign: "center", minHeight: "60vh" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "90px", color: "#c8a84b", fontStyle: "italic", lineHeight: 1, marginBottom: "16px" }}>∴</div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#a09890", lineHeight: 2 }}>Load a preset or fill in your details<br />then run the assessment</div>
          </div>
        )}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", border: "1px solid rgba(200,168,75,0.15)", borderTop: "1px solid #c8a84b", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }} />
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#a09890", marginBottom: "28px" }}>Analyzing your practice</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
              {LOADING_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: i < loadingStep ? "#697b6c" : i === loadingStep ? "#c8a84b" : "#2a2520", transition: "color 0.4s" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div>
            {/* Level hero */}
            <div style={{ padding: "28px", border: `1px solid ${color}33`, background: `${color}0d`, marginBottom: "20px", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: color }} />
              <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(0,0,0,0.4)" }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: "36px", fontWeight: 300, color }}>{result.level}</span>
                </div>
                <div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color, marginBottom: "4px" }}>Level {result.level} of 5 · {result.level_subtitle}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#f4efe6", lineHeight: 1.1, marginBottom: "8px" }}>{result.level_name}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "14px", color: "#a09890", lineHeight: 1.6 }}>{result.level_summary}</div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(200,168,75,0.08)", marginBottom: "20px" }}>
              {Object.entries(result.scores).map(([key, val]) => (
                <div key={key} style={{ background: "#111009", padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "30px", fontWeight: 300, color: val >= 70 ? color : val >= 40 ? "#a09890" : "#b04518", lineHeight: 1, marginBottom: "4px" }}>{val}</div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#a09890", marginBottom: "8px" }}>{key}</div>
                  <div style={{ height: "2px", background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ height: "100%", width: `${val}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>

            <Section icon="↑" title="Strengths">
              {result.strengths.map((s, i) => <Signal key={i} type="strength" text={s.text} />)}
            </Section>

            <Section icon="↓" title="Critical Gaps">
              {result.gaps.map((g, i) => <Signal key={i} type="gap" text={g.text} />)}
            </Section>

            <Section icon="✍" title={`Statement Analysis · ${result.scores.statement}/100`}>
              <div style={{ borderLeft: "2px solid #c8a84b", paddingLeft: "14px", marginBottom: "12px", fontFamily: "Georgia,serif", fontSize: "14px", fontStyle: "italic", color: "#a09890", lineHeight: 1.7 }}>
                "{form.statement.slice(0, 200)}{form.statement.length > 200 ? "…" : ""}"
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "13px", fontStyle: "italic", color: "#a09890", marginBottom: "12px" }}>{result.statement_critique.overall}</div>
              {result.statement_critique.good.map((t, i) => <div key={i} style={{ padding: "7px 10px", borderLeft: "2px solid #697b6c", marginBottom: "6px", fontSize: "11px", color: "#a09890" }}>✓ {t}</div>)}
              {result.statement_critique.improve.map((t, i) => <div key={i} style={{ padding: "7px 10px", borderLeft: "2px solid #b04518", marginBottom: "6px", fontSize: "11px", color: "#a09890" }}>→ {t}</div>)}
            </Section>

            <Section icon="→" title="Your Missions">
              {result.missions.map((m, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "3px 1fr auto", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "8px" }}>
                  <div style={{ borderRadius: "2px", background: m.priority === "high" ? "#b04518" : m.priority === "med" ? "#c8a84b" : "#697b6c" }} />
                  <div>
                    <div style={{ fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#a09890", marginBottom: "3px" }}>{m.type}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "16px", color: "#f4efe6", marginBottom: "5px", lineHeight: 1.2 }}>{m.title}</div>
                    <div style={{ fontSize: "11px", color: "#a09890", lineHeight: 1.6 }}>{m.rationale}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "18px", color: "#c8a84b" }}>+{m.xp}</div>
                    <div style={{ fontSize: "8px", letterSpacing: "0.15em", color: "#a09890" }}>XP</div>
                  </div>
                </div>
              ))}
            </Section>

            <div style={{ padding: "24px", background: "rgba(200,168,75,0.05)", border: "1px solid rgba(200,168,75,0.18)", textAlign: "center" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a84b", marginBottom: "8px" }}>⬆ To Reach Level {Math.min(result.level + 1, 5)}</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "24px", fontStyle: "italic", fontWeight: 300, color: "#f4efe6", marginBottom: "12px" }}>{result.next_level_name}</div>
              {result.next_level_gates.map((g, i) => (
                <div key={i} style={{ fontSize: "11px", color: "#a09890", lineHeight: 2 }}>— <span style={{ color: "#f4efe6" }}>{g}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
