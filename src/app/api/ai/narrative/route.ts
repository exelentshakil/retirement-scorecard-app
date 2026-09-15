import { NextRequest, NextResponse } from "next/server";
import { generateAdvisorNarrative } from "@/lib/ai";
import { ProspectProfile, OverallScoreResult } from "@/types/scorecard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile: ProspectProfile = body.profile;
    const scorecard: OverallScoreResult = body.scorecard;

    if (!profile || !scorecard) {
      return NextResponse.json(
        { error: "Missing required profile or scorecard payload" },
        { status: 400 }
      );
    }

    const result = await generateAdvisorNarrative(profile, scorecard);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI narrative generation error:", error);
    return NextResponse.json(
      {
        error: "Internal server error during narrative generation",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
