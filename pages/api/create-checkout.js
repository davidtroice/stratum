// pages/api/create-checkout.js
// Creates a Stripe Checkout session for monthly or annual Pro subscription.
// Browser calls this → gets a checkout URL → redirects to Stripe's hosted page.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return res.status(500).json({ error: "Stripe not configured. Add STRIPE_SECRET_KEY to Vercel environment variables." });

  const { plan, email } = req.body; // plan: "monthly" | "annual"

  // Your Stripe Price IDs — you create these in the Stripe dashboard
  // See README for instructions on how to get these
  const PRICE_IDS = {
    monthly: process.env.STRIPE_PRICE_MONTHLY, // e.g. price_1ABC...
    annual:  process.env.STRIPE_PRICE_ANNUAL,  // e.g. price_1DEF...
  };

  const priceId = PRICE_IDS[plan];
  if (!priceId) return res.status(400).json({ error: `Invalid plan "${plan}" or missing price ID in env vars.` });

  // Get the deployed URL for success/cancel redirects
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`;

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "payment_method_types[]": "card",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        ...(email ? { "customer_email": email } : {}),
        "success_url": `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
        "cancel_url": `${baseUrl}/?cancelled=true`,
        // Store plan in metadata so webhook can use it
        "subscription_data[metadata][plan]": plan,
        // Allow promo codes
        "allow_promotion_codes": "true",
      }).toString(),
    });

    const session = await response.json();
    if (session.error) throw new Error(session.error.message);

    return res.status(200).json({ url: session.url, sessionId: session.id });

  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err.message });
  }
}
