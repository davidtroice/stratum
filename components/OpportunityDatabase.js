import { useState, useMemo } from "react";

const D = {
  black:"#0a0a0a", dark:"#111111", dark2:"#1a1a1a", dark3:"#222222",
  white:"#f5f4f0", mid:"#888884", muted:"#555552",
  border:"rgba(245,244,240,0.08)", borderMed:"rgba(245,244,240,0.15)",
};

const TYPE_META = {
  residency:  { label:"Residency",  color:"#909090" },
  grant:      { label:"Grant",      color:"#c06050" },
  exhibition: { label:"Open Call",  color:"#e0ddd8" },
  fair:       { label:"Art Fair",   color:"#707070" },
  biennial:   { label:"Biennial",   color:"#a08070" },
  gallery:    { label:"Gallery",    color:"#808080" },
};

const OPPORTUNITIES = [
  { id:1,  type:"residency",  name:"NARS Foundation International Residency", org:"NARS Foundation", city:"Brooklyn", country:"USA", region:"north-america", duration:"3–12 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Studio space with monthly curator visits, open studios, and community programming. Strong for international artists seeking NYC exposure." },
  { id:2,  type:"residency",  name:"Roswell Artist-in-Residence", org:"Roswell Museum", city:"Roswell", country:"USA", region:"north-america", duration:"12 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[3,4], deadline:"Mar 15, 2026", description:"Year-long stipended residency concluding in a solo museum exhibition and artwork acquisition." },
  { id:3,  type:"residency",  name:"DAAD Artists-in-Berlin", org:"DAAD", city:"Berlin", country:"Germany", region:"europe", duration:"12 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jan 2027", description:"Prestigious annual fellowship placing international artists in Berlin with living stipend, studio, and institutional support." },
  { id:4,  type:"residency",  name:"Cité Internationale des Arts", org:"Cité des Arts", city:"Paris", country:"France", region:"europe", duration:"1–12 months", stipend:false, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", description:"Studio residencies in central Paris. Rolling applications. Strong network of international artists." },
  { id:5,  type:"residency",  name:"Skowhegan School", org:"Skowhegan", city:"Maine", country:"USA", region:"north-america", duration:"9 weeks", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3], deadline:"Jan 2027", description:"Legendary nine-week intensive summer residency. Major launching pad for US art world careers." },
  { id:6,  type:"residency",  name:"Hangar Barcelona", org:"Hangar", city:"Barcelona", country:"Spain", region:"europe", duration:"6–12 months", stipend:false, fee:false, disciplines:["installation","video","photography"], levels:[2,3,4], deadline:"Rolling", description:"Production centre for visual artists and researchers. Focus on experimental and media-based practices." },
  { id:7,  type:"residency",  name:"MacDowell Fellowship", org:"MacDowell", city:"Peterborough", country:"USA", region:"north-america", duration:"Up to 8 weeks", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", description:"One of the most prestigious residency fellowships in the US. Private studios, meals provided, strong alumni network." },
  { id:8,  type:"residency",  name:"Rijksakademie", org:"Rijksakademie", city:"Amsterdam", country:"Netherlands", region:"europe", duration:"12–24 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Sep 2026", description:"Two-year fully-funded residency in Amsterdam. One of Europe's most prestigious residency programmes." },
  { id:9,  type:"residency",  name:"Casa Wabi", org:"Fundación Casa Wabi", city:"Puerto Escondido", country:"México", region:"mexico", duration:"1–3 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Residency on the Oaxacan coast designed by Tadao Ando. Strong international community, production support." },
  { id:10, type:"residency",  name:"Cráter Invertido", org:"Cráter Invertido", city:"CDMX", country:"México", region:"mexico", duration:"Variable", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Rolling", description:"Independent self-organised residency and space in Mexico City. Strong local community and critical discourse." },
  { id:11, type:"grant",      name:"FONCA Jóvenes Creadores", org:"FONCA", city:"CDMX", country:"México", region:"mexico", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Mar 2026", description:"Mexico's most important grant for emerging artists under 35. Monthly stipend plus production support." },
  { id:12, type:"grant",      name:"FONCA Sistema Nacional de Creadores", org:"FONCA", city:"CDMX", country:"México", region:"mexico", duration:"3 years", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", description:"Triennial grant for established Mexican artists. Major institutional recognition and significant stipend." },
  { id:13, type:"grant",      name:"FONCA Residencias en el Extranjero", org:"FONCA", city:"CDMX", country:"México", region:"mexico", duration:"3–6 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"FONCA grant funding Mexican artists to undertake residencies abroad. Significant career boost." },
  { id:14, type:"grant",      name:"PECDA", org:"State Govts / CONACULTA", city:"Various", country:"México", region:"mexico", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Varies by state", description:"State-level grants for Mexican artists. More accessible than FONCA at national level. Good first grant credential." },
  { id:15, type:"grant",      name:"Creative Capital Award", org:"Creative Capital", city:"New York", country:"USA", region:"north-america", duration:"Multi-year", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Sep 2026", description:"Up to $50,000 in direct funding plus career development. One of the most significant US artist grants." },
  { id:16, type:"grant",      name:"Guggenheim Fellowship", org:"Guggenheim Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Sep 2026", description:"Prestigious fellowship for mid-career artists. Average grant around $45,000. Major career credential." },
  { id:17, type:"grant",      name:"Pollock-Krasner Foundation Grant", org:"Pollock-Krasner", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", description:"Grants of $5,000–$30,000 for painters, sculptors, and draughtsmen. Rolling applications." },
  { id:18, type:"grant",      name:"Festival FEMSA", org:"FEMSA", city:"Monterrey", country:"México", region:"mexico", duration:"Variable", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"Mexico's oldest and most important arts festival. Commissions, residencies and awards for Mexican and Latin American artists." },
  { id:19, type:"exhibition", name:"Salón ACME", org:"Salón ACME", city:"CDMX", country:"México", region:"mexico", duration:"Exhibition", stipend:false, fee:true, disciplines:["all"], levels:[1,2,3], deadline:"Annual", description:"Mexico City's largest artist-run art fair / open call. Key platform for emerging Mexican artists." },
  { id:20, type:"exhibition", name:"ZONAMACO", org:"ZONAMACO", city:"CDMX", country:"México", region:"mexico", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4,5], deadline:"Gallery-only", description:"Latin America's most important art fair. Gallery representation required. Key event for international exposure." },
  { id:21, type:"exhibition", name:"Bloomberg New Contemporaries", org:"New Contemporaries", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:false, disciplines:["all"], levels:[1,2], deadline:"Mar 2027", description:"Annual open submission for recent UK art college graduates. Major launching pad for early career." },
  { id:22, type:"exhibition", name:"Jerwood Arts Open", org:"Jerwood Arts", city:"London", country:"UK", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3], deadline:"Apr 2026", description:"Open submission supporting UK artists. Exhibition plus awards of up to £8,000." },
  { id:23, type:"exhibition", name:"Aesthetica Art Prize", org:"Aesthetica Magazine", city:"York", country:"UK", region:"europe", duration:"Exhibition + Publication", stipend:true, fee:true, disciplines:["painting","drawing","sculpture","photography","installation","video"], levels:[1,2,3], deadline:"Aug 2026", description:"International open call with exhibition at York Art Gallery and publication in Aesthetica Magazine." },
  { id:24, type:"fair",       name:"NADA Art Fair", org:"NADA", city:"New York", country:"USA", region:"north-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"May 2026", description:"New Art Dealers Alliance fair focused on emerging and experimental galleries." },
  { id:25, type:"biennial",   name:"Venice Biennale", org:"La Biennale", city:"Venice", country:"Italy", region:"europe", duration:"6 months", stipend:true, fee:false, disciplines:["all"], levels:[5], deadline:"Nomination only", description:"The world's oldest and most prestigious art biennial. Nomination only." },
  { id:26, type:"biennial",   name:"São Paulo Biennial", org:"Fundação Bienal", city:"São Paulo", country:"Brazil", region:"latin-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", description:"One of the world's most important biennials. Strong Latin American focus." },
  { id:27, type:"biennial",   name:"Liverpool Biennial", org:"Liverpool Biennial", city:"Liverpool", country:"UK", region:"europe", duration:"11 weeks", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", description:"UK's largest international festival of visual art. City-wide exhibitions and commissions." },
  { id:28, type:"biennial",   name:"Whitney Biennial", org:"Whitney Museum", city:"New York", country:"USA", region:"north-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Invitation only", description:"The most prestigious survey of American art. Invitation only." },
  { id:29, type:"residency",  name:"Triangle Arts Association", org:"Triangle Network", city:"New York", country:"USA", region:"north-america", duration:"10 days–3 months", stipend:false, fee:false, disciplines:["painting","drawing","sculpture","installation"], levels:[1,2,3], deadline:"Rolling", description:"International network of artist residencies. Accessible to emerging artists. Good first international residency." },
  { id:30, type:"grant",      name:"Rome Prize", org:"American Academy in Rome", city:"Rome", country:"Italy", region:"europe", duration:"11 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture","installation","photography"], levels:[3,4,5], deadline:"Nov 2026", description:"Year-long fellowship at the American Academy in Rome. Includes stipend, housing, and studio." },
];

export default function OpportunityDatabase({ isPro=false, onUpgrade }) {
  const [typeF,  setTypeF]  = useState("all");
  const [regionF,setRegionF]= useState("all");
  const [levelF, setLevelF] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    let list = OPPORTUNITIES;
    if (typeF   !== "all") list = list.filter(o => o.type === typeF);
    if (regionF !== "all") list = list.filter(o => o.region === regionF);
    if (levelF  !== "all") list = list.filter(o => o.levels.includes(parseInt(levelF)));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o => o.name.toLowerCase().includes(q) || o.org.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));
    }
    return list;
  }, [typeF, regionF, levelF, search]);

  const visible = isPro ? filtered : filtered.slice(0, 5);
  const locked  = !isPro && filtered.length > 5;

  const FilterBtn = ({ val, curr, set, label }) => (
    <button onClick={() => set(val)} style={{ padding:"6px 14px", background:curr===val?D.white:"transparent", color:curr===val?D.black:D.mid, border:`1px solid ${curr===val?D.white:D.border}`, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", borderRadius:"3px", transition:"all 0.15s", whiteSpace:"nowrap" }}>
      {label}
    </button>
  );

  return (
    <div style={{ minHeight:"100vh", background:D.black, color:D.white, paddingTop:"64px", fontFamily:"monospace" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap'); ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0a0a0a} ::-webkit-scrollbar-thumb{background:#333}`}</style>

      {/* Header */}
      <div style={{ padding:"48px 48px 32px", borderBottom:`1px solid ${D.border}` }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase", color:D.mid, marginBottom:"12px" }}>Opportunity Database</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:600, color:D.white, lineHeight:1, textTransform:"uppercase", marginBottom:"8px" }}>
            {filtered.length} Opportunities.
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:D.mid, fontStyle:"italic" }}>
            {isPro ? "Full database — filtered for your level and region." : `Showing 5 of ${filtered.length}. Upgrade for full access.`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 48px" }}>
        {/* Filters */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {[["all","All Types"],["residency","Residency"],["grant","Grant"],["exhibition","Open Call"],["fair","Art Fair"],["biennial","Biennial"]].map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={typeF} set={setTypeF} label={l}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {[["all","All Regions"],["mexico","México"],["latin-america","Latin America"],["north-america","North America"],["europe","Europe"],["international","International"]].map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={regionF} set={setRegionF} label={l}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"24px" }}>
          {[["all","All Levels"],["1","Level 1"],["2","Level 2"],["3","Level 3"],["4","Level 4"],["5","Level 5"]].map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={levelF} set={setLevelF} label={l}/>
          ))}
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search opportunities..." style={{ width:"100%", padding:"12px 16px", background:"rgba(245,244,240,0.04)", border:`1px solid ${D.border}`, color:D.white, fontFamily:"monospace", fontSize:"12px", outline:"none", borderRadius:"4px", marginBottom:"32px" }}/>

        {/* List */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:D.border }}>
          {visible.map(o => {
            const meta = TYPE_META[o.type]||{label:o.type,color:D.mid};
            const isOpen = expanded === o.id;
            return (
              <div key={o.id} style={{ background: isOpen ? D.dark2 : D.dark, cursor:"pointer", transition:"background 0.15s" }}
                onClick={() => setExpanded(isOpen ? null : o.id)}>
                <div style={{ padding:"20px 24px", display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:"16px", alignItems:"center" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", color:meta.color, background:`${meta.color}15`, padding:"3px 8px", borderRadius:"3px", border:`1px solid ${meta.color}30` }}>{meta.label}</span>
                      {o.stipend && <span style={{ fontSize:"8px", letterSpacing:"0.1em", color:"#606060" }}>STIPEND</span>}
                    </div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:D.white, lineHeight:1.2 }}>{o.name}</div>
                    <div style={{ fontSize:"10px", color:D.mid, marginTop:"3px" }}>{o.org} · {o.city}, {o.country}</div>
                  </div>
                  <div style={{ textAlign:"right", fontSize:"10px", color:D.mid, whiteSpace:"nowrap" }}>{o.duration}</div>
                  <div style={{ textAlign:"right", fontSize:"10px", color:o.deadline==="Rolling"?"#606060":D.accent, whiteSpace:"nowrap" }}>{o.deadline}</div>
                  <div style={{ fontSize:"16px", color:D.mid, transition:"transform 0.2s", transform:isOpen?"rotate(90deg)":"none" }}>›</div>
                </div>
                {isOpen && (
                  <div style={{ padding:"0 24px 20px", borderTop:`1px solid ${D.border}` }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"16px", color:D.mid, lineHeight:1.7, marginTop:"16px", marginBottom:"12px" }}>{o.description}</p>
                    <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                      {o.levels.map(l => <span key={l} style={{ fontSize:"9px", padding:"3px 8px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>Level {l}</span>)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Paywall */}
        {locked && (
          <div style={{ marginTop:"1px", background:D.dark, padding:"48px 32px", textAlign:"center", border:`1px solid ${D.border}` }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontStyle:"italic", color:D.white, marginBottom:"12px" }}>
              {filtered.length - 5} more opportunities unlocked with Pro.
            </div>
            <p style={{ fontSize:"11px", color:D.mid, marginBottom:"24px" }}>Residencies, grants, open calls, fairs — filtered for your level.</p>
            <button onClick={onUpgrade} style={{ padding:"14px 40px", background:D.white, border:"none", color:D.black, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", cursor:"pointer", borderRadius:"4px" }}>
              Unlock Full Database →
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ padding:"60px 32px", textAlign:"center", color:D.mid, fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontStyle:"italic" }}>
            No opportunities match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
