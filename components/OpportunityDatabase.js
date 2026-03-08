import { useState, useMemo } from "react";

const B = {
  bg:"#f2f2f0", bg2:"#e8e8e5", bg3:"#ffffff",
  ink:"#1a1a18", ink2:"#2e2e2c", mid:"#6b6b68", muted:"#9a9a96",
  border:"rgba(26,26,24,0.1)", borderStrong:"rgba(26,26,24,0.18)",
  gold:"#c8a84b", rust:"#c04020", sage:"#4a7a5a", blue:"#3a6090",
};

const OPPORTUNITIES = [
  // ── MEXICO ──────────────────────────────────────────────
  { id:101, type:"residency", name:"FONCA – Sistema Nacional de Creadores de Arte", org:"FONCA", city:"Ciudad de México", country:"México", region:"mexico", duration:"3 años", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Convocatoria anual", deadlineSort:20261001, description:"El apoyo más prestigioso para artistas mexicanos. Beca de 3 años con estipendio mensual del gobierno federal para creadores de trayectoria.", tags:["beca","prestigio","federal","estipendio"] },
  { id:102, type:"grant", name:"FONCA – Jóvenes Creadores", org:"FONCA", city:"Ciudad de México", country:"México", region:"mexico", duration:"1 año", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Convocatoria anual", deadlineSort:20260901, description:"Beca para artistas emergentes mexicanos menores de 35 años. Una de las vías más importantes para iniciar una carrera artística formal en México.", tags:["emergente","jóvenes","gobierno","estipendio"] },
  { id:103, type:"grant", name:"FONCA – Residencias en el Extranjero", org:"FONCA", city:"Internacional", country:"México", region:"mexico", duration:"3–6 meses", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Convocatoria anual", deadlineSort:20261001, description:"Financiamiento para que artistas mexicanos realicen residencias en otros países. Cubre gastos de viaje, manutención y estudio.", tags:["viaje","internacional","gobierno"] },
  { id:104, type:"exhibition", name:"ZONAMACO – Open Call Sectores", org:"ZONAMACO", city:"Ciudad de México", country:"México", region:"mexico", duration:"Feria", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Sep 2026", deadlineSort:20260901, description:"La feria de arte más importante de América Latina. Secciones como ZONAMACO Foto, Sur y Diseño aceptan propuestas de galerías emergentes.", tags:["feria","latinoamérica","comercial","galería"] },
  { id:105, type:"exhibition", name:"Salón ACME", org:"Salón ACME", city:"Ciudad de México", country:"México", region:"mexico", duration:"5 días", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Oct 2026", deadlineSort:20261001, description:"Feria de arte independiente y autogestionada en CDMX. Abierta a artistas emergentes sin necesidad de galería. Excelente red de contactos.", tags:["independiente","emergente","sin galería","CDMX"] },
  { id:106, type:"residency", name:"Residencia Cráter Invertido", org:"Cráter Invertido", city:"Ciudad de México", country:"México", region:"mexico", duration:"1–3 meses", stipend:false, fee:false, disciplines:["installation","video","photography"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"Espacio de residencia y publicación experimental en CDMX enfocado en prácticas artísticas críticas y transdisciplinares.", tags:["experimental","independiente","publicación","CDMX"] },
  { id:107, type:"residency", name:"Casa Wabi Residency", org:"Casa Wabi Foundation", city:"Puerto Escondido", country:"México", region:"mexico", duration:"1–3 meses", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"Residencia de artistas en Puerto Escondido fundada por Bosco Sodi. Diseñada por Tadao Ando. Una de las residencias más bellas del mundo.", tags:["prestigio","arquitectura","playa","internacionales"] },
  { id:108, type:"grant", name:"PECDA – Programas Estatales", org:"PECDA / Gobiernos Estatales", city:"Varios estados", country:"México", region:"mexico", duration:"1 año", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Varía por estado", deadlineSort:20260601, description:"Becas estatales equivalentes al FONCA en cada entidad federativa. Más accesibles para artistas en etapas iniciales.", tags:["estatal","beca","gobierno","accesible"] },
  { id:109, type:"exhibition", name:"Festival FEMSA de Arte", org:"FEMSA", city:"Monterrey", country:"México", region:"mexico", duration:"Exposición", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Convocatoria bienal", deadlineSort:20270101, description:"Premio y exposición bienal auspiciado por FEMSA. Reconocimiento significativo en el mundo del arte latinoamericano.", tags:["premio","bienal","Monterrey","empresa"] },
  { id:110, type:"gallery", name:"Labor Gallery Open Submissions", org:"Labor", city:"Ciudad de México", country:"México", region:"mexico", duration:"Exposición", stipend:false, fee:false, disciplines:["all"], levels:[3,4], deadline:"Rolling", deadlineSort:999, description:"Una de las galerías más importantes de México con presencia en feria internacional. Acepta propuestas de artistas mid-career.", tags:["galería","CDMX","arte contemporáneo"] },
  { id:111, type:"exhibition", name:"Museo Tamayo – Convocatoria", org:"Museo Tamayo", city:"Ciudad de México", country:"México", region:"mexico", duration:"Exposición", stipend:false, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"El Museo Tamayo acepta propuestas para exposiciones individuales y colectivas. Presencia institucional importante en el circuito nacional.", tags:["museo","institucional","CDMX"] },
  { id:112, type:"residency", name:"Residencia Bikini Wax", org:"Bikini Wax", city:"Ciudad de México", country:"México", region:"mexico", duration:"Variable", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"Espacio independiente y autogestionado en la Colonia Santa María la Ribera. Programación alternativa para artistas emergentes en CDMX.", tags:["independiente","emergente","alternativo","CDMX"] },

  // ── LATIN AMERICA ────────────────────────────────────────
  { id:201, type:"biennial", name:"Bienal de São Paulo", org:"Fundação Bienal", city:"São Paulo", country:"Brasil", region:"latin-america", duration:"3 meses", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nominación", deadlineSort:99999, description:"Una de las bienales más importantes del mundo. Fuerte enfoque latinoamericano con alcance global. Solo por nominación.", tags:["nominación","latinoamérica","prestigio"] },
  { id:202, type:"biennial", name:"Bienal de La Habana", org:"Centro Wifredo Lam", city:"La Habana", country:"Cuba", region:"latin-america", duration:"2 meses", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Convocatoria bienal", deadlineSort:20271001, description:"Una de las bienales más influyentes del Sur Global. Fuerte presencia latinoamericana, africana y asiática.", tags:["bienal","sur global","latinoamérica","Cuba"] },
  { id:203, type:"residency", name:"URRA Residencia", org:"URRA", city:"Buenos Aires", country:"Argentina", region:"latin-america", duration:"1–3 meses", stipend:false, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Residencia artística en Buenos Aires con enfoque en prácticas experimentales y colaboración transdisciplinar.", tags:["Buenos Aires","experimental","emergente"] },
  { id:204, type:"residency", name:"CAPACETE Residency", org:"CAPACETE", city:"Rio de Janeiro", country:"Brasil", region:"latin-america", duration:"3–6 meses", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Una de las residencias más reconocidas de América Latina. Enfoque en prácticas críticas y educación artística.", tags:["Río","crítica","educación","latinoamérica"] },
  { id:205, type:"grant", name:"Fundación Jumex – Apoyo a Artistas", org:"Fundación Jumex", city:"Ciudad de México", country:"México", region:"latin-america", duration:"Proyecto", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Convocatoria anual", deadlineSort:20260801, description:"Apoyos para proyectos artísticos de artistas latinoamericanos. Vinculación con la colección Jumex.", tags:["fundación","México","proyecto","colección"] },
  { id:206, type:"fair", name:"ArteBA", org:"ArteBA", city:"Buenos Aires", country:"Argentina", region:"latin-america", duration:"Feria", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Solo galería", deadlineSort:99999, description:"La feria de arte contemporáneo más importante de Argentina. Requiere representación de galería.", tags:["feria","Argentina","contemporáneo","galería"] },
  { id:207, type:"fair", name:"Ch.ACO", org:"Ch.ACO", city:"Santiago", country:"Chile", region:"latin-america", duration:"Feria", stipend:false, fee:true, disciplines:["all"], levels:[2,3,4], deadline:"Solo galería", deadlineSort:99999, description:"Principal feria de arte contemporáneo de Chile. Plataforma para artistas latinoamericanos emergentes y mid-career.", tags:["feria","Chile","emergente","latinoamérica"] },
  { id:208, type:"exhibition", name:"Premio Itaú Cultural", org:"Itaú Cultural", city:"São Paulo", country:"Brasil", region:"latin-america", duration:"Exposición + Premio", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Convocatoria anual", deadlineSort:20261001, description:"Premio y exposición de arte digital y multimedia en Brasil. Importante plataforma para artistas latinoamericanos.", tags:["digital","premio","Brasil","multimedia"] },
  { id:209, type:"residency", name:"Lugar a Dudas", org:"Lugar a Dudas", city:"Cali", country:"Colombia", region:"latin-america", duration:"1–3 meses", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"Espacio de residencia y exhibición en Cali, Colombia. Programa de intercambio para artistas latinoamericanos.", tags:["Colombia","intercambio","emergente","independiente"] },
  { id:210, type:"grant", name:"Programa de Apoyo Iberescena", org:"Iberescena / OEI", city:"Internacional", country:"Iberoamérica", region:"latin-america", duration:"Proyecto", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Convocatoria anual", deadlineSort:20260601, description:"Fondo iberoamericano de apoyo a las artes escénicas y visuales. Abierto a ciudadanos de países miembros.", tags:["iberoamérica","gobierno","proyecto","regional"] },

  // ── USA / CANADA ──────────────────────────────────────────
  { id:1, type:"residency", name:"NARS Foundation Residency", org:"NARS Foundation", city:"Brooklyn", country:"USA", region:"north-america", duration:"3–12 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Studio space with monthly curator visits and open studios. Strong for international artists seeking NYC exposure.", tags:["studio","NYC","international","rolling"] },
  { id:2, type:"residency", name:"Roswell Artist-in-Residence", org:"Roswell Museum", city:"Roswell", country:"USA", region:"north-america", duration:"12 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[3,4], deadline:"Mar 15, 2026", deadlineSort:20260315, description:"Year-long stipended residency ending in a solo museum exhibition and permanent collection acquisition.", tags:["stipend","solo show","museum acquisition"] },
  { id:3, type:"grant", name:"MacArthur Fellowship", org:"MacArthur Foundation", city:"Chicago", country:"USA", region:"north-america", duration:"5 years", stipend:true, fee:false, disciplines:["all"], levels:[5], deadline:"Nomination only", deadlineSort:99999, description:"The 'genius grant' — $800,000 no-strings-attached award. Nomination only, no application.", tags:["nomination","$800k","genius grant","Level 5"] },
  { id:4, type:"grant", name:"Creative Capital Award", org:"Creative Capital", city:"New York", country:"USA", region:"north-america", duration:"Multi-year", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Sep 2026", deadlineSort:20260901, description:"Up to $50,000 direct funding plus career development support. One of the most significant US grants.", tags:["$50k","prestigious","career support"] },
  { id:5, type:"grant", name:"Guggenheim Fellowship", org:"Guggenheim Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Sep 2026", deadlineSort:20260901, description:"Prestigious fellowship for mid-career artists. Average grant ~$45,000. Major credential.", tags:["prestigious","$45k","credential"] },
  { id:6, type:"grant", name:"Pollock-Krasner Foundation Grant", org:"Pollock-Krasner Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Grants of $5,000–$30,000 for painters, sculptors, and draughtsmen. Rolling applications year-round.", tags:["painting","sculpture","rolling","$5-30k"] },
  { id:7, type:"grant", name:"Joan Mitchell Foundation Grant", org:"Joan Mitchell Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Grants of $15,000–$25,000. Focus on underrepresented artists.", tags:["equity","$15-25k","painting","rolling"] },
  { id:8, type:"residency", name:"MacDowell Fellowship", org:"MacDowell", city:"Peterborough", country:"USA", region:"north-america", duration:"Up to 8 weeks", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"One of the most prestigious residency fellowships in the US. Private studios, meals provided.", tags:["prestigious","fellowship","stipend","rolling"] },
  { id:9, type:"residency", name:"Skowhegan School", org:"Skowhegan", city:"Maine", country:"USA", region:"north-america", duration:"9 weeks", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3], deadline:"Jan 2027", deadlineSort:20270115, description:"Legendary nine-week intensive summer residency. Major US career launchpad.", tags:["intensive","prestigious","summer"] },
  { id:10, type:"biennial", name:"Whitney Biennial", org:"Whitney Museum", city:"New York", country:"USA", region:"north-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Invitation only", deadlineSort:99999, description:"Most prestigious survey of American art. Invitation only, curated by Whitney team.", tags:["invitation","prestigious","museum","Level 5"] },
  { id:11, type:"grant", name:"Canada Council for the Arts", org:"Canada Council", city:"Ottawa", country:"Canada", region:"north-america", duration:"Project", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4], deadline:"Rolling", deadlineSort:999, description:"Project and creation grants for Canadian artists across all disciplines. Very accessible.", tags:["Canada","government","rolling","accessible"] },

  // ── EUROPE ────────────────────────────────────────────────
  { id:301, type:"residency", name:"DAAD Artists-in-Berlin", org:"DAAD", city:"Berlin", country:"Germany", region:"europe", duration:"12 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jan 2027", deadlineSort:20270101, description:"Prestigious annual fellowship in Berlin with living stipend, studio, and institutional support.", tags:["prestigious","stipend","Berlin"] },
  { id:302, type:"residency", name:"Rijksakademie", org:"Rijksakademie", city:"Amsterdam", country:"Netherlands", region:"europe", duration:"12–24 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Sep 2026", deadlineSort:20260901, description:"Two-year fully-funded residency in Amsterdam. One of Europe's most prestigious programmes.", tags:["prestigious","stipend","Amsterdam"] },
  { id:303, type:"residency", name:"Cité Internationale des Arts", org:"Cité des Arts", city:"Paris", country:"France", region:"europe", duration:"1–12 months", stipend:false, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", deadlineSort:999, description:"Studio residencies in central Paris. Rolling applications. Strong international artist network.", tags:["Paris","studio","rolling"] },
  { id:304, type:"grant", name:"Rome Prize", org:"American Academy in Rome", city:"Rome", country:"Italy", region:"europe", duration:"11 months", stipend:true, fee:false, disciplines:["painting","drawing","sculpture","installation","photography"], levels:[3,4,5], deadline:"Nov 2026", deadlineSort:20261101, description:"Year-long fellowship at the American Academy in Rome. Stipend, housing, and studio included.", tags:["prestigious","Rome","stipend","housing"] },
  { id:305, type:"fair", name:"Frieze London", org:"Frieze", city:"London", country:"UK", region:"europe", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[4,5], deadline:"Gallery-only", deadlineSort:99999, description:"Major international fair in Regent's Park. Gallery representation required.", tags:["gallery-required","prestigious","London"] },
  { id:306, type:"fair", name:"Art Basel", org:"Art Basel", city:"Basel / Miami / Hong Kong", country:"Switzerland", region:"international", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[5], deadline:"Gallery-only", deadlineSort:99999, description:"The world's most prestigious art fair. Top-tier gallery required.", tags:["prestigious","gallery-required","Level 5"] },
  { id:307, type:"biennial", name:"Venice Biennale", org:"La Biennale di Venezia", city:"Venice", country:"Italy", region:"europe", duration:"6 months", stipend:true, fee:false, disciplines:["all"], levels:[5], deadline:"Nomination only", deadlineSort:99999, description:"World's oldest and most prestigious art biennial. National pavilion or International Exhibition.", tags:["nomination","Level 5","prestigious"] },
  { id:308, type:"biennial", name:"Manifesta", org:"Manifesta Foundation", city:"Rotating EU city", country:"Europe", region:"europe", duration:"3–4 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", deadlineSort:99999, description:"Nomadic European biennial held in a different city each edition.", tags:["nomadic","European","institutional"] },
  { id:309, type:"exhibition", name:"Bloomberg New Contemporaries", org:"New Contemporaries", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:false, disciplines:["all"], levels:[1,2], deadline:"Mar 2027", deadlineSort:20270301, description:"Annual open submission for recent UK art graduates. Major early career launchpad.", tags:["emerging","UK","graduate","open call"] },
  { id:310, type:"grant", name:"Arts Council England Project Grant", org:"Arts Council England", city:"London", country:"UK", region:"europe", duration:"Project", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4], deadline:"Rolling", deadlineSort:999, description:"Project grants £1,000–£100,000 for UK-based artists. Very accessible.", tags:["UK","accessible","rolling","£1k-100k"] },
  { id:311, type:"residency", name:"Hangar Barcelona", org:"Hangar", city:"Barcelona", country:"Spain", region:"europe", duration:"6–12 months", stipend:false, fee:false, disciplines:["installation","video","photography"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Production centre for visual artists in Barcelona. Focus on experimental and media-based practices.", tags:["media","research","Barcelona","Spain"] },
  { id:312, type:"fair", name:"LISTE Art Fair Basel", org:"LISTE", city:"Basel", country:"Switzerland", region:"europe", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Gallery-only", deadlineSort:99999, description:"Young galleries fair alongside Art Basel. Gateway to the Basel ecosystem.", tags:["emerging galleries","Basel","gateway"] },
  { id:313, type:"exhibition", name:"Frieze Artist Award", org:"Frieze", city:"London / New York", country:"UK", region:"europe", duration:"Commission", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jun 2026", deadlineSort:20260601, description:"Annual commission for an emerging or mid-career artist to create a major new work at Frieze.", tags:["commission","prestigious","Frieze"] },

  // ── ASIA / PACIFIC ────────────────────────────────────────
  { id:401, type:"residency", name:"Asialink Arts Residency", org:"Asialink / University of Melbourne", city:"Various Asia", country:"Australia", region:"asia-pacific", duration:"2–4 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"Funded residencies across Asia for Australian artists. Strong bridge between Pacific and Asian art worlds.", tags:["Asia","Australia","funded","bridge"] },
  { id:402, type:"fair", name:"Art Basel Hong Kong", org:"Art Basel", city:"Hong Kong", country:"China", region:"asia-pacific", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[4,5], deadline:"Gallery-only", deadlineSort:99999, description:"Asia's leading international art fair. Gallery required. Important for breaking into the Asian market.", tags:["Asia","gallery-required","Hong Kong","prestigious"] },
  { id:403, type:"biennial", name:"Gwangju Biennale", org:"Gwangju Biennale Foundation", city:"Gwangju", country:"South Korea", region:"asia-pacific", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", deadlineSort:99999, description:"One of Asia's most important biennials. Strong critical programme with global reach.", tags:["Korea","Asia","biennial","nomination"] },
  { id:404, type:"residency", name:"Tokyo Wonder Site", org:"Tokyo Metropolitan Government", city:"Tokyo", country:"Japan", region:"asia-pacific", duration:"2–6 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual call", deadlineSort:20261001, description:"International residency programme run by the Tokyo Metropolitan Government. Studio in central Tokyo.", tags:["Tokyo","Japan","government","studio"] },

  // ── AFRICA / MIDDLE EAST ──────────────────────────────────
  { id:501, type:"biennial", name:"Dak'Art Biennale", org:"Biennale de Dakar", city:"Dakar", country:"Senegal", region:"africa", duration:"1 month", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Open call bienal", deadlineSort:20270501, description:"The most important platform for contemporary African art. Growing international influence.", tags:["Africa","bienal","Dakar","contemporáneo"] },
  { id:502, type:"residency", name:"Bag Factory Studios", org:"Bag Factory", city:"Johannesburg", country:"South Africa", region:"africa", duration:"6–12 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"One of Africa's oldest artist studio residency programmes. Strong alumni network.", tags:["Africa","Johannesburg","studio","alumni"] },
  { id:503, type:"fair", name:"1:54 Contemporary African Art Fair", org:"1:54", city:"London / New York", country:"UK", region:"africa", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Gallery-only", deadlineSort:99999, description:"Leading international fair focused exclusively on African art. Growing market presence.", tags:["Africa","fair","gallery-required","emerging"] },

  // ── INTERNATIONAL / OPEN ─────────────────────────────────
  { id:601, type:"residency", name:"Residency Unlimited NYC", org:"Residency Unlimited", city:"New York", country:"USA", region:"international", duration:"3–6 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", deadlineSort:999, description:"International residency in New York with curatorial support. Especially strong for artists outside the US.", tags:["NYC","international","curatorial","funded"] },
  { id:602, type:"grant", name:"Prince Claus Fund", org:"Prince Claus Fund", city:"Amsterdam", country:"Netherlands", region:"international", duration:"Project", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Nomination", deadlineSort:99999, description:"Dutch fund supporting artists in challenging environments. Strong focus on Global South.", tags:["global south","Netherlands","nomination","funded"] },
  { id:603, type:"exhibition", name:"Aesthetica Art Prize", org:"Aesthetica Magazine", city:"York", country:"UK", region:"international", duration:"Exhibition + Publication", stipend:true, fee:true, disciplines:["painting","drawing","sculpture","photography","installation","video"], levels:[1,2,3], deadline:"Aug 2026", deadlineSort:20260801, description:"International open call with exhibition at York Art Gallery and Aesthetica Magazine feature.", tags:["international","magazine","open call"] },
  { id:604, type:"gallery", name:"Saatchi Art Open Call", org:"Saatchi Art", city:"Online", country:"International", region:"international", duration:"Ongoing", stipend:false, fee:false, disciplines:["painting","drawing","sculpture","photography"], levels:[1,2,3], deadline:"Rolling", deadlineSort:999, description:"High-reach online platform. Good for early visibility and sales. Accessible entry point.", tags:["online","emerging","sales","accessible","rolling"] },
  { id:605, type:"grant", name:"Rolex Mentor and Protégé Arts Initiative", org:"Rolex", city:"International", country:"Switzerland", region:"international", duration:"2 years", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Application bienal", deadlineSort:20270101, description:"Two-year mentorship pairing emerging artists with world-renowned masters. Includes financial support.", tags:["mentorship","prestigious","internacional","Rolex"] },
];

const TYPE_META = {
  residency:  { label:"Residency",  color:"#4a7a5a", dot:"#5a9a70" },
  grant:      { label:"Grant",      color:"#c04020", dot:"#e05038" },
  exhibition: { label:"Open Call",  color:"#c8a84b", dot:"#e0c060" },
  fair:       { label:"Art Fair",   color:"#3a6090", dot:"#5a80b8" },
  biennial:   { label:"Biennial",   color:"#7a5090", dot:"#9a70b8" },
  gallery:    { label:"Gallery",    color:"#806050", dot:"#a08070" },
};

const REGION_META = {
  "mexico":        { label:"México 🇲🇽", accent:B.rust },
  "latin-america": { label:"Latin America", accent:"#c04020" },
  "north-america": { label:"USA / Canada", accent:B.blue },
  "europe":        { label:"Europe", accent:"#4a6090" },
  "asia-pacific":  { label:"Asia Pacific", accent:"#6a8a5a" },
  "africa":        { label:"Africa", accent:"#a06030" },
  "international": { label:"Global", accent:B.sage },
};

const LEVEL_NAMES = { 1:"Foundation", 2:"Local Presence", 3:"Emerging Voice", 4:"Market Artist", 5:"Institutional" };

function matchScore(opp, level) {
  if (opp.levels.includes(level)) return 100 - Math.abs(opp.levels[Math.floor(opp.levels.length/2)] - level) * 3;
  const closest = Math.min(...opp.levels.map(l => Math.abs(l - level)));
  return Math.max(0, 75 - closest * 22);
}

const Pill = ({ active, onClick, children, accent = B.gold }) => (
  <button onClick={onClick} style={{ padding:"5px 12px", border:`1px solid ${active ? accent : B.borderStrong}`, background: active ? accent : "transparent", color: active ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", borderRadius:"2px", transition:"all 0.15s" }}>
    {children}
  </button>
);

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
          return o.name.toLowerCase().includes(q) || o.org.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.tags.some(t => t.includes(q));
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "deadline") return a.deadlineSort - b.deadlineSort;
        if (sortBy === "match") return matchScore(b, artistLevel) - matchScore(a, artistLevel);
        if (sortBy === "region") return a.region.localeCompare(b.region);
        return 0;
      });
  }, [search, filterType, filterLevel, filterRegion, sortBy, artistLevel]);

  const sel = selected ? OPPORTUNITIES.find(o => o.id === selected) : null;
  const selMatch = sel ? matchScore(sel, artistLevel) : 0;

  return (
    <div style={{ background:B.bg, color:B.ink, fontFamily:"monospace", height:"100vh", display:"flex", flexDirection:"column", fontSize:"12px", paddingTop:"52px" }}>

      {/* HEADER */}
      <div style={{ padding:"14px 28px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:B.bg3 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", fontWeight:400, color:B.ink }}>
          Str<span style={{ color:B.gold, fontStyle:"italic" }}>a</span>tum
          <span style={{ fontFamily:"monospace", fontSize:"10px", color:B.muted, marginLeft:"10px" }}>/ Opportunity Database</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <span style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:B.muted }}>Your Level</span>
          <div style={{ display:"flex", gap:"3px" }}>
            {[1,2,3,4,5].map(l => (
              <button key={l} onClick={() => setArtistLevel(l)} style={{ width:"28px", height:"28px", border:`1.5px solid ${artistLevel===l ? B.gold : B.border}`, background: artistLevel===l ? B.gold : B.bg, color: artistLevel===l ? "#fff" : B.mid, fontFamily:"monospace", fontSize:"11px", cursor:"pointer", fontWeight: artistLevel===l ? 600 : 400 }}>{l}</button>
            ))}
          </div>
          <span style={{ fontSize:"10px", color:B.gold, fontWeight:500 }}>{LEVEL_NAMES[artistLevel]}</span>
        </div>
      </div>

      {/* REGION TABS */}
      <div style={{ padding:"10px 28px", borderBottom:`1px solid ${B.border}`, display:"flex", flexWrap:"wrap", gap:"5px", background:B.bg3, flexShrink:0 }}>
        <Pill active={filterRegion==="all"} onClick={() => setFilterRegion("all")} accent={B.ink}>All Regions</Pill>
        {Object.entries(REGION_META).map(([k,v]) => (
          <Pill key={k} active={filterRegion===k} onClick={() => setFilterRegion(k)} accent={v.accent}>{v.label}</Pill>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ padding:"8px 28px", borderBottom:`1px solid ${B.border}`, display:"flex", flexWrap:"wrap", gap:"5px", alignItems:"center", background:B.bg2, flexShrink:0 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background:B.bg3, border:`1px solid ${B.border}`, color:B.ink, fontFamily:"monospace", fontSize:"11px", padding:"5px 10px", outline:"none", width:"140px" }} />
        <span style={{ color:B.border, fontSize:"16px" }}>|</span>
        {["all","residency","grant","exhibition","fair","biennial","gallery"].map(t => (
          <Pill key={t} active={filterType===t} onClick={() => setFilterType(t)} accent={t==="all" ? B.ink : TYPE_META[t]?.color}>{t==="all" ? "All Types" : TYPE_META[t].label}</Pill>
        ))}
        <span style={{ color:B.border, fontSize:"16px" }}>|</span>
        {["all","1","2","3","4","5"].map(l => (
          <Pill key={l} active={filterLevel===l} onClick={() => setFilterLevel(l)} accent={B.blue}>{l==="all" ? "All Levels" : `L${l}`}</Pill>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", gap:"5px", alignItems:"center" }}>
          <span style={{ fontSize:"9px", color:B.muted, letterSpacing:"0.12em" }}>SORT</span>
          {[["match","Match"],["deadline","Deadline"],["region","Region"]].map(([v,l]) => (
            <Pill key={v} active={sortBy===v} onClick={() => setSortBy(v)} accent={B.rust}>{l}</Pill>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display:"grid", gridTemplateColumns: sel ? "1fr 380px" : "1fr", flex:1, overflow:"hidden" }}>

        {/* LIST */}
        <div style={{ overflowY:"auto", background:B.bg }}>
          <div style={{ padding:"8px 28px 4px", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:B.muted }}>
            {filtered.length} opportunities {filterRegion !== "all" ? `· ${REGION_META[filterRegion]?.label}` : ""}
          </div>
          {filtered.map((o, i) => {
            const meta = TYPE_META[o.type];
            const match = matchScore(o, artistLevel);
            const isSel = selected === o.id;
            const regionAccent = REGION_META[o.region]?.accent || B.gold;
            return (
              <div key={o.id} onClick={() => setSelected(isSel ? null : o.id)}
                style={{ padding:"12px 28px", cursor:"pointer", display:"grid", gridTemplateColumns:"8px 1fr auto", gap:"14px", alignItems:"center", background: isSel ? B.bg3 : i%2===0 ? B.bg : B.bg2, borderLeft:`3px solid ${isSel ? B.gold : "transparent"}`, borderBottom:`1px solid ${B.border}`, transition:"all 0.15s" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:meta.dot, flexShrink:0 }} />
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px", flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", fontWeight:400, color:B.ink }}>{o.name}</span>
                    {o.stipend && <span style={{ fontSize:"7px", padding:"1px 6px", background:"rgba(74,122,90,0.12)", border:"1px solid rgba(74,122,90,0.2)", color:B.sage, letterSpacing:"0.12em" }}>FUNDED</span>}
                    <span style={{ fontSize:"7px", padding:"1px 6px", background:`${regionAccent}15`, border:`1px solid ${regionAccent}30`, color:regionAccent, letterSpacing:"0.1em" }}>{o.country}</span>
                  </div>
                  <div style={{ fontSize:"10px", color:B.muted }}>
                    <span style={{ color:meta.color, fontWeight:500 }}>{meta.label}</span>
                    <span style={{ margin:"0 5px", opacity:0.3 }}>·</span>{o.org}
                    <span style={{ margin:"0 5px", opacity:0.3 }}>·</span>{o.city}
                    <span style={{ margin:"0 5px", opacity:0.3 }}>·</span>L{o.levels.join(",")}
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:400, color: match>=80 ? B.gold : match>=50 ? B.mid : "#ccc" }}>{match}%</div>
                  <div style={{ fontSize:"8px", color:B.muted }}>{o.deadline}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding:"60px", textAlign:"center", color:B.muted, letterSpacing:"0.15em" }}>No results found</div>
          )}
        </div>

        {/* DETAIL PANEL */}
        {sel && (
          <div style={{ borderLeft:`1px solid ${B.border}`, overflowY:"auto", background:B.bg3 }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${B.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:B.bg2 }}>
              <span style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:TYPE_META[sel.type].color, fontWeight:500 }}>{TYPE_META[sel.type].label}</span>
              <button onClick={() => setSelected(null)} style={{ background:"transparent", border:"none", color:B.mid, cursor:"pointer", fontSize:"20px", lineHeight:1 }}>×</button>
            </div>
            <div style={{ padding:"24px" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:400, fontStyle:"italic", color:B.ink, lineHeight:1.2, marginBottom:"5px" }}>{sel.name}</div>
              <div style={{ fontSize:"11px", color:B.muted, marginBottom:"20px" }}>{sel.org} · {sel.city}, {sel.country}</div>

              <div style={{ padding:"14px", background:B.goldBg || "rgba(200,168,75,0.07)", border:`1px solid ${B.gold}30`, marginBottom:"18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.muted, marginBottom:"3px" }}>Match · Level {artistLevel}</div>
                  <div style={{ fontSize:"9px", color:B.gold, fontWeight:500 }}>{LEVEL_NAMES[artistLevel]}</div>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"40px", fontWeight:300, color: selMatch>=80 ? B.gold : selMatch>=50 ? B.mid : "#ccc" }}>{selMatch}%</div>
              </div>

              {[["Duration",sel.duration],["Deadline",sel.deadline],["Funded",sel.stipend?"Yes — funded":"No"],["App. Fee",sel.fee?"Yes":"No"],["Levels",sel.levels.map(l=>`L${l} ${LEVEL_NAMES[l]}`).join(", ")],["Region",REGION_META[sel.region]?.label || sel.region]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${B.border}`, fontSize:"11px" }}>
                  <span style={{ color:B.muted }}>{k}</span>
                  <span style={{ color: k==="Funded" && sel.stipend ? B.sage : B.ink, textAlign:"right", maxWidth:"60%", fontWeight: k==="Funded" && sel.stipend ? 500 : 400 }}>{v}</span>
                </div>
              ))}

              <div style={{ margin:"18px 0", padding:"14px", background:B.bg, borderLeft:`3px solid ${B.gold}`, fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", color:B.mid, lineHeight:1.7, fontStyle:"italic" }}>
                {sel.description}
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"18px" }}>
                {sel.tags.map(t => <span key={t} style={{ padding:"2px 9px", background:B.bg2, border:`1px solid ${B.border}`, fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:B.mid }}>{t}</span>)}
              </div>

              <div style={{ padding:"12px 14px", background:"rgba(192,64,32,0.06)", border:"1px solid rgba(192,64,32,0.15)", marginBottom:"16px" }}>
                <div style={{ fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:B.rust, marginBottom:"5px", fontWeight:500 }}>Why this matters at Level {artistLevel}</div>
                <div style={{ fontSize:"11px", color:B.mid, lineHeight:1.6 }}>
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
      <div style={{ padding:"6px 28px", borderTop:`1px solid ${B.border}`, display:"flex", gap:"16px", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:B.muted, flexShrink:0, flexWrap:"wrap", background:B.bg2 }}>
        {Object.entries(TYPE_META).map(([k,m]) => (
          <span key={k} style={{ display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:m.dot, display:"inline-block" }} />
            {OPPORTUNITIES.filter(o=>o.type===k).length} {m.label}s
          </span>
        ))}
        <span style={{ marginLeft:"auto" }}>◉ {OPPORTUNITIES.length} total</span>
      </div>
    </div>
  );
}
