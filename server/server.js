import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Health check
 */
app.get("/health", (_, res) => {
  res.json({ ok: true });
});

/**
 * Fake News Detection API
 * Calls FastAPI ML service
 */
app.post("/api/fake-news", async (req, res) => {
  const { text } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    const response = await axios.post(
      process.env.FAKE_NEWS_API_URL || "http://127.0.0.1:8001/predict",
      { text }
    );

    res.json(response.data);
  } catch (err) {
    console.error("[fake-news] error:", err?.message);
    res.status(500).json({ error: "Fake news service unavailable" });
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server listening on :${port}`);
});
