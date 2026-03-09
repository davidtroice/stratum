import { useState, useEffect, useCallback } from "react";
import Landing from "../components/Landing";
import Assessment from "../components/Assessment";
import OpportunityDatabase from "../components/OpportunityDatabase";
import GalleryMatcher from "../components/GalleryMatcher";
import PortfolioBuilder from "../components/PortfolioBuilder";
import Paywall from "../components/Paywall";

const NAV = [
  { id:"assessment",    label:"Assessment" },
  { id:"opportunities", label:"Opportunities" },
  { id:"portfolio",     label:"Statement Builder" },
  { id:"galleries",     label:"Galleries" },
];

const LS_EMAIL        = "stratum_email";
const LS_IS_PRO       = "stratum_is_pro";
const LS_ASSESS_COUNT = "stratum_assessment_count";

const Logo = ({ size=26, color="#0a0a0a" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8"  width="32" height="6" rx="1" fill={color} opacity="0.35"/>
    <rect x="4" y="17" width="32" height="6" rx="1" fill={color} opacity="0.65"/>
    <rect x="4" y="26" width="32" height="6" rx="1" fill={color}/>
  </svg>
);

export default function Index() {
  const [screen, setScreen]           = useState("landing");
  const [lang, setLang]               = useState(() => typeof navigator!=="undefined" && navigator.language?.startsWith("es") ? "es" : "en");
  const [isPro, setIsPro]             = useState(false);
  const [userEmail, setUserEmail]     = useState("");
  const [assessCount, setAssessCount] = useState(0);
  const [paywall, setPaywall]         = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [proJustUnlocked, setProJustUnlocked] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem(LS_EMAIL) || "";
    const pro   = localStorage.getItem(LS_IS_PRO) === "true";
    const count = parseInt(localStorage.getItem(LS_ASSESS_COUNT) || "0");
    setUserEmail(email); setIsPro(pro); setAssessCount(count);
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setIsPro(true); localStorage.setItem(LS_IS_PRO, "true");
      setProJustUnlocked(true); setTimeout(() => setProJustUnlocked(false), 5000);
      window.history.replaceState({}, "", "/");
    }
    if (params.get("cancelled") === "true") window.history.replaceState({}, "", "/");
  }, []);

  const navigate = useCallback((dest) => {
    if ((dest === "galleries" || dest === "portfolio") && !isPro) {
      setPaywall({ feature: dest === "galleries" ? "Gallery Matching" : "Statement Builder" }); return;
    }
    setPaywall(null); setScreen(dest);
  }, [isPro]);

  const onAssessmentRun = useCallback(() => {
    const n = assessCount + 1; setAssessCount(n);
    localStorage.setItem(LS_ASSESS_COUNT, n.toString());
  }, [assessCount]);

  const canRunAssessment = isPro || assessCount < 1;

  const handleUpgrade = async (plan, email) => {
    setCheckoutLoading(true); setUserEmail(email); localStorage.setItem(LS_EMAIL, email);
    try {
      const res  = await fetch("/api/create-checkout", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ plan, email }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) { alert(`Checkout error: ${err.message}`); setCheckoutLoading(false); }
  };

  const handleManagePro = () => {
    if (confirm("Open Stripe customer portal to manage your subscription?"))
      window.open("https://billing.stripe.com/p/login/your_portal_id", "_blank");
  };

  return (
    <div style={{ background:"#ffffff", minHeight:"100vh", color:"#0a0a0a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,600&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
      `}</style>

      {proJustUnlocked && (
        <div style={{ position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:300,padding:"14px 28px",background:"#0a0a0a",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",boxShadow:"0 8px 32px rgba(0,0,0,0.2)",animation:"slideDown 0.4s ease" }}>
          ✦ Pro unlocked — welcome to Stratum
        </div>
      )}

      {screen !== "landing" && (
        <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 40px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(10,10,10,0.1)" }}>
          <button onClick={()=>setScreen("landing")} style={{ display:"flex",alignItems:"center",gap:"10px",background:"none",border:"none",cursor:"pointer" }}>
            <Logo size={26} color="#0a0a0a" />
            <span style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"20px",fontWeight:400,color:"#0a0a0a",letterSpacing:"-0.01em" }}>Stratum</span>
          </button>
          <div style={{ display:"flex",gap:"4px",alignItems:"center" }}>
            {NAV.map(n => {
              const active = screen === n.id;
              const proOnly = n.id === "portfolio" || n.id === "galleries";
              return (
                <button key={n.id} onClick={()=>navigate(n.id)} style={{ background:"none",border:"none",cursor:"pointer",padding:"6px 14px",fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase",color:active?"#0a0a0a":"#888884",borderBottom:active?"2px solid #0a0a0a":"2px solid transparent",paddingBottom:"4px",transition:"all 0.15s" }}>
                  {n.label}{proOnly&&!isPro&&<span style={{ marginLeft:"4px",opacity:0.4,fontSize:"8px" }}>PRO</span>}
                </button>
              );
            })}
          </div>
          <div style={{ display:"flex",gap:"8px",alignItems:"center" }}>
            <div style={{ display:"flex",border:"1px solid rgba(10,10,10,0.12)",overflow:"hidden" }}>
              {["en","es"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{ padding:"5px 11px",background:lang===l?"#0a0a0a":"transparent",color:lang===l?"#ffffff":"#888884",fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.1em",border:"none",cursor:"pointer",transition:"all 0.15s" }}>{l.toUpperCase()}</button>
              ))}
            </div>
            {isPro ? (
              <button onClick={handleManagePro} style={{ padding:"7px 16px",background:"transparent",border:"1px solid rgba(10,10,10,0.2)",color:"#0a0a0a",fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer" }}>
                ✦ Pro
              </button>
            ) : (
              <button onClick={()=>setPaywall({feature:null})} style={{ padding:"8px 20px",background:"#0a0a0a",border:"none",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer" }}>
                Upgrade →
              </button>
            )}
          </div>
        </nav>
      )}

      {screen==="landing"       && <Landing onNavigate={navigate} isPro={isPro} onUpgrade={()=>setPaywall({feature:null})} lang={lang} setLang={setLang} />}
      {screen==="assessment"    && <Assessment isPro={isPro} canRun={canRunAssessment} assessCount={assessCount} onRun={onAssessmentRun} onUpgrade={()=>setPaywall({feature:"Unlimited Assessments"})} lang={lang} />}
      {screen==="opportunities" && <OpportunityDatabase isPro={isPro} onUpgrade={()=>setPaywall({feature:"Full Opportunity Database"})} lang={lang} />}
      {screen==="portfolio"     && <PortfolioBuilder lang={lang} />}
      {screen==="galleries"     && <GalleryMatcher isPro={isPro} onUpgrade={()=>setPaywall({feature:"Gallery Matching"})} lang={lang} />}
      {paywall && <Paywall feature={paywall.feature} onClose={()=>setPaywall(null)} onUpgrade={handleUpgrade} loading={checkoutLoading} lang={lang} />}
    </div>
  );
}
