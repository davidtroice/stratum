// components/Paywall.js
// Beautiful upgrade modal shown when a free user hits a gated feature.
// Props:
//   feature: string — name of the feature they tried to access
//   onClose: fn — close without upgrading
//   onUpgrade: fn(plan) — called with "monthly" or "annual"
//   loading: bool — show spinner while checkout is loading

import { useState } from "react";

const B = {
  ink: "#0a0908", ink2: "#111009", ink3: "#161410",
  bone: "#f4efe6", mist: "#a09890", ash: "#504840", char: "#302820",
  gold: "#c8a84b", goldWire: "rgba(200,168,75,0.12)", goldDim: "rgba(200,168,75,0.08)",
  rust: "#b04518", sage: "#697b6c",
};

const PRO_FEATURES = [
  { icon: "∴", text: "Unlimited AI career assessments" },
  { icon: "◎", text: "Full gallery matching + outreach templates" },
  { icon: "⊕", text: "Save opportunities & set deadline reminders" },
  { icon: "→", text: "Priority mission list with XP tracking" },
  { icon: "↑", text: "Career progress tracking over time" },
  { icon: "✍", text: "AI statement rewriting tool" },
];

export default function Paywall({ feature, onClose, onUpgrade, loading }) {
  const [plan, setPlan] = useState("annual"); // default to annual (better value)
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

  const savings = Math.round(((12 * 12) - 99) / (12 * 12) * 100);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,9,8,0.85)", backdropFilter: "blur(6px)", zIndex: 200 }} />

      {/* Modal */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 201, width: "min(680px, 95vw)", background: B.ink2, border: `1px solid ${B.goldWire}`, fontFamily: "monospace", maxHeight: "90vh", overflowY: "auto" }}>

        {/* Gold top bar */}
        <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: "32px 36px 24px", borderBottom: `1px solid ${B.goldWire}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: B.gold, marginBottom: "8px" }}>
              Stratum Pro
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: B.bone, lineHeight: 1.1, marginBottom: "6px" }}>
              {feature ? <>Unlock <em style={{ color: B.gold }}>{feature}</em></> : <>Upgrade to <em style={{ color: B.gold }}>Pro</em></>}
            </h2>
            <p style={{ fontSize: "11px", color: B.mist, lineHeight: 1.6 }}>
              Everything Stratum has to offer, for less than a coffee a week.
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: B.ash, fontSize: "20px", cursor: "pointer", padding: "4px", lineHeight: 1, marginLeft: "16px", flexShrink: 0 }}>✕</button>
        </div>

        {/* Plan selector */}
        <div style={{ padding: "24px 36px", borderBottom: `1px solid ${B.goldWire}` }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: B.ash, marginBottom: "12px" }}>Choose your plan</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

            {/* Monthly */}
            <button onClick={() => setPlan("monthly")} style={{ padding: "16px", background: plan === "monthly" ? "rgba(200,168,75,0.08)" : "transparent", border: `1px solid ${plan === "monthly" ? B.gold : "rgba(255,255,255,0.08)"}`, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: plan === "monthly" ? B.gold : B.ash, marginBottom: "6px" }}>Monthly</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: B.bone, lineHeight: 1 }}>$12</div>
              <div style={{ fontSize: "9px", color: B.mist, marginTop: "3px" }}>per month</div>
            </button>

            {/* Annual */}
            <button onClick={() => setPlan("annual")} style={{ padding: "16px", background: plan === "annual" ? "rgba(200,168,75,0.08)" : "transparent", border: `1px solid ${plan === "annual" ? B.gold : "rgba(255,255,255,0.08)"}`, cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", right: "-1px", background: B.sage, padding: "3px 8px", fontSize: "8px", letterSpacing: "0.15em", color: B.bone, textTransform: "uppercase" }}>Save {savings}%</div>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: plan === "annual" ? B.gold : B.ash, marginBottom: "6px" }}>Annual</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, color: B.bone, lineHeight: 1 }}>$99</div>
              <div style={{ fontSize: "9px", color: B.mist, marginTop: "3px" }}>per year · $8.25/mo</div>
            </button>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: "20px 36px", borderBottom: `1px solid ${B.goldWire}` }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: B.ash, marginBottom: "12px" }}>Everything in Pro</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: B.gold, flexShrink: 0, fontSize: "14px", lineHeight: 1.5 }}>{f.icon}</span>
                <span style={{ fontSize: "11px", color: B.mist, lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email + CTA */}
        <div style={{ padding: "24px 36px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: B.ash, marginBottom: "8px" }}>Your email</div>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="artist@example.com"
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${emailError ? B.rust : "rgba(255,255,255,0.1)"}`, color: B.bone, fontFamily: "monospace", fontSize: "12px", padding: "11px 14px", outline: "none" }}
            />
            {emailError && <div style={{ fontSize: "10px", color: B.rust, marginTop: "5px" }}>{emailError}</div>}
            <div style={{ fontSize: "9px", color: B.char, marginTop: "5px" }}>Used to restore access if you clear your browser.</div>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            style={{ width: "100%", padding: "16px", background: loading ? B.ink3 : B.gold, border: loading ? `1px solid ${B.gold}` : "none", color: loading ? B.gold : B.ink, fontFamily: "monospace", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            {loading ? (
              <>
                <span style={{ width: "14px", height: "14px", border: "1px solid rgba(200,168,75,0.3)", borderTop: `1px solid ${B.gold}`, borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
                Opening Stripe…
              </>
            ) : (
              <>Upgrade to Pro · {plan === "annual" ? "$99/yr" : "$12/mo"} →</>
            )}
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "14px" }}>
            {["Secure payment via Stripe", "Cancel anytime", "Instant access"].map(t => (
              <div key={t} style={{ fontSize: "9px", color: B.char, letterSpacing: "0.1em" }}>✓ {t}</div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
