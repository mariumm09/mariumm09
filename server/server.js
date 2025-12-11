import "dotenv/config";
import express from "express";
import cors from "cors";
import { searchWikipediaTopTitle, getWikipediaSummaryByTitle } from "./utils/wiki.js";
import { searchGNews } from "./utils/gnews.js";
import { callLLM } from "./utils/callLLM.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/api/verify", async (req, res) => {
  const { claim } = req.body || {};
  try {
    if (!claim || !claim.trim()) {
      return res.status(400).json({ error: "claim is required" });
    }

    // 1) Wikipedia
    let wiki = null;
    try {
      const title = await searchWikipediaTopTitle(claim);
      if (title) wiki = await getWikipediaSummaryByTitle(title);
    } catch (e) {
      console.warn("[wiki] failed:", e?.message);
    }

    // 2) GNews
    let gnewsLinks = [];
    try {
      gnewsLinks = await searchGNews(claim, {
        apiKey: process.env.GNEWS_API_KEY,
        lang: process.env.GNEWS_LANG || "en",
        max: Number(process.env.GNEWS_MAX || 5),
      });
    } catch (e) {
      console.warn("[gnews] failed:", e?.message);
    }

    // 3) LLM (optional; will fail-safe)
    let modelResult = { verdict: "Uncertain", confidence: 50, summary: "Using news + Wikipedia only.", sources: [] };
    try {
      if (String(process.env.NO_LLM).toLowerCase() !== "true") {
        console.log("[/api/verify] calling LLM…");
        modelResult = await callLLM({ claim, wiki, news: gnewsLinks, env: process.env });
      }
    } catch (e) {
      console.warn("[/api/verify] LLM unavailable:", e?.message);
    }

    // 4) Merge & heuristics
    const srcSet = new Set();
    (modelResult.sources || []).forEach(u => u && srcSet.add(u));
    if (wiki?.url) srcSet.add(wiki.url);
    gnewsLinks.forEach(a => a?.url && srcSet.add(a.url));

    const text = claim.toLowerCase();
    const isDeathRumor = /(dies|dead|death|passed away|murdered|has died|died today)/i.test(text);
    if (isDeathRumor && modelResult.verdict === "True") {
      const reputable = ["reuters.com","apnews.com","bbc.com","aljazeera.com","dawn.com","geo.tv","thenews.com.pk"];
      const repHits = Array.from(srcSet).filter(u => reputable.some(d => String(u).includes(d))).length;
      if (repHits < 2) {
        modelResult.verdict = "Uncertain";
        modelResult.confidence = Math.min(modelResult.confidence, 45);
        modelResult.summary = "No confirmation from multiple major outlets; treating as unverified rumor.";
      }
    }

    res.json({
      verdict: modelResult.verdict || "Uncertain",
      confidence: modelResult.confidence ?? 0,
      summary: modelResult.summary || "",
      sources: Array.from(srcSet),
      ...(wiki ? { wikipedia: wiki } : {}),
      ...(gnewsLinks.length ? { gnews: gnewsLinks } : {})
    });
  } catch (err) {
    console.error("[/api/verify] 500:", err?.message);
    res.status(500).json({ error: err?.message || "Server error" });
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server listening on :${port}`));
