// pages/api/webhook.js
// Stripe calls this endpoint after successful payments, cancellations, renewals.
// We store the subscriber's email in a simple in-memory set (for demo).
// In production, replace the in-memory store with a database (Planetscale, Supabase, etc.)

import crypto from "crypto";

// ── Simple in-memory subscriber store ──
// For production: replace with a real database
// e.g. await db.subscribers.upsert({ email, status: "active", plan })
export const subscribers = new Set(); // stores emails of active Pro subscribers

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for signature verification
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"];

  // Verify the webhook came from Stripe (not a fake request)
  if (webhookSecret && signature) {
    try {
      verifyStripeSignature(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).json({ error: "Invalid signature" });
    }
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString());
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  console.log("Stripe webhook event:", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email;
      if (email) {
        subscribers.add(email.toLowerCase());
        console.log(`✅ New Pro subscriber: ${email}`);
      }
      break;
    }

    case "customer.subscription.deleted":
    case "customer.subscription.paused": {
      // Handle cancellation — remove from active subscribers
      // In production: look up email by customer ID from your database
      console.log("Subscription cancelled/paused:", event.data.object.id);
      break;
    }

    case "invoice.payment_succeeded": {
      // Renewal — keep subscriber active
      console.log("Renewal payment succeeded:", event.data.object.id);
      break;
    }

    case "invoice.payment_failed": {
      // Payment failed — could downgrade user
      console.log("Payment failed:", event.data.object.id);
      break;
    }
  }

  return res.status(200).json({ received: true });
}

// Manual Stripe signature verification (no Stripe SDK needed)
function verifyStripeSignature(payload, header, secret) {
  const parts = header.split(",").reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) throw new Error("Missing timestamp or signature");

  const signedPayload = `${timestamp}.${payload.toString()}`;
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  if (expectedSig !== signature) throw new Error("Signature mismatch");

  // Reject webhooks older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  if (age > 300) throw new Error("Webhook too old");
}
