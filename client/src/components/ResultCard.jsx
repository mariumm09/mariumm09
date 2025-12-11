import React from "react";

function percentColor(p) {
  if (p >= 80) return "#33d17a"; // green
  if (p >= 60) return "#ffd166"; // yellow
  if (p >= 40) return "#ffb066"; // orange
  return "#ff6b6b"; // red
}

function domainFrom(url = "") {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return ""; }
}

export default function ResultCard({ result }) {
  if (!result) return null;

  const {
    verdict,
    confidence,
    summary,
    sources,
    wikipedia,
    gnews = []   // <-- NEW: array of {title, url, source, publishedAt}
  } = result;

  const hasConfidence = Number.isFinite(Number(confidence));

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Verdict: {verdict}</h2>

        {hasConfidence && (
          <span className="badge" style={{ borderColor: percentColor(confidence) }}>
            Credibility: {confidence}%
          </span>
        )}
      </div>

      {summary && <p style={{ marginTop: 8 }}>{summary}</p>}

      {wikipedia && (
        <div className="kv">
          <div className="small">Wikipedia</div>
          <div>
            <a href={wikipedia.url} target="_blank" rel="noreferrer">{wikipedia.title}</a>
            <div className="small">{wikipedia.extract}</div>
          </div>
        </div>
      )}

      {/* NEW: Top news (GNews) */}
      {gnews.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div className="small" style={{ marginBottom: 6 }}>Top news (GNews)</div>
          <div className="sources">
            {gnews.map((a, i) => (
              <div className="source" key={i}>
                <a href={a.url} target="_blank" rel="noreferrer">
                  {a.title || a.url}
                </a>
                <div className="small">
                  {a.source ? a.source : domainFrom(a.url)}
                  {a.publishedAt ? ` • ${new Date(a.publishedAt).toLocaleDateString()}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sources?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div className="small" style={{ marginBottom: 6 }}>Sources</div>
          <div className="sources">
            {sources.map((u, i) => (
              <div className="source" key={i}>
                <a href={u} target="_blank" rel="noreferrer">{u}</a>
                <div className="small">{domainFrom(u)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
