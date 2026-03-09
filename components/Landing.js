import { useState } from "react";

const D = {
  black:"#ffffff", dark:"#f7f6f2", dark2:"#eeece8", dark3:"#e4e2dd",
  white:"#0a0a0a", accent:"#1a1a1a", accentD:"#333333",
  mid:"#555552", muted:"#888884", border:"rgba(10,10,10,0.1)",
  borderMed:"rgba(10,10,10,0.2)",
};

const COPY = {
  en: {
    tagline:"ARTIST CAREER INTELLIGENCE",
    hero1:"THE ART WORLD", hero2:"HAS A PATH.",
    hero3:"Most artists never see it.", hero4:"Stratum maps the way.",
    cta1:"Begin Assessment →", cta2:"Browse Opportunities",
    how:"HOW IT WORKS", howTitle:"Four steps to your next level.",
    steps:[
      { n:"01", title:"Take the Assessment", desc:"Answer questions about your exhibition history, press, sales, and institutional recognition. Our AI places you on the 5-level career system in minutes." },
      { n:"02", title:"See Your Level",       desc:"Understand exactly where you stand — what you've built, what's missing, and the specific credentials you need to reach the next level." },
      { n:"03", title:"Get Your Missions",    desc:"A prioritised list of concrete actions tailored to your level: which residencies to apply for, which galleries to approach, what to build next." },
      { n:"04", title:"Track Your Climb",     desc:"Use the opportunity database, gallery matcher, and statement builder to execute. Return to reassess as your career grows." },
    ],
    levels:"THE FIVE LEVELS", levelsTitle:"Know where you stand.",
    levelData:[
      { n:5, name:"The Institutional Artist", desc:"Biennials, museum shows, permanent collections, monograph" },
      { n:4, name:"The Market Artist",        desc:"Gallery rep, art fairs, international exhibitions, major grants" },
      { n:3, name:"The Emerging Voice",       desc:"3–7 solo shows, commercial gallery, regional press, residencies" },
      { n:2, name:"The Local Presence",       desc:"1–2 solo shows, local press, small sales, emerging collector base" },
      { n:1, name:"The Foundation",           desc:"First group shows, developing statement, finding voice" },
    ],
    platform:"THE PLATFORM",
    features:[
      { icon:"∴", title:"AI Career Assessment",  desc:"Your level, your gaps, your mission list. In minutes.", free:true,  nav:"assessment"   },
      { icon:"⊕", title:"Opportunity Database",  desc:"100+ residencies, grants, fairs — filtered for your level.", free:true,  nav:"opportunities" },
      { icon:"◎", title:"Gallery Matching",      desc:"50+ galleries ranked by fit. With outreach templates.", free:false, nav:"galleries"     },
      { icon:"✍", title:"Statement Builder",     desc:"Upload work. Get a professional statement, CV, and pitches.", free:false, nav:"portfolio"     },
    ],
    quoteText:"I built this out of my own struggle. Six years making work with no map.",
    quoteBy:"The Founder — Artist, Level 3",
    finalTitle:"Your career has a level.",
    finalSub:"Find out which one.",
    finalNote:"Free assessment. No account required.",
    finalCTA:"Begin Your Assessment →",
    stats:[["5","Career Levels"],["100+","Opportunities"],["50+","Gallery Profiles"],["Free","To Start"]],
  },
  es: {
    tagline:"INTELIGENCIA PARA CARRERAS ARTÍSTICAS",
    hero1:"EL MUNDO DEL", hero2:"ARTE TIENE UN CAMINO.",
    hero3:"La mayoría de los artistas nunca lo ven.", hero4:"Stratum traza la ruta.",
    cta1:"Comenzar Evaluación →", cta2:"Ver Oportunidades",
    how:"CÓMO FUNCIONA", howTitle:"Cuatro pasos a tu siguiente nivel.",
    steps:[
      { n:"01", title:"Haz la Evaluación",      desc:"Responde preguntas sobre tu historial de exposiciones, prensa, ventas y reconocimiento institucional. Nuestra IA te ubica en el sistema de 5 niveles en minutos." },
      { n:"02", title:"Conoce Tu Nivel",         desc:"Entiende exactamente dónde estás — lo que has construido, lo que falta, y las credenciales específicas que necesitas para el siguiente nivel." },
      { n:"03", title:"Recibe Tus Misiones",     desc:"Una lista priorizada de acciones concretas para tu nivel: qué residencias solicitar, qué galerías abordar, qué construir después." },
      { n:"04", title:"Rastrea Tu Ascenso",      desc:"Usa la base de datos de oportunidades, el buscador de galerías y el constructor de declaraciones. Regresa a evaluar conforme crece tu carrera." },
    ],
    levels:"LOS CINCO NIVELES", levelsTitle:"Sabe dónde estás.",
    levelData:[
      { n:5, name:"El Artista Institucional", desc:"Bienales, exposiciones en museos, colecciones permanentes, monografía" },
      { n:4, name:"El Artista de Mercado",   desc:"Representación galería, ferias de arte, exposiciones internacionales, becas importantes" },
      { n:3, name:"La Voz Emergente",        desc:"3–7 exposiciones individuales, galería comercial, prensa regional, residencias" },
      { n:2, name:"La Presencia Local",      desc:"1–2 exposiciones individuales, prensa local, ventas pequeñas, coleccionistas emergentes" },
      { n:1, name:"La Fundación",            desc:"Primeras exposiciones colectivas, desarrollando declaración artística, encontrando voz" },
    ],
    platform:"LA PLATAFORMA",
    features:[
      { icon:"∴", title:"Evaluación IA de Carrera",  desc:"Tu nivel, tus brechas, tu lista de misiones. En minutos.", free:true,  nav:"assessment"   },
      { icon:"⊕", title:"Base de Oportunidades",     desc:"80+ residencias, becas, ferias — filtradas para tu nivel.", free:true,  nav:"opportunities" },
      { icon:"◎", title:"Buscador de Galerías",      desc:"30+ galerías clasificadas por compatibilidad. Con plantillas de contacto.", free:false, nav:"galleries"     },
      { icon:"✍", title:"Constructor de Declaración",desc:"Sube tu obra. Obtén declaración artística, CV y pitches profesionales.", free:false, nav:"portfolio"     },
    ],
    quoteText:"Lo construí desde mi propia lucha. Seis años haciendo obra sin un mapa.",
    quoteBy:"El Fundador — Artista, Nivel 3",
    finalTitle:"Tu carrera tiene un nivel.",
    finalSub:"Descubre cuál es.",
    finalNote:"Evaluación gratuita. Sin cuenta requerida.",
    finalCTA:"Comenzar Tu Evaluación →",
    stats:[["5","Niveles de Carrera"],["100+","Oportunidades"],["50+","Perfiles de Galería"],["Gratis","Para Empezar"]],
  },
};

// Exact match of uploaded logo:
// 3 flat rounded rectangles, slight perspective tilt
// top = medium grey, middle = dark, bottom = black, white gaps between
const Logo = ({ size=36, color="#0a0a0a" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="32" height="6" rx="1" fill={color} opacity="0.4"/>
    <rect x="4" y="17" width="32" height="6" rx="1" fill={color} opacity="0.7"/>
    <rect x="4" y="26" width="32" height="6" rx="1" fill={color}/>
  </svg>
);

const HeroImage = () => (
  <div style={{ position:"absolute", inset:0 }}>
    <img src="/hero.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
  </div>
);

export default function Landing({ onNavigate, isPro, onUpgrade }) {
  const [lang, setLang] = useState(() => typeof navigator!=="undefined" && navigator.language?.startsWith("es") ? "es" : "en");
  const [hovL, setHovL] = useState(null);
  const T = COPY[lang];
  const LC = { 1:"#404040", 2:"#585858", 3:"#707070", 4:"#909090", 5:"#b0b0b0" };

  return (
    <div style={{ fontFamily:"'DM Mono',monospace", background:D.black, color:D.white }}>
      <style>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,600&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .btn{transition:all .18s;cursor:pointer}
        .btn-g{background:${D.white};color:${D.black};border:1px solid rgba(10,10,10,0.8)}
        .btn-g:hover{opacity:0.85;transform:translateY(-2px)}
        .btn-o{background:transparent;border:1px solid rgba(255,255,255,0.35);color:#fff}
        .btn-o:hover{background:rgba(255,255,255,0.15)!important;transform:translateY(-2px)}
        .feat:hover{background:${D.dark2}!important;border-color:rgba(10,10,10,0.2)!important;transform:translateY(-4px)!important}
        .lbar{transition:width .4s ease}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .f1{animation:fadeUp .9s ease forwards .1s;opacity:0}
        .f2{animation:fadeUp .9s ease forwards .25s;opacity:0}
        .f3{animation:fadeUp .9s ease forwards .4s;opacity:0}
        .f4{animation:fadeUp .9s ease forwards .55s;opacity:0}
        .f5{animation:fadeUp .9s ease forwards .7s;opacity:0}
        @media(max-width:768px){
          .how-grid{grid-template-columns:1fr 1fr!important}
          .lv-grid{grid-template-columns:1fr!important}
          .ft-grid{grid-template-columns:1fr 1fr!important}
          .stat-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${D.border}` }}>
        <button onClick={()=>{}} style={{ display:"flex",alignItems:"center",gap:"12px",background:"none",border:"none",cursor:"pointer" }}>
          <Logo size={30} />
          <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"22px",fontWeight:600,color:D.white }}>
            Str<span style={{ color:D.accent,fontStyle:"italic" }}>a</span>tum
          </span>
        </button>
        <div style={{ display:"flex",gap:"8px",alignItems:"center" }}>
          <div style={{ display:"flex",border:`1px solid ${D.border}`,borderRadius:"4px",overflow:"hidden",marginRight:"4px" }}>
            {["en","es"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} className="btn" style={{ padding:"5px 12px",background:lang===l?D.white:"transparent",color:lang===l?D.black:D.mid,fontFamily:"monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.1em",border:"none",cursor:"pointer" }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn btn-o" onClick={()=>onNavigate("assessment")} style={{ padding:"8px 18px",borderRadius:"4px",fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase" }}>{lang==="en"?"Assessment":"Evaluación"}</button>
          {isPro
            ? <span style={{ padding:"8px 16px",background:"rgba(245,244,240,0.08)",border:"1px solid rgba(245,244,240,0.2)",color:D.accent,fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.15em",borderRadius:"4px" }}>✦ PRO</span>
            : <button className="btn btn-g" onClick={()=>onNavigate("assessment")} style={{ padding:"8px 20px",fontFamily:"monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",borderRadius:"4px",boxShadow:"none" }}>{T.cta1}</button>
          }
        </div>
      </nav>

      {/* HERO */}
      <section style={{ height:"100vh",position:"relative",overflow:"hidden",display:"flex",alignItems:"flex-end",paddingBottom:"80px",paddingTop:"64px" }}>
        <HeroImage />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.55) 45%,rgba(0,0,0,0.1) 100%)" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,0.65) 0%,transparent 65%)" }} />
        <div style={{ position:"relative",zIndex:2,padding:"0 56px",maxWidth:"960px" }}>
          <div className="f1" style={{ fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:"rgba(255,255,255,0.55)",marginBottom:"20px" }}>{T.tagline}</div>
          <h1 className="f2" style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(52px,9vw,118px)",fontWeight:800,lineHeight:0.9,letterSpacing:"-0.02em",color:"#ffffff",marginBottom:"24px",textTransform:"uppercase" }}>
            {T.hero1}<br/>{T.hero2}
          </h1>
          <p className="f3" style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(18px,2.2vw,26px)",fontWeight:300,color:"rgba(255,255,255,0.75)",lineHeight:1.55,marginBottom:"36px",maxWidth:"500px" }}>
            {T.hero3}<br/><em style={{ color:"#ffffff" }}>{T.hero4}</em>
          </p>
          <div className="f4" style={{ display:"flex",gap:"12px",flexWrap:"wrap" }}>
            <button className="btn btn-g" onClick={()=>onNavigate("assessment")} style={{ padding:"16px 44px",fontFamily:"monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",borderRadius:"4px",boxShadow:"0 8px 28px rgba(245,244,240,0.15)" }}>{T.cta1}</button>
            <button className="btn btn-o" onClick={()=>onNavigate("opportunities")} style={{ padding:"16px 44px",fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.25em",textTransform:"uppercase",borderRadius:"4px" }}>{T.cta2}</button>
          </div>
        </div>
        <div className="f5" style={{ position:"absolute",top:"80px",right:"56px",opacity:0.22,animation:"float 6s ease-in-out infinite" }}>
          <Logo size={100} color="rgba(255,255,255,0.4)" />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background:"#0a0a0a", borderTop:"1px solid rgba(10,10,10,0.15)", borderBottom:"1px solid rgba(10,10,10,0.15)" }}>
        <div className="stat-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
          {T.stats.map(([n,l],i)=>(
            <div key={l} style={{ padding:"32px 20px",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.08)":"none" }}>
              <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"48px",fontWeight:600,color:"#ffffff",lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginTop:"6px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"100px 48px",background:D.dark }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
          <div style={{ marginBottom:"56px" }}>
            <div style={{ fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:D.accent,marginBottom:"14px" }}>{T.how}</div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(34px,5vw,62px)",fontWeight:800,color:D.white,lineHeight:1,textTransform:"uppercase" }}>{T.howTitle}</h2>
          </div>
          <div className="how-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:D.border }}>
            {T.steps.map((s,i)=>(
              <div key={i} style={{ background:D.dark,padding:"36px 26px",borderTop:`3px solid ${i===0?"rgba(10,10,10,0.7)":"transparent"}` }}>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"48px",fontWeight:300,color:i===0?D.white:D.muted,lineHeight:1,marginBottom:"18px",opacity:i===0?1:0.35 }}>{s.n}</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"20px",fontWeight:600,color:D.white,lineHeight:1.2,marginBottom:"10px" }}>{s.title}</div>
                <div style={{ fontSize:"11px",color:D.mid,lineHeight:1.8 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BREAK */}
      <section style={{ height:"55vh",position:"relative",overflow:"hidden",display:"flex",alignItems:"center" }}>
        <img src="/hero.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", position:"absolute", inset:0 }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.5) 55%,transparent 100%)" }} />
        <div style={{ position:"relative",zIndex:2,padding:"0 80px",maxWidth:"660px" }}>
          <blockquote style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(22px,3.2vw,40px)",fontWeight:300,fontStyle:"italic",color:"#ffffff",lineHeight:1.55,marginBottom:"22px" }}>"{T.quoteText}"</blockquote>
          <div style={{ fontSize:"9px",letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)" }}>{T.quoteBy}</div>
        </div>
      </section>

      {/* 5 LEVELS */}
      <section style={{ padding:"100px 48px",background:D.black }}>
        <div className="lv-grid" style={{ maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"start" }}>
          <div>
            <div style={{ fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:D.accent,marginBottom:"14px" }}>{T.levels}</div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(34px,5vw,58px)",fontWeight:600,color:D.white,lineHeight:1,textTransform:"uppercase",marginBottom:"28px" }}>{T.levelsTitle}</h2>
            <button className="btn btn-g" onClick={()=>onNavigate("assessment")} style={{ padding:"13px 36px",fontFamily:"monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",borderRadius:"4px" }}>{T.cta1}</button>
          </div>
          <div>
            {T.levelData.map(({ n,name,desc })=>{
              const c=LC[n], isH=hovL===n;
              return (
                <div key={n} onMouseEnter={()=>setHovL(n)} onMouseLeave={()=>setHovL(null)} style={{ padding:"20px 0",borderBottom:`1px solid ${D.border}`,cursor:"default" }}>
                  <div style={{ display:"flex",gap:"16px",alignItems:"flex-start",marginBottom:"8px" }}>
                    <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"30px",fontWeight:300,color:c,lineHeight:1,flexShrink:0,minWidth:"26px" }}>{n}</span>
                    <div>
                      <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"17px",fontWeight:600,color:isH?D.white:D.mid,transition:"color 0.2s",marginBottom:"3px" }}>{name}</div>
                      <div style={{ fontSize:"10px",color:D.mid,lineHeight:1.6 }}>{desc}</div>
                    </div>
                  </div>
                  <div style={{ height:"1px",background:"rgba(10,10,10,0.08)",marginLeft:"42px" }}>
                    <div className="lbar" style={{ height:"100%",width:isH?"100%":`${n*20}%`,background:c }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 48px",background:D.dark }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
          <div style={{ marginBottom:"52px" }}>
            <div style={{ fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:D.accent,marginBottom:"14px" }}>{T.platform}</div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(34px,5vw,62px)",fontWeight:600,color:D.white,lineHeight:1,textTransform:"uppercase" }}>
              {lang==="en"?"Everything\nyou need.":"Todo lo que\nnecesitas."}
            </h2>
          </div>
          <div className="ft-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px" }}>
            {T.features.map((f,i)=>(
              <div key={i} className="feat" onClick={()=>onNavigate(f.nav)} style={{ padding:"28px 22px",background:D.dark2,border:`1px solid ${D.border}`,cursor:"pointer",transition:"all 0.22s",position:"relative" }}>
                {!f.free&&<div style={{ position:"absolute",top:"14px",right:"14px",fontSize:"8px",letterSpacing:"0.12em",background:D.white,color:D.black,padding:"3px 7px",fontWeight:600 }}>PRO</div>}
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"34px",color:D.accent,marginBottom:"14px",lineHeight:1 }}>{f.icon}</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"19px",fontWeight:600,color:D.white,marginBottom:"8px",lineHeight:1.2 }}>{f.title}</div>
                <div style={{ fontSize:"11px",color:D.mid,lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ height:"70vh",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <img src="/hero.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", position:"absolute", inset:0 }} />
        <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.84)" }} />
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 50% 50%,rgba(245,244,240,0.04),transparent 70%)" }} />
        <div style={{ position:"relative",zIndex:2,textAlign:"center",maxWidth:"680px",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:"28px",animation:"float 5s ease-in-out infinite",opacity:0.7 }}><Logo size={60} color="#ffffff" /></div>
          <h2 style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"clamp(38px,6vw,72px)",fontWeight:600,color:"#ffffff",lineHeight:0.95,textTransform:"uppercase",marginBottom:"14px" }}>
            {T.finalTitle}<br/><span style={{ color:"rgba(255,255,255,0.6)",fontStyle:"italic" }}>{T.finalSub}</span>
          </h2>
          <p style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"18px",color:"rgba(255,255,255,0.5)",marginBottom:"32px" }}>{T.finalNote}</p>
          <button className="btn btn-g" onClick={()=>onNavigate("assessment")} style={{ padding:"18px 60px",fontFamily:"monospace",fontSize:"11px",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",borderRadius:"4px",boxShadow:"0 8px 36px rgba(245,244,240,0.15)" }}>{T.finalCTA}</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"32px 48px",background:D.black,borderTop:`1px solid ${D.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <Logo size={22} />
          <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"18px",fontWeight:600,color:D.white }}>Str<span style={{ color:D.accent,fontStyle:"italic" }}>a</span>tum</span>
        </div>
        <div style={{ fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:D.muted }}>{T.tagline}</div>
        <div style={{ fontSize:"9px",color:D.muted }}>© 2026 Stratum</div>
      </footer>
    </div>
  );
}
