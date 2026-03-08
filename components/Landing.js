import { useState } from "react";

const BRAND = {
  ink: "#0a0908", ink2: "#111009",
  bone: "#f4efe6", mist: "#a09890", smoke: "#706860", ash: "#504840", char: "#302820",
  gold: "#c8a84b", goldWire: "rgba(200,168,75,0.1)", goldDim: "rgba(200,168,75,0.12)",
  rust: "#b04518", sage: "#697b6c",
  levels: {
    1: "#7a8fa6", 2: "#697b6c", 3: "#c8a84b", 4: "#b04518", 5: "#4a2a10"
  }
};

const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

export default function Landing({ onNavigate }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const LEVEL_DATA = [
    { n: 5, name: "The Institutional Artist", desc: "Biennials, museum shows, permanent collections" },
    { n: 4, name: "The Market Artist",        desc: "Gallery rep, art fairs, international exhibitions" },
    { n: 3, name: "The Emerging Voice",       desc: "3–7 solo shows, commercial gallery, residencies" },
    { n: 2, name: "The Local Presence",       desc: "1–2 solo shows, local press, consistent sales" },
    { n: 1, name: "The Foundation",           desc: "First group shows, artist statement, finding voice" },
  ];

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: BRAND.ink, color: BRAND.bone }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
        .cta-btn { transition: all 0.22s; cursor: pointer; }
        .cta-btn:hover { transform: translateY(-2px); }
        .cta-primary:hover { background: #f4efe6 !important; }
        .cta-secondary:hover { border-color: rgba(244,239,230,0.5) !important; color: #f4efe6 !important; }
        .feat-card { transition: all 0.25s; }
        .feat-card:hover { background: #161410 !important; border-color: rgba(200,168,75,0.25) !important; transform: translateY(-2px); }
        .level-row { transition: all 0.25s; cursor: default; }
        .level-row:hover .level-orb { transform: scale(1.08); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drift  { 0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)} }
        @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(100vh)} }
        .f1{animation:fadeUp .9s ease forwards .1s;opacity:0}
        .f2{animation:fadeUp .9s ease forwards .3s;opacity:0}
        .f3{animation:fadeUp .9s ease forwards .5s;opacity:0}
        .f4{animation:fadeUp .9s ease forwards .7s;opacity:0}
        .f5{animation:fadeUp .9s ease forwards .9s;opacity:0}
      `}</style>

      {/* ── STICKY NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"14px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(10,9,8,0.92)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${BRAND.goldWire}` }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:300 }}>
          Str<span style={{ color:BRAND.gold, fontStyle:"italic" }}>a</span>tum
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button className="cta-btn cta-secondary" onClick={() => onNavigate("assessment")} style={{ padding:"8px 20px", background:"transparent", color:BRAND.mist, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", border:`1px solid rgba(255,255,255,0.1)`, cursor:"pointer" }}>
            Assessment
          </button>
          <button className="cta-btn cta-primary" onClick={() => onNavigate("assessment")} style={{ padding:"8px 20px", background:BRAND.gold, color:BRAND.ink, fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
            Begin →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", padding:"0 40px" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:noiseSVG, pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 15% 85%, rgba(200,168,75,0.07), transparent 60%), radial-gradient(ellipse 50% 70% at 85% 15%, rgba(176,69,24,0.05), transparent 60%)` }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)`, backgroundSize:"80px 80px" }} />

        {/* Floating level orbs */}
        {[1,2,3,4,5].map((l,i) => {
          const pos = [{top:"18%",left:"6%"},{bottom:"24%",left:"3%"},{top:"28%",right:"5%"},{bottom:"28%",right:"8%"},{top:"55%",right:"2%"}][i];
          return (
            <div key={l} style={{ position:"absolute", ...pos, width:"48px", height:"48px", borderRadius:"50%", border:`1px solid ${BRAND.levels[l]}55`, display:"flex", alignItems:"center", justifyContent:"center", animation:`drift ${5+l}s ease-in-out infinite`, animationDelay:`${l*0.6}s`, opacity:0.45 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:300, color:BRAND.levels[l] }}>{l}</span>
            </div>
          );
        })}

        {/* Scanline */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", opacity:0.012 }}>
          <div style={{ position:"absolute", left:0, right:0, height:"2px", background:BRAND.gold, animation:"scanline 9s linear infinite" }} />
        </div>

        <div style={{ textAlign:"center", position:"relative", zIndex:2, maxWidth:"820px" }}>
          <div className="f1" style={{ fontSize:"9px", letterSpacing:"0.45em", textTransform:"uppercase", color:BRAND.gold, marginBottom:"28px" }}>Artist Career Intelligence</div>
          <h1 className="f2" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(72px,12vw,148px)", fontWeight:300, lineHeight:0.88, letterSpacing:"-0.02em", marginBottom:"32px" }}>
            Str<span style={{ color:BRAND.gold, fontStyle:"italic" }}>a</span>tum
          </h1>
          <p className="f3" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:300, color:BRAND.mist, lineHeight:1.65, marginBottom:"48px", maxWidth:"520px", margin:"0 auto 48px" }}>
            The art world has a path.<br />
            Most artists never see it.<br />
            <em style={{ color:BRAND.bone }}>Stratum maps the way.</em>
          </p>
          <div className="f4" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="cta-btn cta-primary" onClick={() => onNavigate("assessment")} style={{ padding:"16px 44px", background:BRAND.gold, color:BRAND.ink, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
              Begin Assessment →
            </button>
            <button className="cta-btn cta-secondary" onClick={() => onNavigate("opportunities")} style={{ padding:"16px 44px", background:"transparent", color:BRAND.bone, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", border:`1px solid rgba(244,239,230,0.18)`, cursor:"pointer" }}>
              Browse Opportunities
            </button>
          </div>
          <div className="f5" style={{ display:"flex", gap:"48px", justifyContent:"center", marginTop:"72px" }}>
            {[["5","Career Levels"],["20+","Gallery Profiles"],["Free","To Start"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"40px", fontWeight:300, color:BRAND.gold, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:BRAND.ash, marginTop:"5px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEVEL SYSTEM ── */}
      <section style={{ padding:"100px 40px", background:BRAND.ink2, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:noiseSVG, pointerEvents:"none" }} />
        <div style={{ maxWidth:"1080px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center", position:"relative" }}>
          <div>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:BRAND.gold, marginBottom:"16px" }}>The Level System</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", fontWeight:300, lineHeight:1.05, marginBottom:"24px" }}>
              Five levels.<br /><em style={{ color:BRAND.mist }}>One clear path.</em>
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", color:BRAND.mist, lineHeight:1.75, marginBottom:"32px" }}>
              The contemporary art world operates on an invisible hierarchy. Stratum makes it visible — mapping your position, naming the credentials you need, and surfacing the right opportunities at every stage.
            </p>
            <button className="cta-btn cta-primary" onClick={() => onNavigate("assessment")} style={{ padding:"14px 36px", background:BRAND.gold, color:BRAND.ink, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
              Find Your Level →
            </button>
          </div>

          {/* Level stack */}
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"27px", top:"28px", bottom:"28px", width:"1px", background:`linear-gradient(to bottom, ${BRAND.gold}, ${BRAND.char})` }} />
            {LEVEL_DATA.map(({ n, name, desc }) => {
              const c = BRAND.levels[n];
              const isHov = hoveredLevel === n;
              return (
                <div key={n} className="level-row" onMouseEnter={() => setHoveredLevel(n)} onMouseLeave={() => setHoveredLevel(null)} style={{ display:"flex", gap:"20px", alignItems:"flex-start", marginBottom:"22px" }}>
                  <div className="level-orb" style={{ width:"54px", height:"54px", borderRadius:"50%", border:`2px solid ${c}`, background: isHov ? c : "rgba(10,9,8,0.85)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.3s", position:"relative", zIndex:2 }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:300, color: isHov ? BRAND.ink : c, transition:"color 0.3s" }}>{n}</span>
                  </div>
                  <div style={{ paddingTop:"10px" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontStyle:"italic", color: isHov ? BRAND.bone : BRAND.mist, transition:"color 0.3s", marginBottom:"3px" }}>{name}</div>
                    <div style={{ fontSize:"10px", color: isHov ? BRAND.smoke : BRAND.char, lineHeight:1.5, transition:"color 0.3s" }}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:"100px 40px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:noiseSVG, pointerEvents:"none" }} />
        <div style={{ maxWidth:"1080px", margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:"64px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:BRAND.gold, marginBottom:"16px" }}>The Platform</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"48px", fontWeight:300, lineHeight:1.1 }}>
              Everything you need.<br /><em style={{ color:BRAND.mist }}>Nothing you don't.</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:BRAND.goldWire }}>
            {[
              { icon:"∴", title:"AI Career Assessment",  desc:"Upload your CV and statement. Our AI places you on the level system instantly — with scores, gaps, and a personalised mission list.", nav:"assessment" },
              { icon:"⊕", title:"Opportunity Database",  desc:"Residencies, grants, open calls, art fairs, and biennials. Filtered by your level, discipline, and geography.", nav:"opportunities" },
              { icon:"◎", title:"Gallery Matching",      desc:"20 galleries matched to your exact practice — with entry strategy, fit analysis, and a personalised outreach template.", nav:"galleries" },
              { icon:"→", title:"Career Missions",       desc:"Not goals — missions. Specific, prioritised, actionable tasks that earn XP and move you toward the next level.", nav:"assessment" },
              { icon:"↑", title:"Level Roadmap",         desc:"Your full five-level career roadmap, with milestones marked completed, in-progress, and locked.", nav:"assessment" },
              { icon:"◉", title:"Live Deadlines",        desc:"Every opportunity has a deadline. Stratum surfaces what's urgent, what's rolling, and what to prioritise this week.", nav:"opportunities" },
            ].map((f,i) => (
              <div key={i} className="feat-card" onClick={() => onNavigate(f.nav)} style={{ background:BRAND.ink2, padding:"36px 28px", border:"1px solid transparent", cursor:"pointer" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", color:BRAND.gold, marginBottom:"18px", lineHeight:1 }}>{f.icon}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"21px", fontWeight:400, color:BRAND.bone, marginBottom:"10px", lineHeight:1.2 }}>{f.title}</div>
                <div style={{ fontSize:"11px", color:BRAND.mist, lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ padding:"60px 40px", background:BRAND.ink2, borderTop:`1px solid ${BRAND.goldWire}`, borderBottom:`1px solid ${BRAND.goldWire}` }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:BRAND.goldWire }}>
          {[["20","Gallery Profiles"],["5","Career Levels"],["36+","Opportunities"],["100%","Free to Start"]].map(([n,l]) => (
            <div key={l} style={{ background:BRAND.ink2, padding:"36px 20px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"52px", fontWeight:300, color:BRAND.gold, lineHeight:1, marginBottom:"8px" }}>{n}</div>
              <div style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:BRAND.ash }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"100px 40px" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase", color:BRAND.gold, marginBottom:"14px" }}>From Artists</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"42px", fontWeight:300 }}>What they say.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
            {[
              { q:"I'd been making work for six years with no idea what 'the next step' actually meant. Stratum gave me a concrete list for the first time.", name:"Painter, Level 3", city:"Madrid" },
              { q:"The gallery matching system alone is worth it. I approached three galleries from my match list and two responded within a week.", name:"Sculptor, Level 2", city:"London" },
              { q:"I used to spend hours searching for residency deadlines. Now I open Stratum and my whole quarter is mapped in five minutes.", name:"Photographer, Level 4", city:"Berlin" },
            ].map((t,i) => (
              <div key={i} style={{ padding:"28px", border:`1px solid ${BRAND.goldWire}`, position:"relative" }}>
                <div style={{ position:"absolute", top:"16px", left:"20px", fontFamily:"'Cormorant Garamond',serif", fontSize:"48px", color:BRAND.gold, opacity:0.18, lineHeight:1 }}>"</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", fontStyle:"italic", color:BRAND.mist, lineHeight:1.7, marginBottom:"18px", paddingTop:"14px" }}>"{t.q}"</div>
                <div style={{ fontSize:"9px", letterSpacing:"0.15em", color:BRAND.ash }}>{t.name} · {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:"100px 40px", background:BRAND.ink2, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,168,75,0.055), transparent 70%)` }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,5.5vw,68px)", fontWeight:300, lineHeight:1.1, marginBottom:"20px" }}>
            Your career has a level.<br /><em style={{ color:BRAND.gold }}>Find out which one.</em>
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:BRAND.mist, marginBottom:"36px" }}>Free assessment. No account required.</p>
          <button className="cta-btn cta-primary" onClick={() => onNavigate("assessment")} style={{ padding:"18px 56px", background:BRAND.gold, color:BRAND.ink, fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
            Begin Your Assessment →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"36px 40px", borderTop:`1px solid ${BRAND.goldWire}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:300 }}>
          Str<span style={{ color:BRAND.gold, fontStyle:"italic" }}>a</span>tum
        </div>
        <div style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:BRAND.ash }}>Artist Career Intelligence</div>
        <div style={{ fontSize:"9px", letterSpacing:"0.15em", color:BRAND.char }}>© 2026 Stratum</div>
      </footer>
    </div>
  );
}
