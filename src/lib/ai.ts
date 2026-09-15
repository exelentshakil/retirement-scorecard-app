import { ProspectProfile, OverallScoreResult } from "@/types/scorecard";

export interface AiNarrativeResponse {
  narrative: string;
  keyStrengths: string[];
  immediateActionPoints: string[];
  provider: "openai" | "gemini" | "deterministic-fallback";
  model: string;
  latencyMs: number;
}

export async function generateAdvisorNarrative(
  profile: ProspectProfile,
  scorecard: OverallScoreResult
): Promise<AiNarrativeResponse> {
  const startTime = Date.now();
  const openAiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const categoryResults = Array.isArray(scorecard?.categoryResults)
    ? scorecard.categoryResults
    : [];

  const redCategories = categoryResults
    .filter((c) => c?.status === "red")
    .map((c) => `${c.shortTitle || c.categoryTitle} (${c.percentageScore || 0}%)`);
  const yellowCategories = categoryResults
    .filter((c) => c?.status === "yellow")
    .map((c) => `${c.shortTitle || c.categoryTitle} (${c.percentageScore || 0}%)`);
  const greenCategories = categoryResults
    .filter((c) => c?.status === "green")
    .map((c) => `${c.shortTitle || c.categoryTitle} (${c.percentageScore || 0}%)`);

  const clientName = profile?.clientName || "Prospective Client";
  const currentAge = profile?.currentAge || 55;
  const targetAge = profile?.targetRetirementAge || 65;
  const currentSavings = profile?.currentRetirementSavings || 0;
  const targetMonthly = profile?.targetMonthlyRetirementIncome || 0;
  const overallScore = scorecard?.overallScore ?? 70;
  const overallStatusLabel = scorecard?.overallStatusLabel || "Moderate Readiness";

  const prompt = `You are a Senior CFP® (Certified Financial Planner) at ${profile?.advisoryFirm || "Meridian & Blue Ridge Wealth"}.
Write a polished, 2-paragraph executive assessment narrative for client: ${clientName} (Age ${currentAge}, target retirement age ${targetAge}).
Current Assets: $${currentSavings.toLocaleString()} | Target Retirement Income: $${targetMonthly.toLocaleString()}/mo.
Overall Retirement Readiness Score: ${overallScore}/100 (${overallStatusLabel}).
Category Breakdown:
- Green / On Track: ${greenCategories.join(", ") || "None identified"}
- Yellow / Attention Needed: ${yellowCategories.join(", ") || "None identified"}
- Red / Critical Deficit: ${redCategories.join(", ") || "None identified"}

Provide an authoritative, compassionate, and professional diagnostic review that explains their score, highlights their major strength, and clarifies the urgent next steps before their planned retirement. Return strictly a JSON object with this exact shape:
{
  "narrative": "Paragraph 1 reviewing situation and score. Paragraph 2 detailing strategic next steps.",
  "keyStrengths": ["Strength 1", "Strength 2"],
  "immediateActionPoints": ["Action 1", "Action 2"]
}`;

  // 1. Try OpenAI gpt-4o-mini
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are an elite financial advisor producing custom retirement scorecards. Output valid JSON only.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.6,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            narrative: parsed.narrative,
            keyStrengths: Array.isArray(parsed.keyStrengths) ? parsed.keyStrengths : [],
            immediateActionPoints: Array.isArray(parsed.immediateActionPoints)
              ? parsed.immediateActionPoints
              : [],
            provider: "openai",
            model: "gpt-4o-mini",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch (e) {
      console.warn("OpenAI generation failed, falling back to Gemini:", e);
    }
  }

  // 2. Try Gemini gemini-2.0-flash
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.6,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            narrative: parsed.narrative,
            keyStrengths: Array.isArray(parsed.keyStrengths) ? parsed.keyStrengths : [],
            immediateActionPoints: Array.isArray(parsed.immediateActionPoints)
              ? parsed.immediateActionPoints
              : [],
            provider: "gemini",
            model: "gemini-2.0-flash",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch (e) {
      console.warn("Gemini generation failed, using deterministic fallback:", e);
    }
  }

  // 3. Deterministic High-Quality Fallback
  const yearsToRetire = Math.max(1, targetAge - currentAge);

  const fallbackNarrative =
    `Based on our diagnostic evaluation, ${clientName} has established an Overall Retirement Readiness Score of ${overallScore}/100, placing the household in the "${overallStatusLabel}" tier. With ${yearsToRetire} years remaining until target retirement at age ${targetAge}, the current asset base of $${currentSavings.toLocaleString()} represents a commendable foundation. However, strategic alignment across tax diversification and longevity risk mitigation is required to safeguard your desired monthly retirement income of $${targetMonthly.toLocaleString()}.\n\n` +
    `Immediate advisory focus should center on addressing the vulnerabilities identified in ${redCategories.length > 0 ? redCategories.join(" and ") : "tax planning and sequence risk"}. By establishing a formal multi-year distribution hierarchy and stress-testing healthcare bridge contingencies, we can insulate your portfolio against unexpected market drawdowns while systematically lowering lifetime tax liabilities.`;

  const priorityActions = Array.isArray(scorecard?.priorityActions)
    ? scorecard.priorityActions
    : [];

  return {
    narrative: fallbackNarrative,
    keyStrengths: [
      `Current retirement nest egg of $${currentSavings.toLocaleString()} provides solid baseline capital`,
      `Clear target timeline with ${yearsToRetire} years to execute proactive restructuring`,
    ],
    immediateActionPoints: priorityActions.length > 0
      ? priorityActions
      : [
          "Model multi-year Roth conversion runway prior to Required Minimum Distributions",
          "Lock in an optimal Social Security claiming timeline for higher earner",
        ],
    provider: "deterministic-fallback",
    model: "CFP-RuleEngine-v1",
    latencyMs: Date.now() - startTime,
  };
}
