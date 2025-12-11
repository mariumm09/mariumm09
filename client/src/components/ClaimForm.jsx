import React, { useState } from "react";

export default function ClaimForm({ onSubmit, loading }) {
  const [claim, setClaim] = useState("");

  return (
    <div className="card">
      <label className="small">Enter a claim or question</label>
      <textarea
        className="input"
        rows={4}
        placeholder="e.g., The Great Barrier Reef is visible from space."
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
      />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" disabled={!claim.trim() || loading} onClick={() => onSubmit(claim)}>
          {loading ? "Checking…" : "Verify"}
        </button>
        <span className="small">We’ll use Perplexity + Wikipedia and return a verdict, confidence, and sources.</span>
      </div>
    </div>
  );
}