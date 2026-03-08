import { useState, useMemo } from "react";

const OPPORTUNITIES = [
  { id:1, type:"residency", name:"NARS Foundation International Residency", org:"NARS Foundation", city:"Brooklyn", country:"USA", region:"north-america", duration:"3–12 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Studio space with monthly curator visits, open studios, and community programming. Especially strong for international artists seeking NYC exposure.", tags:["studio","critique","international","NYC"] },
  { id:2, type:"residency", name:"Roswell Artist-in-Residence", org:"Roswell Museum", city:"Roswell", country:"USA", region:"north-america", duration:"12 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[3,4], deadline:"Mar 15, 2026", deadlineSort:20260315, description:"Year-long stipended residency concluding in a solo museum exhibition and artwork acquisition for the Anderson Museum permanent collection.", tags:["stipend","solo show","museum acquisition"] },
  { id:3, type:"residency", name:"DAAD Artists-in-Berlin", org:"DAAD", city:"Berlin", country:"Germany", region:"europe", duration:"12 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jan 2027", deadlineSort:20270101, description:"Prestigious annual fellowship placing international artists in Berlin with a living stipend, studio, and institutional support. Highly competitive.", tags:["prestigious","stipend","Berlin"] },
  { id:4, type:"residency", name:"Cité Internationale des Arts", org:"Cité des Arts", city:"Paris", country:"France", region:"europe", duration:"1–12 months", stipend:false, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"Studio residencies in central Paris. Rolling applications, multiple tracks. Strong network of international artists.", tags:["Paris","studio","rolling"] },
  { id:5, type:"residency", name:"Skowhegan School", org:"Skowhegan", city:"Maine", country:"USA", region:"north-america", duration:"9 weeks", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3], deadline:"Jan 2027", deadlineSort:20270115, description:"Legendary nine-week intensive summer residency. Major launching pad for careers in the US art world.", tags:["intensive","prestigious","summer"] },
  { id:6, type:"residency", name:"Hangar Barcelona", org:"Hangar", city:"Barcelona", country:"Spain", region:"europe", duration:"6–12 months", stipend:false, fee:false, disciplines:["installation","video","photography"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Production centre for visual artists and researchers in Barcelona. Focus on experimental and media-based practices.", tags:["media","research","Barcelona"] },
  { id:7, type:"residency", name:"Headlands Center for the Arts", org:"Headlands", city:"Sausalito", country:"USA", region:"north-america", duration:"1–11 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Oct 2026", deadlineSort:20261001, description:"Residency in the Marin Headlands with live-work studios. Known for cross-disciplinary community and Bay Area connections.", tags:["stipend","Bay Area","live-work"] },
  { id:8, type:"residency", name:"MacDowell Fellowship", org:"MacDowell", city:"Peterborough", country:"USA", region:"north-america", duration:"Up to 8 weeks", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"One of the most prestigious residency fellowships in the US. Private studios, meals provided, strong alumni network.", tags:["prestigious","fellowship","stipend"] },
  { id:9, type:"residency", name:"Rijksakademie", org:"Rijksakademie van Beeldende Kunsten", city:"Amsterdam", country:"Netherlands", region:"europe", duration:"12–24 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Sep 2026", deadlineSort:20260901, description:"Two-year fully-funded residency in Amsterdam. One of Europe's most prestigious residency programmes.", tags:["prestigious","Europe","stipend","Amsterdam"] },
  { id:10, type:"residency", name:"Triangle Arts Association", org:"Triangle Network", city:"New York", country:"USA", region:"north-america", duration:"10 days–3 months", stipend:false, fee:false, disciplines:["painting","drawing","sculpture","installation"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"International network of artist residencies. Accessible to emerging artists. Good first international residency.", tags:["emerging","accessible","network"] },
  { id:11, type:"grant", name:"McKnight Visual Artist Fellowship", org:"McKnight Foundation", city:"Minneapolis", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Mar 15, 2026", deadlineSort:20260315, description:"$25,000 fellowship for Minnesota-based mid-career artists of exceptional merit.", tags:["$25k","mid-career","fellowship"] },
  { id:12, type:"grant", name:"Creative Capital Award", org:"Creative Capital", city:"New York", country:"USA", region:"north-america", duration:"Multi-year", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Sep 2026", deadlineSort:20260901, description:"Up to $50,000 in direct funding plus career development support. One of the most significant US artist grants.", tags:["$50k","prestigious","career support"] },
  { id:13, type:"grant", name:"Guggenheim Fellowship", org:"John Simon Guggenheim Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Sep 2026", deadlineSort:20260901, description:"Prestigious fellowship for mid-career artists. Average grant around $45,000. Major career credential.", tags:["prestigious","$45k","credential"] },
  { id:14, type:"grant", name:"Pollock-Krasner Foundation Grant", org:"Pollock-Krasner Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Grants of $5,000–$30,000 for painters, sculptors, and draughtsmen. Rolling applications.", tags:["painting","sculpture","rolling"] },
  { id:15, type:"grant", name:"Joan Mitchell Foundation Grant", org:"Joan Mitchell Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Grants supporting painters and sculptors. Focus on underrepresented artists. $15,000–$25,000.", tags:["painting","equity","$15-25k"] },
  { id:16, type:"grant", name:"Rome Prize", org:"American Academy in Rome", city:"Rome", country:"Italy", region:"europe", duration:"11 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture","installation","photography"], levels:[3,4,5], deadline:"Nov 2026", deadlineSort:20261101, description:"Year-long fellowship at the American Academy in Rome. Includes stipend, housing, and studio.", tags:["prestigious","Rome","stipend","housing"] },
  { id:17, type:"grant", name:"Arts Council England Project Grant", org:"Arts Council England", city:"London", country:"UK", region:"europe", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4], deadline:"Rolling", deadlineSort:999, description:"Project grants from £1,000–£100,000 for UK-based artists. Accessible to all levels.", tags:["UK","accessible","rolling","£1k-100k"] },
  { id:18, type:"exhibition", name:"Bloomberg New Contemporaries", org:"New Contemporaries", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:false, disciplines:["all"], levels:[1,2], deadline:"Mar 2027", deadlineSort:20270301, description:"Annual open submission for recent UK art college graduates. Major launching pad for early career UK artists.", tags:["emerging","UK","graduate","open call"] },
  { id:19, type:"exhibition", name:"Jerwood Arts Open", org:"Jerwood Arts", city:"London", country:"UK", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3], deadline:"Apr 2026", deadlineSort:20260401, description:"Open submission supporting UK artists. Exhibition plus awards of up to £8,000.", tags:["UK","award","£8k","emerging"] },
  { id:20, type:"exhibition", name:"Frieze Artist Award", org:"Frieze", city:"London / New York", country:"UK", region:"europe", duration:"Commission", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jun 2026", deadlineSort:20260601, description:"Annual commission for an emerging or mid-career artist to create a major new work at Frieze.", tags:["Frieze","commission","prestigious"] },
  { id:21, type:"exhibition", name:"ICA Boston Foster Prize", org:"ICA Boston", city:"Boston", country:"USA", region:"north-america", duration:"Exhibition", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Rolling", deadlineSort:999, description:"$10,000 prize and solo exhibition at ICA Boston for emerging New England artists.", tags:["$10k","museum","solo show"] },
  { id:22, type:"exhibition", name:"Aesthetica Art Prize", org:"Aesthetica Magazine", city:"York", country:"UK", region:"europe", duration:"Exhibition + Publication", stipend:true, fee:true, disciplines:["painting","drawing","sculpture","photography","installation","video"], levels:[1,2,3], deadline:"Aug 2026", deadlineSort:20260801, description:"International open call with exhibition at York Art Gallery and publication in Aesthetica Magazine.", tags:["international","magazine","open call"] },
  { id:23, type:"exhibition", name:"Royal Academy Summer Exhibition", org:"Royal Academy of Arts", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:true, disciplines:["painting","drawing","sculpture","photography","installation"], levels:[1,2,3,4], deadline:"Mar 2027", deadlineSort:20270301, description:"World's largest open art exhibition. Good public visibility and institutional recognition.", tags:["open call","London","public","annual"] },
  { id:24, type:"fair", name:"NADA Art Fair", org:"NADA", city:"New York", country:"USA", region:"north-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"May 2026", deadlineSort:20260501, description:"New Art Dealers Alliance fair focused on emerging and experimental galleries. Gateway to US commercial art market.", tags:["art fair","commercial","emerging"] },
  { id:25, type:"fair", name:"Untitled Art Fair", org:"Untitled", city:"Miami / San Francisco", country:"USA", region:"north-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Gallery-only", deadlineSort:99999, description:"Curated fair focused on experimental and process-based practices. More accessible than Basel.", tags:["experimental","Miami","gallery-required"] },
  { id:26, type:"fair", name:"LISTE Art Fair Basel", org:"LISTE", city:"Basel", country:"Switzerland", region:"europe", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Gallery-only", deadlineSort:99999, description:"Young galleries fair alongside Art Basel. Gateway to the Basel ecosystem.", tags:["emerging galleries","Basel","gateway"] },
  { id:27, type:"fair", name:"Frieze London", org:"Frieze", city:"London", country:"UK", region:"europe", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[4,5], deadline:"Gallery-only", deadlineSort:99999, description:"Major international art fair in Regent's Park. Gallery representation required.", tags:["gallery-required","prestigious","London"] },
  { id:28, type:"fair", name:"Art Basel", org:"Art Basel", city:"Basel / Miami / Hong Kong", country:"Switzerland", region:"international", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[5], deadline:"Gallery-only", deadlineSort:99999, description:"The world's most prestigious art fair. Gallery representation required. Participation signals top-tier market position.", tags:["prestigious","gallery-required","Level 5"] },
  { id:29, type:"biennial", name:"Venice Biennale", org:"La Biennale di Venezia", city:"Venice", country:"Italy", region:"europe", duration:"6 months", stipend:true, fee:false, disciplines:["all"], levels:[5], deadline:"Nomination only", deadlineSort:99999, description:"The world's oldest and most prestigious art biennial. National pavilion or International Exhibition. Nomination only.", tags:["nomination","Level 5","prestigious","pavilion"] },
  { id:30, type:"biennial", name:"São Paulo Biennial", org:"Fundação Bienal", city:"São Paulo", country:"Brazil", region:"latin-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", deadlineSort:99999, description:"One of the world's most important biennials. Strong Latin American focus but international reach.", tags:["nomination","Latin America","prestigious"] },
  { id:31, type:"biennial", name:"Liverpool Biennial", org:"Liverpool Biennial", city:"Liverpool", country:"UK", region:"europe", duration:"11 weeks", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", deadlineSort:99999, description:"UK's largest international festival of visual art. City-wide exhibitions and commissions.", tags:["UK","commission","international"] },
  { id:32, type:"biennial", name:"Whitney Biennial", org:"Whitney Museum", city:"New York", country:"USA", region:"north-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Invitation only", deadlineSort:99999, description:"The most prestigious survey of American art. Invitation only, curated by Whitney curatorial team.", tags:["invitation","USA","prestigious","museum"] },
  { id:33, type:"biennial", name:"Manifesta", org:"Manifesta Foundation", city:"Rotating European city", country:"Europe", region:"europe", duration:"3–4 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", deadlineSort:99999, description:"Nomadic European biennial held in a different city each edition. Strong institutional framework.", tags:["nomadic","European","institutional"] },
  { id:34, type:"gallery", name:"Saatchi Art Open Call", org:"Saatchi Art", city:"Online", country:"International", region:"international", duration:"Ongoing", stipend:false, fee:false, disciplines:["painting","drawing","sculpture","photography"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"Online platform with high reach. Good for early visibility and sales. Less prestigious but accessible entry point.", tags:["online","emerging","sales","accessible"] },
  { id:35, type:"gallery", name:"BEERS London Open Submission", org:"BEERS London", city:"London", country:"UK", region:"europe", duration:"Residency + Exhibition", stipend:true, fee:true, disciplines:["all"], levels:[2,3], deadline:"Rolling", deadlineSort:999, description:"London commercial gallery offering residency programmes concluding in an exhibition. Open to emerging artists.", tags:["London","commercial","residency","emerging"] },
  { id:36, type:"gallery", name:"Royal Academy Summer Exhibition", org:"Royal Academy", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:true, disciplines:["painting","drawing","sculpture","photography"], levels:[2,3,4], deadline:"Mar 2027", deadlineSort:20270301, description:"Open submission to one of the world's most famous annual exhibitions. Strong public visibility.", tags:["open call","prestigious","annual","London"] },
];

const TYPE_META = {
  residency:  { label:"Residency",  color:"#697b6c", dot:"#8fa892" },
  grant:      { label:"Grant",      color:"#b04518", dot:"#d4603a" },
  exhibition: { label:"Open Call",  color:"#c8a84b", dot:"#e0c070" },
  fair:       { label:"Art Fair",   color:"#7a8fa6", dot:"#9ab0c8" },
  biennial:   { label:"Biennial",   color:"#9a6840", dot:"#c08050" },
  gallery:    { label:"Gallery",    color:"#a09890", dot:"#c0b8b0" },
};

const LEVEL_NAMES = { 1:"Foundation", 2:"Local Presence", 3:"Emerging Voice", 4:"Market Artist", 5:"Institutional" };

function matchScore(opp, level) {
  if (opp.levels.includes(level)) return 100 - Math.abs(opp.levels[Math.floor(opp.levels.length/2)] - level) * 3;
  const closest = Math.min(...opp.levels.map(l => Math.abs(l - level)));
  return Math.max(0, 75 - closest * 22);
}

export default function OpportunityDatabase() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [selected, setSelected] = useState(null);
  const [artistLevel, setArtistLevel] = useState(3);

  const filtered = useMemo(() => {
    return OPPORTUNITIES
      .filter(o => {
        if (filterType !== "all" && o.type !== filterType) return false;
        if (filterLevel !== "all" && !o.levels.includes(parseInt(filterLevel))) return false;
        if (filterRegion !== "all" && o.region !== filterRegion) return false;
        if (search) {
          const q = search.toLowerCase();
          return o.name.toLowerCase().includes(q) || o.org.toLowerCase().includes(q) || o.tags.some(t => t.includes(q));
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "deadline") return a.deadlineSort - b.deadlineSort;
        if (sortBy === "match") return matchScore(b, artistLevel) - matchScore(a, artistLevel);
        if (sortBy === "type") return a.type.localeCompare(b.type);
        return 0;
      });
  }, [search, filterType, filterLevel, filterRegion, sortBy, artistLevel]);

  const sel = selected ? OPPORTUNITIES.find(o => o.id === selected) : null;
  const selMatch = sel ? matchScore(sel, artistLevel) : 0;

  const Pill = ({ active, onClick, children, accent = "#c8a84b" }) => (
    <button onClick={onClick} style={{ padding:"5px 11px", border:`1px solid ${active ? accent : "rgba(255,255,255,0.07)"}`, background: active ? accent : "transparent", color: active ? "#0a0908" : "#706860", fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
      {children}
    </button>
  );

  return (
    <div style={{ background:"#0a0908", color:"#f4efe6", fontFamily:"monospace", height:"100vh", display:"flex", flexDirection:"column", fontSize:"12px", paddingTop:"52px" }}>

      {/* HEADER */}
      <div style={{ padding:"16px 28px", borderBottom:"1px solid rgba(200,168,75,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"17px", fontWeight:300 }}>
          Str<span style={{ color:"#c8a84b", fontStyle:"italic" }}>a</span>tum
          <span style={{ fontFamily:"monospace", fontSize:"10px", color:"#706860", marginLeft:"10px" }}>/ Opportunity Database</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#706860" }}>Your Level</span>
          <div style={{ display:"flex", gap:"3px" }}>
            {[1,2,3,4,5].map(l => (
              <button key={l} onClick={() => setArtistLevel(l)} style={{ width:"26px", height:"26px", border:`1px solid ${artistLevel===l ? "#c8a84b" : "rgba(255,255,255,0.07)"}`, background: artistLevel===l ? "#c8a84b" : "transparent", color: artistLevel===l ? "#0a0908" : "#706860", fontFamily:"monospace", fontSize:"11px", cursor:"pointer" }}>{l}</button>
            ))}
          </div>
          <span style={{ fontSize:"10px", color:"#c8a84b" }}>{LEVEL_NAMES[artistLevel]}</span>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ padding:"10px 28px", borderBottom:"1px solid rgba(200,168,75,0.06)", display:"flex", flexWrap:"wrap", gap:"6px", alignItems:"center", flexShrink:0 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"#f4efe6", fontFamily:"monospace", fontSize:"11px", padding:"5px 10px", outline:"none", width:"140px" }} />
        <span style={{ color:"rgba(255,255,255,0.1)" }}>|</span>
        {["all","residency","grant","exhibition","fair","biennial","gallery"].map(t => (
          <Pill key={t} active={filterType===t} onClick={() => setFilterType(t)}>{t==="all" ? "All" : TYPE_META[t].label}</Pill>
        ))}
        <span style={{ color:"rgba(255,255,255,0.1)" }}>|</span>
        {["all","1","2","3","4","5"].map(l => (
          <Pill key={l} active={filterLevel===l} onClick={() => setFilterLevel(l)} accent="#7a8fa6">{l==="all" ? "All Levels" : `L${l}`}</Pill>
        ))}
        <span style={{ color:"rgba(255,255,255,0.1)" }}>|</span>
        {[["all","All"],["europe","Europe"],["north-america","Americas"],["international","Global"]].map(([v,l]) => (
          <Pill key={v} active={filterRegion===v} onClick={() => setFilterRegion(v)} accent="#697b6c">{l}</Pill>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", gap:"5px", alignItems:"center" }}>
          <span style={{ fontSize:"9px", color:"#706860", letterSpacing:"0.15em" }}>SORT</span>
          {[["match","Match"],["deadline","Deadline"],["type","Type"]].map(([v,l]) => (
            <Pill key={v} active={sortBy===v} onClick={() => setSortBy(v)} accent="#b04518">{l}</Pill>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display:"grid", gridTemplateColumns: sel ? "1fr 360px" : "1fr", flex:1, overflow:"hidden" }}>

        {/* LIST */}
        <div style={{ overflowY:"auto", padding:"0" }}>
          <div style={{ padding:"10px 28px 6px", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#504840" }}>
            {filtered.length} opportunities
          </div>
          {filtered.map((o, i) => {
            const meta = TYPE_META[o.type];
            const match = matchScore(o, artistLevel);
            const isSel = selected === o.id;
            return (
              <div key={o.id} onClick={() => setSelected(isSel ? null : o.id)} style={{ padding:"12px 28px", cursor:"pointer", display:"grid", gridTemplateColumns:"10px 1fr auto", gap:"14px", alignItems:"center", background: isSel ? "#141210" : i%2===0 ? "#0a0908" : "#0d0b09", borderLeft:`2px solid ${isSel ? "#c8a84b" : "transparent"}`, borderBottom:"1px solid rgba(255,255,255,0.02)" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:meta.dot }} />
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px", flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"14px", fontWeight:300, color:"#f4efe6" }}>{o.name}</span>
                    {o.stipend && <span style={{ fontSize:"7px", padding:"1px 6px", background:"rgba(105,123,108,0.2)", border:"1px solid rgba(105,123,108,0.25)", color:"#8fa892", letterSpacing:"0.15em" }}>FUNDED</span>}
                  </div>
                  <div style={{ fontSize:"10px", color:"#706860" }}>
                    <span style={{ color:meta.color }}>{meta.label}</span>
                    <span style={{ margin:"0 6px", opacity:0.3 }}>·</span>{o.org}
                    <span style={{ margin:"0 6px", opacity:0.3 }}>·</span>{o.city}
                    <span style={{ margin:"0 6px", opacity:0.3 }}>·</span>L{o.levels.join(",")}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"17px", color: match>=80 ? "#c8a84b" : match>=50 ? "#706860" : "#302820" }}>{match}%</div>
                  <div style={{ fontSize:"8px", color:"#504840" }}>{o.deadline}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding:"60px", textAlign:"center", color:"#302820", letterSpacing:"0.15em" }}>No results</div>
          )}
        </div>

        {/* DETAIL */}
        {sel && (
          <div style={{ borderLeft:"1px solid rgba(200,168,75,0.1)", overflowY:"auto", background:"#0e0c0a" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(200,168,75,0.08)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:TYPE_META[sel.type].color }}>{TYPE_META[sel.type].label}</span>
              <button onClick={() => setSelected(null)} style={{ background:"transparent", border:"none", color:"#706860", cursor:"pointer", fontSize:"18px", lineHeight:1 }}>×</button>
            </div>
            <div style={{ padding:"22px" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"20px", fontWeight:300, fontStyle:"italic", color:"#f4efe6", lineHeight:1.2, marginBottom:"5px" }}>{sel.name}</div>
              <div style={{ fontSize:"11px", color:"#706860", marginBottom:"20px" }}>{sel.org} · {sel.city}, {sel.country}</div>

              <div style={{ padding:"14px", background:"rgba(200,168,75,0.05)", border:"1px solid rgba(200,168,75,0.13)", marginBottom:"18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:"8px", letterSpacing:"0.25em", textTransform:"uppercase", color:"#706860", marginBottom:"3px" }}>Match · Level {artistLevel}</div>
                  <div style={{ fontSize:"9px", color:"#c8a84b" }}>{LEVEL_NAMES[artistLevel]}</div>
                </div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"38px", fontWeight:300, color: selMatch>=80 ? "#c8a84b" : selMatch>=50 ? "#a09890" : "#504840" }}>{selMatch}%</div>
              </div>

              {[["Duration",sel.duration],["Deadline",sel.deadline],["Funded",sel.stipend?"Yes":"No"],["App. Fee",sel.fee?"Yes":"No"],["Levels",sel.levels.map(l=>`L${l} ${LEVEL_NAMES[l]}`).join(", ")]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:"11px" }}>
                  <span style={{ color:"#706860" }}>{k}</span>
                  <span style={{ color:"#f4efe6", textAlign:"right", maxWidth:"60%" }}>{v}</span>
                </div>
              ))}

              <div style={{ margin:"18px 0", padding:"14px", background:"rgba(255,255,255,0.02)", borderLeft:"2px solid rgba(200,168,75,0.25)", fontFamily:"Georgia,serif", fontSize:"13px", color:"#a09890", lineHeight:1.7, fontStyle:"italic" }}>
                {sel.description}
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"18px" }}>
                {sel.tags.map(t => <span key={t} style={{ padding:"2px 9px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#706860" }}>{t}</span>)}
              </div>

              <div style={{ padding:"12px 14px", background:"rgba(176,69,24,0.06)", border:"1px solid rgba(176,69,24,0.13)", marginBottom:"16px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.25em", textTransform:"uppercase", color:"#b04518", marginBottom:"5px" }}>Why this matters at Level {artistLevel}</div>
                <div style={{ fontSize:"11px", color:"#a09890", lineHeight:1.6 }}>
                  {selMatch>=90 && "Direct match for your career stage. Prioritize this application now."}
                  {selMatch>=70 && selMatch<90 && "Strong match. Worth applying with a tailored submission."}
                  {selMatch>=50 && selMatch<70 && "Possible match but competitive. Apply alongside more targeted opportunities."}
                  {selMatch<50 && "Aimed at a different level. File for later when your career signals align."}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STATUS BAR */}
      <div style={{ padding:"7px 28px", borderTop:"1px solid rgba(200,168,75,0.07)", display:"flex", gap:"20px", fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#302820", flexShrink:0, flexWrap:"wrap" }}>
        {Object.entries(TYPE_META).map(([k,m]) => (
          <span key={k} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:m.dot, display:"inline-block" }} />
            {OPPORTUNITIES.filter(o=>o.type===k).length} {m.label}s
          </span>
        ))}
        <span style={{ marginLeft:"auto" }}>◉ {OPPORTUNITIES.length} total</span>
      </div>
    </div>
  );
}
