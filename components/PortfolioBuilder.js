import { useState, useRef } from "react";

// ── Unified design tokens ─────────────────────────────────────────────────────
const D = {
  bg:"#f7f6f2", bg2:"#eeece8", white:"#ffffff",
  ink:"#0a0a0a", mid:"#555552", muted:"#888884",
  border:"rgba(10,10,10,0.1)", borderMed:"rgba(10,10,10,0.18)",
};

const STEPS = [
  { id:"upload",   label:"1. Upload Work",    icon:"⊕" },
  { id:"context",  label:"2. Your Context",   icon:"∴" },
  { id:"generate", label:"3. Generate",       icon:"→" },
  { id:"result",   label:"4. Your Statement", icon:"◉" },
];

const DISCIPLINES = ["Painting","Drawing","Sculpture","Installation","Photography","Video Art","Performance","Printmaking","Ceramics","Textile"];
const CAREER_LEVELS = [
  { v:"1", l:"Foundation",     desc:"First group shows, finding voice" },
  { v:"2", l:"Local Presence", desc:"1–2 solo shows, local press" },
  { v:"3", l:"Emerging Voice", desc:"Commercial gallery, residencies" },
  { v:"4", l:"Market Artist",  desc:"Gallery rep, art fairs" },
  { v:"5", l:"Institutional",  desc:"Biennials, museum shows" },
];
const TONES = [
  { v:"formal",     l:"Formal & Institutional", desc:"Museum-ready, third-person capable" },
  { v:"conceptual", l:"Conceptual & Critical",  desc:"Theory-forward, academic register" },
  { v:"personal",   l:"Personal & Narrative",   desc:"First-person, voice-driven" },
  { v:"concise",    l:"Concise & Direct",       desc:"Short, punchy, commercial-ready" },
];

export default function PortfolioBuilder({ lang="en" }) {
  const T = lang==="es" ? {
    uploadTitle:"Sube tu trabajo.", uploadDesc:"Sube 3-10 imágenes de tu trabajo reciente.",
    contextTitle:"Tu contexto.", contextDesc:"Cuéntanos sobre tu práctica.",
    genTitle:"Leyendo tu trabajo…", genDesc:"Analizando temas visuales y territorio conceptual.",
    discipline:"Disciplina Principal", level:"Nivel de Carrera", tone:"Tono del Statement",
    existing:"Statement Existente (opcional)", cvNotes:"Notas de CV", extra:"Algo más (opcional)",
    continueBtn:(n)=>`Continuar con ${n} imagen${n!==1?"es":""}`, skipBtn:"Sin Imágenes",
    generateBtn:"Generar Statement y CV →", backBtn:"← Volver", regenBtn:"← Regenerar",
    copyAll:"Copiar Statement + Statement Corto", copied:"Copiado ✓", copy:"Copiar",
    visualAnalysis:"Análisis Visual", fullStatement:"Statement Completo", shortStatement:"Statement Corto",
    cvStructure:"Estructura de CV", pitches:"Propuestas para Galerías"
  } : {
    uploadTitle:"Upload your work.", uploadDesc:"Upload 3–10 images of your recent work.",
    contextTitle:"Your context.", contextDesc:"Tell us about your practice.",
    genTitle:"Reading your work…", genDesc:"Analysing visual themes and conceptual territory.",
    discipline:"Primary Discipline", level:"Career Level", tone:"Statement Tone",
    existing:"Existing Statement (optional)", cvNotes:"CV Notes", extra:"Anything else (optional)",
    continueBtn:(n)=>`Continue with ${n} image${n!==1?"s":""}`, skipBtn:"Skip — No Images",
    generateBtn:"Generate Statement & CV →", backBtn:"← Back", regenBtn:"← Regenerate",
    copyAll:"Copy Statement + Short Statement", copied:"Copied ✓", copy:"Copy",
    visualAnalysis:"Visual Analysis", fullStatement:"Full Statement", shortStatement:"Short Statement",
    cvStructure:"CV Structure", pitches:"Gallery Pitches"
  };
  const [step, setStep]           = useState("upload");
  const [images, setImages]       = useState([]);
  const [form, setForm]           = useState({ discipline:"", level:"3", tone:"formal", existingStatement:"", cv:"", extraNotes:"" });
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [activeTab, setActiveTab] = useState("statement");
  const [copied, setCopied]       = useState(null);
  const fileRef = useRef();

  const compressImage = (file) => new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > h && w > MAX) { h = Math.round((h*MAX)/w); w = MAX; }
      else if (h > MAX) { w = Math.round((w*MAX)/h); h = MAX; }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL("image/jpeg", 0.7);
      resolve({ preview:compressed, base64:compressed.split(",")[1], mediaType:"image/jpeg" });
    };
    img.src = URL.createObjectURL(file);
  });

  const handleFiles = async (files) => {
    const imgs = Array.from(files).filter(f=>f.type.startsWith("image/")).slice(0,5);
    for (const file of imgs) {
      const compressed = await compressImage(file);
      setImages(prev=>[...prev,{...compressed,file,name:file.name}]);
    }
  };

  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const removeImage = (i) => setImages(prev=>prev.filter((_,idx)=>idx!==i));

  const generate = async () => {
    setLoading(true); setStep("generate");
    try {
      const res = await fetch("/api/generate-statement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        images:images.map(img=>({base64:img.base64,mediaType:img.mediaType})),
        discipline:form.discipline, level:form.level,
        levelLabel:`${CAREER_LEVELS.find(l=>l.v===form.level)?.l} — ${CAREER_LEVELS.find(l=>l.v===form.level)?.desc}`,
        tone:form.tone,
        toneLabel:`${TONES.find(t=>t.v===form.tone)?.l} — ${TONES.find(t=>t.v===form.tone)?.desc}`,
        existingStatement:form.existingStatement, cv:form.cv, extraNotes:form.extraNotes,
      })});
      const parsed = await res.json();
      if (!res.ok) throw new Error(parsed.error||"API error");
      setResult(parsed); setStep("result");
    } catch (err) { setStep("context"); alert(`Generation failed: ${err.message}`); }
    finally { setLoading(false); }
  };

  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(null),2000); };
  const CopyBtn = ({text,id}) => (
    <button onClick={()=>copy(text,id)} style={{ padding:"5px 12px",background:copied===id?"#0a0a0a":"transparent",border:`1px solid ${copied===id?"#0a0a0a":D.borderMed}`,color:copied===id?"#ffffff":D.mid,fontFamily:"'DM Mono',monospace",fontSize:"8px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s" }}>
      {copied===id?T.copied:T.copy}
    </button>
  );

  const stepIdx = STEPS.findIndex(s=>s.id===step);
  const lbl = { display:"block",fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.28em",textTransform:"uppercase",color:D.muted,marginBottom:"8px" };
  const inp = { width:"100%",background:D.white,border:`1px solid ${D.border}`,color:D.ink,fontFamily:"'DM Mono',monospace",fontSize:"11px",padding:"10px 12px",outline:"none" };

  return (
    <div style={{ background:D.bg,color:D.ink,fontFamily:"'DM Mono',monospace",minHeight:"100vh",paddingTop:"64px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,600&family=DM+Mono:wght@300;400;500&display=swap');
        .upload-zone:hover{border-color:#0a0a0a!important}
        .img-card:hover .img-remove{opacity:1!important}
        @keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
      `}</style>

      {/* Sub-header: step progress */}
      <div style={{ position:"fixed",top:"64px",left:0,right:0,zIndex:90,background:D.white,borderBottom:`1px solid ${D.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:"48px" }}>
        <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"14px",fontWeight:600,color:D.ink }}>
          Stratum <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:300,color:D.muted,letterSpacing:"0.05em" }}>/ Portfolio & Statement Builder</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:"0" }}>
          {STEPS.map((s,i)=>(
            <div key={s.id} style={{ display:"flex",alignItems:"center" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"6px",padding:"6px 14px",background:i===stepIdx?"#0a0a0a":"transparent",color:i===stepIdx?"#ffffff":i<stepIdx?"#0a0a0a":D.muted,fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.2s" }}>
                <span style={{ fontFamily:"monospace" }}>{s.icon}</span>
                <span>{s.label}</span>
              </div>
              {i<STEPS.length-1&&<div style={{ width:"1px",height:"20px",background:D.border }}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop:"48px" }}>

        {/* ── STEP 1: UPLOAD ── */}
        {step==="upload"&&(
          <div style={{ maxWidth:"680px",margin:"0 auto",padding:"48px 32px" }}>
            <h1 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,fontStyle:"italic",color:D.ink,marginBottom:"14px",lineHeight:1.1 }}>T.uploadTitle</h1>
            <p style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:D.mid,lineHeight:1.8,marginBottom:"36px" }}>
              Upload 3–10 images of your recent work. Claude will analyse the visual themes, materials, and conceptual territory to write a statement that speaks authentically about what you make.
            </p>

            {/* Drop zone */}
            <div className="upload-zone" onDrop={handleDrop} onDragOver={e=>e.preventDefault()} onClick={()=>fileRef.current.click()}
              style={{ border:`1.5px dashed ${D.borderMed}`,background:D.white,padding:"52px 32px",textAlign:"center",cursor:"pointer",transition:"border-color 0.2s",marginBottom:"20px" }}>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handleFiles(e.target.files)}/>
              <div style={{ fontFamily:"monospace",fontSize:"28px",color:D.muted,marginBottom:"12px",lineHeight:1 }}>⊕</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"12px",color:D.mid,marginBottom:"6px" }}>Drop images here or click to browse</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:D.muted,marginBottom:"6px" }}>JPG, PNG, WEBP · Max 5 images</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#c04020" }}>Images are compressed automatically — no need to resize before uploading</div>
            </div>

            {/* Image grid */}
            {images.length>0&&(
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:"8px",marginBottom:"24px" }}>
                {images.map((img,i)=>(
                  <div key={i} className="img-card" style={{ position:"relative",aspectRatio:"1",background:D.bg2,overflow:"hidden" }}>
                    <img src={img.preview} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                    <button className="img-remove" onClick={e=>{e.stopPropagation();removeImage(i);}}
                      style={{ position:"absolute",top:"4px",right:"4px",background:"rgba(10,10,10,0.75)",border:"none",color:"#ffffff",width:"20px",height:"20px",cursor:"pointer",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.15s" }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display:"grid",gridTemplateColumns:"1fr auto",gap:"8px" }}>
              <button onClick={()=>setStep("context")} disabled={images.length===0}
                style={{ padding:"16px",background:images.length>0?"#0a0a0a":"#cccccc",border:"none",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",cursor:images.length>0?"pointer":"not-allowed" }}>
                {T.continueBtn(images.length)} →
              </button>
              <button onClick={()=>setStep("context")}
                style={{ padding:"16px 20px",background:"transparent",border:`1px solid ${D.borderMed}`,color:D.mid,fontFamily:"'DM Mono',monospace",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap" }}>
                Skip — No Images
              </button>
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:D.muted,marginTop:"10px",textAlign:"center" }}>
              No images? We can still generate a statement based on your written description alone.
            </div>
          </div>
        )}

        {/* ── STEP 2: CONTEXT ── */}
        {step==="context"&&(
          <div style={{ maxWidth:"680px",margin:"0 auto",padding:"48px 32px" }}>
            <h1 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:400,fontStyle:"italic",color:D.ink,marginBottom:"14px",lineHeight:1.1 }}>T.contextTitle</h1>
            <p style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:D.mid,lineHeight:1.8,marginBottom:"36px" }}>
              Tell us about your practice so the statement is calibrated to your voice and level.
            </p>

            {/* Discipline */}
            <div style={{ marginBottom:"24px" }}>
              <label style={lbl}>Primary Discipline</label>
              <select value={form.discipline} onChange={e=>setForm(f=>({...f,discipline:e.target.value}))} style={{ ...inp }}>
                <option value="">Select discipline…</option>
                {DISCIPLINES.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Career Level */}
            <div style={{ marginBottom:"24px" }}>
              <label style={lbl}>Career Level</label>
              <div style={{ display:"flex",flexDirection:"column",gap:"6px" }}>
                {CAREER_LEVELS.map(l=>(
                  <button key={l.v} onClick={()=>setForm(f=>({...f,level:l.v}))}
                    style={{ display:"flex",alignItems:"center",gap:"14px",padding:"12px 14px",background:form.level===l.v?"#0a0a0a":D.white,border:`1px solid ${form.level===l.v?"#0a0a0a":D.border}`,color:form.level===l.v?"#ffffff":D.ink,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
                    <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"20px",fontWeight:300,color:form.level===l.v?"rgba(255,255,255,0.6)":"rgba(10,10,10,0.3)",flexShrink:0,minWidth:"18px" }}>{l.v}</span>
                    <div>
                      <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"2px" }}>{l.l}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",opacity:0.6 }}>{l.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div style={{ marginBottom:"24px" }}>
              <label style={lbl}>Statement Tone</label>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px" }}>
                {TONES.map(t=>(
                  <button key={t.v} onClick={()=>setForm(f=>({...f,tone:t.v}))}
                    style={{ padding:"12px 14px",background:form.tone===t.v?"#0a0a0a":D.white,border:`1px solid ${form.tone===t.v?"#0a0a0a":D.border}`,color:form.tone===t.v?"#ffffff":D.ink,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
                    <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"3px" }}>{t.l}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",opacity:0.5 }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Existing statement */}
            <div style={{ marginBottom:"24px" }}>
              <label style={lbl}>Existing Statement (optional — to refine rather than invent)</label>
              <textarea value={form.existingStatement} onChange={e=>setForm(f=>({...f,existingStatement:e.target.value}))} rows={4}
                placeholder="Paste your current artist statement here…"
                style={{ ...inp,resize:"vertical",lineHeight:1.7 }}/>
            </div>

            {/* CV */}
            <div style={{ marginBottom:"24px" }}>
              <label style={lbl}>CV Notes (exhibitions, residencies, education)</label>
              <textarea value={form.cv} onChange={e=>setForm(f=>({...f,cv:e.target.value}))} rows={4}
                placeholder="e.g. Solo shows at X, Y. Residency at Z 2023. Represented by Gallery A."
                style={{ ...inp,resize:"vertical",lineHeight:1.7 }}/>
            </div>

            {/* Extra notes */}
            <div style={{ marginBottom:"32px" }}>
              <label style={lbl}>Anything else (optional)</label>
              <textarea value={form.extraNotes} onChange={e=>setForm(f=>({...f,extraNotes:e.target.value}))} rows={3}
                placeholder="Key themes, influences, materials, what the work is about…"
                style={{ ...inp,resize:"vertical",lineHeight:1.7 }}/>
            </div>

            <div style={{ display:"flex",gap:"8px" }}>
              <button onClick={()=>setStep("upload")}
                style={{ padding:"16px 20px",background:"transparent",border:`1px solid ${D.borderMed}`,color:D.mid,fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer" }}>
                ← Back
              </button>
              <button onClick={generate} disabled={!form.discipline}
                style={{ flex:1,padding:"16px",background:form.discipline?"#0a0a0a":"#cccccc",border:"none",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",cursor:form.discipline?"pointer":"not-allowed" }}>
                Generate Statement & CV →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: LOADING ── */}
        {step==="generate"&&(
          <div style={{ maxWidth:"480px",margin:"0 auto",padding:"120px 32px",textAlign:"center" }}>
            <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"56px",fontWeight:300,color:"#0a0a0a",marginBottom:"28px",animation:"pulse 2s ease-in-out infinite",opacity:0.6 }}>∴</div>
            <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"28px",fontWeight:400,fontStyle:"italic",color:D.ink,marginBottom:"12px",lineHeight:1.2 }}>T.genTitle</div>
            <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:D.mid,lineHeight:1.9 }}>
              Analysing visual themes, materials and conceptual territory.<br/>
              Writing your statement in the voice of your practice.
            </div>
          </div>
        )}

        {/* ── STEP 4: RESULTS ── */}
        {step==="result"&&result&&(
          <div style={{ maxWidth:"820px",margin:"0 auto",padding:"40px 32px" }}>
            {/* Visual analysis */}
            <div style={{ padding:"16px 20px",background:D.bg,border:`1px solid ${D.border}`,borderLeft:"3px solid #0a0a0a",marginBottom:"28px",display:"flex",gap:"16px",alignItems:"flex-start" }}>
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:D.muted,marginBottom:"5px" }}>Visual Analysis</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"15px",fontStyle:"italic",color:D.mid,lineHeight:1.7 }}>{result.visualAnalysis}</div>
              </div>
            </div>

            {/* Keywords */}
            {result.keywords&&(
              <div style={{ display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"24px" }}>
                {result.keywords.map(k=>(
                  <span key={k} style={{ padding:"3px 10px",background:D.bg2,border:`1px solid ${D.border}`,fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:D.mid }}>{k}</span>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div style={{ display:"flex",borderBottom:`1px solid ${D.border}`,marginBottom:"28px" }}>
              {[{id:"statement",label:"Artist Statement"},{id:"short",label:T.shortStatement},{id:"cv",label:T.cvStructure},{id:"pitches",label:T.pitches}].map(tab=>(
                <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                  style={{ padding:"10px 20px",background:"transparent",border:"none",borderBottom:`2px solid ${activeTab===tab.id?"#0a0a0a":"transparent"}`,color:activeTab===tab.id?"#0a0a0a":D.muted,fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.15s",fontWeight:activeTab===tab.id?600:400 }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab==="statement"&&(
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:D.muted }}>Full Statement · {result.statement?.split(" ").length} words</div>
                  <CopyBtn text={result.statement} id="statement"/>
                </div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"17px",color:D.ink,lineHeight:1.85,whiteSpace:"pre-wrap",padding:"32px",background:D.white,border:`1px solid ${D.border}` }}>
                  {result.statement}
                </div>
              </div>
            )}

            {activeTab==="short"&&(
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:D.muted }}>Short Statement · {result.shortStatement?.split(" ").length} words · For bios, catalogues, social</div>
                  <CopyBtn text={result.shortStatement} id="short"/>
                </div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"20px",color:D.ink,lineHeight:1.85,padding:"32px",background:D.white,border:`1px solid ${D.border}` }}>
                  {result.shortStatement}
                </div>
              </div>
            )}

            {activeTab==="cv"&&(
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:D.muted }}>CV Structure · Replace placeholders with your information</div>
                  <CopyBtn text={result.cv} id="cv"/>
                </div>
                <pre style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:D.ink,lineHeight:1.8,padding:"32px",background:D.white,border:`1px solid ${D.border}`,whiteSpace:"pre-wrap",wordBreak:"break-word" }}>
                  {result.cv}
                </pre>
              </div>
            )}

            {activeTab==="pitches"&&(
              <div style={{ display:"flex",flexDirection:"column",gap:"14px" }}>
                <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:D.muted,marginBottom:"4px" }}>Gallery Pitch Openers · Personalise before sending</div>
                {result.pitchOpeners?.map((pitch,i)=>(
                  <div key={i} style={{ padding:"20px 24px",background:D.white,border:`1px solid ${D.border}` }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px" }}>
                      <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",color:D.muted }}>Pitch {i+1}</div>
                      <CopyBtn text={pitch} id={`pitch${i}`}/>
                    </div>
                    <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"15px",fontStyle:"italic",color:D.mid,lineHeight:1.75 }}>"{pitch}"</div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ display:"flex",gap:"8px",marginTop:"32px",paddingTop:"24px",borderTop:`1px solid ${D.border}` }}>
              <button onClick={()=>{setStep("context");setResult(null);}}
                style={{ padding:"12px 20px",background:"transparent",border:`1px solid ${D.borderMed}`,color:D.mid,fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer" }}>
                ← Regenerate
              </button>
              <button onClick={()=>copy(`${result.statement}\n\n---\n\n${result.shortStatement}`,"all")}
                style={{ flex:1,padding:"12px",background:"#0a0a0a",border:"none",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer" }}>
                {copied==="all"?T.copied:"Copy Statement + Short Statement"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
