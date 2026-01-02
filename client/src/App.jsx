import React, { useState } from "react";
import ClaimForm from "./components/ClaimForm.jsx";
import ResultCard from "./components/ResultCard.jsx";
import { verifyClaim } from "./api.js";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(claim) {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await verifyClaim(claim);
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="title">Fake News Detector</div>
          <div className="subtitle">
            Paste a news statement (English or Roman Urdu). We’ll classify it as FAKE or REAL with confidence.
          </div>
        </div>
        <div className="pill">TF-IDF • Logistic Regression</div>
      </div>

      <div className="grid">
        <div className="card">
          <div className="cardTitle">Check a claim</div>

          <ClaimForm onSubmit={onSubmit} loading={loading} />

          {error && (
            <div className="card error" style={{ marginTop: 14 }}>
              <div className="cardTitle">Error</div>
              <div>{error}</div>
            </div>
          )}

          <div className="small">
            Tip: Short claims work best. Example: “Petrol prices increased today in Pakistan.”
          </div>
        </div>

        <ResultCard result={result} />
      </div>

      <div className="small" style={{ textAlign: "center", marginTop: 18 }}>
        Built with FastAPI + Node + React
      </div>
    </div>
  );
}
