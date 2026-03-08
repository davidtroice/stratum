// pages/index.js
// FREE tier:  1 assessment, 5 opportunity previews, NO gallery matcher
// PRO tier:   unlimited assessments, full opportunity database, gallery matcher

import { useState, useEffect, useCallback } from "react";
import Landing from "../components/Landing";
import Assessment from "../components/Assessment";
import OpportunityDatabase from "../components/OpportunityDatabase";
import GalleryMatcher from "../components/GalleryMatcher";
import Paywall from "../components/Paywall";

const NAV = [
  { id: "assessment",    label: "Assessment" },
  { id: "opportunities", label: "Opportunities ✦" },
  { id: "galleries",     label: "Galleries ✦" },
];

const LS_EMAIL        = "stratum_email";
const LS_IS_PRO       = "stratum_is_pro";
const LS_ASSESS_COUNT = "stratum_assessment_count";

const B = {
  bg: "#f2f2f0", ink: "#1a1a18", mid: "#6b6b68",
  border: "rgba(26,26,24,0.1)", gold: "#c8a84b",
};

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
    if ((dest === "galleries" || dest === "opportunities") && !isPro) {
      setPaywall({ feature: dest === "galleries" ? "Gallery Matching" : "Full Opportunity Database" });
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
    <div style={{ background: B.bg, minHeight: "100vh", color: B.ink }}>

      {proJustUnlocked && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 300, padding: "14px 28px", background: B.gold, color: "#fff", fontFamily: "monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", boxShadow: "0 8px 32px rgba(200,168,75,0.35)", animation: "slideDown 0.4s ease" }}>
          ✦ Pro unlocked — welcome to Stratum Pro
        </div>
      )}

      {screen !== "landing" && (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(242,242,240,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${B.border}` }}>
          <button onClick={() => setScreen("landing")} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, background: "none", border: "none", color: B.ink, cursor: "pointer" }}>
            Str<span style={{ color: B.gold, fontStyle: "italic" }}>a</span>tum
          </button>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: screen === n.id ? B.gold : B.mid, borderBottom: screen === n.id ? `1px solid ${B.gold}` : "1px solid transparent", paddingBottom: "2px", fontFamily: "monospace" }}>
                {n.label}
              </button>
            ))}
          </div>
          <div>
            {isPro ? (
              <button onClick={handleManagePro} style={{ padding: "6px 14px", background: "rgba(200,168,75,0.1)", border: `1px solid rgba(200,168,75,0.3)`, color: B.gold, fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                ✦ Pro
              </button>
            ) : (
              <button onClick={() => setPaywall({ feature: null })} style={{ padding: "6px 14px", background: B.gold, border: "none", color: "#fff", fontFamily: "monospace", fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Upgrade →
              </button>
            )}
          </div>
        </nav>
      )}

      {screen === "landing"       && <Landing onNavigate={navigate} isPro={isPro} onUpgrade={() => setPaywall({ feature: null })} />}
      {screen === "assessment"    && <Assessment isPro={isPro} canRun={canRunAssessment} assessCount={assessCount} onRun={onAssessmentRun} onUpgrade={() => setPaywall({ feature: "Unlimited Assessments" })} />}
      {screen === "opportunities" && <OpportunityDatabase isPro={isPro} onUpgrade={() => setPaywall({ feature: "Full Opportunity Database" })} />}
      {screen === "galleries"     && <GalleryMatcher />}

      {paywall && <Paywall feature={paywall.feature} onClose={() => setPaywall(null)} onUpgrade={handleUpgrade} loading={checkoutLoading} />}

      <style>{`@keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}
