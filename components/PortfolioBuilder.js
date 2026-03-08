import { useState, useRef } from "react";

const B = {
  bg:"#f2f2f0", bg2:"#e8e8e5", bg3:"#ffffff",
  ink:"#1a1a18", ink2:"#2e2e2c", mid:"#6b6b68", muted:"#9a9a96",
  border:"rgba(26,26,24,0.1)", borderStrong:"rgba(26,26,24,0.18)",
  gold:"#c8a84b", rust:"#c04020", sage:"#4a7a5a",
};

const STEPS = [
  { id:"upload",    label:"1. Upload Work",      icon:"⊕" },
  { id:"context",   label:"2. Your Context",     icon:"∴" },
  { id:"generate",  label:"3. Generate",          icon:"→" },
  { id:"result",    label:"4. Your Statement",   icon:"◉" },
];

const DISCIPLINES = ["Painting","Drawing","Sculpture","Installation","Photography","Video Art","Performance","Printmaking","Ceramics","Textile"];
const CAREER_LEVELS = [
  { v:"1", l:"Foundation",      desc:"First group shows, finding voice" },
  { v:"2", l:"Local Presence",  desc:"1–2 solo shows, local press" },
  { v:"3", l:"Emerging Voice",  desc:"Commercial gallery, residencies" },
  { v:"4", l:"Market Artist",   desc:"Gallery rep, art fairs" },
  { v:"5", l:"Institutional",   desc:"Biennials, museum shows" },
];
const TONES = [
  { v:"formal",      l:"Formal & Institutional", desc:"Museum-ready, third-person capable" },
  { v:"conceptual",  l:"Conceptual & Critical",  desc:"Theory-forward, academic register" },
  { v:"personal",    l:"Personal & Narrative",   desc:"First-person, voice-driven" },
  { v:"concise",     l:"Concise & Direct",       desc:"Short, punchy, commercial-ready" },
];

export default function PortfolioBuilder() {
  const [step, setStep]           = useState("upload");
  const [images, setImages]       = useState([]);
  const [form, setForm]           = useState({ discipline:"", level:"3", tone:"formal", existingStatement:"", cv:"", extraNotes:"" });
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [activeTab, setActiveTab] = useState("statement");
  const [copied, setCopied]       = useState(null);
  const fileRef = useRef();

  const handleFiles = (files) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith("image/")).slice(0, 10);
    imgs.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, { file, preview: e.target.result, base64: e.target.result.split(",")[1], mediaType: file.type, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const generate = async () => {
    setLoading(true);
    setStep("generate");
    try {
      const response = await fetch("/api/generate-statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: images.map(img => ({ base64: img.base64, mediaType: img.mediaType })),
          discipline: form.discipline,
          level: form.level,
          levelLabel: `${CAREER_LEVELS.find(l=>l.v===form.level)?.l} — ${CAREER_LEVELS.find(l=>l.v===form.level)?.desc}`,
          tone: form.tone,
          toneLabel: `${TONES.find(t=>t.v===form.tone)?.l} — ${TONES.find(t=>t.v===form.tone)?.desc}`,
          existingStatement: form.existingStatement,
          cv: form.cv,
          extraNotes: form.extraNotes,
        })
      });

      const parsed = await response.json();
      if (!response.ok) throw new Error(parsed.error || "API error");
      setResult(parsed);
      setStep("result");
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please check your API connection and try again.");
      setStep("context");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ text, id }) => (
    <button onClick={() => copy(text, id)} style={{ padding:"5px 12px", background: copied===id ? B.sage : "transparent", border:`1px solid ${copied===id ? B.sage : B.borderStrong}`, color: copied===id ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s" }}>
      {copied===id ? "Copied ✓" : "Copy"}
    </button>
  );

  const stepIdx = STEPS.findIndex(s => s.id === step);

  return (
    <div style={{ background:B.bg, color:B.ink, fontFamily:"monospace", minHeight:"100vh", paddingTop:"52px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
        .upload-zone:hover { border-color: ${B.gold} !important; background: rgba(200,168,75,0.04) !important; }
        .img-card:hover .img-remove { opacity: 1 !important; }
        .tab-btn:hover { color: ${B.ink} !important; }
      `}</style>

      {/* Header */}
      <div style={{ padding:"16px 32px", borderBottom:`1px solid ${B.border}`, background:B.bg3, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
          <span style={{ fontFamily:"monospace", fontSize:"10px", color:B.muted, marginLeft:"10px" }}>/ Portfolio & Statement Builder</span>
        </div>
        {/* Step progress */}
        <div style={{ display:"flex", gap:"0", alignItems:"center" }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", background: i === stepIdx ? B.gold : "transparent", color: i === stepIdx ? "#fff" : i < stepIdx ? B.sage : B.muted, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase" }}>
                <span>{s.icon}</span>
                <span style={{ display:window?.innerWidth > 768 ? "inline" : "none" }}>{s.label}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ width:"1px", height:"20px", background:B.border }} />}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1 — UPLOAD */}
      {step === "upload" && (
        <div style={{ maxWidth:"720px", margin:"0 auto", padding:"48px 32px" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, fontStyle:"italic", color:B.ink, marginBottom:"8px" }}>Upload your work.</div>
          <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.7, marginBottom:"40px" }}>
            Upload 3–10 images of your recent work. Claude will analyse the visual themes, materials, and conceptual territory to write a statement that speaks authentically about what you make.
          </div>

          {/* Drop zone */}
          <div className="upload-zone" onDrop={handleDrop} onDragOver={e=>e.preventDefault()} onClick={() => fileRef.current.click()}
            style={{ border:`2px dashed ${B.borderStrong}`, padding:"48px 32px", textAlign:"center", cursor:"pointer", transition:"all 0.2s", marginBottom:"24px", background:B.bg3 }}>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"48px", color:B.muted, lineHeight:1, marginBottom:"12px" }}>⊕</div>
            <div style={{ fontSize:"13px", color:B.mid, marginBottom:"6px" }}>Drop images here or click to browse</div>
            <div style={{ fontSize:"10px", color:B.muted }}>JPG, PNG, WEBP · Up to 10 images · Max 5MB each</div>
          </div>

          {/* Image grid */}
          {images.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:"10px", marginBottom:"32px" }}>
              {images.map((img, i) => (
                <div key={i} className="img-card" style={{ position:"relative", aspectRatio:"1", overflow:"hidden", background:B.bg2 }}>
                  <img src={img.preview} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  <button className="img-remove" onClick={() => removeImage(i)}
                    style={{ position:"absolute", top:"6px", right:"6px", width:"24px", height:"24px", background:"rgba(26,26,24,0.75)", border:"none", color:"#fff", cursor:"pointer", fontSize:"14px", lineHeight:1, opacity:0, transition:"opacity 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"4px 6px", background:"rgba(26,26,24,0.6)", fontSize:"8px", color:"rgba(255,255,255,0.7)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{img.name}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            <button onClick={() => setStep("context")} disabled={images.length === 0}
              style={{ flex:1, padding:"16px", background: images.length>0 ? B.gold : B.bg2, border:"none", color: images.length>0 ? "#fff" : B.muted, fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", cursor: images.length>0 ? "pointer" : "not-allowed" }}>
              Continue with {images.length} image{images.length!==1?"s":""} →
            </button>
            <button onClick={() => setStep("context")}
              style={{ padding:"16px 20px", background:"transparent", border:`1px solid ${B.borderStrong}`, color:B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
              Skip — no images
            </button>
          </div>

          {images.length === 0 && (
            <div style={{ marginTop:"12px", fontSize:"10px", color:B.muted, textAlign:"center" }}>
              No images? We can still generate a statement based on your written description alone.
            </div>
          )}
        </div>
      )}

      {/* STEP 2 — CONTEXT */}
      {step === "context" && (
        <div style={{ maxWidth:"640px", margin:"0 auto", padding:"48px 32px" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, fontStyle:"italic", color:B.ink, marginBottom:"8px" }}>Tell us about your practice.</div>
          <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.7, marginBottom:"40px" }}>
            The more context you provide, the more accurate and personal the result. All fields except discipline are optional.
          </div>

          {/* Discipline */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"10px", fontWeight:500 }}>Primary Discipline *</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
              {DISCIPLINES.map(d => (
                <button key={d} onClick={() => setForm(f=>({...f, discipline:d}))}
                  style={{ padding:"6px 14px", border:`1.5px solid ${form.discipline===d ? B.gold : B.border}`, background: form.discipline===d ? B.gold : "transparent", color: form.discipline===d ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"10px", cursor:"pointer", transition:"all 0.15s" }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Career level */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"10px", fontWeight:500 }}>Career Level</div>
            <div style={{ display:"flex", gap:"6px" }}>
              {CAREER_LEVELS.map(({v,l,desc}) => (
                <button key={v} onClick={() => setForm(f=>({...f,level:v}))}
                  style={{ flex:1, padding:"10px 6px", border:`1.5px solid ${form.level===v ? B.gold : B.border}`, background: form.level===v ? B.gold : B.bg, color: form.level===v ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"9px", cursor:"pointer", textAlign:"center", lineHeight:1.4, transition:"all 0.15s" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", display:"block", marginBottom:"2px" }}>{v}</div>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"10px", fontWeight:500 }}>Statement Tone</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {TONES.map(({v,l,desc}) => (
                <button key={v} onClick={() => setForm(f=>({...f,tone:v}))}
                  style={{ padding:"12px 14px", border:`1.5px solid ${form.tone===v ? B.gold : B.border}`, background: form.tone===v ? "rgba(200,168,75,0.07)" : B.bg, cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                  <div style={{ fontSize:"10px", color: form.tone===v ? B.gold : B.ink, fontWeight:500, marginBottom:"3px" }}>{l}</div>
                  <div style={{ fontSize:"9px", color:B.muted }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Existing statement */}
          <div style={{ marginBottom:"20px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"8px", fontWeight:500 }}>Existing Statement (optional — we'll refine it)</div>
            <textarea value={form.existingStatement} onChange={e=>setForm(f=>({...f,existingStatement:e.target.value}))} rows={4} placeholder="Paste your current statement here if you have one..." style={{ width:"100%", background:B.bg3, border:`1px solid ${B.border}`, color:B.ink, fontFamily:"monospace", fontSize:"11px", padding:"12px 14px", outline:"none", resize:"vertical", lineHeight:1.6 }} />
          </div>

          {/* CV notes */}
          <div style={{ marginBottom:"20px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"8px", fontWeight:500 }}>Exhibition History / CV Notes (optional)</div>
            <textarea value={form.cv} onChange={e=>setForm(f=>({...f,cv:e.target.value}))} rows={4} placeholder="Solo shows, group shows, residencies, awards... any format is fine." style={{ width:"100%", background:B.bg3, border:`1px solid ${B.border}`, color:B.ink, fontFamily:"monospace", fontSize:"11px", padding:"12px 14px", outline:"none", resize:"vertical", lineHeight:1.6 }} />
          </div>

          {/* Extra notes */}
          <div style={{ marginBottom:"32px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:B.muted, marginBottom:"8px", fontWeight:500 }}>Anything else we should know (optional)</div>
            <textarea value={form.extraNotes} onChange={e=>setForm(f=>({...f,extraNotes:e.target.value}))} rows={3} placeholder="Key themes, influences, materials, what the work is about..." style={{ width:"100%", background:B.bg3, border:`1px solid ${B.border}`, color:B.ink, fontFamily:"monospace", fontSize:"11px", padding:"12px 14px", outline:"none", resize:"vertical", lineHeight:1.6 }} />
          </div>

          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={() => setStep("upload")} style={{ padding:"16px 20px", background:"transparent", border:`1px solid ${B.borderStrong}`, color:B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer" }}>
              ← Back
            </button>
            <button onClick={generate} disabled={!form.discipline}
              style={{ flex:1, padding:"16px", background: form.discipline ? B.gold : B.bg2, border:"none", color: form.discipline ? "#fff" : B.muted, fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", cursor: form.discipline ? "pointer" : "not-allowed" }}>
              Generate Statement & CV →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — LOADING */}
      {step === "generate" && (
        <div style={{ maxWidth:"480px", margin:"0 auto", padding:"100px 32px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", color:B.gold, marginBottom:"24px", animation:"pulse 2s ease-in-out infinite" }}>∴</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:300, fontStyle:"italic", color:B.ink, marginBottom:"12px" }}>Reading your work…</div>
          <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.7 }}>
            Analysing visual themes, materials and conceptual territory.<br/>
            Writing your statement in the voice of your practice.
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }`}</style>
        </div>
      )}

      {/* STEP 4 — RESULTS */}
      {step === "result" && result && (
        <div style={{ maxWidth:"860px", margin:"0 auto", padding:"40px 32px" }}>
          {/* Visual analysis */}
          <div style={{ padding:"16px 20px", background:"rgba(200,168,75,0.07)", border:`1px solid ${B.gold}30`, marginBottom:"28px", display:"flex", gap:"16px", alignItems:"flex-start" }}>
            <span style={{ color:B.gold, fontSize:"18px", flexShrink:0 }}>∴</span>
            <div>
              <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.gold, marginBottom:"5px", fontWeight:500 }}>Visual Analysis</div>
              <div style={{ fontSize:"12px", color:B.mid, lineHeight:1.7, fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif" }}>{result.visualAnalysis}</div>
            </div>
          </div>

          {/* Keywords */}
          {result.keywords && (
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"24px" }}>
              {result.keywords.map(k => (
                <span key={k} style={{ padding:"3px 10px", background:B.bg2, border:`1px solid ${B.border}`, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color:B.mid }}>{k}</span>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div style={{ display:"flex", borderBottom:`1px solid ${B.border}`, marginBottom:"24px", gap:"0" }}>
            {[
              { id:"statement", label:"Artist Statement" },
              { id:"short",     label:"Short Statement" },
              { id:"cv",        label:"CV Structure" },
              { id:"pitches",   label:"Gallery Pitches" },
            ].map(tab => (
              <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
                style={{ padding:"10px 20px", background:"transparent", border:"none", borderBottom:`2px solid ${activeTab===tab.id ? B.gold : "transparent"}`, color: activeTab===tab.id ? B.gold : B.muted, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.15s", fontWeight: activeTab===tab.id ? 600 : 400 }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "statement" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.muted }}>Full Statement · {result.statement?.split(" ").length} words</div>
                <CopyBtn text={result.statement} id="statement" />
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:B.ink, lineHeight:1.85, whiteSpace:"pre-wrap", padding:"28px", background:B.bg3, border:`1px solid ${B.border}` }}>
                {result.statement}
              </div>
            </div>
          )}

          {activeTab === "short" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.muted }}>Short Statement · {result.shortStatement?.split(" ").length} words · For bios, catalogues, social</div>
                <CopyBtn text={result.shortStatement} id="short" />
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:B.ink, lineHeight:1.85, padding:"28px", background:B.bg3, border:`1px solid ${B.border}` }}>
                {result.shortStatement}
              </div>
            </div>
          )}

          {activeTab === "cv" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.muted }}>CV Structure · Replace placeholders with your information</div>
                <CopyBtn text={result.cv} id="cv" />
              </div>
              <pre style={{ fontFamily:"monospace", fontSize:"11px", color:B.ink, lineHeight:1.8, padding:"28px", background:B.bg3, border:`1px solid ${B.border}`, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
                {result.cv}
              </pre>
            </div>
          )}

          {activeTab === "pitches" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.muted, marginBottom:"4px" }}>Gallery Pitch Openers · Personalise before sending</div>
              {result.pitchOpeners?.map((pitch, i) => (
                <div key={i} style={{ padding:"20px 24px", background:B.bg3, border:`1px solid ${B.border}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                    <div style={{ fontSize:"9px", color:B.gold, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:500 }}>Pitch {i+1}</div>
                    <CopyBtn text={pitch} id={`pitch${i}`} />
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:B.mid, lineHeight:1.75, fontStyle:"italic" }}>
                    "{pitch}"
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ display:"flex", gap:"10px", marginTop:"32px", paddingTop:"24px", borderTop:`1px solid ${B.border}` }}>
            <button onClick={() => { setStep("context"); setResult(null); }}
              style={{ padding:"12px 20px", background:"transparent", border:`1px solid ${B.borderStrong}`, color:B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer" }}>
              ← Regenerate
            </button>
            <button onClick={() => copy(`${result.statement}\n\n---\n\n${result.shortStatement}`, "all")}
              style={{ flex:1, padding:"12px", background:B.gold, border:"none", color:"#fff", fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer" }}>
              {copied==="all" ? "Copied ✓" : "Copy Statement + Short Statement"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
