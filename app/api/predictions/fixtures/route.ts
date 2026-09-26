import { NextRequest, NextResponse } from "next/server";
import { getPredictionFixtures } from "@/lib/prediction-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const leagueId = searchParams.get("leagueId");
  const season = searchParams.get("season");
  const round = searchParams.get("round");
  if (!leagueId || !season || !round) return NextResponse.json({ error: "leagueId, season and round are required" }, { status: 400 });
  try {
    return NextResponse.json(await getPredictionFixtures({ leagueId, season, round }));
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error && typeof error.status === "number" ? error.status : 502;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load fixtures" }, { status });
  }
}
