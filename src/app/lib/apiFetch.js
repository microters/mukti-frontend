const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function buildUrl(endpoint, searchParams) {
  const base = API_BASE_URL?.replace(/\/$/, "");
  const path = `/${endpoint.replace(/^\//, "")}`;
  const url = new URL(`${base}${path}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

/**
 * Unified Next.js-aware fetch (supports tags + revalidate).
 * Default revalidate: 300s (5m). Override per-call if needed.
 */
export async function apiFetch(
  endpoint,
  { tags = [], revalidate = 300, searchParams, method = "GET", body } = {}
) {
  if (!API_BASE_URL) throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
  const url = buildUrl(endpoint, searchParams);

  const res = await fetch(url, {
    method,
    headers: {
      "x-api-key": API_KEY || "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { tags, revalidate },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch ${url} failed: ${res.status} ${text.slice(0, 200)}`);
  }
  return res.json();
}
