import { NextRequest, NextResponse } from "next/server";
import { createPredictionRequest, type PredictionRequest } from "@/lib/prediction-service";

export async function POST(request: NextRequest) {
  let payload: PredictionRequest;
  try {
    payload = (await request.json()) as PredictionRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload?.leagueId || !payload.season || !payload.round || !payload.email || !payload.predictionEdits?.length) {
    return NextResponse.json({ error: "Complete league, season, round, email and predictions are required" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  try {
    return NextResponse.json(await createPredictionRequest(payload), { status: 202 });
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error && typeof error.status === "number" ? error.status : 502;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create request" }, { status });
  }
}
