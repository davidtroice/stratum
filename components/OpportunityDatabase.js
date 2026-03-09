import { useState, useMemo } from "react";

const D = {
  black:"#ffffff", dark:"#f7f6f2", dark2:"#eeece8", dark3:"#e4e2dd",
  white:"#0a0a0a", accent:"#1a1a1a", accentD:"#333333",
  mid:"#555552", muted:"#888884", border:"rgba(10,10,10,0.1)", borderMed:"rgba(10,10,10,0.2)",
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
  { id:31, type:"residency",  name:"Headlands Center for the Arts", org:"Headlands", city:"Sausalito", country:"USA", region:"north-america", duration:"1–11 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Oct 2026", description:"Residency in the Marin Headlands with live-work studios. Cross-disciplinary community and Bay Area connections." },
  { id:32, type:"residency",  name:"Yaddo", org:"Yaddo", city:"Saratoga Springs", country:"USA", region:"north-america", duration:"2 weeks–2 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Rolling", description:"One of America's oldest artist residencies. Private studios in a historic estate. Highly prestigious alumni." },
  { id:33, type:"residency",  name:"Bemis Center for Contemporary Arts", org:"Bemis Center", city:"Omaha", country:"USA", region:"north-america", duration:"2–6 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Fully funded residency with monthly stipend, studio, housing and exhibition opportunity." },
  { id:34, type:"residency",  name:"Vermont Studio Center", org:"Vermont Studio Center", city:"Johnson", country:"USA", region:"north-america", duration:"4 weeks", stipend:false, fee:true, disciplines:["painting","drawing","sculpture","photography","installation"], levels:[1,2,3], deadline:"Rolling", description:"Largest international artist residency in the US. Community of 50+ artists simultaneously in residence." },
  { id:35, type:"residency",  name:"Rauschenberg Foundation Residency", org:"Rauschenberg Foundation", city:"Captiva Island", country:"USA", region:"north-america", duration:"3–5 weeks", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Annual", description:"Fully funded residency at Robert Rauschenberg's former home. Prestigious, experimental, multidisciplinary." },
  { id:36, type:"residency",  name:"Künstlerhaus Bethanien", org:"Künstlerhaus Bethanien", city:"Berlin", country:"Germany", region:"europe", duration:"12 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Annual", description:"Prestigious Berlin residency. Studio, stipend, and solo exhibition at end of programme." },
  { id:37, type:"residency",  name:"Gasworks Residency", org:"Gasworks", city:"London", country:"UK", region:"europe", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"London residency with strong curatorial programme. Connected to Triangle Network internationally." },
  { id:38, type:"residency",  name:"Palais de Tokyo Residency", org:"Palais de Tokyo", city:"Paris", country:"France", region:"europe", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Annual", description:"Residency at one of Europe's most important contemporary art institutions. Strong visibility." },
  { id:39, type:"residency",  name:"Iaspis", org:"Swedish Arts Grants Committee", city:"Stockholm", country:"Sweden", region:"europe", duration:"6–12 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Annual", description:"Swedish government residency for international artists. Stipend, studio, and cultural exchange." },
  { id:40, type:"residency",  name:"Residency Unlimited", org:"Residency Unlimited", city:"New York", country:"USA", region:"north-america", duration:"3–6 months", stipend:false, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"NYC residency focused on international exchange. Connects artists to the New York art world." },
  { id:41, type:"residency",  name:"Capacete", org:"Capacete", city:"Rio de Janeiro", country:"Brazil", region:"latin-america", duration:"3–6 months", stipend:false, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Rio de Janeiro residency and education programme. Critical discourse and strong Latin American network." },
  { id:42, type:"residency",  name:"Lugar a Dudas", org:"Lugar a Dudas", city:"Cali", country:"Colombia", region:"latin-america", duration:"1–3 months", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Rolling", description:"Independent art space and residency in Cali. Important platform for Latin American critical practice." },
  { id:43, type:"residency",  name:"AIM Programme — Bronx Museum", org:"Bronx Museum", city:"New York", country:"USA", region:"north-america", duration:"9 months", stipend:true, fee:false, disciplines:["all"], levels:[1,2], deadline:"Annual", description:"Artist in the Marketplace — professional development for early-career NYC-area artists. Free, stipended." },
  { id:44, type:"residency",  name:"Smack Mellon", org:"Smack Mellon", city:"Brooklyn", country:"USA", region:"north-america", duration:"12 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3], deadline:"Annual", description:"Brooklyn studio residency with solo exhibition. Strong focus on underrepresented artists." },
  { id:45, type:"residency",  name:"Swatch Art Peace Hotel", org:"Swatch", city:"Shanghai", country:"China", region:"asia-pacific", duration:"2 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Two-month residency in Shanghai's historic Peace Hotel. Free lodging, studio, and stipend." },
  { id:46, type:"residency",  name:"Tokyo Wonder Site", org:"Tokyo Metropolitan Foundation", city:"Tokyo", country:"Japan", region:"asia-pacific", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"Tokyo residency for international artists. Studio, living support, and public exhibition at end." },
  { id:47, type:"residency",  name:"Camargo Foundation", org:"Camargo Foundation", city:"Cassis", country:"France", region:"europe", duration:"5 weeks–5 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Annual", description:"Residency in the south of France. Fully funded with housing and stipend." },
  { id:48, type:"residency",  name:"Nirox Sculpture Residency", org:"Nirox Foundation", city:"Johannesburg", country:"South Africa", region:"international", duration:"1–3 months", stipend:false, fee:false, disciplines:["sculpture","installation"], levels:[2,3,4], deadline:"Rolling", description:"Residency in a nature reserve near Johannesburg. Focus on sculpture and site-specific work." },
  { id:49, type:"residency",  name:"Bag Factory Artists Studios", org:"Bag Factory", city:"Johannesburg", country:"South Africa", region:"international", duration:"3–6 months", stipend:false, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Johannesburg studio residency. Part of Triangle Network. Supports South African and international exchange." },
  { id:50, type:"grant",      name:"Joan Mitchell Foundation Grant", org:"Joan Mitchell Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", description:"Grants of $15,000–$25,000 supporting painters and sculptors. Focus on underrepresented artists." },
  { id:51, type:"grant",      name:"McKnight Visual Artist Fellowship", org:"McKnight Foundation", city:"Minneapolis", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Mar 2026", description:"$25,000 fellowship for Minnesota-based mid-career artists of exceptional merit." },
  { id:52, type:"grant",      name:"Arts Council England Project Grant", org:"Arts Council England", city:"London", country:"UK", region:"europe", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4], deadline:"Rolling", description:"Project grants from £1,000–£100,000 for UK-based artists. Accessible to all career levels." },
  { id:53, type:"grant",      name:"PRO HELVETIA Grant", org:"Pro Helvetia", city:"Zurich", country:"Switzerland", region:"europe", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Swiss Arts Council grants for production, residency support, and international presentation." },
  { id:54, type:"grant",      name:"Mondriaan Fund", org:"Mondriaan Fund", city:"Amsterdam", country:"Netherlands", region:"europe", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"Dutch cultural fund. Production grants, residency support, and international presentation." },
  { id:55, type:"grant",      name:"Canada Council for the Arts", org:"Canada Council", city:"Ottawa", country:"Canada", region:"north-america", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4,5], deadline:"Rolling", description:"Major Canadian arts funding. Project grants, residency support, and travel funding for Canadian artists." },
  { id:56, type:"grant",      name:"Australia Council for the Arts", org:"Australia Council", city:"Sydney", country:"Australia", region:"asia-pacific", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4,5], deadline:"Rolling", description:"Australia's main arts funding body. Career development grants, residencies, and project support." },
  { id:57, type:"grant",      name:"Fondo Nacional de las Artes Argentina", org:"FNA", city:"Buenos Aires", country:"Argentina", region:"latin-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3,4], deadline:"Annual", description:"Argentine national arts fund. Project grants and residency support for Argentine artists." },
  { id:58, type:"grant",      name:"MINCULTURA Colombia", org:"Ministerio de Cultura", city:"Bogotá", country:"Colombia", region:"latin-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Annual", description:"Colombian Ministry of Culture grants. National arts awards and stipends for Colombian artists." },
  { id:59, type:"grant",      name:"Graham Foundation Grant", org:"Graham Foundation", city:"Chicago", country:"USA", region:"north-america", duration:"Project-based", stipend:true, fee:false, disciplines:["installation","sculpture"], levels:[3,4,5], deadline:"Rolling", description:"Grants at the intersection of architecture and visual arts. Up to $50,000." },
  { id:60, type:"grant",      name:"National Endowment for the Arts", org:"NEA", city:"Washington DC", country:"USA", region:"north-america", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4,5], deadline:"Rolling", description:"US federal arts grants. Project grants from $10,000–$100,000 for American artists." },
  { id:61, type:"grant",      name:"Pew Fellowship in the Arts", org:"Pew Center for Arts", city:"Philadelphia", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Annual", description:"$75,000 unrestricted fellowship for Philadelphia-area artists of exceptional merit." },
  { id:62, type:"grant",      name:"Herb Alpert Award in the Arts", org:"Herb Alpert Foundation", city:"Los Angeles", country:"USA", region:"north-america", duration:"Award", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Nomination", description:"$75,000 unrestricted awards for risk-taking mid-career American artists. Nomination only." },
  { id:63, type:"grant",      name:"Prince Claus Fund", org:"Prince Claus Fund", city:"Amsterdam", country:"Netherlands", region:"international", duration:"Award", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Nomination", description:"Awards for artists from Africa, Asia, Latin America and the Caribbean. €25,000. Nomination only." },
  { id:64, type:"grant",      name:"Premio Velázquez de Artes Plásticas", org:"Ministerio de Cultura España", city:"Madrid", country:"Spain", region:"europe", duration:"Award", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Annual", description:"Spain's highest arts honour for Ibero-American artists. €100,000. Major career credential." },
  { id:65, type:"exhibition", name:"Jerwood Arts Open", org:"Jerwood Arts", city:"London", country:"UK", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3], deadline:"Apr 2026", description:"Open submission supporting UK artists. Exhibition plus awards of up to £8,000." },
  { id:66, type:"exhibition", name:"Royal Academy Summer Exhibition", org:"Royal Academy", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:true, disciplines:["painting","drawing","sculpture","photography"], levels:[1,2,3,4], deadline:"Mar 2027", description:"World's largest open art exhibition. Strong public visibility and institutional recognition." },
  { id:67, type:"exhibition", name:"ICA Boston Foster Prize", org:"ICA Boston", city:"Boston", country:"USA", region:"north-america", duration:"Exhibition", stipend:true, fee:false, disciplines:["all"], levels:[3,4], deadline:"Rolling", description:"$10,000 prize and solo exhibition at ICA Boston for emerging New England artists." },
  { id:68, type:"exhibition", name:"Sobey Art Award", org:"Sobey Art Foundation", city:"Various", country:"Canada", region:"north-america", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Nomination", description:"Canada's most prestigious contemporary art prize for artists under 40. $100,000 top prize." },
  { id:69, type:"exhibition", name:"Turner Prize", org:"Tate Britain", city:"London", country:"UK", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination", description:"UK's most prominent contemporary art prize. Exhibition at Tate Britain. £25,000 winner." },
  { id:70, type:"exhibition", name:"Frieze Artist Award", org:"Frieze", city:"London / New York", country:"UK", region:"europe", duration:"Commission", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Jun 2026", description:"Annual commission for an emerging or mid-career artist to create a major new work at Frieze." },
  { id:71, type:"exhibition", name:"Open Call — Material Art Fair", org:"Material Art Fair", city:"CDMX", country:"México", region:"mexico", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[1,2,3], deadline:"Annual", description:"CDMX's independent art fair focused on emerging practices. More accessible than ZONAMACO." },
  { id:72, type:"exhibition", name:"Premio Tamayo", org:"Museo Tamayo", city:"CDMX", country:"México", region:"mexico", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"Mexico City's most important contemporary art prize. Exhibition at Museo Tamayo and cash prize." },
  { id:73, type:"exhibition", name:"Bloomberg New Contemporaries", org:"New Contemporaries", city:"London", country:"UK", region:"europe", duration:"Exhibition", stipend:false, fee:false, disciplines:["all"], levels:[1,2], deadline:"Mar 2027", description:"Annual open submission for recent UK art college graduates. Major launching pad for early career." },
  { id:74, type:"exhibition", name:"Aesthetica Art Prize", org:"Aesthetica Magazine", city:"York", country:"UK", region:"europe", duration:"Exhibition + Publication", stipend:true, fee:true, disciplines:["all"], levels:[1,2,3], deadline:"Aug 2026", description:"International open call with exhibition at York Art Gallery and Aesthetica Magazine publication." },
  { id:75, type:"exhibition", name:"Premio ARCO / IFEMA", org:"ARCO Madrid", city:"Madrid", country:"Spain", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"Award for artists at ARCO Madrid. Important recognition in Spanish and Latin American art market." },
  { id:76, type:"exhibition", name:"Les Rencontres d'Arles", org:"Rencontres d'Arles", city:"Arles", country:"France", region:"europe", duration:"3 months", stipend:false, fee:false, disciplines:["photography"], levels:[2,3,4,5], deadline:"Annual", description:"World's most important photography festival. Open calls, awards, and curated sections." },
  { id:77, type:"exhibition", name:"Artpace San Antonio", org:"Artpace", city:"San Antonio", country:"USA", region:"north-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Annual", description:"Fully funded residency with $25,000 production budget. Focus on Texas-based and international emerging artists." },
  { id:78, type:"exhibition", name:"Premio Latinoamericano Arte Emergente", org:"Fundación Ortega Muñoz", city:"Madrid", country:"Spain", region:"europe", duration:"Exhibition + Award", stipend:true, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Annual", description:"Award for emerging Latin American artists connected to Spain. Exhibition in Madrid and cash prize." },
  { id:79, type:"fair",       name:"SP-Arte", org:"SP-Arte", city:"São Paulo", country:"Brazil", region:"latin-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4,5], deadline:"Gallery-only", description:"Brazil's most important art fair. Strong Latin American collector base and growing international presence." },
  { id:80, type:"fair",       name:"arteBA", org:"arteBA Foundation", city:"Buenos Aires", country:"Argentina", region:"latin-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[2,3,4], deadline:"Gallery-only", description:"Argentina's leading art fair. Key platform for Latin American collectors and galleries." },
  { id:81, type:"fair",       name:"ARTBO", org:"ARTBO", city:"Bogotá", country:"Colombia", region:"latin-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[2,3,4], deadline:"Gallery-only", description:"Bogotá International Art Fair. Important platform for Colombian and Latin American art." },
  { id:82, type:"fair",       name:"Gulf Art Fair", org:"Gulf Art Fair", city:"Dubai", country:"UAE", region:"international", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4,5], deadline:"Gallery-only", description:"Dubai's leading contemporary art fair. Growing Middle Eastern collector base." },
  { id:83, type:"fair",       name:"LISTE Art Fair Basel", org:"LISTE", city:"Basel", country:"Switzerland", region:"europe", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[3,4], deadline:"Gallery-only", description:"Young galleries fair alongside Art Basel. Gateway to the Basel ecosystem." },
  { id:84, type:"fair",       name:"PArC Lima", org:"PArC", city:"Lima", country:"Peru", region:"latin-america", duration:"Fair", stipend:false, fee:true, disciplines:["all"], levels:[2,3,4], deadline:"Gallery-only", description:"Lima Contemporary Art Fair. Growing platform for Peruvian and Latin American art market." },
  { id:85, type:"biennial",   name:"Documenta", org:"documenta GmbH", city:"Kassel", country:"Germany", region:"europe", duration:"100 days", stipend:true, fee:false, disciplines:["all"], levels:[5], deadline:"Invitation only", description:"World's most important contemporary art exhibition, held every 5 years. Invitation by appointed artistic director." },
  { id:86, type:"biennial",   name:"Istanbul Biennial", org:"Istanbul Foundation for Culture", city:"Istanbul", country:"Turkey", region:"europe", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", description:"One of the world's most important biennials. Strong political and cultural dialogue." },
  { id:87, type:"biennial",   name:"Sharjah Biennial", org:"Sharjah Art Foundation", city:"Sharjah", country:"UAE", region:"international", duration:"2 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Invitation only", description:"Influential biennial with strong focus on artists from the Global South. Significant institutional support." },
  { id:88, type:"biennial",   name:"Gwangju Biennale", org:"Gwangju Biennale Foundation", city:"Gwangju", country:"South Korea", region:"asia-pacific", duration:"2 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Invitation only", description:"Asia's most important biennial. Strong international profile and significant institutional recognition." },
  { id:89, type:"biennial",   name:"BIENALSUR", org:"UNTREF", city:"Buenos Aires + Global", country:"Argentina", region:"latin-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Open call + nomination", description:"International biennial of contemporary art of the South. Open call available alongside curated nominations." },
  { id:90, type:"biennial",   name:"Mercosul Biennial", org:"Fundação Bienal Mercosul", city:"Porto Alegre", country:"Brazil", region:"latin-america", duration:"2 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Nomination only", description:"Important Latin American biennial focused on the Mercosul region." },
  { id:91, type:"biennial",   name:"Fotofestiwal Łódź", org:"Fotofestiwal", city:"Łódź", country:"Poland", region:"europe", duration:"1 month", stipend:false, fee:false, disciplines:["photography","video"], levels:[2,3,4], deadline:"Open call", description:"International photography festival with open call. Good platform for photographers seeking European exposure." },
  { id:92, type:"biennial",   name:"Manifesta", org:"Manifesta Foundation", city:"Rotating European city", country:"Europe", region:"europe", duration:"3–4 months", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Nomination only", description:"Nomadic European biennial held in a different city each edition. Strong institutional framework." },
  { id:93, type:"grant",      name:"Hyundai Tate Research Centre Grant", org:"Tate / Hyundai", city:"London", country:"UK", region:"europe", duration:"Project-based", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Annual", description:"Research grants for artists exploring transnational and Asian art histories. Up to £30,000." },
  { id:94, type:"grant",      name:"Pollock-Krasner Foundation Grant", org:"Pollock-Krasner Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["painting","drawing","sculpture"], levels:[2,3,4], deadline:"Rolling", description:"Grants of $5,000–$30,000 for painters, sculptors, and draughtsmen. Rolling applications." },
  { id:95, type:"grant",      name:"Creative Capital Award", org:"Creative Capital", city:"New York", country:"USA", region:"north-america", duration:"Multi-year", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Sep 2026", description:"Up to $50,000 in direct funding plus career development. One of the most significant US artist grants." },
  { id:96, type:"grant",      name:"Guggenheim Fellowship", org:"Guggenheim Foundation", city:"New York", country:"USA", region:"north-america", duration:"1 year", stipend:true, fee:false, disciplines:["all"], levels:[4,5], deadline:"Sep 2026", description:"Prestigious fellowship for mid-career artists. Average grant around $45,000. Major career credential." },
  { id:97, type:"exhibition", name:"Open Call — Ruya Foundation Iraq Pavilion", org:"Ruya Foundation", city:"Venice", country:"Italy", region:"europe", duration:"6 months", stipend:true, fee:false, disciplines:["all"], levels:[3,4,5], deadline:"Annual", description:"Open call for artists with connection to Iraq to represent the Iraqi Pavilion at Venice Biennale." },
  { id:98, type:"residency",  name:"Guna Yala Foundation Residency", org:"Guna Yala Foundation", city:"Panama City", country:"Panama", region:"latin-america", duration:"2–4 months", stipend:false, fee:false, disciplines:["all"], levels:[1,2,3], deadline:"Rolling", description:"Central American residency supporting Latin American artists. Focus on indigenous and post-colonial practices." },
  { id:99, type:"exhibition", name:"Fotografia Europea — Reggio Emilia", org:"Fondazione Palazzo Magnani", city:"Reggio Emilia", country:"Italy", region:"europe", duration:"1 month", stipend:false, fee:false, disciplines:["photography","video"], levels:[2,3,4], deadline:"Annual", description:"Major European photography festival with open calls and curated sections. Strong institutional visibility." },
  { id:100, type:"grant",     name:"Artpace International Artist-in-Residence", org:"Artpace", city:"San Antonio", country:"USA", region:"north-america", duration:"3 months", stipend:true, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Annual", description:"Fully funded San Antonio residency with production budget for international artists. Strong curatorial support." },
  { id:101, type:"residency", name:"Red Gate Gallery Residency", org:"Red Gate Gallery", city:"Beijing", country:"China", region:"asia-pacific", duration:"1–3 months", stipend:false, fee:true, disciplines:["painting","drawing","photography","installation"], levels:[2,3,4], deadline:"Rolling", description:"Beijing residency in a historic watchtower. Long-running programme for artists interested in China." },
  { id:102, type:"residency", name:"Khoj International Artists Association", org:"Khoj", city:"New Delhi", country:"India", region:"asia-pacific", duration:"1–2 months", stipend:false, fee:false, disciplines:["all"], levels:[2,3,4], deadline:"Rolling", description:"New Delhi residency and art space. Important platform for South Asian and international exchange." },
  { id:103, type:"grant",     name:"Prix de Rome Netherlands", org:"Mondriaan Fund", city:"Amsterdam", country:"Netherlands", region:"europe", duration:"Award + Residency", stipend:true, fee:false, disciplines:["all"], levels:[2,3], deadline:"Annual", description:"Prestigious Dutch award for emerging artists. €40,000 and a research residency abroad." },
];

export default function OpportunityDatabase({ isPro=false, onUpgrade, lang="en" }) {
  const T = lang==="es" ? {
    title:"Base de Datos", heading:"Oportunidades", subFull:"Base completa — filtrada por nivel y región.", subLocked:(n)=>`Mostrando 5 de ${n}. Actualiza para acceso completo.`,
    filterTypes:[["all","Todos"],["residency","Residencia"],["grant","Beca"],["exhibition","Convocatoria"],["fair","Feria"],["biennial","Bienal"]],
    filterRegions:[["all","Todas"],["mexico","México"],["latin-america","América Latina"],["north-america","Norte América"],["europe","Europa"],["international","Internacional"]],
    search:"Buscar oportunidades...", levels:"Todos los Niveles", level:"Nivel",
    duration:"Duración", deadline:"Fecha límite", stipend:"BECA INCLUIDA",
    moreUnlocked:(n)=>`${n} oportunidades más con Pro.`, unlockBtn:"Desbloquear Base Completa →",
    noResults:"Sin resultados con estos filtros.", visitSite:"Ver sitio →"
  } : {
    title:"Opportunity Database", heading:"Opportunities", subFull:"Full database — filtered for your level and region.", subLocked:(n)=>`Showing 5 of ${n}. Upgrade for full access.`,
    filterTypes:[["all","All Types"],["residency","Residency"],["grant","Grant"],["exhibition","Open Call"],["fair","Art Fair"],["biennial","Biennial"]],
    filterRegions:[["all","All Regions"],["mexico","México"],["latin-america","Latin America"],["north-america","North America"],["europe","Europe"],["international","International"]],
    search:"Search opportunities...", levels:"All Levels", level:"Level",
    duration:"Duration", deadline:"Deadline", stipend:"STIPEND",
    moreUnlocked:(n)=>`${n} more opportunities unlocked with Pro.`, unlockBtn:"Unlock Full Database →",
    noResults:T.noResults, visitSite:"Visit site →"
  };
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,600&family=DM+Mono:wght@300;400;500&display=swap'); ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#f7f6f2} ::-webkit-scrollbar-thumb{background:#ccc}`}</style>

      {/* Header */}
      <div style={{ padding:"48px 48px 32px", borderBottom:`1px solid ${D.border}` }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase", color:D.mid, marginBottom:"12px" }}>{T.title}</div>
          <h1 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:600, color:D.white, lineHeight:1, textTransform:"uppercase", marginBottom:"8px" }}>
{filtered.length} {T.heading}.
          </h1>
          <p style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"18px", color:D.mid, fontStyle:"italic" }}>
            {isPro ? T.subFull : T.subLocked(filtered.length)}
          </p>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 48px" }}>
        {/* Filters */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {T.filterTypes.map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={typeF} set={setTypeF} label={l}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {T.filterRegions.map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={regionF} set={setRegionF} label={l}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"24px" }}>
          {[["all",T.levels],["1","Level 1"],["2","Level 2"],["3","Level 3"],["4","Level 4"],["5","Level 5"]].map(([v,l]) => (
            <FilterBtn key={v} val={v} curr={levelF} set={setLevelF} label={l}/>
          ))}
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={T.search} style={{ width:"100%", padding:"12px 16px", background:"rgba(10,10,10,0.04)", border:`1px solid ${D.border}`, color:D.white, fontFamily:"monospace", fontSize:"12px", outline:"none", borderRadius:"4px", marginBottom:"32px" }}/>

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
                    <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"20px", color:D.white, lineHeight:1.2 }}>{o.name}</div>
                    <div style={{ fontSize:"10px", color:D.mid, marginTop:"3px" }}>{o.org} · {o.city}, {o.country}</div>
                  </div>
                  <div style={{ textAlign:"right", fontSize:"10px", color:D.mid, whiteSpace:"nowrap" }}>{o.duration}</div>
                  <div style={{ textAlign:"right", fontSize:"10px", color:o.deadline==="Rolling"?"#606060":D.accent, whiteSpace:"nowrap" }}>{o.deadline}</div>
                  <div style={{ fontSize:"16px", color:D.mid, transition:"transform 0.2s", transform:isOpen?"rotate(90deg)":"none" }}>›</div>
                </div>
                {isOpen && (
                  <div style={{ padding:"0 24px 20px", borderTop:`1px solid ${D.border}` }}>
                    <p style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"16px", color:D.mid, lineHeight:1.7, marginTop:"16px", marginBottom:"12px" }}>{o.description}</p>
                    <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                      {o.levels.map(l => <span key={l} style={{ fontSize:"9px", padding:"3px 8px", border:`1px solid ${D.border}`, color:D.mid, borderRadius:"3px" }}>{T.level} {l}</span>)}
                    </div>
                    {ORG_URLS[o.org] && (
                      <a href={ORG_URLS[o.org]} target="_blank" rel="noopener noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:D.white, border:`1px solid ${D.borderMed}`, padding:"5px 12px", textDecoration:"none", transition:"all 0.15s" }}
                        onMouseEnter={e=>{e.target.style.background="#0a0a0a";e.target.style.color="#ffffff";}}
                        onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=D.white;}}>
                        {T.visitSite}
                      </a>
                    )}
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
            <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"28px", fontStyle:"italic", color:D.white, marginBottom:"12px" }}>
              {T.moreUnlocked(filtered.length - 5)}
            </div>
            <p style={{ fontSize:"11px", color:D.mid, marginBottom:"24px" }}>Residencies, grants, open calls, fairs — filtered for your level.</p>
            <button onClick={onUpgrade} style={{ padding:"14px 40px", background:D.white, border:"1px solid rgba(10,10,10,0.8)", color:D.black, fontFamily:"monospace", fontSize:"10px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", cursor:"pointer", borderRadius:"4px" }}>
              Unlock Full Database →
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ padding:"60px 32px", textAlign:"center", color:D.mid, fontFamily:"'Bodoni Moda',serif", fontSize:"22px", fontStyle:"italic" }}>
            No opportunities match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
