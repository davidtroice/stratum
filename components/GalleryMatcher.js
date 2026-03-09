import { useState, useMemo } from "react";

const D = {
  black:"#ffffff", dark:"#f7f6f2", dark2:"#eeece8", dark3:"#e4e2dd",
  white:"#0a0a0a", accent:"#1a1a1a", accentD:"#333333",
  mid:"#555552", muted:"#888884", border:"rgba(10,10,10,0.1)", borderMed:"rgba(10,10,10,0.2)",
};

const GALLERIES = [
  { id:1,  name:"Kurimanzutto", city:"CDMX / New York", country:"México", tier:5, disciplines:["all"], aesthetics:["conceptual","post-colonial","Latin American","political","community"], levels:[4,5], about:"Mexico's most internationally significant gallery. Champions artists with conceptual rigour and strong institutional profiles.", artists:["Gabriel Orozco","Damián Ortega","Rirkrit Tiravanija"], entry:"referral", entryNote:"Invitation only. Requires museum-level institutional profile and significant international presence.", openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO"], url:"https://kurimanzutto.com" },
  { id:2,  name:"Labor", city:"CDMX", country:"México", tier:4, disciplines:["painting","drawing","sculpture","installation","photography"], aesthetics:["minimal","conceptual","material","process","abstraction"], levels:[3,4,5], about:"One of Mexico City's most respected galleries. Known for rigorous, often quiet conceptual and material practices.", artists:["Mario García Torres","Gerardo Goldwasser"], entry:"referral", entryNote:"Approaches via trusted curators or artists. Strong institutional CV required.", openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO"], url:"https://labor.org.mx" },
  { id:3,  name:"OMR", city:"CDMX", country:"México", tier:4, disciplines:["painting","sculpture","installation","video"], aesthetics:["figurative","political","body","identity","Latin American"], levels:[3,4,5], about:"Established CDMX gallery with strong Latin American and international roster. Excellent fair presence.", artists:["Bosco Sodi","Pia Camil"], entry:"referral", entryNote:"Referral from existing artists or curators preferred. Strong CV essential.", openSubmissions:false, fairPresence:["Art Basel","ZONAMACO","Frieze"], url:"https://galeria-omr.com" },
  { id:4,  name:"Proyectos Monclova", city:"CDMX", country:"México", tier:3, disciplines:["painting","drawing","installation","video","photography"], aesthetics:["conceptual","emerging","experimental","identity","process"], levels:[2,3,4], about:"CDMX gallery focused on emerging and mid-career artists. More accessible than top-tier Mexican galleries. Good first gallery relationship.", artists:["Yoshua Okón","Pia Camil"], entry:"submission", entryNote:"Accepts portfolio submissions. Include full CV, statement, documentation. Spanish fluency helps.", openSubmissions:true, fairPresence:["ZONAMACO","NADA","Material Art Fair"], url:"https://proyectosmonclova.com" },
  { id:5,  name:"Hilario Galguera", city:"CDMX", country:"México", tier:4, disciplines:["painting","sculpture","installation"], aesthetics:["figurative","material","international","painting"], levels:[3,4,5], about:"One of Mexico's most commercially active galleries. Strong international connections and fair presence.", artists:["Francis Alÿs","Javier Marín"], entry:"referral", entryNote:"Referral only. Strong sales history and institutional profile preferred.", openSubmissions:false, fairPresence:["Art Basel","Frieze","ZONAMACO"], url:"https://hilariogalguera.com" },
  { id:6,  name:"Bikini Wax", city:"CDMX", country:"México", tier:2, disciplines:["all"], aesthetics:["experimental","emerging","critical","community","process"], levels:[1,2,3], about:"Apartment gallery and independent space. Key platform for emerging Mexican artists. Strong critical and curatorial discourse.", artists:["Open programme"], entry:"open-call", entryNote:"Regular open calls and invited projects. One of the most accessible quality spaces in CDMX for emerging artists.", openSubmissions:true, fairPresence:["Salón ACME"], url:"https://bikiniwax.mx" },
  { id:7,  name:"Casa Maauad", city:"CDMX", country:"México", tier:3, disciplines:["painting","drawing","photography","sculpture"], aesthetics:["figurative","landscape","Mexican","painting","photography"], levels:[2,3,4], about:"Mid-size CDMX gallery with focus on Mexican and Latin American figurative and documentary practices.", artists:["Various Mexican artists"], entry:"submission", entryNote:"Accepts portfolio submissions. Mexican or Latin American connection preferred.", openSubmissions:true, fairPresence:["ZONAMACO","Material Art Fair"], url:"https://maauad.com" },
  { id:8,  name:"Arróniz Arte Contemporáneo", city:"CDMX", country:"México", tier:3, disciplines:["painting","drawing","installation","photography"], aesthetics:["abstract","material","process","painting","Mexican"], levels:[2,3,4], about:"CDMX gallery with strong focus on painting and works on paper. Good entry point for painters in the Mexican market.", artists:["Various Mexican painters"], entry:"submission", entryNote:"Accepts portfolio submissions with CV and statement. Painting-focused practices preferred.", openSubmissions:true, fairPresence:["ZONAMACO","Material Art Fair"], url:"https://arroniz.mx" },
  { id:9,  name:"Galerie Chantal Crousel", city:"Paris", country:"France", tier:5, disciplines:["installation","video","sculpture","painting"], aesthetics:["conceptual","political","post-colonial","memory","archive"], levels:[4,5], about:"Leading Paris gallery. Champions artists with rigorous conceptual practices and international institutional profiles.", artists:["Danh Vo","Hassan Khan"], entry:"referral", entryNote:"Invitation and referral only. Approach after museum-level shows in Europe.", openSubmissions:false, fairPresence:["Art Basel","FIAC","Frieze"], url:"https://crousel.com" },
  { id:10, name:"Sadie Coles HQ", city:"London", country:"UK", tier:4, disciplines:["painting","sculpture","installation","video"], aesthetics:["conceptual","figurative","political","body","identity","feminist"], levels:[4,5], about:"One of London's most respected galleries. Conceptually rigorous with strong institutional connections.", artists:["Sarah Lucas","Luc Tuymans"], entry:"referral", entryNote:"Rarely accepts unsolicited submissions. Best through mutual artist or curator after significant institutional show.", openSubmissions:false, fairPresence:["Frieze London","Art Basel","Frieze Masters"], url:"https://sadiecoles.com" },
  { id:11, name:"Studio Voltaire", city:"London", country:"UK", tier:3, disciplines:["all"], aesthetics:["experimental","emerging","community","identity","social practice"], levels:[2,3], about:"Non-profit gallery and studios supporting emerging artists. Strong emphasis on risk-taking and underrepresented voices.", artists:["Open programme"], entry:"open-call", entryNote:"Regular open calls for exhibitions and residencies. One of the most accessible quality spaces in London.", openSubmissions:true, fairPresence:[], url:"https://studiovoltaire.org" },
  { id:12, name:"Carlos/Ishikawa", city:"London", country:"UK", tier:3, disciplines:["painting","sculpture","installation","video"], aesthetics:["emerging","experimental","queer","identity","painting"], levels:[2,3,4], about:"East London gallery championing emerging international artists. Strong critical reputation and growing institutional ties.", artists:["Phoebe Unwin","Alberta Whittle"], entry:"submission", entryNote:"Accepts portfolio submissions. Strong emerging profile with institutional support preferred.", openSubmissions:true, fairPresence:["Frieze","Liste","NADA"], url:"https://carlosishikawa.com" },
  { id:13, name:"BEERS London", city:"London", country:"UK", tier:2, disciplines:["all"], aesthetics:["emerging","figurative","painting","experimental"], levels:[2,3], about:"London commercial gallery with residency programme. Accessible entry point for emerging artists.", artists:["Open programme"], entry:"open-call", entryNote:"Regular open calls. Residency programme concludes in solo exhibition. Accessible to emerging artists.", openSubmissions:true, fairPresence:["NADA","Untitled"], url:"https://beerslondon.com" },
  { id:14, name:"Galerie Eigen + Art", city:"Berlin / Leipzig", country:"Germany", tier:4, disciplines:["painting","drawing","sculpture","installation"], aesthetics:["painting","material","process","East European","figurative"], levels:[3,4], about:"Leipzig and Berlin gallery with strong history in painting. Known for bringing Eastern European artists to international attention.", artists:["Neo Rauch","Carsten Nicolai"], entry:"referral", entryNote:"Prefers referrals. Strong painting-based CV essential. Connection to German or Eastern European scene helps.", openSubmissions:false, fairPresence:["Art Basel","Frieze","Liste"], url:"https://eigen-art.com" },
  { id:15, name:"Galería Ruth Benzacar", city:"Buenos Aires", country:"Argentina", tier:4, disciplines:["all"], aesthetics:["conceptual","Latin American","political","abstraction","emerging"], levels:[3,4,5], about:"Argentina's most internationally respected gallery. Strong conceptual programme and Latin American focus.", artists:["Adrián Villar Rojas","Graciela Sacco"], entry:"referral", entryNote:"Referral from trusted artists or curators. Significant Latin American institutional profile required.", openSubmissions:false, fairPresence:["Art Basel","arteBA","Frieze"], url:"https://ruthbenzacar.com" },
  { id:16, name:"Galeria Luisa Strina", city:"São Paulo", country:"Brazil", tier:4, disciplines:["installation","video","sculpture","painting"], aesthetics:["conceptual","Latin American","political","body","identity"], levels:[3,4,5], about:"São Paulo's most internationally significant gallery. Pioneer in bringing Latin American art to global attention.", artists:["Cildo Meireles","Rivane Neuenschwander"], entry:"referral", entryNote:"Invitation only. Museum-level Latin American institutional profile required.", openSubmissions:false, fairPresence:["Art Basel","Frieze","SP-Arte"], url:"https://galerialuisastrina.com.br" },
  { id:17, name:"Galería del Paseo", city:"Montevideo / Punta del Este", country:"Uruguay", tier:3, disciplines:["painting","sculpture","photography"], aesthetics:["Latin American","figurative","landscape","material"], levels:[2,3,4], about:"Important regional gallery with strong Latin American collector base and fair presence.", artists:["Various Latin American artists"], entry:"submission", entryNote:"Accepts portfolio submissions. Latin American connection preferred.", openSubmissions:true, fairPresence:["Art Basel Miami","ZONAMACO","arteBA"], url:"https://galeriapaseo.com" },
  { id:18, name:"GRIMM Gallery", city:"Amsterdam / New York", country:"Netherlands", tier:4, disciplines:["painting","sculpture","installation","photography"], aesthetics:["figurative","material","process","painting","photography"], levels:[3,4], about:"Strong mid-size gallery with dual Amsterdam/NY presence. Painting and photography focus.", artists:["Folkert de Jong","Ryan Mrozowski"], entry:"submission", entryNote:"Accepts portfolio submissions. Strong painting or photography practice preferred.", openSubmissions:true, fairPresence:["Art Basel","Frieze","TEFAF"], url:"https://grimmgallery.com" },
  { id:19, name:"Galerie Eva Presenhuber", city:"Zurich / Vienna", country:"Switzerland", tier:4, disciplines:["painting","sculpture","installation","video"], aesthetics:["conceptual","material","abstraction","painting","minimal"], levels:[3,4,5], about:"Prestigious Swiss gallery with strong international programme. Known for rigorous material and conceptual practices.", artists:["Ugo Rondinone","Monika Sosnowska"], entry:"referral", entryNote:"Referral only. Strong institutional profile and significant exhibition history required.", openSubmissions:false, fairPresence:["Art Basel","Frieze","FIAC"], url:"https://presenhuber.com" },
  { id:20, name:"Copperfield Gallery", city:"London", country:"UK", tier:2, disciplines:["painting","drawing","sculpture"], aesthetics:["emerging","figurative","painting","drawing","material"], levels:[1,2,3], about:"East London emerging gallery. Accessible entry point with growing collector base.", artists:["Emerging UK artists"], entry:"submission", entryNote:"Accepts portfolio submissions. Good starting point for UK-based painters and draughtsmen.", openSubmissions:true, fairPresence:["Condo","Liste"], url:"https://copperfieldgallery.com" },
];

const TIER_LABEL = {1:"Independent",2:"Emerging Commercial",3:"Established",4:"International",5:"Top Tier"};

export default function GalleryMatcher({ isPro=false, onUpgrade }) {
  const [filters, setFilters] = useState({ region:"all", discipline:"all", level:"all", entry:"all" });
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return GALLERIES.filter(g => {
      if (filters.region !== "all") {
        const regionMap = { mexico:["México"], latam:["Argentina","Brazil","Uruguay","Colombia"], europe:["UK","France","Germany","Netherlands","Switzerland","Spain","Italy"], uk:["UK"] };
        const countries = regionMap[filters.region]||[];
        if (!countries.includes(g.country)) return false;
      }
      if (filters.discipline !== "all" && !g.disciplines.includes("all") && !g.disciplines.includes(filters.discipline)) return false;
      if (filters.level !== "all" && !g.levels.includes(parseInt(filters.level))) return false;
      if (filters.entry !== "all" && g.entry !== filters.entry) return false;
      return true;
    });
  }, [filters]);

  const visible = isPro ? filtered : filtered.slice(0, 4);

  const F = ({ k, val, label }) => (
    <button onClick={() => setFilters(f => ({...f,[k]:val}))}
      style={{ padding:"6px 14px", background:filters[k]===val?D.white:"transparent", color:filters[k]===val?D.black:D.mid, border:`1px solid ${filters[k]===val?D.white:D.border}`, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", borderRadius:"3px", transition:"all 0.15s", whiteSpace:"nowrap" }}>
      {label}
    </button>
  );

  const gallery = selected ? GALLERIES.find(g => g.id === selected) : null;

  return (
    <div style={{ minHeight:"100vh", background:D.black, color:D.white, paddingTop:"64px", fontFamily:"monospace" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap'); ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#f7f6f2} ::-webkit-scrollbar-thumb{background:#ccc}`}</style>

      <div style={{ display:"grid", gridTemplateColumns: gallery ? "1fr 420px" : "1fr", minHeight:"calc(100vh - 64px)" }}>

        {/* MAIN PANEL */}
        <div style={{ display:"flex", flexDirection:"column" }}>

          {/* Header */}
          <div style={{ padding:"40px 48px 28px", borderBottom:`1px solid ${D.border}` }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase", color:D.mid, marginBottom:"10px" }}>Gallery Matcher · Pro</div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,56px)", fontWeight:600, color:D.white, lineHeight:1, textTransform:"uppercase", marginBottom:"6px" }}>Find Your Gallery.</h1>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:D.mid, fontStyle:"italic" }}>
              {isPro ? `${filtered.length} galleries matched.` : `Showing 4 of ${filtered.length}. Upgrade for full access.`}
            </p>
          </div>

          {/* Filters */}
          <div style={{ padding:"20px 48px", borderBottom:`1px solid ${D.border}` }}>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"8px" }}>
              {[["all","All Regions"],["mexico","México"],["latam","Latin America"],["europe","Europe"],["uk","UK"]].map(([v,l]) => <F key={v} k="region" val={v} label={l}/>)}
            </div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"8px" }}>
              {[["all","All Disciplines"],["painting","Painting"],["sculpture","Sculpture"],["installation","Installation"],["video","Video"],["photography","Photography"]].map(([v,l]) => <F key={v} k="discipline" val={v} label={l}/>)}
            </div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {[["all","All Levels"],["2","Level 2"],["3","Level 3"],["4","Level 4"],["5","Level 5"]].map(([v,l]) => <F key={v} k="level" val={v} label={l}/>)}
              <div style={{ width:"1px", background:D.border, margin:"0 4px" }}/>
              {[["all","Any Entry"],["open-call","Open Call"],["submission","Portfolio Sub."],["referral","Referral Only"]].map(([v,l]) => <F key={v} k="entry" val={v} label={l}/>)}
            </div>
          </div>

          {/* Gallery list */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {visible.map(g => (
              <div key={g.id} onClick={() => setSelected(selected === g.id ? null : g.id)}
                style={{ padding:"22px 48px", borderBottom:`1px solid ${D.border}`, cursor:"pointer", background:selected===g.id?D.dark2:D.black, transition:"background 0.15s" }}
                onMouseEnter={e => { if(selected!==g.id) e.currentTarget.style.background = D.dark }}
                onMouseLeave={e => { if(selected!==g.id) e.currentTarget.style.background = D.black }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"5px" }}>
                      <span style={{ fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"2px 8px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>Tier {g.tier} — {TIER_LABEL[g.tier]}</span>
                      {g.openSubmissions && <span style={{ fontSize:"8px", color:"#709070", letterSpacing:"0.1em" }}>OPEN SUBMISSIONS</span>}
                    </div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"24px", color:D.white, lineHeight:1.2, marginBottom:"3px" }}>{g.name}</div>
                    <div style={{ fontSize:"10px", color:D.mid }}>{g.city} · {g.country}</div>
                  </div>
                  <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", maxWidth:"260px", justifyContent:"flex-end" }}>
                    {g.aesthetics.slice(0,3).map(a => (
                      <span key={a} style={{ fontSize:"8px", padding:"3px 7px", border:`1px solid ${D.border}`, color:D.muted, borderRadius:"3px" }}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {!isPro && filtered.length > 4 && (
              <div style={{ padding:"48px", textAlign:"center", borderBottom:`1px solid ${D.border}` }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"26px", fontStyle:"italic", color:D.white, marginBottom:"10px" }}>
                  {filtered.length - 4} more galleries in Pro.
                </div>
                <p style={{ fontSize:"11px", color:D.mid, marginBottom:"22px" }}>Full profiles, entry strategies, and contact intelligence.</p>
                <button onClick={onUpgrade} style={{ padding:"13px 36px", background:D.white, border:"1px solid rgba(10,10,10,0.8)", color:D.black, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", cursor:"pointer", borderRadius:"4px" }}>
                  Unlock Gallery Matcher →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DETAIL PANEL */}
        {gallery && (
          <div style={{ background:D.dark, borderLeft:`1px solid ${D.border}`, height:"calc(100vh - 64px)", overflowY:"auto", position:"sticky", top:"64px" }}>
            <div style={{ padding:"28px 28px 20px", borderBottom:`1px solid ${D.border}`, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.mid, marginBottom:"8px" }}>Tier {gallery.tier} — {TIER_LABEL[gallery.tier]}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"28px", fontWeight:600, color:D.white, lineHeight:1.1, marginBottom:"4px" }}>{gallery.name}</div>
                <div style={{ fontSize:"11px", color:D.mid }}>{gallery.city} · {gallery.country}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background:"transparent", border:`1px solid ${D.border}`, color:D.mid, width:"28px", height:"28px", cursor:"pointer", borderRadius:"4px", fontSize:"14px" }}>×</button>
            </div>

            <div style={{ padding:"24px 28px" }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", color:D.mid, lineHeight:1.7, marginBottom:"20px" }}>{gallery.about}</p>

              {/* Artists */}
              <div style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.muted, marginBottom:"10px" }}>Known Artists</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {gallery.artists.map(a => <span key={a} style={{ fontSize:"10px", padding:"4px 10px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>{a}</span>)}
                </div>
              </div>

              {/* Fairs */}
              {gallery.fairPresence.length > 0 && (
                <div style={{ marginBottom:"20px" }}>
                  <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.muted, marginBottom:"10px" }}>Fair Presence</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                    {gallery.fairPresence.map(f => <span key={f} style={{ fontSize:"10px", padding:"4px 10px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>{f}</span>)}
                  </div>
                </div>
              )}

              {/* Levels */}
              <div style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.muted, marginBottom:"10px" }}>Career Level Match</div>
                <div style={{ display:"flex", gap:"6px" }}>
                  {[1,2,3,4,5].map(l => (
                    <div key={l} style={{ width:"36px", height:"36px", border:`1px solid ${gallery.levels.includes(l)?D.borderMed:D.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:"18px", color:gallery.levels.includes(l)?D.white:D.muted, background:gallery.levels.includes(l)?D.dark2:"transparent" }}>{l}</div>
                  ))}
                </div>
              </div>

              {/* Entry */}
              <div style={{ padding:"20px", background:D.dark2, border:`1px solid ${D.borderMed}`, borderRadius:"4px", marginBottom:"20px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:gallery.openSubmissions?"#709070":"#c06050", marginBottom:"10px" }}>
                  {gallery.openSubmissions ? "✓ Open to Submissions" : "✗ Referral / Invitation Only"}
                </div>
                <p style={{ fontSize:"12px", color:D.mid, lineHeight:1.7 }}>{gallery.entryNote}</p>
              </div>

              {/* Aesthetics */}
              <div style={{ marginBottom:"24px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:D.muted, marginBottom:"10px" }}>Aesthetic Profile</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {gallery.aesthetics.map(a => <span key={a} style={{ fontSize:"9px", padding:"4px 10px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>{a}</span>)}
                </div>
              </div>

              <a href={gallery.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", padding:"13px", background:"transparent", border:`1px solid ${D.borderMed}`, color:D.white, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", textAlign:"center", textDecoration:"none", borderRadius:"4px", transition:"all 0.15s" }}
                onMouseEnter={e => { e.target.style.background = D.dark2 }}
                onMouseLeave={e => { e.target.style.background = "transparent" }}>
                Visit Gallery Website ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
