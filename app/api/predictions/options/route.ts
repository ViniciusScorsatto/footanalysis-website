import { NextResponse } from "next/server";
import { getPredictionOptions } from "@/lib/prediction-service";

export async function GET() {
  try {
    return NextResponse.json(await getPredictionOptions());
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error && typeof error.status === "number" ? error.status : 502;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load leagues" }, { status });
  }
}
