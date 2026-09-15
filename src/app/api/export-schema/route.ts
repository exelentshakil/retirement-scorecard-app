import { NextResponse } from "next/server";
import { SCORECARD_CATEGORIES, DEFAULT_PROSPECT_PROFILE } from "@/lib/scorecard-config";

export async function GET() {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "Retirement Scorecard Questions & Scoring Rules Schema",
    description: "Decoupled configuration schema for financial advisory retirement scorecard questions, point weights, and R/Y/G threshold rules.",
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    scoringStandard: {
      greenThreshold: 75,
      yellowThreshold: 50,
      redThreshold: 0,
      maxOverallScore: 100,
    },
    defaultProfile: DEFAULT_PROSPECT_PROFILE,
    categories: SCORECARD_CATEGORIES,
  };

  return new NextResponse(JSON.stringify(schema, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="scorecard-rules-schema.json"',
    },
  });
}
