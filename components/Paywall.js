import { useState } from "react";

const Logo = ({ size=32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8"  width="32" height="6" rx="1" fill="#0a0a0a" opacity="0.35"/>
    <rect x="4" y="17" width="32" height="6" rx="1" fill="#0a0a0a" opacity="0.65"/>
    <rect x="4" y="26" width="32" height="6" rx="1" fill="#0a0a0a"/>
  </svg>
);

const PRO_FEATURES = [
  { icon:"—", text:"Unlimited AI career assessments" },
  { icon:"—", text:"Full opportunity database — 100+ residencies, grants, fairs worldwide" },
  { icon:"—", text:"Gallery matching + personalised outreach templates" },
  { icon:"—", text:"Portfolio & AI Statement Builder — upload your work, get a professional statement + CV" },
  { icon:"—", text:"Mexico & Latin America opportunities — FONCA, Casa Wabi, ZONAMACO and more" },
  { icon:"—", text:"Priority mission list with full career roadmap" },
];

export default function Paywall({ feature, onClose, onUpgrade, loading }) {
  const [plan, setPlan]   = useState("annual");
  const [email, setEmail] = useState("");
  const [err, setErr]     = useState("");

  const handleSubmit = () => {
    if (!email || !email.includes("@")) { setErr("Please enter a valid email."); return; }
    setErr(""); onUpgrade(plan, email);
  };

  return (
    <div style={{ position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px" }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ position:"absolute",inset:0,background:"rgba(10,10,10,0.65)",backdropFilter:"blur(8px)" }} onClick={onClose}/>

      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:"500px",background:"#ffffff",boxShadow:"0 40px 100px rgba(0,0,0,0.22)",overflow:"hidden" }}>
        {/* Top border accent */}
        <div style={{ height:"3px",background:"#0a0a0a" }}/>

        <div style={{ padding:"36px 36px 32px" }}>
          {/* Header */}
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"28px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"14px" }}>
              <Logo size={32}/>
              <div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"22px",fontWeight:600,color:"#0a0a0a",letterSpacing:"-0.01em" }}>Stratum Pro</div>
                {feature && <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",letterSpacing:"0.18em",textTransform:"uppercase",color:"#888884",marginTop:"3px" }}>Unlock {feature}</div>}
              </div>
            </div>
            <button onClick={onClose} style={{ background:"none",border:"none",color:"#888884",fontSize:"20px",cursor:"pointer",lineHeight:1,padding:"2px",marginTop:"-2px" }}>×</button>
          </div>

          {/* Divider */}
          <div style={{ height:"1px",background:"rgba(10,10,10,0.1)",marginBottom:"24px" }}/>

          {/* Features */}
          <div style={{ marginBottom:"28px",display:"flex",flexDirection:"column",gap:"9px" }}>
            {PRO_FEATURES.map((f,i)=>(
              <div key={i} style={{ display:"flex",gap:"14px",alignItems:"flex-start" }}>
                <span style={{ color:"#0a0a0a",fontSize:"12px",flexShrink:0,marginTop:"1px",fontFamily:"'DM Mono',monospace",opacity:0.4 }}>{f.icon}</span>
                <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#555552",lineHeight:1.6,letterSpacing:"0.01em" }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height:"1px",background:"rgba(10,10,10,0.08)",marginBottom:"20px" }}/>

          {/* Plan toggle */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px" }}>
            {[
              { id:"annual",  label:"Annual",  price:"$1,980 MXN / yr", saving:"save 31%" },
              { id:"monthly", label:"Monthly", price:"$240 MXN / mo",   saving:null },
            ].map(p=>(
              <button key={p.id} onClick={()=>setPlan(p.id)} style={{ padding:"14px",border:`1.5px solid ${plan===p.id?"#0a0a0a":"rgba(10,10,10,0.12)"}`,background:plan===p.id?"#0a0a0a":"transparent",cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,color:plan===p.id?"#ffffff":"#0a0a0a",letterSpacing:"0.12em",textTransform:"uppercase" }}>{p.label}</span>
                  {p.saving&&<span style={{ fontFamily:"'DM Mono',monospace",fontSize:"8px",background:plan===p.id?"rgba(255,255,255,0.15)":"rgba(10,10,10,0.08)",color:plan===p.id?"#ffffff":"#555552",padding:"2px 6px",letterSpacing:"0.05em" }}>{p.saving}</span>}
                </div>
                <div style={{ fontFamily:"'Bodoni Moda',serif",fontSize:"15px",color:plan===p.id?"#ffffff":"#555552",fontWeight:400 }}>{p.price}</div>
              </button>
            ))}
          </div>

          {/* Email input */}
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e=>{setEmail(e.target.value);setErr("");}}
            style={{ width:"100%",padding:"12px 14px",border:`1px solid ${err?"#c04020":"rgba(10,10,10,0.15)"}`,fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#0a0a0a",background:"#f7f6f2",outline:"none",marginBottom:"8px",letterSpacing:"0.02em" }}
          />
          {err && <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#c04020",marginBottom:"8px",letterSpacing:"0.05em" }}>{err}</div>}

          {/* CTA */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%",padding:"16px",background:loading?"#888884":"#0a0a0a",border:"none",color:"#ffffff",fontFamily:"'DM Mono',monospace",fontSize:"11px",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",transition:"opacity 0.2s" }}>
            {loading?"Redirecting…":`Unlock Pro — ${plan==="annual"?"$1,980 MXN/yr":"$240 MXN/mo"} →`}
          </button>

          <div style={{ textAlign:"center",marginTop:"14px",fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#888884",letterSpacing:"0.08em" }}>
            Secure payment via Stripe · Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
}
