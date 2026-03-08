import { useState } from "react";

const B = {
  bg: "#f2f2f0", bg2: "#e8e8e5", bg3: "#ffffff",
  ink: "#1a1a18", ink2: "#2e2e2c", mid: "#6b6b68", muted: "#9a9a96",
  border: "rgba(26,26,24,0.1)", borderStrong: "rgba(26,26,24,0.18)",
  gold: "#c8a84b", rust: "#c04020", sage: "#4a7a5a",
};

const PRO_FEATURES = [
  { icon: "∴", text: "Unlimited AI career assessments" },
  { icon: "⊕", text: "Full opportunity database — 80+ residencies, grants, fairs worldwide" },
  { icon: "◎", text: "Gallery matching + personalised outreach templates" },
  { icon: "🇲🇽", text: "Mexico & Latin America opportunities — FONCA, Casa Wabi, ZONAMACO and more" },
  { icon: "→", text: "Priority mission list with XP tracking" },
  { icon: "↑", text: "Career progress tracking over time" },
];

export default function Paywall({ feature, onClose, onUpgrade, loading }) {
  const [plan, setPlan] = useState("annual");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleUpgrade = () => {
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    onUpgrade(plan, email.trim());
  };

  const savings = Math.round(((240 * 12) - 1980) / (240 * 12) * 100);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(26,26,24,0.6)", backdropFilter: "blur(6px)", zIndex: 200 }} />

      {/* Modal */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 201, width: "min(680px, 95vw)", background: B.bg3, border: `1px solid ${B.borderStrong}`, fontFamily: "monospace", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>

        {/* Gold top bar */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: "32px 36px 24px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: B.gold, marginBottom: "8px", fontWeight: 500 }}>
              Stratum Pro
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 400, color: B.ink, lineHeight: 1.1, marginBottom: "6px" }}>
              {feature ? <>Unlock <em style={{ color: B.gold }}>{feature}</em></> : <>Upgrade to <em style={{ color: B.gold }}>Pro</em></>}
            </h2>
            <p style={{ fontSize: "11px", color: B.mid, lineHeight: 1.6 }}>
              Everything Stratum has to offer — for less than a coffee a week.
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: B.muted, fontSize: "20px", cursor: "pointer", padding: "4px", lineHeight: 1, marginLeft: "16px", flexShrink: 0 }}>✕</button>
        </div>

        {/* Plan selector */}
        <div style={{ padding: "24px 36px", borderBottom: `1px solid ${B.border}` }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: B.muted, marginBottom: "12px" }}>Choose your plan</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

            {/* Monthly */}
            <button onClick={() => setPlan("monthly")} style={{ padding: "16px", background: plan === "monthly" ? "rgba(200,168,75,0.07)" : B.bg, border: `1.5px solid ${plan === "monthly" ? B.gold : B.border}`, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: plan === "monthly" ? B.gold : B.muted, marginBottom: "6px" }}>Monthly</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, color: B.ink, lineHeight: 1 }}>$240</div>
              <div style={{ fontSize: "9px", color: B.muted, marginTop: "3px" }}>MXN por mes</div>
            </button>

            {/* Annual */}
            <button onClick={() => setPlan("annual")} style={{ padding: "16px", background: plan === "annual" ? "rgba(200,168,75,0.07)" : B.bg, border: `1.5px solid ${plan === "annual" ? B.gold : B.border}`, cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", right: "-1px", background: B.sage, padding: "3px 8px", fontSize: "8px", letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase" }}>Save {savings}%</div>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: plan === "annual" ? B.gold : B.muted, marginBottom: "6px" }}>Annual</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, color: B.ink, lineHeight: 1 }}>$1,980</div>
              <div style={{ fontSize: "9px", color: B.muted, marginTop: "3px" }}>MXN por año · $165/mes</div>
            </button>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: "20px 36px", borderBottom: `1px solid ${B.border}` }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: B.muted, marginBottom: "12px" }}>Everything in Pro</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: B.gold, flexShrink: 0, fontSize: "14px", lineHeight: 1.5 }}>{f.icon}</span>
                <span style={{ fontSize: "11px", color: B.mid, lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email + CTA */}
        <div style={{ padding: "24px 36px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: B.muted, marginBottom: "8px" }}>Your email</div>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="artist@example.com"
              style={{ width: "100%", background: B.bg, border: `1px solid ${emailError ? B.rust : B.border}`, color: B.ink, fontFamily: "monospace", fontSize: "12px", padding: "11px 14px", outline: "none" }}
            />
            {emailError && <div style={{ fontSize: "10px", color: B.rust, marginTop: "5px" }}>{emailError}</div>}
            <div style={{ fontSize: "9px", color: B.muted, marginTop: "5px" }}>Used to restore access if you clear your browser.</div>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            style={{ width: "100%", padding: "16px", background: loading ? B.bg2 : B.gold, border: "none", color: loading ? B.gold : "#fff", fontFamily: "monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            {loading ? (
              <>
                <span style={{ width: "14px", height: "14px", border: `1px solid ${B.gold}40`, borderTop: `1px solid ${B.gold}`, borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
                Opening Stripe…
              </>
            ) : (
              <>Upgrade to Pro · {plan === "annual" ? "$1,980 MXN/año" : "$240 MXN/mes"} →</>
            )}
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "14px" }}>
            {["Pago seguro via Stripe", "Cancela cuando quieras", "Acceso inmediato"].map(t => (
              <div key={t} style={{ fontSize: "9px", color: B.muted, letterSpacing: "0.1em" }}>✓ {t}</div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
