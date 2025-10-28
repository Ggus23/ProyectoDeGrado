// @/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function assertApiBase() {
  if (!API_BASE) {
    throw new Error("config_error:NEXT_PUBLIC_API_URL missing");
  }
  return API_BASE.replace(/\/$/, "");
}

async function getAccessToken(): Promise<string> {
  const r = await fetch("/api/token", { cache: "no-store" });
  if (!r.ok) throw new Error(`api_token:${r.status}`);
  const { accessToken } = await r.json();
  if (!accessToken) throw new Error("api_token:401");
  return accessToken;
}

export async function fetchMe() {
  const base = assertApiBase();
  const token = await getAccessToken();
  const r = await fetch(`${base}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`api_me:${r.status}`);
  return r.json() as Promise<{ email: string; role: string }>;
}

export type Summary = {
  progress: number;
  cards: Array<{ title: string; value: number | string }>;
};

export async function fetchSummary() {
  const base = assertApiBase();
  const token = await getAccessToken();
  const r = await fetch(`${base}/dashboard/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`api_summary:${r.status}`);
  return r.json() as Promise<Summary>;
}
