import { useState } from "react";

const GALLERIES = [
  {
    id: 1,
    name: "Sadie Coles HQ",
    city: "London", country: "UK", tier: 4,
    disciplines: ["painting","sculpture","installation","video","photography"],
    aesthetics: ["conceptual","figurative","material","political","body","identity","feminist"],
    levels: [4,5],
    about: "One of London's most respected galleries, representing artists whose work is conceptually rigorous and often politically engaged. Strong institutional connections globally.",
    artists: ["Sarah Lucas", "Luc Tuymans", "Matthew Barney"],
    entry: "referral",
    entryNote: "Rarely accepts unsolicited submissions. Best approached through a mutual artist, curator, or after significant institutional show.",
    openSubmissions: false,
    fairPresence: ["Frieze London","Art Basel","Frieze Masters"],
    collectors: "institutional, major private",
    url: "https://sadiecoles.com"
  },
  {
    id: 2,
    name: "Galerie Chantal Crousel",
    city: "Paris", country: "France", tier: 5,
    disciplines: ["installation","video","sculpture","painting"],
    aesthetics: ["conceptual","political","post-colonial","memory","archive","materiality"],
    levels: [4,5],
    about: "Leading Paris gallery with strong global presence. Champions artists with rigorous conceptual practices and international institutional profiles.",
    artists: ["Danh Vo", "Hassan Khan", "Natascha Sadr Haghighian"],
    entry: "referral",
    entryNote: "Invitation and referral only. Approach after museum-level shows in Europe.",
    openSubmissions: false,
    fairPresence: ["Art Basel","FIAC","Frieze London"],
    collectors: "museum, major institutional",
    url: "https://crousel.com"
  },
  {
    id: 3,
    name: "Studio Voltaire",
    city: "London", country: "UK", tier: 3,
    disciplines: ["all"],
    aesthetics: ["experimental","emerging","community","social practice","identity"],
    levels: [2,3],
    about: "Non-profit gallery and studios supporting emerging and mid-career artists. Strong emphasis on community, risk-taking, and underrepresented voices.",
    artists: ["Open programme"],
    entry: "open-call",
    entryNote: "Regular open calls for exhibitions and residencies. One of the most accessible quality spaces in London for emerging artists.",
    openSubmissions: true,
    fairPresence: [],
    collectors: "emerging collectors, institutions",
    url: "https://studiovoltaire.org"
  },
  {
    id: 4,
    name: "Galería Pepe Cobo",
    city: "Madrid", country: "Spain", tier: 3,
    disciplines: ["painting","drawing","sculpture"],
    aesthetics: ["painting","material","process","landscape","Mediterranean","abstraction"],
    levels: [3,4],
    about: "Established Madrid gallery with a strong focus on painting and works on paper. Good entry point for Spain-based or Spain-connected painters.",
    artists: ["Secundino Hernández", "Magnus Plessen"],
    entry: "submission",
    entryNote: "Accepts carefully prepared portfolio submissions. Include documentation, CV, and statement. Spanish connection or language helps.",
    openSubmissions: true,
    fairPresence: ["ARCO","Frieze London","Art Basel"],
    collectors: "Spanish and international private collectors",
    url: "https://pepecobo.com"
  },
  {
    id: 5,
    name: "Francesca Minini",
    city: "Milan", country: "Italy", tier: 4,
    disciplines: ["painting","sculpture","installation","video"],
    aesthetics: ["conceptual","material","process","political","language","photography"],
    levels: [3,4],
    about: "One of Italy's most respected galleries for contemporary art. Rigorous programme combining Italian and international artists.",
    artists: ["Yael Bartana", "Jimmie Durham"],
    entry: "referral",
    entryNote: "Prefers referrals from trusted artists or curators. Worth pursuing after strong institutional shows in Italy or Europe.",
    openSubmissions: false,
    fairPresence: ["Art Basel","Frieze","miart"],
    collectors: "Italian institutions, international private",
    url: "https://francescaminini.it"
  },
  {
    id: 6,
    name: "Galerie Nordenhake",
    city: "Berlin / Stockholm", country: "Germany/Sweden", tier: 4,
    disciplines: ["painting","sculpture","installation","video","photography"],
    aesthetics: ["conceptual","minimal","material","landscape","Nordic","photography"],
    levels: [3,4],
    about: "Internationally respected gallery with strong Nordic and European artist roster. Known for rigorous, often quiet conceptual practices.",
    artists: ["Karin Mamma Andersson", "Alfredo Jaar"],
    entry: "submission",
    entryNote: "Accepts portfolio submissions with care. Nordic connection or strong European institutional profile helps. Include a clear CV and recent exhibition history.",
    openSubmissions: true,
    fairPresence: ["Art Basel","Frieze","Liste"],
    collectors: "Scandinavian and international institutional",
    url: "https://nordenhake.com"
  },
  {
    id: 7,
    name: "Carlos/Ishikawa",
    city: "London", country: "UK", tier: 3,
    disciplines: ["painting","sculpture","installation","video"],
    aesthetics: ["emerging","experimental","queer","political","material","young"],
    levels: [2,3],
    about: "One of London's most exciting younger commercial galleries. Known for championing emerging artists with adventurous, often political practices.",
    artists: ["Cecilia Vicuña", "Dozie Kanu"],
    entry: "submission",
    entryNote: "More open than most commercial galleries. Accepts submissions. Best if you have a strong body of recent work and some exhibition history.",
    openSubmissions: true,
    fairPresence: ["Frieze London","LISTE","Untitled Art Fair"],
    collectors: "younger collectors, emerging institutions",
    url: "https://carlosishikawa.com"
  },
  {
    id: 8,
    name: "Rodeo Gallery",
    city: "London / Istanbul", country: "UK/Turkey", tier: 3,
    disciplines: ["painting","sculpture","installation","video","photography"],
    aesthetics: ["material","process","landscape","post-colonial","Mediterranean","political"],
    levels: [3,4],
    about: "Internationally regarded gallery with strong Mediterranean and Middle Eastern focus. Rigorous programme with strong art fair presence.",
    artists: ["Nilbar Güreş", "Nikos Navridis"],
    entry: "referral",
    entryNote: "Referral strongly preferred. Mediterranean or Middle Eastern connection relevant. Approach after a strong non-profit or institutional show.",
    openSubmissions: false,
    fairPresence: ["Frieze London","Art Basel","Istanbul Art Fair"],
    collectors: "European and Middle Eastern collectors",
    url: "https://rodeo.gallery"
  },
  {
    id: 9,
    name: "Galería Elvira González",
    city: "Madrid", country: "Spain", tier: 4,
    disciplines: ["painting","drawing","sculpture"],
    aesthetics: ["painting","abstraction","material","process","landscape","intimate"],
    levels: [3,4,5],
    about: "One of Spain's most prestigious galleries, with a programme that prizes painterly rigour and material intelligence. Strong historical and contemporary programme.",
    artists: ["Cristina de Miguel","Miquel Barceló"],
    entry: "referral",
    entryNote: "Referral strongly preferred. Strong painting practice with institutional history required. Spanish or European collector base helps.",
    openSubmissions: false,
    fairPresence: ["ARCO","Art Basel","Frieze Masters"],
    collectors: "Major Spanish and international collectors",
    url: "https://galeriael­viragoncalez.com"
  },
  {
    id: 10,
    name: "Supportico Lopez",
    city: "Berlin", country: "Germany", tier: 3,
    disciplines: ["installation","video","sculpture","painting"],
    aesthetics: ["conceptual","political","Italian","language","experimental","archive"],
    levels: [3,4],
    about: "Berlin gallery with strong Italian connections and a rigorous conceptual programme. Known for championing artists with politically engaged, experimental practices.",
    artists: ["Rossella Biscotti", "Giulia Piscitelli"],
    entry: "submission",
    entryNote: "More accessible than peers. Accepts submissions. Italian connection or strong conceptual practice is relevant.",
    openSubmissions: true,
    fairPresence: ["Art Basel","Frieze","Artissima"],
    collectors: "European conceptual collectors",
    url: "https://supporticolopez.com"
  },
  {
    id: 11,
    name: "GRIMM Gallery",
    city: "Amsterdam / New York", country: "Netherlands/USA", tier: 3,
    disciplines: ["painting","drawing","sculpture"],
    aesthetics: ["painting","figurative","material","process","Dutch","European","representation"],
    levels: [3,4],
    about: "Strong mid-size gallery with Amsterdam and New York presence. Known for a rigorous painting and drawing programme with both European and international artists.",
    artists: ["Mernet Larsen", "Erik Thor Sandberg"],
    entry: "submission",
    entryNote: "Accepts submissions. Portfolio should emphasise exhibition history and critical reception. Strong painting practice required.",
    openSubmissions: true,
    fairPresence: ["Art Basel","NADA","Untitled Art Fair"],
    collectors: "Dutch, American and European private collectors",
    url: "https://grimmgallery.com"
  },
  {
    id: 12,
    name: "Galerie Eva Presenhuber",
    city: "Zurich / New York", country: "Switzerland/USA", tier: 4,
    disciplines: ["painting","sculpture","installation","video"],
    aesthetics: ["conceptual","material","process","American","European","abstraction"],
    levels: [4,5],
    about: "Highly respected Zurich and New York gallery with a strong international programme. Known for rigorous material and conceptual practices.",
    artists: ["Ugo Rondinone", "Monika Sosnowska"],
    entry: "referral",
    entryNote: "Referral only. Approach after significant institutional shows in Europe or the US.",
    openSubmissions: false,
    fairPresence: ["Art Basel","Frieze","The Armory Show"],
    collectors: "Swiss, American institutional and private",
    url: "https://presenhuber.com"
  },
  {
    id: 13,
    name: "Galería OMR",
    city: "Mexico City", country: "Mexico", tier: 3,
    disciplines: ["painting","sculpture","installation","video","photography"],
    aesthetics: ["Latin American","political","material","conceptual","landscape","identity"],
    levels: [3,4],
    about: "One of Latin America's most important galleries. Strong conceptual and politically engaged programme with international reach.",
    artists: ["Minerva Cuevas", "Francis Alÿs"],
    entry: "submission",
    entryNote: "Accepts submissions. Latin American connection or Spanish-speaking practice helps. Good entry point to the Latin American market.",
    openSubmissions: true,
    fairPresence: ["Art Basel","Frieze","Zona MACO"],
    collectors: "Latin American and international collectors",
    url: "https://galeria-omr.com"
  },
  {
    id: 14,
    name: "BEERS London",
    city: "London", country: "UK", tier: 2,
    disciplines: ["painting","drawing","sculpture","installation","photography"],
    aesthetics: ["emerging","painting","figurative","material","British","young"],
    levels: [2,3],
    about: "Commercial gallery actively supporting emerging artists through paid residency programmes. One of the most accessible quality commercial galleries in London.",
    artists: ["Open programme"],
    entry: "open-call",
    entryNote: "Runs open submission residency programmes with application fee. One of the best routes for emerging artists to get London commercial gallery exposure.",
    openSubmissions: true,
    fairPresence: ["Affordable Art Fair","London Art Fair"],
    collectors: "emerging collectors, first-time buyers",
    url: "https://beerscontemporary.com"
  },
  {
    id: 15,
    name: "Proyectos Monclova",
    city: "Mexico City", country: "Mexico", tier: 3,
    disciplines: ["painting","sculpture","installation","video","photography"],
    aesthetics: ["conceptual","Latin American","material","political","young","emerging"],
    levels: [3,4],
    about: "Dynamic Mexico City gallery with strong international connections. Known for championing younger artists with conceptual and politically engaged practices.",
    artists: ["Bárbara Sánchez-Kane", "Daniel Guzmán"],
    entry: "referral",
    entryNote: "Referral preferred. Worth pursuing if you have Latin American institutional connections or have shown in Mexico.",
    openSubmissions: false,
    fairPresence: ["Art Basel","Frieze","Zona MACO"],
    collectors: "Mexican and international collectors",
    url: "https://proyectosmonclova.com"
  },
  {
    id: 16,
    name: "Galerie Peter Kilchmann",
    city: "Zurich / Paris", country: "Switzerland", tier: 3,
    disciplines: ["painting","sculpture","installation","photography","video"],
    aesthetics: ["Latin American","European","conceptual","political","material","social"],
    levels: [3,4],
    about: "Zurich gallery with long history championing Latin American and European artists. Strong politically engaged programme.",
    artists: ["Enrique Metinides", "Carlos Garaicoa"],
    entry: "submission",
    entryNote: "Accepts portfolio submissions. Latin American connection or strong politically engaged practice is relevant.",
    openSubmissions: true,
    fairPresence: ["Art Basel","FIAC","Zona MACO"],
    collectors: "Swiss and Latin American collectors",
    url: "https://peterkilchmann.com"
  },
  {
    id: 17,
    name: "Copperfield Gallery",
    city: "London", country: "UK", tier: 2,
    disciplines: ["painting","drawing","sculpture","installation"],
    aesthetics: ["emerging","painting","material","British","process","young"],
    levels: [2,3],
    about: "East London gallery focused on emerging and mid-career artists. Known for a strong painting and sculpture programme and accessible approach to artists.",
    artists: ["Open programme"],
    entry: "submission",
    entryNote: "Actively accepts portfolio submissions from emerging artists. Good first commercial gallery. Include strong documentation and a clear statement.",
    openSubmissions: true,
    fairPresence: ["London Art Fair","Condo"],
    collectors: "London emerging collectors",
    url: "https://copperfieldgallery.com"
  },
  {
    id: 18,
    name: "Galería Mayoral",
    city: "Barcelona / Paris", country: "Spain", tier: 3,
    disciplines: ["painting","drawing","sculpture"],
    aesthetics: ["historical","modern","painting","Spanish","Mediterranean","market"],
    levels: [4,5],
    about: "Barcelona gallery specialising in modern and contemporary Spanish and Latin American masters. More market-focused programme.",
    artists: ["Joan Miró estate", "Antoni Tàpies estate"],
    entry: "referral",
    entryNote: "Referral only. Relevant if you have established market presence in Spain or Latin America.",
    openSubmissions: false,
    fairPresence: ["ARCO","Art Basel","TEFAF"],
    collectors: "Spanish institutional and private collectors",
    url: "https://galeriamayoral.com"
  },
  {
    id: 19,
    name: "Nicolai Wallner",
    city: "Copenhagen", country: "Denmark", tier: 3,
    disciplines: ["painting","sculpture","installation","photography","video"],
    aesthetics: ["Nordic","conceptual","material","minimal","landscape","photography"],
    levels: [3,4],
    about: "One of Copenhagen's leading contemporary galleries. Strong Nordic and international programme. Key entry point to Scandinavian market.",
    artists: ["Peter Land", "Elmgreen & Dragset"],
    entry: "submission",
    entryNote: "Accepts submissions. Nordic connection helpful but not required. Include strong exhibition history and clear documentation.",
    openSubmissions: true,
    fairPresence: ["CHART","Art Basel","Frieze"],
    collectors: "Scandinavian and international collectors",
    url: "https://nicolaiwallner.com"
  },
  {
    id: 20,
    name: "Galerie Eigen + Art",
    city: "Leipzig / Berlin", country: "Germany", tier: 3,
    disciplines: ["painting","drawing","sculpture","video"],
    aesthetics: ["painting","German","Leipzig School","figuration","material","expression"],
    levels: [3,4],
    about: "Legendary Leipzig gallery that launched the Neo-Rauch generation. Still one of the key destinations for German painting and figuration internationally.",
    artists: ["Neo Rauch", "Christoph Ruckhäberle"],
    entry: "submission",
    entryNote: "Accepts submissions. Strong painting practice is essential. German connection or figurative/material painting practice is highly relevant.",
    openSubmissions: true,
    fairPresence: ["Art Basel","Frieze","The Armory Show"],
    collectors: "German and international painting collectors",
    url: "https://eigen-art.com"
  },
];

const DISCIPLINES = ["Painting","Drawing","Sculpture","Installation","Photography","Video"];
const AESTHETICS_OPTIONS = ["conceptual","material","landscape","figurative","political","abstraction","process","identity","archive","memory","body","feminist","queer","post-colonial","Nordic","Mediterranean","Latin American","emerging","experimental"];

function calcMatch(gallery, form) {
  let score = 0;
  let reasons = [];
  let warnings = [];

  // Discipline match (30 pts)
  const discLower = form.disciplines.map(d => d.toLowerCase());
  const gallDiscLower = gallery.disciplines.map(d => d.toLowerCase());
  const discMatch = discLower.some(d => gallDiscLower.includes(d) || gallDiscLower.includes("all"));
  if (discMatch) { score += 30; reasons.push("Your discipline aligns with their programme"); }
  else { warnings.push("Discipline mismatch — they rarely show this medium"); }

  // Level match (25 pts)
  const level = parseInt(form.level);
  if (gallery.levels.includes(level)) { score += 25; reasons.push(`Gallery actively represents Level ${level} artists`); }
  else if (gallery.levels.includes(level + 1)) { score += 12; reasons.push("You're approaching their entry level — apply in 1–2 years"); }
  else if (gallery.levels.includes(level - 1)) { score += 8; warnings.push("You may be slightly overqualified — they tend to show earlier career"); }
  else { warnings.push("Career stage mismatch with their current roster"); }

  // Aesthetic match (30 pts)
  if (form.aesthetics.length > 0) {
    const shared = form.aesthetics.filter(a => gallery.aesthetics.includes(a));
    const pts = Math.min(30, shared.length * 10);
    score += pts;
    if (shared.length >= 3) reasons.push(`Strong conceptual alignment: ${shared.slice(0,3).join(", ")}`);
    else if (shared.length >= 1) reasons.push(`Some aesthetic overlap: ${shared.join(", ")}`);
    else warnings.push("Limited conceptual overlap with their programme");
  }

  // Geography match (15 pts)
  if (form.region && (gallery.country.toLowerCase().includes(form.region) || form.region === "international")) {
    score += 15;
    reasons.push("Geographic match strengthens the relationship");
  } else if (form.region === "europe" && ["UK","France","Germany","Spain","Italy","Netherlands","Switzerland","Denmark","Sweden"].some(c => gallery.country.includes(c))) {
    score += 15;
    reasons.push("European geography aligns");
  } else if (form.region === "americas" && ["USA","Mexico","Brazil"].some(c => gallery.country.includes(c))) {
    score += 15;
    reasons.push("Americas geography aligns");
  }

  return { score: Math.min(100, score), reasons, warnings };
}

const ENTRY_META = {
  "referral":    { label: "Referral Only",     color: "#b04518", bg: "rgba(176,69,24,0.12)" },
  "submission":  { label: "Open Submission",   color: "#c8a84b", bg: "rgba(200,168,75,0.1)" },
  "open-call":   { label: "Open Call",         color: "#697b6c", bg: "rgba(105,123,108,0.1)" },
};

const TIER_LABELS = { 2:"Entry Commercial", 3:"Mid-Tier", 4:"Top-Tier", 5:"Blue-Chip" };

export default function GalleryMatcher() {
  const [form, setForm] = useState({ disciplines: [], aesthetics: [], level: "3", region: "europe", statement: "" });
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("input"); // input | results

  const toggleItem = (key, val) => {
    setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  };

  const runMatch = () => {
    const scored = GALLERIES.map(g => ({ ...g, ...calcMatch(g, form) })).sort((a, b) => b.score - a.score);
    setResults(scored);
    setSelected(scored[0]?.id || null);
    setView("results");
  };

  const sel = results ? results.find(g => g.id === selected) : null;

  const Chip = ({ active, onClick, children, accent = "#c8a84b" }) => (
    <button onClick={onClick} style={{ padding: "5px 12px", border: `1px solid ${active ? accent : "rgba(255,255,255,0.07)"}`, background: active ? accent : "transparent", color: active ? "#0a0908" : "#706860", fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.15s" }}>
      {children}
    </button>
  );

  const Label = ({ children }) => (
    <div style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#706860", marginBottom: "10px" }}>{children}</div>
  );

  const scoreColor = (s) => s >= 80 ? "#c8a84b" : s >= 55 ? "#a09890" : s >= 35 ? "#504840" : "#302820";

  // ── INPUT VIEW ──
  if (view === "input") return (
    <div style={{ background: "#0a0908", color: "#f4efe6", fontFamily: "monospace", minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: "52px" }}>
      <div style={{ padding: "20px 32px", borderBottom: "1px solid rgba(200,168,75,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "18px", fontWeight: 300 }}>
          Str<span style={{ color: "#c8a84b", fontStyle: "italic" }}>a</span>tum
          <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#706860", marginLeft: "10px" }}>/ Gallery Matching System</span>
        </div>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 32px", width: "100%" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "32px", fontWeight: 300, fontStyle: "italic", marginBottom: "8px" }}>Find your galleries.</div>
        <div style={{ fontSize: "11px", color: "#706860", lineHeight: 1.7, marginBottom: "48px" }}>
          Tell us about your practice. We'll match you to galleries whose programme, roster, and aesthetic territory align with your work — and tell you exactly how to approach each one.
        </div>

        {/* Career Level */}
        <div style={{ marginBottom: "32px" }}>
          <Label>Your Career Level</Label>
          <div style={{ display: "flex", gap: "6px" }}>
            {[["1","Foundation"],["2","Local Presence"],["3","Emerging Voice"],["4","Market Artist"],["5","Institutional"]].map(([v, l]) => (
              <button key={v} onClick={() => setForm(f => ({ ...f, level: v }))} style={{ flex: 1, padding: "10px 4px", border: `1px solid ${form.level === v ? "#c8a84b" : "rgba(255,255,255,0.07)"}`, background: form.level === v ? "#c8a84b" : "transparent", color: form.level === v ? "#0a0908" : "#706860", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", textAlign: "center", lineHeight: 1.4 }}>
                <div style={{ fontSize: "16px", fontFamily: "Georgia,serif", display: "block", marginBottom: "3px" }}>{v}</div>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Disciplines */}
        <div style={{ marginBottom: "32px" }}>
          <Label>Primary Discipline(s)</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {DISCIPLINES.map(d => <Chip key={d} active={form.disciplines.includes(d)} onClick={() => toggleItem("disciplines", d)}>{d}</Chip>)}
          </div>
        </div>

        {/* Aesthetics */}
        <div style={{ marginBottom: "32px" }}>
          <Label>Conceptual & Aesthetic Territory — select all that apply</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {AESTHETICS_OPTIONS.map(a => <Chip key={a} active={form.aesthetics.includes(a)} onClick={() => toggleItem("aesthetics", a)} accent="#697b6c">{a}</Chip>)}
          </div>
        </div>

        {/* Region */}
        <div style={{ marginBottom: "32px" }}>
          <Label>Geographic Focus</Label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[["europe","Europe"],["americas","Americas"],["uk","UK"],["international","International"]].map(([v, l]) => (
              <Chip key={v} active={form.region === v} onClick={() => setForm(f => ({ ...f, region: v }))} accent="#7a8fa6">{l}</Chip>
            ))}
          </div>
        </div>

        {/* Statement */}
        <div style={{ marginBottom: "40px" }}>
          <Label>Artist Statement (optional — improves matching)</Label>
          <textarea value={form.statement} onChange={e => setForm(f => ({ ...f, statement: e.target.value }))} rows={4} placeholder="Paste a few sentences about your practice..." style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#f4efe6", fontFamily: "monospace", fontSize: "12px", padding: "12px 14px", outline: "none", resize: "vertical", lineHeight: 1.6 }} />
        </div>

        <button onClick={runMatch} disabled={form.disciplines.length === 0} style={{ width: "100%", padding: "18px", background: form.disciplines.length > 0 ? "#c8a84b" : "#1a1510", border: form.disciplines.length > 0 ? "none" : "1px solid rgba(200,168,75,0.2)", color: form.disciplines.length > 0 ? "#0a0908" : "#504840", fontFamily: "monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: form.disciplines.length > 0 ? "pointer" : "not-allowed" }}>
          Match My Practice to Galleries →
        </button>
      </div>
    </div>
  );

  // ── RESULTS VIEW ──
  return (
    <div style={{ background: "#0a0908", color: "#f4efe6", fontFamily: "monospace", height: "100vh", display: "flex", flexDirection: "column", paddingTop: "52px" }}>

      {/* Header */}
      <div style={{ padding: "14px 28px", borderBottom: "1px solid rgba(200,168,75,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "17px", fontWeight: 300 }}>
          Str<span style={{ color: "#c8a84b", fontStyle: "italic" }}>a</span>tum
          <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#706860", marginLeft: "10px" }}>/ Gallery Matches · Level {form.level} · {form.disciplines.join(", ")}</span>
        </div>
        <button onClick={() => { setView("input"); setResults(null); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#706860", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", cursor: "pointer" }}>
          ← Refine
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", flex: 1, overflow: "hidden" }}>

        {/* Gallery list */}
        <div style={{ borderRight: "1px solid rgba(200,168,75,0.1)", overflowY: "auto" }}>
          <div style={{ padding: "10px 20px 6px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#504840" }}>
            {results.length} galleries ranked
          </div>
          {results.map((g, i) => {
            const entry = ENTRY_META[g.entry];
            const isSel = selected === g.id;
            return (
              <div key={g.id} onClick={() => setSelected(g.id)} style={{ padding: "12px 20px", cursor: "pointer", background: isSel ? "#141210" : "transparent", borderLeft: `2px solid ${isSel ? "#c8a84b" : "transparent"}`, borderBottom: "1px solid rgba(255,255,255,0.02)", display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "14px", fontWeight: 300, color: "#f4efe6", marginBottom: "3px", lineHeight: 1.2 }}>{g.name}</div>
                  <div style={{ fontSize: "10px", color: "#706860" }}>
                    {g.city}
                    <span style={{ margin: "0 5px", opacity: 0.3 }}>·</span>
                    <span style={{ color: entry.color }}>{entry.label}</span>
                    <span style={{ margin: "0 5px", opacity: 0.3 }}>·</span>
                    {TIER_LABELS[g.tier]}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "20px", color: scoreColor(g.score) }}>{g.score}%</div>
                  <div style={{ fontSize: "8px", color: "#504840", letterSpacing: "0.1em" }}>match</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail */}
        {sel && (
          <div style={{ overflowY: "auto", padding: "28px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#f4efe6", lineHeight: 1.1, marginBottom: "4px" }}>{sel.name}</div>
                <div style={{ fontSize: "11px", color: "#706860" }}>{sel.city}, {sel.country} · {TIER_LABELS[sel.tier]}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "20px" }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "52px", fontWeight: 300, color: scoreColor(sel.score), lineHeight: 1 }}>{sel.score}%</div>
                <div style={{ fontSize: "9px", color: "#504840", letterSpacing: "0.15em", textTransform: "uppercase" }}>match score</div>
              </div>
            </div>

            {/* Entry strategy — most important */}
            <div style={{ padding: "18px 20px", background: ENTRY_META[sel.entry].bg, border: `1px solid ${ENTRY_META[sel.entry].color}33`, marginBottom: "24px", marginTop: "16px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: ENTRY_META[sel.entry].color, marginBottom: "8px" }}>
                Entry Strategy · {ENTRY_META[sel.entry].label}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "15px", color: "#f4efe6", lineHeight: 1.7, fontStyle: "italic" }}>
                "{sel.entryNote}"
              </div>
            </div>

            {/* Why / Why not */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div style={{ padding: "16px", background: "rgba(105,123,108,0.07)", border: "1px solid rgba(105,123,108,0.15)" }}>
                <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#697b6c", marginBottom: "12px" }}>Why It Fits</div>
                {sel.reasons.length > 0 ? sel.reasons.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#a09890", lineHeight: 1.6, marginBottom: "7px" }}>
                    <span style={{ color: "#697b6c", flexShrink: 0 }}>✓</span>{r}
                  </div>
                )) : <div style={{ fontSize: "11px", color: "#504840" }}>No strong alignment signals</div>}
              </div>
              <div style={{ padding: "16px", background: "rgba(176,69,24,0.06)", border: "1px solid rgba(176,69,24,0.13)" }}>
                <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#b04518", marginBottom: "12px" }}>Watch Out For</div>
                {sel.warnings.length > 0 ? sel.warnings.map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#a09890", lineHeight: 1.6, marginBottom: "7px" }}>
                    <span style={{ color: "#b04518", flexShrink: 0 }}>!</span>{w}
                  </div>
                )) : <div style={{ fontSize: "11px", color: "#504840" }}>No major concerns</div>}
              </div>
            </div>

            {/* Gallery info */}
            <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.02)", borderLeft: "2px solid rgba(200,168,75,0.2)", marginBottom: "20px", fontFamily: "Georgia,serif", fontSize: "14px", color: "#a09890", lineHeight: 1.7, fontStyle: "italic" }}>
              {sel.about}
            </div>

            {/* Meta grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(200,168,75,0.06)", marginBottom: "20px" }}>
              {[
                ["Known Artists", sel.artists.join(", ")],
                ["Art Fairs", sel.fairPresence.length > 0 ? sel.fairPresence.join(", ") : "Limited fair presence"],
                ["Collector Base", sel.collectors],
                ["Open Submissions", sel.openSubmissions ? "Yes" : "No — referral preferred"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#0e0c0a", padding: "14px 16px" }}>
                  <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#504840", marginBottom: "5px" }}>{k}</div>
                  <div style={{ fontSize: "11px", color: "#a09890", lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Aesthetics */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#504840", marginBottom: "8px" }}>Programme Territory</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {sel.aesthetics.map(a => {
                  const isMatch = form.aesthetics.includes(a);
                  return <span key={a} style={{ padding: "3px 9px", background: isMatch ? "rgba(200,168,75,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${isMatch ? "rgba(200,168,75,0.3)" : "rgba(255,255,255,0.06)"}`, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: isMatch ? "#c8a84b" : "#504840" }}>{a}</span>;
                })}
              </div>
            </div>

            {/* Outreach template */}
            <div style={{ padding: "18px 20px", background: "rgba(200,168,75,0.04)", border: "1px solid rgba(200,168,75,0.13)" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a84b", marginBottom: "10px" }}>Outreach Template</div>
              <div style={{ fontSize: "11px", color: "#a09890", lineHeight: 1.8, fontFamily: "Georgia,serif", fontStyle: "italic" }}>
                "Dear [Director's name], I am a {form.disciplines.join("/")} artist based in [city], currently working on [brief project description]. My work deals with {form.aesthetics.slice(0,2).join(" and ") || "materiality and process"}, and I have been following {sel.name}'s programme with great interest — particularly [name a specific artist or show]. I would be grateful for the opportunity to share my portfolio. [One line on recent exhibition or institutional achievement.] I have attached selected work and my CV."
              </div>
              <div style={{ marginTop: "10px", fontSize: "9px", color: "#504840", letterSpacing: "0.1em" }}>Personalise every line. Generic emails are deleted immediately.</div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{ padding: "7px 28px", borderTop: "1px solid rgba(200,168,75,0.07)", display: "flex", gap: "20px", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#302820", flexShrink: 0 }}>
        {results && [["≥80%", results.filter(g=>g.score>=80).length, "#c8a84b"],["50–79%", results.filter(g=>g.score>=50&&g.score<80).length, "#706860"],["<50%", results.filter(g=>g.score<50).length, "#302820"]].map(([l,n,c])=>(
          <span key={l} style={{ color: c }}>{n} {l} match</span>
        ))}
        <span style={{ marginLeft: "auto" }}>◉ {GALLERIES.length} galleries in database</span>
      </div>
    </div>
  );
}
