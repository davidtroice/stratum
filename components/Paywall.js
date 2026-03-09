import { useState } from "react";

const D = {
  bg:"#f2f2f0", white:"#ffffff", ink:"#1a1a18", mid:"#6b6b68", muted:"#9a9a96",
  border:"rgba(26,26,24,0.09)", gold:"#c8a84b", goldL:"rgba(200,168,75,0.1)",
  rust:"#c04020",
};

const LogoMark = ({ size=32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="8"  y="72" width="84" height="17" rx="5" fill="#1a1a18" opacity="0.85"/>
    <rect x="15" y="53" width="70" height="14" rx="4" fill="#1a1a18" opacity="0.58"/>
    <rect x="22" y="36" width="56" height="13" rx="4" fill="#1a1a18" opacity="0.34"/>
    <rect x="29" y="21" width="42" height="11" rx="3" fill="#1a1a18" opacity="0.18"/>
    <rect x="35" y="8"  width="30" height="10" rx="3" fill="#c8a84b"/>
  </svg>
);

const PRO_FEATURES = [
  { icon:"∴", text:"Unlimited AI career assessments" },
  { icon:"⊕", text:"Full opportunity database — 80+ residencies, grants, fairs worldwide" },
  { icon:"◎", text:"Gallery matching + personalised outreach templates" },
  { icon:"✍", text:"Portfolio & AI Statement Builder — upload your work, get a professional statement + CV" },
  { icon:"🇲🇽", text:"Mexico & Latin America opportunities — FONCA, Casa Wabi, ZONAMACO and more" },
  { icon:"→", text:"Priority mission list with XP tracking" },
];

export default function Paywall({ feature, onClose, onUpgrade, loading }) {
  const [plan, setPlan]   = useState("annual");
  const [email, setEmail] = useState("");
  const [err, setErr]     = useState("");

  const handleSubmit = () => {
    if (!email || !email.includes("@")) { setErr("Please enter a valid email."); return; }
    setErr("");
    onUpgrade(plan, email);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ position:"absolute", inset:0, background:"rgba(26,26,24,0.55)", backdropFilter:"blur(6px)" }} onClick={onClose} />

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:"520px", background:D.white, borderRadius:"16px", boxShadow:"0 32px 80px rgba(26,26,24,0.18)", overflow:"hidden" }}>
        {/* Gold top bar */}
        <div style={{ height:"4px", background:`linear-gradient(90deg, ${D.gold}, #e8c86a)` }} />

        <div style={{ padding:"36px 36px 32px" }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <LogoMark size={36} />
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:400, color:D.ink }}>
                  Str<span style={{ color:D.gold, fontStyle:"italic" }}>a</span>tum Pro
                </div>
                {feature && <div style={{ fontSize:"10px", color:D.muted, marginTop:"2px" }}>Unlock {feature}</div>}
              </div>
            </div>
            <button onClick={onClose} style={{ background:"none", border:"none", color:D.muted, fontSize:"22px", cursor:"pointer", lineHeight:1, padding:"2px" }}>×</button>
          </div>

          {/* Features */}
          <div style={{ marginBottom:"28px", display:"flex", flexDirection:"column", gap:"10px" }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                <span style={{ color:D.gold, fontSize:"14px", flexShrink:0, marginTop:"1px" }}>{f.icon}</span>
                <span style={{ fontSize:"12px", color:D.mid, lineHeight:1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Plan toggle */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"20px" }}>
            {[
              { id:"annual",  label:"Annual", price:"$1,980 MXN/yr", saving:"save 31%" },
              { id:"monthly", label:"Monthly",price:"$240 MXN/mo",   saving:null },
            ].map(p => (
              <button key={p.id} onClick={()=>setPlan(p.id)} style={{ padding:"12px", border:`1.5px solid ${plan===p.id ? D.gold : D.border}`, borderRadius:"8px", background: plan===p.id ? D.goldL : "transparent", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px" }}>
                  <span style={{ fontSize:"10px", fontWeight:600, color: plan===p.id ? D.gold : D.ink, fontFamily:"monospace", letterSpacing:"0.1em" }}>{p.label}</span>
                  {p.saving && <span style={{ fontSize:"8px", background:D.gold, color:"#fff", padding:"2px 6px", borderRadius:"3px" }}>{p.saving}</span>}
                </div>
                <div style={{ fontSize:"13px", fontFamily:"'Cormorant Garamond',serif", color: plan===p.id ? D.ink : D.mid }}>{p.price}</div>
              </button>
            ))}
          </div>

          {/* Email input */}
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e=>{setEmail(e.target.value);setErr("");}}
            style={{ width:"100%", padding:"12px 14px", border:`1px solid ${err ? D.rust : D.border}`, borderRadius:"8px", fontFamily:"monospace", fontSize:"12px", color:D.ink, background:D.bg, outline:"none", marginBottom:"8px" }}
          />
          {err && <div style={{ fontSize:"10px", color:D.rust, marginBottom:"8px" }}>{err}</div>}

          {/* CTA */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", padding:"15px", background: loading ? D.muted : D.gold, border:"none", borderRadius:"8px", color:"#fff", fontFamily:"monospace", fontSize:"11px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", cursor: loading ? "not-allowed" : "pointer", boxShadow:"0 6px 20px rgba(200,168,75,0.3)", transition:"all 0.2s" }}>
            {loading ? "Redirecting…" : `Unlock Pro — ${plan === "annual" ? "$1,980 MXN/yr" : "$240 MXN/mo"} →`}
          </button>

          <div style={{ textAlign:"center", marginTop:"12px", fontSize:"9px", color:D.muted, letterSpacing:"0.1em" }}>
            Secure payment via Stripe · Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
}
