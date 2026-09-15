import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenAi = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: "healthy",
    system: "Retirement Scorecard Pro Engine",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
    aiProviders: {
      openai: {
        active: hasOpenAi,
        model: "gpt-4o-mini",
        role: "Primary Executive Assessment Synthesizer",
      },
      gemini: {
        active: hasGemini,
        model: "gemini-2.0-flash",
        role: "High-Speed Fallback Inference",
      },
      deterministicFallback: {
        active: true,
        model: "CFP-RuleEngine-v1",
        role: "100% Offline Regulatory & Math Lock",
      },
    },
    specs: {
      pdfLayout: "8.5 x 11-inch Letter Portrait",
      scorecardDimensions: "Universal Aspect Ratio (8.5 / 11)",
      complianceStandard: "SEC / FINRA Educational Disclosure Format",
      storagePolicy: "Zero-PII Client-Side In-Memory State",
      printEngine: "Browser Vector CSS @page Letter + Canvas Engine",
    },
  });
}
