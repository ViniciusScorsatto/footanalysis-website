import { NextRequest, NextResponse } from "next/server";
import { getPredictionRounds } from "@/lib/prediction-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const leagueId = searchParams.get("leagueId");
  const season = searchParams.get("season");
  if (!leagueId || !season) return NextResponse.json({ error: "leagueId and season are required" }, { status: 400 });
  try {
    return NextResponse.json(await getPredictionRounds({ leagueId, season }));
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error && typeof error.status === "number" ? error.status : 502;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load rounds" }, { status });
  }
}
