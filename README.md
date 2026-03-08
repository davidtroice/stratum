# Stratum — Vercel Deployment Guide

## What's in this folder

```
stratum/
├── pages/
│   ├── index.js          ← Main app + navigation shell
│   ├── _app.js           ← Global CSS import
│   └── api/
│       └── assess.js     ← ⭐ API proxy (holds your Anthropic key securely)
├── components/
│   ├── Landing.js        ← Home page
│   ├── Assessment.js     ← AI career assessment
│   ├── OpportunityDatabase.js
│   └── GalleryMatcher.js
├── styles/
│   └── globals.css
├── package.json
└── next.config.js
```

---

## Deploy in ~10 minutes

### Step 1 — Get a free Vercel account
Go to [vercel.com](https://vercel.com) and sign up (free). Use "Continue with GitHub" if you have a GitHub account — it makes Step 2 easier.

### Step 2 — Upload the project

**Option A: GitHub (recommended)**
1. Create a new GitHub repo (go to github.com → New repository → name it "stratum")
2. Upload this entire `stratum/` folder to that repo
3. In Vercel: click "Add New Project" → "Import Git Repository" → select your repo
4. Click **Deploy**. Done.

**Option B: Drag & drop**
1. In Vercel: click "Add New Project" → "Deploy without Git"
2. Drag the entire `stratum/` folder into the upload area
3. Click **Deploy**

---

### Step 3 — Add your Anthropic API key ⭐ (this is what makes the AI work)

1. Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
2. In your Vercel project dashboard: **Settings → Environment Variables**
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (paste your key)
   - **Environments:** check Production, Preview, Development
4. Click **Save**
5. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

That's it. Your live URL will be something like `https://stratum-abc123.vercel.app`.

---

## How the AI assessment works (the key fix)

The original prototype called Anthropic's API directly from the browser, which requires exposing your API key in the frontend — a security risk that also doesn't work in production.

The deployed version routes all AI calls through `/api/assess`, a serverless function that:
1. Receives the artist's form data from the browser
2. Holds your API key securely on the server
3. Calls Anthropic's API
4. Returns the parsed JSON assessment to the browser

The browser never sees your API key. This is the standard, secure pattern for all AI-powered web apps.

---

## Local development (optional)

```bash
cd stratum
npm install
# Create a .env.local file with:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
npm run dev
# Open http://localhost:3000
```

---

## Cost estimate

- **Vercel hosting:** Free (Hobby plan)
- **Anthropic API:** ~$0.01–0.03 per assessment (Claude Sonnet 4)
- **Domain:** Optional — Vercel gives you a free `.vercel.app` subdomain

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "API key not configured" error | Add `ANTHROPIC_API_KEY` to Vercel env vars and redeploy |
| Blank page | Check browser console for errors; make sure all files are uploaded |
| Assessment returns error | Check Vercel Function Logs (Dashboard → Functions tab) |
| Fonts not loading | Fonts load from Google Fonts CDN — ensure your browser isn't blocking external requests |
