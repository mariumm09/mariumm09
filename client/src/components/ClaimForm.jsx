import React, { useState } from "react";

export default function ClaimForm({ onSubmit, loading }) {
  const [claim, setClaim] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(claim);
      }}
    >
      <textarea
        className="input"
        rows={6}
        placeholder="Type your claim/news text here..."
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
      />

      <button className="btn" disabled={loading}>
        {loading ? "VERIFYING..." : "VERIFY"}
      </button>
    </form>
  );
}
