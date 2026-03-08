// pages/api/subscription-status.js
// Frontend calls this with the user's email to check if they're a Pro subscriber.
// Returns { isPro: true/false, plan: "monthly"|"annual"|null }

import { subscribers } from "./webhook";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  // Check in-memory store (replace with DB lookup in production)
  const isPro = subscribers.has(email.toLowerCase());

  return res.status(200).json({
    isPro,
    plan: isPro ? "active" : null,
  });
}
