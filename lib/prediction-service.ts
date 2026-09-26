type ServiceOptions = RequestInit & { next?: { revalidate?: number } };

function getServiceUrl(path: string) {
  const baseUrl = process.env.FOOT_ANALYSIS_RENDER_API_URL;
  if (!baseUrl) throw new Error("FOOT_ANALYSIS_RENDER_API_URL is not configured");
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function serviceFetch<T>(path: string, options: ServiceOptions = {}): Promise<T> {
  const token = process.env.FOOT_ANALYSIS_SERVICE_TOKEN;
  if (!token) throw new Error("FOOT_ANALYSIS_SERVICE_TOKEN is not configured");

  const response = await fetch(getServiceUrl(path), {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const error = new Error(`Prediction service returned ${response.status}${detail ? `: ${detail}` : ""}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
}

export type PredictionLeague = { id: number; name: string; country?: string; logo?: string };
export type PredictionRound = { name: string; displayName?: string; number?: number; startDate?: string };
export type PredictionFixture = {
  id: number;
  kickoff?: string;
  venue?: string;
  home: { id?: number; name: string; logo?: string };
  away: { id?: number; name: string; logo?: string };
};

export type PredictionRequest = {
  leagueId: number;
  season: number;
  round: string;
  email: string;
  predictionEdits: { fixtureId: number; homeScore: number; awayScore: number }[];
};

export function getPredictionOptions() {
  return serviceFetch<{ leagues: PredictionLeague[] }>("options", { next: { revalidate: 300 } });
}

export function getPredictionRounds(params: { leagueId: string; season: string }) {
  return serviceFetch<{ rounds: PredictionRound[] }>(`rounds?leagueId=${encodeURIComponent(params.leagueId)}&season=${encodeURIComponent(params.season)}`, {
    next: { revalidate: 120 }
  });
}

export function getPredictionFixtures(params: { leagueId: string; season: string; round: string }) {
  return serviceFetch<{ fixtures: PredictionFixture[] }>(
    `fixtures?leagueId=${encodeURIComponent(params.leagueId)}&season=${encodeURIComponent(params.season)}&round=${encodeURIComponent(params.round)}`,
    { next: { revalidate: 60 } }
  );
}

export function createPredictionRequest(payload: PredictionRequest) {
  return serviceFetch<{ requestId: string }>("requests", { method: "POST", body: JSON.stringify(payload) });
}
