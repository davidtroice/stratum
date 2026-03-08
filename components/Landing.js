import { useState } from "react";

const B = {
  bg:      "#f2f2f0",
  bg2:     "#e8e8e5",
  bg3:     "#ffffff",
  ink:     "#1a1a18",
  ink2:    "#2e2e2c",
  mid:     "#6b6b68",
  muted:   "#9a9a96",
  border:  "rgba(26,26,24,0.1)",
  borderStrong: "rgba(26,26,24,0.18)",
  gold:    "#c8a84b",
  goldBg:  "rgba(200,168,75,0.08)",
  rust:    "#c04020",
  rustBg:  "rgba(192,64,32,0.07)",
  sage:    "#4a7a5a",
  sageBg:  "rgba(74,122,90,0.08)",
  blue:    "#3a6090",
  blueBg:  "rgba(58,96,144,0.08)",
  purple:  "#7a5090",
  purpleBg:"rgba(122,80,144,0.08)",
  levels:  { 1:"#5a8fc8", 2:"#4a7a5a", 3:"#c8a84b", 4:"#c04020", 5:"#7a5090" }
};

export default function Landing({ onNavigate }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const LEVEL_DATA = [
    { n:5, name:"The Institutional Artist", desc:"Biennials, museum shows, permanent collections", accent:B.levels[5] },
    { n:4, name:"The Market Artist",         desc:"Gallery rep, art fairs, international exhibitions", accent:B.levels[4] },
    { n:3, name:"The Emerging Voice",        desc:"3–7 solo shows, commercial gallery, residencies", accent:B.levels[3] },
    { n:2, name:"The Local Presence",        desc:"1–2 solo shows, local press, consistent sales", accent:B.levels[2] },
    { n:1, name:"The Foundation",            desc:"First group shows, artist statement, finding voice", accent:B.levels[1] },
  ];

  return (
    <div style={{ fontFamily:"'DM Mono',monospace", background:B.bg, color:B.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        .btn { transition: all 0.2s; cursor: pointer; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
        .btn-gold:hover { background: #b8982b !important; }
        .btn-outline:hover { background: ${B.ink} !important; color: ${B.bg} !important; }
        .feat-card { transition: all 0.22s; cursor: pointer; }
        .feat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.1); border-color: ${B.gold} !important; }
        .level-row { transition: all 0.22s; cursor: default; }
        .level-row:hover { background: ${B.bg3} !important; transform: translateX(4px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drift  { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(1deg)} }
        .f1{animation:fadeUp .8s ease forwards .1s;opacity:0}
        .f2{animation:fadeUp .8s ease forwards .25s;opacity:0}
        .f3{animation:fadeUp .8s ease forwards .4s;opacity:0}
        .f4{animation:fadeUp .8s ease forwards .55s;opacity:0}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"14px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(242,242,240,0.94)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${B.border}` }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"21px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button className="btn btn-outline" onClick={() => onNavigate("assessment")} style={{ padding:"8px 20px", background:"transparent", color:B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", border:`1px solid ${B.borderStrong}`, cursor:"pointer" }}>
            Assessment
          </button>
          <button className="btn btn-gold" onClick={() => onNavigate("assessment")} style={{ padding:"8px 20px", background:B.gold, color:"#fff", fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
            Begin →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", padding:"100px 40px 60px" }}>
        {/* Subtle grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${B.border} 1px, transparent 1px), linear-gradient(90deg, ${B.border} 1px, transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
        {/* Gradient blobs */}
        <div style={{ position:"absolute", top:"15%", left:"5%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,168,75,0.12), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(74,122,90,0.1), transparent 70%)", pointerEvents:"none" }} />

        {/* Floating level orbs */}
        {[1,2,3,4,5].map((l,i) => {
          const pos = [{top:"22%",left:"7%"},{bottom:"28%",left:"4%"},{top:"32%",right:"6%"},{bottom:"32%",right:"9%"},{top:"58%",right:"3%"}][i];
          return (
            <div key={l} style={{ position:"absolute", ...pos, width:"52px", height:"52px", borderRadius:"50%", border:`2px solid ${B.levels[l]}40`, background:`${B.levels[l]}10`, display:"flex", alignItems:"center", justifyContent:"center", animation:`drift ${5+l}s ease-in-out infinite`, animationDelay:`${l*0.5}s` }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:300, color:B.levels[l] }}>{l}</span>
            </div>
          );
        })}

        <div style={{ textAlign:"center", position:"relative", zIndex:2, maxWidth:"820px" }}>
          <div className="f1" style={{ fontSize:"9px", letterSpacing:"0.45em", textTransform:"uppercase", color:B.gold, marginBottom:"24px", fontWeight:500 }}>Artist Career Intelligence</div>
          <h1 className="f2" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(72px,12vw,148px)", fontWeight:300, lineHeight:0.88, letterSpacing:"-0.02em", color:B.ink, marginBottom:"32px" }}>
            Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
          </h1>
          <p className="f3" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:300, color:B.mid, lineHeight:1.65, maxWidth:"520px", margin:"0 auto 48px" }}>
            The art world has a path.<br />
            Most artists never see it.<br />
            <em style={{ color:B.ink, fontWeight:400 }}>Stratum maps the way.</em>
          </p>
          <div className="f4" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn btn-gold" onClick={() => onNavigate("assessment")} style={{ padding:"16px 44px", background:B.gold, color:"#fff", fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
              Begin Assessment →
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate("opportunities")} style={{ padding:"16px 44px", background:"transparent", color:B.ink, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", border:`1px solid ${B.borderStrong}`, cursor:"pointer" }}>
              Browse Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section style={{ padding:"100px 40px", background:B.bg3, borderTop:`1px solid ${B.border}`, borderBottom:`1px solid ${B.border}` }}>
        <div style={{ maxWidth:"820px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:B.gold, marginBottom:"14px", fontWeight:500 }}>The System</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"44px", fontWeight:300, color:B.ink, lineHeight:1.1 }}>
              Five levels.<br /><em style={{ color:B.mid }}>One clear path.</em>
            </h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {LEVEL_DATA.map(({ n, name, desc, accent }) => {
              const isHov = hoveredLevel === n;
              return (
                <div key={n} className="level-row" onMouseEnter={() => setHoveredLevel(n)} onMouseLeave={() => setHoveredLevel(null)}
                  style={{ display:"grid", gridTemplateColumns:"56px 1fr", gap:"0", padding:"22px 24px", background: isHov ? B.bg3 : B.bg, border:`1px solid ${isHov ? accent+"40" : B.border}`, borderLeft:`3px solid ${isHov ? accent : "transparent"}` }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color: isHov ? accent : B.muted, lineHeight:1, transition:"color 0.2s" }}>{n}</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontStyle:"italic", color: isHov ? B.ink : B.ink2, marginBottom:"4px", transition:"color 0.2s" }}>{name}</div>
                    <div style={{ fontSize:"11px", color:B.muted, lineHeight:1.5 }}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 40px", background:B.bg }}>
        <div style={{ maxWidth:"1080px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"64px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:B.gold, marginBottom:"14px", fontWeight:500 }}>The Platform</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"44px", fontWeight:300, color:B.ink, lineHeight:1.1 }}>
              Everything you need.<br /><em style={{ color:B.mid }}>Nothing you don't.</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {[
              { icon:"∴", title:"AI Career Assessment",  desc:"Upload your CV and statement. Our AI places you on the level system instantly — with scores, gaps, and a personalised mission list.", nav:"assessment", accent:B.gold, bg:B.goldBg },
              { icon:"⊕", title:"Opportunity Database",  desc:"Residencies, grants, open calls, art fairs and biennials worldwide — Mexico, Latin America, Europe, USA and beyond.", nav:"opportunities", accent:B.sage, bg:B.sageBg },
              { icon:"◎", title:"Gallery Matching",      desc:"20 galleries matched to your exact practice — with entry strategy, fit analysis, and a personalised outreach template.", nav:"galleries", accent:B.blue, bg:B.blueBg },
              { icon:"→", title:"Career Missions",       desc:"Not goals — missions. Specific, prioritised, actionable tasks that earn XP and move you toward the next level.", nav:"assessment", accent:B.rust, bg:B.rustBg },
              { icon:"↑", title:"Level Roadmap",         desc:"Your full five-level career roadmap, with milestones marked completed, in-progress, and locked.", nav:"assessment", accent:B.purple, bg:B.purpleBg },
              { icon:"◉", title:"Live Deadlines",        desc:"Every opportunity has a deadline. Stratum surfaces what's urgent, what's rolling, and what to prioritise this week.", nav:"opportunities", accent:B.sage, bg:B.sageBg },
            ].map((f,i) => (
              <div key={i} className="feat-card" onClick={() => onNavigate(f.nav)}
                style={{ background:B.bg3, padding:"32px 26px", border:`1px solid ${B.border}`, cursor:"pointer" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"8px", background:f.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"18px" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", color:f.accent }}>{f.icon}</span>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:400, color:B.ink, marginBottom:"10px", lineHeight:1.2 }}>{f.title}</div>
                <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding:"60px 40px", background:B.ink, borderTop:`1px solid ${B.border}` }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(255,255,255,0.05)" }}>
          {[["20+","Gallery Profiles"],["5","Career Levels"],["80+","Opportunities"],["Free","To Start"]].map(([n,l]) => (
            <div key={l} style={{ background:B.ink, padding:"40px 20px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", fontWeight:300, color:B.gold, lineHeight:1, marginBottom:"8px" }}>{n}</div>
              <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"100px 40px", background:B.bg3 }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:B.gold, marginBottom:"14px", fontWeight:500 }}>From Artists</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"42px", fontWeight:300, color:B.ink }}>What they say.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
            {[
              { q:"I'd been making work for six years with no idea what 'the next step' actually meant. Stratum gave me a concrete list for the first time.", name:"Painter, Level 3", city:"Ciudad de México" },
              { q:"The gallery matching system alone is worth it. I approached three galleries from my match list and two responded within a week.", name:"Sculptor, Level 2", city:"Guadalajara" },
              { q:"I used to spend hours searching for residency deadlines. Now I open Stratum and my whole quarter is mapped in five minutes.", name:"Photographer, Level 4", city:"Buenos Aires" },
            ].map((t,i) => (
              <div key={i} style={{ padding:"28px", border:`1px solid ${B.border}`, background:B.bg, position:"relative" }}>
                <div style={{ position:"absolute", top:"12px", left:"18px", fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", color:B.gold, opacity:0.15, lineHeight:1 }}>"</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", fontStyle:"italic", color:B.mid, lineHeight:1.7, marginBottom:"18px", paddingTop:"18px" }}>"{t.q}"</div>
                <div style={{ fontSize:"9px", letterSpacing:"0.15em", color:B.muted }}>{t.name} · {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding:"100px 40px", background:B.gold, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"relative", zIndex:2 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,5.5vw,68px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:"20px" }}>
            Your career has a level.<br /><em>Find out which one.</em>
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:"rgba(255,255,255,0.8)", marginBottom:"36px" }}>Free assessment. No account required.</p>
          <button className="btn" onClick={() => onNavigate("assessment")} style={{ padding:"18px 56px", background:B.ink, color:"#fff", fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
            Begin Your Assessment →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"36px 40px", background:B.bg, borderTop:`1px solid ${B.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
        </div>
        <div style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:B.muted }}>Artist Career Intelligence</div>
        <div style={{ fontSize:"9px", letterSpacing:"0.15em", color:B.muted }}>© 2026 Stratum</div>
      </footer>
    </div>
  );
}
