import { useState } from "react";

const D = {
  bg:"#f2f2f0", bg2:"#eaeae7", white:"#ffffff",
  ink:"#1a1a18", ink2:"#2c2c2a", mid:"#6b6b68", muted:"#9a9a96",
  border:"rgba(26,26,24,0.08)", borderMed:"rgba(26,26,24,0.14)",
  gold:"#c8a84b", goldL:"rgba(200,168,75,0.12)",
  L:{ 1:"#8a9db5", 2:"#7a9080", 3:"#b8a060", 4:"#b86040", 5:"#c8a84b" },
};

const LogoMark = ({ size=32, dark=false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="8"  y="72" width="84" height="17" rx="5" fill={dark?"#f2f2f0":"#1a1a18"} opacity="0.85"/>
    <rect x="15" y="53" width="70" height="14" rx="4" fill={dark?"#f2f2f0":"#1a1a18"} opacity="0.58"/>
    <rect x="22" y="36" width="56" height="13" rx="4" fill={dark?"#f2f2f0":"#1a1a18"} opacity="0.34"/>
    <rect x="29" y="21" width="42" height="11" rx="3" fill={dark?"#f2f2f0":"#1a1a18"} opacity="0.18"/>
    <rect x="35" y="8"  width="30" height="10" rx="3" fill="#c8a84b"/>
  </svg>
);

export default function Landing({ onNavigate, isPro, onUpgrade }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [hoveredFeat,  setHoveredFeat]  = useState(null);

  const LEVELS = [
    { n:5, name:"The Institutional Artist", desc:"Biennials, museum shows, permanent collections", w:"100%" },
    { n:4, name:"The Market Artist",        desc:"Gallery rep, art fairs, international exhibitions", w:"82%" },
    { n:3, name:"The Emerging Voice",       desc:"3–7 solo shows, commercial gallery, residencies", w:"65%" },
    { n:2, name:"The Local Presence",       desc:"1–2 solo shows, local press, consistent sales", w:"48%" },
    { n:1, name:"The Foundation",           desc:"First group shows, artist statement, finding voice", w:"32%" },
  ];

  const FEATURES = [
    { icon:"∴", title:"AI Career Assessment",  desc:"Upload your CV and statement. Our AI places you on the level system instantly — with scores, gaps, and a personalised mission list.", nav:"assessment",   free:true  },
    { icon:"⊕", title:"Opportunity Database",  desc:"80+ residencies, grants, open calls, art fairs, and biennials. Filtered by your level, discipline, and geography.", nav:"opportunities", free:true  },
    { icon:"◎", title:"Gallery Matching",      desc:"30+ galleries matched to your exact practice — with entry strategy, fit analysis, and a personalised outreach template.", nav:"galleries",     free:false },
    { icon:"✍", title:"Statement Builder",     desc:"Upload your artwork. AI analyses visual themes and writes your artist statement, short bio, CV, and gallery pitch openers.", nav:"portfolio",     free:false },
    { icon:"→", title:"Career Missions",       desc:"Not goals — missions. Specific, prioritised, actionable tasks that move you toward the next level.", nav:"assessment",   free:false },
    { icon:"◉", title:"Live Deadlines",        desc:"Every opportunity surfaced by urgency. See what's closing this week, what's rolling, and what to prioritise.", nav:"opportunities", free:false },
  ];

  return (
    <div style={{ fontFamily:"'DM Mono',monospace", background:D.bg, color:D.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box}
        .btn{transition:all .2s;cursor:pointer}
        .btn:hover{transform:translateY(-2px)}
        .btn-gold:hover{background:#b8981e!important;box-shadow:0 12px 32px rgba(200,168,75,0.45)!important}
        .btn-out:hover{background:${D.ink}!important;color:${D.white}!important}
        .feat:hover{transform:translateY(-5px)!important;box-shadow:0 20px 56px rgba(26,26,24,0.13)!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .f1{animation:fadeUp .8s ease forwards .05s;opacity:0}
        .f2{animation:fadeUp .8s ease forwards .2s;opacity:0}
        .f3{animation:fadeUp .8s ease forwards .35s;opacity:0}
        .f4{animation:fadeUp .8s ease forwards .5s;opacity:0}
        .f5{animation:fadeUp .8s ease forwards .65s;opacity:0}
        .f6{animation:fadeUp .8s ease forwards .8s;opacity:0}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:"60px", padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(242,242,240,0.93)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${D.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <LogoMark size={26} />
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:400, color:D.ink }}>
            Str<span style={{ color:D.gold, fontStyle:"italic" }}>a</span>tum
          </span>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button className="btn btn-out" onClick={() => onNavigate("assessment")} style={{ padding:"7px 18px", background:"transparent", color:D.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", border:`1px solid ${D.borderMed}`, borderRadius:"6px", cursor:"pointer" }}>
            Assessment
          </button>
          {isPro
            ? <button style={{ padding:"7px 18px", background:D.goldL, color:D.gold, fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", border:`1px solid rgba(200,168,75,0.3)`, borderRadius:"6px", cursor:"default" }}>✦ Pro</button>
            : <button className="btn btn-gold" onClick={() => onNavigate("assessment")} style={{ padding:"7px 18px", background:D.gold, color:D.white, fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", border:"none", borderRadius:"6px", cursor:"pointer", boxShadow:"0 4px 16px rgba(200,168,75,0.3)" }}>Begin →</button>
          }
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", paddingTop:"60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${D.border} 1px,transparent 1px),linear-gradient(90deg,${D.border} 1px,transparent 1px)`, backgroundSize:"64px 64px" }} />

        {/* Floating logo marks */}
        {[{top:"14%",left:"4%",s:56,d:"0s"},{top:"72%",left:"2%",s:40,d:"1.4s"},{top:"18%",right:"3%",s:48,d:"0.7s"},{top:"68%",right:"5%",s:36,d:"2s"}].map((p,i)=>(
          <div key={i} style={{ position:"absolute", top:p.top, left:p.left, right:p.right, opacity:0.07, animation:`float ${4+i}s ease-in-out infinite`, animationDelay:p.d }}>
            <LogoMark size={p.s} />
          </div>
        ))}

        <div style={{ textAlign:"center", position:"relative", zIndex:2, maxWidth:"740px", padding:"0 32px" }}>
          <div className="f1" style={{ display:"flex", justifyContent:"center", marginBottom:"28px" }}>
            <div style={{ animation:"float 5s ease-in-out infinite" }}><LogoMark size={68} /></div>
          </div>
          <div className="f2" style={{ fontSize:"9px", letterSpacing:"0.45em", textTransform:"uppercase", color:D.gold, marginBottom:"18px" }}>Artist Career Intelligence</div>
          <h1 className="f3" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(64px,11vw,132px)", fontWeight:300, lineHeight:0.9, letterSpacing:"-0.02em", color:D.ink, marginBottom:"28px" }}>
            Str<span style={{ color:D.gold, fontStyle:"italic" }}>a</span>tum
          </h1>
          <p className="f4" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"21px", fontWeight:300, color:D.mid, lineHeight:1.7, marginBottom:"40px", maxWidth:"460px", margin:"0 auto 40px" }}>
            The art world has a path.<br/>
            Most artists never see it.<br/>
            <em style={{ color:D.ink }}>Stratum maps the way.</em>
          </p>
          <div className="f5" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"60px" }}>
            <button className="btn btn-gold" onClick={() => onNavigate("assessment")} style={{ padding:"15px 44px", background:D.gold, color:D.white, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", borderRadius:"8px", cursor:"pointer", boxShadow:"0 8px 24px rgba(200,168,75,0.35)" }}>
              Begin Assessment →
            </button>
            <button className="btn btn-out" onClick={() => onNavigate("opportunities")} style={{ padding:"15px 44px", background:"transparent", color:D.ink, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", border:`1.5px solid ${D.borderMed}`, borderRadius:"8px", cursor:"pointer" }}>
              Browse Opportunities
            </button>
          </div>
          <div className="f6" style={{ display:"flex", gap:"40px", justifyContent:"center" }}>
            {[["5","Career Levels"],["30+","Gallery Profiles"],["80+","Opportunities"],["Free","To Start"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"34px", fontWeight:300, color:D.gold, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:D.muted, marginTop:"4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEVEL SYSTEM */}
      <section style={{ padding:"100px 40px", background:D.white }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start" }}>
          <div style={{ paddingTop:"16px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:D.gold, marginBottom:"14px" }}>The Level System</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"50px", fontWeight:300, lineHeight:1.05, color:D.ink, marginBottom:"20px" }}>
              Five levels.<br/><em style={{ color:D.mid }}>One clear path.</em>
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", color:D.mid, lineHeight:1.8, marginBottom:"32px" }}>
              The contemporary art world operates on an invisible hierarchy. Stratum makes it visible — mapping your position, naming the credentials you need, and surfacing the right opportunities at every stage.
            </p>
            <button className="btn btn-gold" onClick={() => onNavigate("assessment")} style={{ padding:"13px 36px", background:D.gold, color:D.white, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", border:"none", borderRadius:"8px", cursor:"pointer", boxShadow:"0 6px 20px rgba(200,168,75,0.28)" }}>
              Find Your Level →
            </button>
          </div>

          {/* Layer stack — mirrors the logo form */}
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", paddingTop:"8px" }}>
            {LEVELS.map(({ n, name, desc, w }) => {
              const isHov = hoveredLevel === n;
              const c = D.L[n];
              return (
                <div key={n} onMouseEnter={()=>setHoveredLevel(n)} onMouseLeave={()=>setHoveredLevel(null)} style={{ width:w, alignSelf:"flex-end", transition:"all 0.2s" }}>
                  <div style={{ padding:"12px 18px", borderRadius:"10px", background: isHov ? D.white : D.bg2, border:`1px solid ${isHov ? c+"40" : D.border}`, borderLeft:`3px solid ${c}`, boxShadow: isHov ? `0 6px 24px rgba(26,26,24,0.10)` : "none", transform: isHov ? "translateX(-6px)" : "none", transition:"all 0.2s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:`${c}15`, border:`1.5px solid ${c}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", color:c, fontWeight:400 }}>{n}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", fontStyle:"italic", color: isHov ? D.ink : D.ink2, transition:"color 0.2s" }}>{name}</div>
                        <div style={{ fontSize:"9px", color:D.muted, lineHeight:1.5, marginTop:"1px" }}>{desc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 40px", background:D.bg }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:D.gold, marginBottom:"14px" }}>The Platform</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"46px", fontWeight:300, color:D.ink, lineHeight:1.1 }}>
              Everything you need.<br/><em style={{ color:D.mid }}>Nothing you don't.</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {FEATURES.map((f,i) => (
              <div key={i} className="feat" onClick={()=>onNavigate(f.nav)} onMouseEnter={()=>setHoveredFeat(i)} onMouseLeave={()=>setHoveredFeat(null)}
                style={{ padding:"26px 22px", background:D.white, borderRadius:"12px", border:`1px solid ${D.border}`, boxShadow:"0 2px 8px rgba(26,26,24,0.06)", cursor:"pointer", transition:"all 0.25s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", color:D.gold, lineHeight:1 }}>{f.icon}</div>
                  {!f.free && <span style={{ fontSize:"8px", letterSpacing:"0.12em", color:D.gold, background:D.goldL, padding:"3px 7px", borderRadius:"4px", fontWeight:500 }}>PRO</span>}
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"19px", fontWeight:400, color:D.ink, marginBottom:"8px", lineHeight:1.2 }}>{f.title}</div>
                <div style={{ fontSize:"11px", color:D.mid, lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section style={{ padding:"100px 40px", background:D.white }}>
        <div style={{ maxWidth:"640px", margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"28px" }}><LogoMark size={44} /></div>
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(20px,3vw,32px)", fontWeight:300, fontStyle:"italic", color:D.ink, lineHeight:1.65, marginBottom:"24px" }}>
            "I built this out of my own struggle.<br/>
            Six years making work with no map.<br/>
            <span style={{ color:D.gold }}>Stratum is the map I needed."</span>
          </blockquote>
          <div style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:D.muted }}>The Founder — Artist, Level 3</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding:"100px 40px", background:D.ink, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(200,168,75,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.03) 1px,transparent 1px)`, backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,168,75,0.06), transparent 70%)" }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:"560px", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"28px", opacity:0.5 }}><LogoMark size={52} dark /></div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,62px)", fontWeight:300, color:"#f2f2f0", lineHeight:1.1, marginBottom:"14px" }}>
            Your career has a level.<br/><em style={{ color:D.gold }}>Find out which one.</em>
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", color:"rgba(242,242,240,0.5)", marginBottom:"32px" }}>Free assessment. No account required.</p>
          <button className="btn btn-gold" onClick={()=>onNavigate("assessment")} style={{ padding:"17px 52px", background:D.gold, color:D.white, fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", borderRadius:"8px", cursor:"pointer", boxShadow:"0 8px 32px rgba(200,168,75,0.4)" }}>
            Begin Your Assessment →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"28px 40px", background:D.ink, borderTop:"1px solid rgba(242,242,240,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <LogoMark size={20} dark />
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", fontWeight:300, color:"#f2f2f0" }}>Str<span style={{ color:D.gold, fontStyle:"italic" }}>a</span>tum</span>
        </div>
        <div style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(242,242,240,0.3)" }}>Artist Career Intelligence</div>
        <div style={{ fontSize:"9px", color:"rgba(242,242,240,0.2)" }}>© 2026 Stratum</div>
      </footer>
    </div>
  );
}
