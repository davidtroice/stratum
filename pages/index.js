import { useState, useEffect, useCallback } from "react";
import Landing from "../components/Landing";
import Assessment from "../components/Assessment";
import OpportunityDatabase from "../components/OpportunityDatabase";
import GalleryMatcher from "../components/GalleryMatcher";
import PortfolioBuilder from "../components/PortfolioBuilder";
import Paywall from "../components/Paywall";

const NAV = [
  { id:"assessment",    label:"Assessment" },
  { id:"opportunities", label:"Opportunities ✦" },
  { id:"portfolio",     label:"Statement Builder ✦" },
  { id:"galleries",     label:"Galleries ✦" },
];

const LS_EMAIL        = "stratum_email";
const LS_IS_PRO       = "stratum_is_pro";
const LS_ASSESS_COUNT = "stratum_assessment_count";

const D = { bg:"#f2f2f0", ink:"#1a1a18", mid:"#6b6b68", border:"rgba(26,26,24,0.08)", gold:"#c8a84b" };

const LogoMark = ({ size=24 }) => (
  <img src="/logo.png" width={size} height={size}
    style={{ objectFit:"contain", display:"block", filter:"brightness(0) invert(1)" }}
    alt="Stratum" />
);

export default function Index() {
  const [screen, setScreen]           = useState("landing");
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
      setIsPro(true);
      localStorage.setItem(LS_IS_PRO, "true");
      setProJustUnlocked(true);
      setTimeout(() => setProJustUnlocked(false), 5000);
      window.history.replaceState({}, "", "/");
    }
    if (params.get("cancelled") === "true") {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const navigate = useCallback((dest) => {
    if ((dest === "galleries" || dest === "portfolio") && !isPro) {
      setPaywall({ feature: dest === "galleries" ? "Gallery Matching" : "Statement Builder" });
      return;
    }
    setPaywall(null);
    setScreen(dest);
  }, [isPro]);

  const onAssessmentRun = useCallback(() => {
    const n = assessCount + 1;
    setAssessCount(n);
    localStorage.setItem(LS_ASSESS_COUNT, n.toString());
  }, [assessCount]);

  const canRunAssessment = isPro || assessCount < 1;

  const handleUpgrade = async (plan, email) => {
    setCheckoutLoading(true);
    setUserEmail(email);
    localStorage.setItem(LS_EMAIL, email);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      alert(`Checkout error: ${err.message}`);
      setCheckoutLoading(false);
    }
  };

  const handleManagePro = () => {
    if (confirm("Open Stripe customer portal to manage your subscription?")) {
      window.open("https://billing.stripe.com/p/login/your_portal_id", "_blank");
    }
  };

  return (
    <div style={{ background:D.bg, minHeight:"100vh", color:D.ink }}>

      {proJustUnlocked && (
        <div style={{ position:"fixed", top:"20px", left:"50%", transform:"translateX(-50%)", zIndex:300, padding:"14px 28px", background:D.gold, color:"#fff", fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", borderRadius:"8px", boxShadow:"0 8px 32px rgba(200,168,75,0.35)", animation:"slideDown 0.4s ease" }}>
          ✦ Pro unlocked — welcome to Stratum Pro
        </div>
      )}

      {screen !== "landing" && (
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(242,242,240,0.93)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${D.border}` }}>
          <button onClick={()=>setScreen("landing")} style={{ display:"flex", alignItems:"center", gap:"9px", background:"none", border:"none", cursor:"pointer" }}>
            <LogoMark size={24} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"19px", fontWeight:400, color:D.ink }}>
              Str<span style={{ color:D.gold, fontStyle:"italic" }}>a</span>tum
            </span>
          </button>
          <div style={{ display:"flex", gap:"20px", alignItems:"center" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={()=>navigate(n.id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color: screen===n.id ? D.gold : D.mid, borderBottom: screen===n.id ? `1.5px solid ${D.gold}` : "1.5px solid transparent", paddingBottom:"2px", fontFamily:"monospace", transition:"color 0.15s" }}>
                {n.label}
              </button>
            ))}
          </div>
          <div>
            {isPro ? (
              <button onClick={handleManagePro} style={{ padding:"6px 14px", background:"rgba(200,168,75,0.1)", border:"1px solid rgba(200,168,75,0.3)", color:D.gold, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", borderRadius:"6px" }}>
                ✦ Pro
              </button>
            ) : (
              <button onClick={()=>setPaywall({feature:null})} style={{ padding:"6px 14px", background:D.gold, border:"none", color:"#fff", fontFamily:"monospace", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", borderRadius:"6px" }}>
                Upgrade →
              </button>
            )}
          </div>
        </nav>
      )}

      {screen==="landing"       && <Landing onNavigate={navigate} isPro={isPro} onUpgrade={()=>setPaywall({feature:null})} />}
      {screen==="assessment"    && <Assessment isPro={isPro} canRun={canRunAssessment} assessCount={assessCount} onRun={onAssessmentRun} onUpgrade={()=>setPaywall({feature:"Unlimited Assessments"})} />}
      {screen==="opportunities" && <OpportunityDatabase isPro={isPro} onUpgrade={()=>setPaywall({feature:"Full Opportunity Database"})} />}
      {screen==="portfolio"     && <PortfolioBuilder />}
      {screen==="galleries"     && <GalleryMatcher />}

      {paywall && <Paywall feature={paywall.feature} onClose={()=>setPaywall(null)} onUpgrade={handleUpgrade} loading={checkoutLoading} />}

      <style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}
