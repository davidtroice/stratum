import { useState } from "react";

const B = {
  bg:"#f2f2f0", bg2:"#e8e8e5", bg3:"#ffffff",
  ink:"#1a1a18", ink2:"#2e2e2c", mid:"#6b6b68", muted:"#9a9a96",
  border:"rgba(26,26,24,0.1)", borderStrong:"rgba(26,26,24,0.18)",
  gold:"#c8a84b", rust:"#c04020", sage:"#4a7a5a", blue:"#3a6090",
};

const GALLERIES = [
  // ── MEXICO ──
  { id:101, name:"Galería OMR", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:4,
    disciplines:["painting","sculpture","installation","video","photography"],
    aesthetics:["Latin American","political","conceptual","material","identity","landscape"],
    levels:[3,4],
    about:"Una de las galerías más importantes de América Latina. Programa conceptual y políticamente comprometido con proyección internacional. Presencia regular en Art Basel y Frieze.",
    artists:["Minerva Cuevas","Francis Alÿs","Daniel Guzmán"],
    entry:"submission", entryNote:"Acepta propuestas. La conexión latinoamericana o la práctica en español es una ventaja. Buen punto de entrada al mercado latinoamericano.",
    openSubmissions:true, fairPresence:["Art Basel","Frieze","ZONAMACO"], collectors:"Coleccionistas latinoamericanos e internacionales",
    url:"https://galeria-omr.com" },

  { id:102, name:"Proyectos Monclova", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:3,
    disciplines:["painting","sculpture","installation","video","photography"],
    aesthetics:["conceptual","Latin American","material","political","emerging","identity"],
    levels:[3,4],
    about:"Galería dinámica en CDMX con fuertes conexiones internacionales. Conocida por impulsar artistas jóvenes con prácticas conceptuales y políticamente comprometidas.",
    artists:["Bárbara Sánchez-Kane","Daniel Guzmán","Yoshua Okón"],
    entry:"referral", entryNote:"Se prefiere referencia. Vale la pena si tienes conexiones institucionales latinoamericanas o has expuesto en México.",
    openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO"], collectors:"Coleccionistas mexicanos e internacionales",
    url:"https://proyectosmonclova.com" },

  { id:103, name:"Labor", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:3,
    disciplines:["painting","installation","video","sculpture","photography"],
    aesthetics:["conceptual","experimental","political","Latin American","process","material"],
    levels:[3,4],
    about:"Una de las galerías más importantes de México, con presencia creciente en ferias internacionales. Programa riguroso y comprometido con la escena latinoamericana contemporánea.",
    artists:["Gabriel Kuri","Stefan Brüggemann","Damián Ortega"],
    entry:"referral", entryNote:"Principalmente por referencia o acercamiento tras exposiciones institucionales. Conexión sólida con la escena de CDMX es necesaria.",
    openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO","Untitled"], collectors:"Coleccionistas mexicanos, latinoamericanos e internacionales",
    url:"https://labor.org.mx" },

  { id:104, name:"Hilario Galguera", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:3,
    disciplines:["painting","sculpture","installation","video"],
    aesthetics:["contemporary","Latin American","figurative","abstraction","material","market"],
    levels:[3,4,5],
    about:"Galería comercial establecida en CDMX con amplia presencia en ferias. Mezcla artistas mexicanos consolidados con nombres internacionales emergentes.",
    artists:["Damien Hirst","John Currin","Shinique Smith"],
    entry:"submission", entryNote:"Acepta portafolios. Buscan artistas con mercado establecido o proyección comercial clara. Incluye historial de ventas si aplica.",
    openSubmissions:true, fairPresence:["ZONAMACO","Art Basel Miami"], collectors:"Coleccionistas privados mexicanos y latinoamericanos",
    url:"https://hilariogalguera.com" },

  { id:105, name:"Kurimanzutto", city:"Ciudad de México / New York", country:"Mexico/USA", region:"mexico", tier:5,
    disciplines:["all"],
    aesthetics:["conceptual","Latin American","political","identity","post-colonial","material","landscape"],
    levels:[4,5],
    about:"La galería mexicana más influyente a nivel mundial. Representa a algunos de los artistas latinoamericanos más importantes internacionalmente. Acceso muy difícil.",
    artists:["Gabriel Orozco","Tino Sehgal","Rirkrit Tiravanija"],
    entry:"referral", entryNote:"Solo por referencia o invitación directa. Requiere carrera institucional consolidada a nivel internacional. Biennial-level y museum shows son prerequisito.",
    openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO"], collectors:"Museos e instituciones globales",
    url:"https://kurimanzutto.com" },

  { id:106, name:"Casa Maauad", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:2,
    disciplines:["painting","drawing","sculpture","photography"],
    aesthetics:["emerging","contemporary","Mexican","figurative","material","young"],
    levels:[2,3],
    about:"Espacio accesible para artistas emergentes en CDMX. Apoya a nuevas voces del arte mexicano con un programa dinámico y abierto.",
    artists:["Programa emergente"],
    entry:"open-call", entryNote:"Programa abierto y accesible. Buen primer paso en el circuito comercial de CDMX. Convocatorias periódicas.",
    openSubmissions:true, fairPresence:["Salón ACME","ZONAMACO Sur"], collectors:"Coleccionistas emergentes mexicanos",
    url:"https://casamaauad.com" },

  { id:107, name:"Arróniz Arte Contemporáneo", city:"Ciudad de México", country:"Mexico", region:"mexico", tier:2,
    disciplines:["painting","drawing","sculpture","photography","installation"],
    aesthetics:["emerging","contemporary","Mexican","figurative","abstraction","young"],
    levels:[2,3],
    about:"Galería con enfoque en artistas mexicanos emergentes y mid-career. Ambiente accesible con coleccionismo activo en CDMX.",
    artists:["Programa mexicano emergente"],
    entry:"submission", entryNote:"Acepta portafolios de artistas mexicanos o residentes en México. Incluye CV, statement y documentación fotográfica de obra reciente.",
    openSubmissions:true, fairPresence:["ZONAMACO Sur","Salón ACME"], collectors:"Coleccionistas privados de CDMX",
    url:"https://arroniz.art" },

  // ── LATIN AMERICA ──
  { id:201, name:"Galería Luisa Strina", city:"São Paulo", country:"Brasil", region:"latin-america", tier:4,
    disciplines:["painting","sculpture","installation","video","photography"],
    aesthetics:["conceptual","Latin American","political","material","Brazilian","identity"],
    levels:[3,4,5],
    about:"Una de las galerías más importantes de Brasil y América Latina. Programa riguroso con fuerte presencia en Art Basel y Frieze.",
    artists:["Cildo Meireles","Adriana Varejão","Tunga"],
    entry:"referral", entryNote:"Principalmente por referencia. Conexión brasileña o latinoamericana muy relevante. Requiere historial institucional sólido.",
    openSubmissions:false, fairPresence:["Art Basel","Frieze","SP-Arte"], collectors:"Instituciones y coleccionistas latinoamericanos internacionales",
    url:"https://galeriastrina.com.br" },

  { id:202, name:"Vermelho", city:"São Paulo", country:"Brasil", region:"latin-america", tier:3,
    disciplines:["painting","installation","video","photography","sculpture"],
    aesthetics:["conceptual","Brazilian","experimental","political","material","process"],
    levels:[3,4],
    about:"Galería brasileña con enfoque en prácticas experimentales y conceptuales. Fuerte en el ecosistema de São Paulo con presencia internacional creciente.",
    artists:["Assume Vivid Astro Focus","Marepe"],
    entry:"submission", entryNote:"Acepta propuestas con historial institucional relevante. Conexión con la escena brasileña o latinoamericana es importante.",
    openSubmissions:true, fairPresence:["SP-Arte","Art Basel"], collectors:"Coleccionistas brasileños e internacionales",
    url:"https://galeriavermelho.com.br" },

  { id:203, name:"Galería del Paseo", city:"Montevideo / Punta del Este", country:"Uruguay", region:"latin-america", tier:3,
    disciplines:["painting","drawing","sculpture","photography"],
    aesthetics:["Latin American","figurative","abstraction","material","landscape","market"],
    levels:[3,4],
    about:"Galería referente en el Río de la Plata con coleccionismo activo en Uruguay y Argentina. Programa con artistas latinoamericanos consolidados.",
    artists:["Carlos Páez Vilaró","Pablo Atchugarry"],
    entry:"submission", entryNote:"Acepta portafolios. Útil si tienes conexión con el mercado rioplatense o coleccionistas en la región.",
    openSubmissions:true, fairPresence:["ZONAMACO","ArteBA"], collectors:"Coleccionistas uruguayos, argentinos e internacionales",
    url:"https://galeriادelpaseo.com" },

  { id:204, name:"Ruth Benzacar", city:"Buenos Aires", country:"Argentina", region:"latin-america", tier:3,
    disciplines:["painting","installation","video","sculpture","photography"],
    aesthetics:["conceptual","Argentine","Latin American","political","material","experimental"],
    levels:[3,4],
    about:"La galería más importante de Argentina con décadas de historia en el arte contemporáneo latinoamericano. Conexiones internacionales sólidas.",
    artists:["León Ferrari","Nicola Constantino"],
    entry:"referral", entryNote:"Preferencia por referencia. Conexión argentina o latinoamericana importante. Requiere trayectoria institucional.",
    openSubmissions:false, fairPresence:["Art Basel","Frieze","ArteBA"], collectors:"Coleccionistas argentinos y latinoamericanos",
    url:"https://ruthbenzacar.com" },

  // ── EUROPE / INTERNATIONAL (key ones) ──
  { id:1, name:"Sadie Coles HQ", city:"London", country:"UK", region:"europe", tier:4,
    disciplines:["painting","sculpture","installation","video","photography"],
    aesthetics:["conceptual","figurative","material","political","body","identity","feminist"],
    levels:[4,5],
    about:"One of London's most respected galleries. Conceptually rigorous, often politically engaged programme with strong institutional connections globally.",
    artists:["Sarah Lucas","Luc Tuymans","Matthew Barney"],
    entry:"referral", entryNote:"Rarely accepts unsolicited submissions. Best approached through a mutual artist, curator, or after a significant institutional show.",
    openSubmissions:false, fairPresence:["Frieze London","Art Basel","Frieze Masters"], collectors:"Institutional, major private",
    url:"https://sadiecoles.com" },

  { id:2, name:"Galerie Chantal Crousel", city:"Paris", country:"France", region:"europe", tier:5,
    disciplines:["installation","video","sculpture","painting"],
    aesthetics:["conceptual","political","post-colonial","memory","archive","materiality"],
    levels:[4,5],
    about:"Leading Paris gallery championing artists with rigorous conceptual practices and international institutional profiles.",
    artists:["Danh Vo","Hassan Khan","Natascha Sadr Haghighian"],
    entry:"referral", entryNote:"Invitation and referral only. Approach after museum-level shows in Europe.",
    openSubmissions:false, fairPresence:["Art Basel","FIAC","Frieze London"], collectors:"Museum, major institutional",
    url:"https://crousel.com" },

  { id:3, name:"Studio Voltaire", city:"London", country:"UK", region:"europe", tier:3,
    disciplines:["all"],
    aesthetics:["experimental","emerging","community","social practice","identity"],
    levels:[2,3],
    about:"Non-profit gallery supporting emerging and mid-career artists. Strong emphasis on community, risk-taking, and underrepresented voices.",
    artists:["Open programme"],
    entry:"open-call", entryNote:"Regular open calls for exhibitions and residencies. One of the most accessible quality spaces in London.",
    openSubmissions:true, fairPresence:[], collectors:"Emerging collectors, institutions",
    url:"https://studiovoltaire.org" },

  { id:4, name:"Carlos/Ishikawa", city:"London", country:"UK", region:"europe", tier:3,
    disciplines:["painting","sculpture","installation","video"],
    aesthetics:["emerging","experimental","queer","political","material","young"],
    levels:[2,3],
    about:"One of London's most exciting younger commercial galleries. Champions emerging artists with adventurous, often political practices.",
    artists:["Cecilia Vicuña","Dozie Kanu"],
    entry:"submission", entryNote:"More open than most commercial galleries. Best with a strong body of recent work and some exhibition history.",
    openSubmissions:true, fairPresence:["Frieze London","LISTE","Untitled Art Fair"], collectors:"Younger collectors, emerging institutions",
    url:"https://carlosishikawa.com" },

  { id:5, name:"Galerie Peter Kilchmann", city:"Zurich / Paris", country:"Switzerland", region:"europe", tier:3,
    disciplines:["painting","sculpture","installation","photography","video"],
    aesthetics:["Latin American","European","conceptual","political","material","social"],
    levels:[3,4],
    about:"Zurich gallery with long history championing Latin American and European artists. Strong politically engaged programme. Great bridge for LATAM artists into Europe.",
    artists:["Enrique Metinides","Carlos Garaicoa"],
    entry:"submission", entryNote:"Accepts portfolio submissions. Latin American connection or strong politically engaged practice is highly relevant.",
    openSubmissions:true, fairPresence:["Art Basel","FIAC","ZONAMACO"], collectors:"Swiss and Latin American collectors",
    url:"https://peterkilchmann.com" },

  { id:6, name:"GRIMM Gallery", city:"Amsterdam / New York", country:"Netherlands/USA", region:"europe", tier:3,
    disciplines:["painting","drawing","sculpture"],
    aesthetics:["painting","figurative","material","process","European","representation"],
    levels:[3,4],
    about:"Strong mid-size gallery with Amsterdam and New York presence. Rigorous painting and drawing programme.",
    artists:["Mernet Larsen","Erik Thor Sandberg"],
    entry:"submission", entryNote:"Accepts submissions. Portfolio should emphasise exhibition history. Strong painting practice required.",
    openSubmissions:true, fairPresence:["Art Basel","NADA","Untitled Art Fair"], collectors:"Dutch, American and European private collectors",
    url:"https://grimmgallery.com" },

  { id:7, name:"Copperfield Gallery", city:"London", country:"UK", region:"europe", tier:2,
    disciplines:["painting","drawing","sculpture","installation"],
    aesthetics:["emerging","painting","material","British","process","young"],
    levels:[2,3],
    about:"East London gallery focused on emerging and mid-career artists. Accessible approach and active open submissions.",
    artists:["Open programme"],
    entry:"submission", entryNote:"Actively accepts portfolio submissions from emerging artists. Good first commercial gallery. Include strong documentation.",
    openSubmissions:true, fairPresence:["London Art Fair","Condo"], collectors:"London emerging collectors",
    url:"https://copperfieldgallery.com" },

  { id:8, name:"Galerie Eigen + Art", city:"Leipzig / Berlin", country:"Germany", region:"europe", tier:3,
    disciplines:["painting","drawing","sculpture","video"],
    aesthetics:["painting","German","Leipzig School","figuration","material","expression"],
    levels:[3,4],
    about:"Legendary Leipzig gallery. Key destination for German painting and figuration internationally.",
    artists:["Neo Rauch","Christoph Ruckhäberle"],
    entry:"submission", entryNote:"Accepts submissions. Strong painting practice is essential. German connection or figurative/material painting highly relevant.",
    openSubmissions:true, fairPresence:["Art Basel","Frieze","The Armory Show"], collectors:"German and international painting collectors",
    url:"https://eigen-art.com" },
];

const DISCIPLINES = ["Painting","Drawing","Sculpture","Installation","Photography","Video"];
const AESTHETICS_OPTIONS = ["conceptual","material","landscape","figurative","political","abstraction","process","identity","archive","memory","body","feminist","queer","post-colonial","Latin American","emerging","experimental","social practice"];

function calcMatch(gallery, form) {
  let score = 0, reasons = [], warnings = [];

  const discLower = form.disciplines.map(d => d.toLowerCase());
  const gallDiscLower = gallery.disciplines.map(d => d.toLowerCase());
  const discMatch = discLower.some(d => gallDiscLower.includes(d) || gallDiscLower.includes("all"));
  if (discMatch) { score += 30; reasons.push("Your discipline aligns with their programme"); }
  else { warnings.push("Discipline mismatch — they rarely show this medium"); }

  const level = parseInt(form.level);
  if (gallery.levels.includes(level)) { score += 25; reasons.push(`Gallery actively represents Level ${level} artists`); }
  else if (gallery.levels.includes(level + 1)) { score += 12; reasons.push("You're approaching their entry level — apply in 1–2 years"); }
  else if (gallery.levels.includes(level - 1)) { score += 8; warnings.push("You may be slightly overqualified for their current roster"); }
  else { warnings.push("Career stage mismatch with their programme"); }

  if (form.aesthetics.length > 0) {
    const shared = form.aesthetics.filter(a => gallery.aesthetics.includes(a));
    score += Math.min(30, shared.length * 10);
    if (shared.length >= 3) reasons.push(`Strong conceptual alignment: ${shared.slice(0,3).join(", ")}`);
    else if (shared.length >= 1) reasons.push(`Some aesthetic overlap: ${shared.join(", ")}`);
    else warnings.push("Limited conceptual overlap with their programme");
  }

  const regionMap = {
    mexico: ["Mexico"],
    "latin-america": ["Mexico","Brasil","Argentina","Uruguay","Colombia"],
    europe: ["UK","France","Germany","Spain","Italy","Netherlands","Switzerland","Denmark","Sweden"],
    americas: ["Mexico","USA","Brasil","Argentina"],
    international: [],
  };
  const relevantCountries = regionMap[form.region] || [];
  const geoMatch = relevantCountries.length === 0 || relevantCountries.some(c => gallery.country.includes(c)) || gallery.region === form.region;
  if (geoMatch) { score += 15; reasons.push("Geographic match strengthens the relationship"); }

  return { score: Math.min(100, score), reasons, warnings };
}

const ENTRY_META = {
  "referral":   { label:"Referral Only",   color:"#c04020", bg:"rgba(192,64,32,0.08)" },
  "submission": { label:"Open Submission", color:"#c8a84b", bg:"rgba(200,168,75,0.08)" },
  "open-call":  { label:"Open Call",       color:"#4a7a5a", bg:"rgba(74,122,90,0.08)" },
};
const TIER_LABELS = { 2:"Entry Commercial", 3:"Mid-Tier", 4:"Top-Tier", 5:"Blue-Chip" };
const REGION_LABELS = { "mexico":"México 🇲🇽", "latin-america":"Latin America", "europe":"Europe", "americas":"Americas", "international":"International" };

export default function GalleryMatcher() {
  const [form, setForm] = useState({ disciplines:[], aesthetics:[], level:"3", region:"mexico", statement:"" });
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("input");

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
  const scoreColor = (s) => s >= 80 ? B.gold : s >= 55 ? B.mid : s >= 35 ? B.muted : "#ccc";

  const Chip = ({ active, onClick, children, accent = B.gold }) => (
    <button onClick={onClick} style={{ padding:"5px 12px", border:`1px solid ${active ? accent : B.borderStrong}`, background: active ? accent : "transparent", color: active ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.1em", cursor:"pointer", transition:"all 0.15s" }}>
      {children}
    </button>
  );

  const Label = ({ children }) => (
    <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"10px", fontWeight:500 }}>{children}</div>
  );

  // INPUT VIEW
  if (view === "input") return (
    <div style={{ background:B.bg, color:B.ink, fontFamily:"monospace", minHeight:"100vh", paddingTop:"52px" }}>
      <div style={{ padding:"20px 32px", borderBottom:`1px solid ${B.border}`, background:B.bg3 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
          <span style={{ fontFamily:"monospace", fontSize:"10px", color:B.muted, marginLeft:"10px" }}>/ Gallery Matching System</span>
        </div>
      </div>

      <div style={{ maxWidth:"640px", margin:"0 auto", padding:"48px 32px", width:"100%" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:400, fontStyle:"italic", color:B.ink, marginBottom:"8px" }}>Find your galleries.</div>
        <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.7, marginBottom:"48px" }}>
          Tell us about your practice. We'll match you to galleries whose programme, roster, and aesthetic territory align with your work — and tell you exactly how to approach each one.
        </div>

        {/* Career Level */}
        <div style={{ marginBottom:"32px" }}>
          <Label>Your Career Level</Label>
          <div style={{ display:"flex", gap:"6px" }}>
            {[["1","Foundation"],["2","Local Presence"],["3","Emerging Voice"],["4","Market Artist"],["5","Institutional"]].map(([v,l]) => (
              <button key={v} onClick={() => setForm(f => ({ ...f, level:v }))} style={{ flex:1, padding:"10px 4px", border:`1.5px solid ${form.level===v ? B.gold : B.border}`, background: form.level===v ? B.gold : B.bg, color: form.level===v ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", textAlign:"center", lineHeight:1.4 }}>
                <div style={{ fontSize:"16px", fontFamily:"'Cormorant Garamond',serif", display:"block", marginBottom:"3px" }}>{v}</div>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div style={{ marginBottom:"32px" }}>
          <Label>Geographic Focus</Label>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {Object.entries(REGION_LABELS).map(([v,l]) => (
              <Chip key={v} active={form.region===v} onClick={() => setForm(f => ({ ...f, region:v }))} accent={v==="mexico" ? B.rust : B.blue}>{l}</Chip>
            ))}
          </div>
        </div>

        {/* Disciplines */}
        <div style={{ marginBottom:"32px" }}>
          <Label>Primary Discipline(s)</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {DISCIPLINES.map(d => <Chip key={d} active={form.disciplines.includes(d)} onClick={() => toggleItem("disciplines",d)}>{d}</Chip>)}
          </div>
        </div>

        {/* Aesthetics */}
        <div style={{ marginBottom:"32px" }}>
          <Label>Conceptual & Aesthetic Territory — select all that apply</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {AESTHETICS_OPTIONS.map(a => <Chip key={a} active={form.aesthetics.includes(a)} onClick={() => toggleItem("aesthetics",a)} accent={B.sage}>{a}</Chip>)}
          </div>
        </div>

        {/* Statement */}
        <div style={{ marginBottom:"40px" }}>
          <Label>Artist Statement (optional — improves matching)</Label>
          <textarea value={form.statement} onChange={e => setForm(f => ({ ...f, statement:e.target.value }))} rows={4} placeholder="Paste a few sentences about your practice..." style={{ width:"100%", background:B.bg3, border:`1px solid ${B.border}`, color:B.ink, fontFamily:"monospace", fontSize:"12px", padding:"12px 14px", outline:"none", resize:"vertical", lineHeight:1.6 }} />
        </div>

        <button onClick={runMatch} disabled={form.disciplines.length===0} style={{ width:"100%", padding:"18px", background: form.disciplines.length>0 ? B.gold : B.bg2, border: form.disciplines.length>0 ? "none" : `1px solid ${B.border}`, color: form.disciplines.length>0 ? "#fff" : B.muted, fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", cursor: form.disciplines.length>0 ? "pointer" : "not-allowed" }}>
          Match My Practice to Galleries →
        </button>
      </div>
    </div>
  );

  // RESULTS VIEW
  return (
    <div style={{ background:B.bg, color:B.ink, fontFamily:"monospace", minHeight:"100vh", paddingTop:"52px" }}>
      <div style={{ padding:"14px 28px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:B.bg3 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
          <span style={{ fontFamily:"monospace", fontSize:"10px", color:B.muted, marginLeft:"10px" }}>/ Gallery Matches · Level {form.level} · {form.disciplines.join(", ")} · {REGION_LABELS[form.region]}</span>
        </div>
        <button onClick={() => { setView("input"); setResults(null); }} style={{ background:"transparent", border:`1px solid ${B.borderStrong}`, color:B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:"6px 14px", cursor:"pointer" }}>
          ← Refine
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr" }}>

        {/* Gallery list */}
        <div style={{ borderRight:`1px solid ${B.border}`, minHeight:"calc(100vh - 100px)", background:B.bg2 }}>
          <div style={{ padding:"10px 20px 6px", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:B.muted }}>
            {results.length} galleries ranked
          </div>
          {results.map((g) => {
            const entry = ENTRY_META[g.entry];
            const isSel = selected === g.id;
            return (
              <div key={g.id} onClick={() => setSelected(g.id)} style={{ padding:"12px 20px", cursor:"pointer", background: isSel ? B.bg3 : "transparent", borderLeft:`3px solid ${isSel ? B.gold : "transparent"}`, borderBottom:`1px solid ${B.border}`, display:"grid", gridTemplateColumns:"1fr auto", gap:"10px", alignItems:"center", transition:"all 0.15s" }}>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", fontWeight:400, color:B.ink, marginBottom:"3px", lineHeight:1.2 }}>{g.name}</div>
                  <div style={{ fontSize:"10px", color:B.muted }}>
                    {g.city}
                    <span style={{ margin:"0 5px", opacity:0.3 }}>·</span>
                    <span style={{ color:entry.color, fontWeight:500 }}>{entry.label}</span>
                    <span style={{ margin:"0 5px", opacity:0.3 }}>·</span>
                    {TIER_LABELS[g.tier]}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:scoreColor(g.score) }}>{g.score}%</div>
                  <div style={{ fontSize:"8px", color:B.muted, letterSpacing:"0.1em" }}>match</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {sel && (
          <div style={{ padding:"28px 36px", background:B.bg3 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"6px" }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:400, fontStyle:"italic", color:B.ink, lineHeight:1.1, marginBottom:"4px" }}>{sel.name}</div>
                <div style={{ fontSize:"11px", color:B.muted }}>{sel.city}, {sel.country} · {TIER_LABELS[sel.tier]}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0, marginLeft:"20px" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", fontWeight:300, color:scoreColor(sel.score), lineHeight:1 }}>{sel.score}%</div>
                <div style={{ fontSize:"9px", color:B.muted, letterSpacing:"0.15em", textTransform:"uppercase" }}>match score</div>
              </div>
            </div>

            {/* Entry strategy */}
            <div style={{ padding:"18px 20px", background:ENTRY_META[sel.entry].bg, border:`1px solid ${ENTRY_META[sel.entry].color}33`, marginBottom:"20px", marginTop:"16px" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:ENTRY_META[sel.entry].color, marginBottom:"8px", fontWeight:500 }}>
                Entry Strategy · {ENTRY_META[sel.entry].label}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:B.ink, lineHeight:1.7, fontStyle:"italic" }}>
                "{sel.entryNote}"
              </div>
            </div>

            {/* Why / Why not */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
              <div style={{ padding:"16px", background:"rgba(74,122,90,0.06)", border:"1px solid rgba(74,122,90,0.15)" }}>
                <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:B.sage, marginBottom:"12px", fontWeight:500 }}>Why It Fits</div>
                {sel.reasons.length > 0 ? sel.reasons.map((r,i) => (
                  <div key={i} style={{ display:"flex", gap:"8px", fontSize:"11px", color:B.mid, lineHeight:1.6, marginBottom:"7px" }}>
                    <span style={{ color:B.sage, flexShrink:0 }}>✓</span>{r}
                  </div>
                )) : <div style={{ fontSize:"11px", color:B.muted }}>No strong alignment signals</div>}
              </div>
              <div style={{ padding:"16px", background:"rgba(192,64,32,0.05)", border:"1px solid rgba(192,64,32,0.13)" }}>
                <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:B.rust, marginBottom:"12px", fontWeight:500 }}>Watch Out For</div>
                {sel.warnings.length > 0 ? sel.warnings.map((w,i) => (
                  <div key={i} style={{ display:"flex", gap:"8px", fontSize:"11px", color:B.mid, lineHeight:1.6, marginBottom:"7px" }}>
                    <span style={{ color:B.rust, flexShrink:0 }}>!</span>{w}
                  </div>
                )) : <div style={{ fontSize:"11px", color:B.muted }}>No major concerns</div>}
              </div>
            </div>

            {/* About */}
            <div style={{ padding:"16px 18px", background:B.bg, borderLeft:`3px solid ${B.gold}`, marginBottom:"20px", fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", color:B.mid, lineHeight:1.7, fontStyle:"italic" }}>
              {sel.about}
            </div>

            {/* Meta grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:B.border, marginBottom:"20px" }}>
              {[
                ["Known Artists", sel.artists.join(", ")],
                ["Art Fairs", sel.fairPresence.length > 0 ? sel.fairPresence.join(", ") : "Limited fair presence"],
                ["Collector Base", sel.collectors],
                ["Open Submissions", sel.openSubmissions ? "Yes" : "No — referral preferred"],
              ].map(([k,v]) => (
                <div key={k} style={{ background:B.bg3, padding:"14px 16px" }}>
                  <div style={{ fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase", color:B.muted, marginBottom:"5px" }}>{k}</div>
                  <div style={{ fontSize:"11px", color:B.ink, lineHeight:1.5 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Aesthetics */}
            <div style={{ marginBottom:"20px" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:B.muted, marginBottom:"8px", fontWeight:500 }}>Programme Territory</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                {sel.aesthetics.map(a => {
                  const isMatch = form.aesthetics.includes(a);
                  return <span key={a} style={{ padding:"3px 9px", background: isMatch ? "rgba(200,168,75,0.1)" : B.bg2, border:`1px solid ${isMatch ? B.gold+"50" : B.border}`, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color: isMatch ? B.gold : B.muted }}>{a}</span>;
                })}
              </div>
            </div>

            {/* Outreach template */}
            <div style={{ padding:"18px 20px", background:"rgba(200,168,75,0.05)", border:`1px solid ${B.gold}25` }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:B.gold, marginBottom:"10px", fontWeight:500 }}>Outreach Template</div>
              <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.8, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>
                "Dear [Director's name], I am a {form.disciplines.join("/")} artist based in [city], currently working on [brief project description]. My work deals with {form.aesthetics.slice(0,2).join(" and ") || "materiality and process"}, and I have been following {sel.name}'s programme with great interest — particularly [name a specific artist or show]. I would be grateful for the opportunity to share my portfolio. [One line on recent exhibition or institutional achievement.] I have attached selected work and my CV."
              </div>
              <div style={{ marginTop:"10px", fontSize:"9px", color:B.muted, letterSpacing:"0.1em" }}>Personalise every line. Generic emails are deleted immediately.</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding:"7px 28px", borderTop:`1px solid ${B.border}`, display:"flex", gap:"20px", fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", color:B.muted, background:B.bg2 }}>
        {results && [["≥80%", results.filter(g=>g.score>=80).length, B.gold],["50–79%", results.filter(g=>g.score>=50&&g.score<80).length, B.mid],["<50%", results.filter(g=>g.score<50).length, B.muted]].map(([l,n,c])=>(
          <span key={l} style={{ color:c }}>{n} {l} match</span>
        ))}
        <span style={{ marginLeft:"auto" }}>◉ {GALLERIES.length} galleries in database</span>
      </div>
    </div>
  );
}
