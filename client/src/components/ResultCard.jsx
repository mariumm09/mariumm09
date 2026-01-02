import React from "react";

export default function ResultCard({ result }) {
  const label = result?.label_name || "";
  const confidence =
    result?.confidence != null ? Math.round(Number(result.confidence) * 100) : 0;

  const isFake = label.toUpperCase() === "FAKE";

  return (
    <div className="card">
      <div className="cardTitle">Detection Result</div>

      {!result ? (
        <div className="small">No result yet. Submit a claim to analyze.</div>
      ) : (
        <>
          <div className={`badge ${isFake ? "fake" : "real"}`}>
            <span style={{ fontWeight: 800 }}>
              {isFake ? "FAKE" : "REAL"}
            </span>
            <span style={{ opacity: 0.8 }}>• Model Output</span>
          </div>

          <div className="progressWrap">
            <div
              className="progressBar"
              style={{ width: `${confidence}%` }}
            />
          </div>

          <div className="small">
            Confidence: <b>{confidence}%</b>
          </div>

          <div className="small">
            Score: <b>{confidence}%</b>
          </div>

        </>
      )}
    </div>
  );
}
