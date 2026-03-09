import { useState } from "react";

const D = {
  black:"#ffffff", dark:"#f7f6f2", dark2:"#eeece8", dark3:"#e4e2dd",
  white:"#0a0a0a", accent:"#1a1a1a", accentD:"#333333",
  mid:"#555552", muted:"#888884", border:"rgba(10,10,10,0.1)", borderMed:"rgba(10,10,10,0.2)",
  accent:"#e0ddd8", accentD:"#c0bdb8",
};

const PRESETS = {
  emerging: {
    disciplines:["Painting"], years:"2", solo:"0", group:"1-5", venue:"artist-run",
    press:"none", gallery:"none", income:"under-10k",
    statement:"My paintings investigate the emotional residue of domestic spaces — the way light falls on worn furniture, the marks left by ordinary life. Working in oil on linen, I build surfaces slowly, layering and removing until the image feels both present and disappearing.",
    cv:"BFA Goldsmiths 2023. Two group shows in London artist-run spaces. Selected for a graduate residency 2024."
  },
  midcareer: {
    disciplines:["Painting","Sculpture"], years:"8", solo:"3-7", group:"6-20", venue:"commercial-gallery",
    press:"local", gallery:"none", income:"10-50k",
    statement:"My work explores the tension between memory and materiality — how physical surfaces accumulate history while simultaneously erasing it. Working primarily in oil and mixed media, I build up and scrape back layers to create surfaces that feel both geological and intimate.",
    cv:"Solo shows at Galería Espacio in Madrid and Studio Voltaire, London. Group shows at CRAC Alsace, Camden Arts Centre. Residency at Hangar Barcelona 2022."
  },
  established: {
    disciplines:["Installation","Video"], years:"18", solo:"8+", group:"20+", venue:"non-profit",
    press:"national", gallery:"one", income:"50-150k",
    statement:"My installations and video works occupy the threshold between documentary and fiction — using found footage, testimony, and architectural intervention to examine how collective memory is constructed and contested.",
    cv:"Represented by Galerie Chantal Crousel, Paris. Solo shows at Kunsthalle Wien, MACBA Barcelona. Group shows: Liverpool Biennial, Manifesta 13. Works in collections of Tate Modern."
  }
};

const DISCIPLINES = ["Painting","Drawing","Sculpture","Installation","Photography","Video"];
const LC = { 1:"#606060", 2:"#787878", 3:"#909090", 4:"#b0b0b0", 5:"#e0ddd8" };
const LOADING_STEPS = ["Reading exhibition signals","Evaluating artist statement","Calculating career level","Identifying strengths & gaps","Generating missions","Mapping your roadmap"];

const inp = { width:"100%", background:"rgba(10,10,10,0.04)", border:"1px solid rgba(10,10,10,0.12)", color:D.white, fontFamily:"monospace", fontSize:"12px", padding:"10px 12px", outline:"none", borderRadius:"4px" };
const lbl = { display:"block", fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:D.mid, marginBottom:"8px" };

export default function Assessment({ isPro=false, canRun=true, assessCount=0, onRun, onUpgrade, lang="en" }) {
  const T = lang==="es" ? {
    engine:"Motor de Evaluación IA", discipline:"Disciplina", years:"Años Activo/a", solo:"Exposiciones Individuales",
    group:"Exposiciones Colectivas", venue:"Lugar Más Alto", press:"Cobertura de Prensa", gallery:"Representación",
    income:"Ingresos Anuales por Arte", statement:"Declaración de Artista", cv:"Notas de CV",
    runBtn:"Evaluar mi Carrera →", upgradeBtn:"Actualizar para Evaluaciones Ilimitadas →",
    freeUsed:"Evaluación gratuita usada — actualiza para más", loadMsg:"Cargando evaluación...",
    strengths:"Fortalezas", gaps:"Brechas Críticas", statAnalysis:"Análisis del Statement",
    missions:"Tus Misiones", toReach:"Para Llegar al Nivel", placeholder:"Describe tu práctica artística..."
  } : {
    engine:"AI Assessment Engine", discipline:T.discipline, years:"Years Active", solo:"Solo Exhibitions",
    group:"Group Exhibitions", venue:"Highest Venue", press:"Press Coverage", gallery:"Gallery Representation",
    income:"Annual Art Income", statement:"Artist Statement", cv:"CV Notes",
    runBtn:T.runBtn, upgradeBtn:T.upgradeBtn,
    freeUsed:"Free assessment used — upgrade for unlimited", loadMsg:"Running assessment...",
    strengths:T.strengths, gaps:T.gaps, statAnalysis:"Statement Analysis",
    missions:T.missions, toReach:"To Reach Level", placeholder:"Describe your artistic practice..."
  };
  const [form, setForm] = useState({ disciplines:[], years:"", solo:"", group:"", venue:"", press:"", gallery:"", income:"", statement:"", cv:"" });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const loadPreset = k => { const p=PRESETS[k]; setForm({disciplines:[...p.disciplines],years:p.years,solo:p.solo,group:p.group,venue:p.venue,press:p.press,gallery:p.gallery,income:p.income,statement:p.statement,cv:p.cv}); setResult(null); setError(""); };
  const toggleD = d => setForm(f=>({...f,disciplines:f.disciplines.includes(d)?f.disciplines.filter(x=>x!==d):[...f.disciplines,d]}));

  const run = async () => {
    if (!canRun) { onUpgrade&&onUpgrade(); return; }
    if (!form.statement.trim()) { setError("Please add your artist statement."); return; }
    if (!form.disciplines.length) { setError("Please select at least one discipline."); return; }
    onRun&&onRun(); setError(""); setLoading(true); setResult(null); setLoadingStep(0);
    const interval = setInterval(()=>setLoadingStep(s=>Math.min(s+1,LOADING_STEPS.length-1)),700);
    const prompt = `Assess this artist's career and return a JSON profile.\n\nARTIST DATA:\n- Disciplines: ${form.disciplines.join(", ")}\n- Years active: ${form.years||"unspecified"}\n- Solo exhibitions: ${form.solo||"unspecified"}\n- Group exhibitions: ${form.group||"unspecified"}\n- Highest venue: ${form.venue||"unspecified"}\n- Press: ${form.press||"unspecified"}\n- Gallery representation: ${form.gallery||"unspecified"}\n- Annual income: ${form.income||"unspecified"}\n- Statement: "${form.statement}"\n- CV notes: "${form.cv||"none"}"\n\nTHE 5 STRATUM LEVELS:\n1="The Foundation" 2="The Local Presence" 3="The Emerging Voice" 4="The Market Artist" 5="The Institutional Artist"\n\nReturn ONLY valid JSON:\n{"level":<1-5>,"level_name":"<n>","level_subtitle":"<10 word description>","level_summary":"<2 sentences>","scores":{"exhibition":<0-100>,"statement":<0-100>,"market":<0-100>,"visibility":<0-100>},"strengths":[{"text":"<s>"},{"text":"<s>"},{"text":"<s>"}],"gaps":[{"text":"<g>"},{"text":"<g>"},{"text":"<g>"}],"statement_critique":{"overall":"<one sentence>","good":["<what works>","<what works>"],"improve":["<improve>","<improve>"]},"missions":[{"priority":"high","type":"<type>","title":"<title>","rationale":"<1-2 sentences>","xp":<100-400>},{"priority":"high","type":"<type>","title":"<title>","rationale":"<1-2 sentences>","xp":<100-400>},{"priority":"med","type":"<type>","title":"<title>","rationale":"<1-2 sentences>","xp":<50-200>},{"priority":"med","type":"<type>","title":"<title>","rationale":"<1-2 sentences>","xp":<50-200>},{"priority":"low","type":"<type>","title":"<title>","rationale":"<1-2 sentences>","xp":<50-150>}],"next_level_name":"<next level name>","next_level_gates":["<req>","<req>","<req>"]}`;
    try {
      const res = await fetch("/api/assess",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||"API error");
      clearInterval(interval); setLoadingStep(LOADING_STEPS.length); setResult(data);
    } catch(e) { clearInterval(interval); setError(e.message); }
    finally { setLoading(false); }
  };

  const lc = result ? (LC[result.level]||D.accent) : D.accent;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", minHeight:"100vh", fontFamily:"monospace", background:D.black, color:D.white, paddingTop:"64px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,600&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        select option{background:#111111}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#f7f6f2}
        ::-webkit-scrollbar-thumb{background:#ccc}
      `}</style>

      {/* LEFT PANEL */}
      <div style={{ background:D.dark, borderRight:`1px solid ${D.border}`, boxShadow:"2px 0 20px rgba(0,0,0,0.04)", display:"flex", flexDirection:"column", height:"calc(100vh - 64px)", overflowY:"auto", position:"sticky", top:"64px" }}>
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${D.border}` }}>
          <div style={{ fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", color:D.mid, marginBottom:"12px" }}>{T.engine}</div>
          <div style={{ display:"flex", gap:"6px" }}>
            {[["emerging","Emerging"],["midcareer","Mid-Career"],["established","Established"]].map(([k,label])=>(
              <button key={k} onClick={()=>loadPreset(k)} style={{ flex:1, padding:"7px 4px", background:"transparent", border:`1px solid ${D.borderMed}`, color:D.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:"3px", transition:"all 0.15s" }}
                onMouseEnter={e=>{e.target.style.borderColor=D.accent;e.target.style.color=D.white}}
                onMouseLeave={e=>{e.target.style.borderColor=D.borderMed;e.target.style.color=D.mid}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding:"16px 24px", flex:1, overflowY:"auto" }}>
          {/* Disciplines */}
          <div style={{ marginBottom:"16px" }}>
            <div style={lbl}>Discipline</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
              {DISCIPLINES.map(d=>{
                const on=form.disciplines.includes(d);
                return <button key={d} onClick={()=>toggleD(d)} style={{ padding:"5px 10px", border:`1px solid ${on?D.white:D.border}`, background:on?D.white:"transparent", color:on?D.black:D.mid, fontFamily:"monospace", fontSize:"9px", cursor:"pointer", transition:"all 0.15s", borderRadius:"3px" }}>{d}</button>;
              })}
            </div>
          </div>

          <div style={{ marginBottom:"12px" }}>
            <label style={lbl}>Years Active</label>
            <input type="number" value={form.years} onChange={e=>setForm(f=>({...f,years:e.target.value}))} placeholder="e.g. 8" style={inp}/>
          </div>

          {[
            {label:"Solo Exhibitions",key:"solo",opts:[["0","None yet"],["1-2","1–2"],["3-7","3–7"],["8+","8+"]]},
            {label:"Group Exhibitions",key:"group",opts:[["1-5","1–5"],["6-20","6–20"],["20+","20+"]]},
            {label:"Highest Venue",key:"venue",opts:[["artist-run","Artist-run / DIY"],["commercial-gallery","Commercial gallery"],["non-profit","Kunsthalle / Non-profit"],["museum","Museum"]]},
            {label:"Press Coverage",key:"press",opts:[["none","None"],["local","Local / regional"],["national","National art press"],["international","International"]]},
            {label:"Gallery Representation",key:"gallery",opts:[["none","No representation"],["one","One gallery"],["multiple","Multiple galleries"]]},
            {label:"Annual Art Income",key:"income",opts:[["under-10k","Under $10k"],["10-50k","$10k–$50k"],["50-150k","$50k–$150k"],["150k+","$150k+"]]},
          ].map(({label,key,opts})=>(
            <div key={key} style={{ marginBottom:"12px" }}>
              <label style={lbl}>{label}</label>
              <select value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} style={inp}>
                <option value="">Select...</option>
                {opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}

          <div style={{ marginBottom:"12px" }}>
            <label style={lbl}>Artist Statement <span style={{ color:"#c06050" }}>*required</span></label>
            <textarea value={form.statement} onChange={e=>setForm(f=>({...f,statement:e.target.value}))} rows={5} placeholder="Paste your artist statement..." style={{...inp,resize:"vertical",lineHeight:"1.6"}}/>
          </div>
          <div>
            <label style={lbl}>CV Notes (optional)</label>
            <textarea value={form.cv} onChange={e=>setForm(f=>({...f,cv:e.target.value}))} rows={3} placeholder="Residencies, awards, collections..." style={{...inp,resize:"vertical",lineHeight:"1.6"}}/>
          </div>
        </div>

        <div style={{ padding:"16px 24px", borderTop:`1px solid ${D.border}` }}>
          {!isPro&&(
            <div style={{ padding:"8px 12px", background: assessCount>=1?"rgba(192,96,80,0.1)":"rgba(245,244,240,0.04)", border:`1px solid ${assessCount>=1?"rgba(192,96,80,0.3)":D.border}`, fontSize:"9px", color:assessCount>=1?"#c06050":D.mid, letterSpacing:"0.1em", marginBottom:"10px", display:"flex", justifyContent:"space-between", borderRadius:"3px" }}>
              <span>{assessCount>=1?"Free assessment used — upgrade for unlimited":"1 free assessment remaining"}</span>
              <span>{assessCount}/1</span>
            </div>
          )}
          {error&&<div style={{ padding:"10px 12px", background:"rgba(192,96,80,0.1)", border:"1px solid rgba(192,96,80,0.3)", color:"#c06050", fontSize:"11px", lineHeight:1.5, marginBottom:"10px", borderRadius:"3px" }}>{error}</div>}
          <button onClick={run} disabled={loading} style={{ width:"100%", padding:"14px", background:loading?"transparent":canRun?D.white:"rgba(245,244,240,0.1)", border:loading?`1px solid ${D.borderMed}`:"none", color:loading?D.mid:canRun?D.black:D.mid, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", cursor:loading?"not-allowed":"pointer", borderRadius:"4px", transition:"all 0.2s" }}>
            {loading?"Analyzing…":canRun?"Run AI Assessment →":"✦ Upgrade for Unlimited"}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ padding:"40px 48px", overflowY:"auto" }}>
        {!loading&&!result&&(
          <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", textAlign:"center", opacity:0.25 }}>
            <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"100px", fontStyle:"italic", color:D.white, lineHeight:1, marginBottom:"16px" }}>∴</div>
            <div style={{ fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, lineHeight:2 }}>Load a preset or fill in your details<br/>then run the assessment</div>
          </div>
        )}

        {loading&&(
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", textAlign:"center" }}>
            <div style={{ width:"44px", height:"44px", border:`1px solid ${D.border}`, borderTop:`1px solid ${D.white}`, borderRadius:"50%", animation:"spin 1s linear infinite", marginBottom:"24px" }}/>
            <div style={{ fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, marginBottom:"32px" }}>Analyzing your practice</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", textAlign:"left" }}>
              {LOADING_STEPS.map((step,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"11px", color:i<loadingStep?"#606060":i===loadingStep?D.white:"#2a2a2a", transition:"color 0.4s" }}>
                  <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:"currentColor", flexShrink:0 }}/>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {result&&(
          <div style={{ maxWidth:"800px" }}>
            {/* Level hero */}
            <div style={{ padding:"32px", border:`1px solid ${D.borderMed}`, background:D.dark, marginBottom:"20px", position:"relative", borderTop:`3px solid ${lc}` }}>
              <div style={{ display:"flex", gap:"28px", alignItems:"center" }}>
                <div style={{ width:"80px", height:"80px", borderRadius:"50%", border:`2px solid ${lc}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"42px", fontWeight:300, color:lc }}>{result.level}</span>
                </div>
                <div>
                  <div style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:lc, marginBottom:"6px" }}>Level {result.level} of 5 · {result.level_subtitle}</div>
                  <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"32px", fontWeight:300, fontStyle:"italic", color:D.white, lineHeight:1.1, marginBottom:"8px" }}>{result.level_name}</div>
                  <div style={{ fontSize:"13px", color:D.mid, lineHeight:1.7 }}>{result.level_summary}</div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:D.border, marginBottom:"20px" }}>
              {Object.entries(result.scores).map(([key,val])=>(
                <div key={key} style={{ background:D.dark, padding:"20px 14px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"36px", fontWeight:300, color:val>=70?D.white:val>=40?D.mid:"#c06050", lineHeight:1, marginBottom:"4px" }}>{val}</div>
                  <div style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:D.mid, marginBottom:"8px" }}>{key}</div>
                  <div style={{ height:"2px", background:D.border }}>
                    <div style={{ height:"100%", width:`${val}%`, background:val>=70?D.white:val>=40?D.mid:"#c06050" }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Gaps */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
              {[{title:T.strengths,items:result.strengths,ok:true},{title:T.gaps,items:result.gaps,ok:false}].map(({title,items,ok})=>(
                <div key={title} style={{ padding:"24px", background:D.dark, border:`1px solid ${D.border}` }}>
                  <div style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, marginBottom:"16px" }}>{title}</div>
                  {items.map((s,i)=>(
                    <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"10px", alignItems:"flex-start" }}>
                      <div style={{ width:"16px", height:"16px", borderRadius:"50%", border:`1px solid ${ok?"#606060":"#c06050"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"8px", color:ok?"#909090":"#c06050", flexShrink:0, marginTop:"2px" }}>{ok?"✓":"!"}</div>
                      <div style={{ fontSize:"12px", color:D.mid, lineHeight:1.6 }}>{s.text}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Statement */}
            <div style={{ padding:"24px", background:D.dark, border:`1px solid ${D.border}`, marginBottom:"16px" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, marginBottom:"16px" }}>{T.statAnalysis} · {result.scores.statement}/100</div>
              <div style={{ borderLeft:`2px solid ${D.borderMed}`, paddingLeft:"14px", marginBottom:"14px", fontFamily:"'Bodoni Moda',serif", fontSize:"15px", fontStyle:"italic", color:D.mid, lineHeight:1.7 }}>"{form.statement.slice(0,200)}{form.statement.length>200?"…":""}"</div>
              <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"14px", fontStyle:"italic", color:D.mid, marginBottom:"12px" }}>{result.statement_critique.overall}</div>
              {result.statement_critique.good.map((t,i)=><div key={i} style={{ padding:"7px 10px", borderLeft:"2px solid #606060", marginBottom:"6px", fontSize:"11px", color:D.mid }}>✓ {t}</div>)}
              {result.statement_critique.improve.map((t,i)=><div key={i} style={{ padding:"7px 10px", borderLeft:"2px solid #c06050", marginBottom:"6px", fontSize:"11px", color:D.mid }}>→ {t}</div>)}
            </div>

            {/* Missions */}
            <div style={{ padding:"24px", background:D.dark, border:`1px solid ${D.border}`, marginBottom:"16px" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, marginBottom:"16px" }}>Your Missions</div>
              {result.missions.map((m,i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"3px 1fr auto", gap:"14px", padding:"14px", background:D.dark2, border:`1px solid ${D.border}`, marginBottom:"8px", borderRadius:"4px" }}>
                  <div style={{ borderRadius:"2px", background:m.priority==="high"?"#c06050":m.priority==="med"?D.mid:"#404040" }}/>
                  <div>
                    <div style={{ fontSize:"8px", letterSpacing:"0.28em", textTransform:"uppercase", color:D.muted, marginBottom:"4px" }}>{m.type}</div>
                    <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"18px", color:D.white, marginBottom:"5px", lineHeight:1.2 }}>{m.title}</div>
                    <div style={{ fontSize:"11px", color:D.mid, lineHeight:1.6 }}>{m.rationale}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"20px", color:D.accent }}>+{m.xp}</div>
                    <div style={{ fontSize:"8px", letterSpacing:"0.15em", color:D.muted }}>XP</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next level */}
            <div style={{ padding:"28px", background:D.dark2, border:`1px solid ${D.borderMed}`, textAlign:"center" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:D.mid, marginBottom:"8px" }}>⬆ To Reach Level {Math.min(result.level+1,5)}</div>
              <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"28px", fontStyle:"italic", fontWeight:300, color:D.white, marginBottom:"14px" }}>{result.next_level_name}</div>
              {result.next_level_gates.map((g,i)=>(
                <div key={i} style={{ fontSize:"12px", color:D.mid, lineHeight:2 }}>— <span style={{ color:D.white }}>{g}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
