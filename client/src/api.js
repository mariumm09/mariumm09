export async function verifyClaim(claim) {
  const res = await fetch("/api/fake-news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: claim })
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }

  return res.json();
}
