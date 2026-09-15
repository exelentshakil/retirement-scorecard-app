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

  const redCategories = scorecard.categoryResults
    .filter((c) => c.status === "red")
    .map((c) => `${c.shortTitle} (${c.percentageScore}%)`);
  const yellowCategories = scorecard.categoryResults
    .filter((c) => c.status === "yellow")
    .map((c) => `${c.shortTitle} (${c.percentageScore}%)`);
  const greenCategories = scorecard.categoryResults
    .filter((c) => c.status === "green")
    .map((c) => `${c.shortTitle} (${c.percentageScore}%)`);

  const prompt = `You are a Senior CFP® (Certified Financial Planner) at ${profile.advisoryFirm || "Blue Ridge & Meridian Wealth Partners"}.
Write a polished, 2-paragraph executive assessment narrative for client: ${profile.clientName} (Age ${profile.currentAge}, target retirement age ${profile.targetRetirementAge}).
Current Assets: $${(profile.currentRetirementSavings || 0).toLocaleString()} | Target Retirement Income: $${(profile.targetMonthlyRetirementIncome || 0).toLocaleString()}/mo.
Overall Retirement Readiness Score: ${scorecard.overallScore}/100 (${scorecard.overallStatusLabel}).
Category Breakdown:
- Green / On Track: ${greenCategories.join(", ") || "None"}
- Yellow / Attention Needed: ${yellowCategories.join(", ") || "None"}
- Red / Critical Deficit: ${redCategories.join(", ") || "None"}

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
            keyStrengths: parsed.keyStrengths || [],
            immediateActionPoints: parsed.immediateActionPoints || [],
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
            keyStrengths: parsed.keyStrengths || [],
            immediateActionPoints: parsed.immediateActionPoints || [],
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
  const clientFirstName = profile.clientName.split(" ")[0] || "Client";
  const yearsToRetire = Math.max(1, profile.targetRetirementAge - profile.currentAge);

  const fallbackNarrative =
    `Based on our diagnostic evaluation, ${profile.clientName} has established an Overall Retirement Readiness Score of ${scorecard.overallScore}/100, placing the household in the "${scorecard.overallStatusLabel}" tier. With ${yearsToRetire} years remaining until target retirement at age ${profile.targetRetirementAge}, the current asset base of $${(profile.currentRetirementSavings || 0).toLocaleString()} represents a commendable foundation. However, strategic alignment across tax diversification and longevity risk mitigation is required to safeguard your desired monthly retirement income of $${(profile.targetMonthlyRetirementIncome || 0).toLocaleString()}.\n\n` +
    `Immediate advisory focus should center on addressing the vulnerabilities identified in ${redCategories.length > 0 ? redCategories.join(" and ") : "tax planning and sequence risk"}. By establishing a formal multi-year distribution hierarchy and stress-testing healthcare bridge contingencies, we can insulate your portfolio against unexpected market drawdowns while systematically lowering lifetime tax liabilities.`;

  return {
    narrative: fallbackNarrative,
    keyStrengths: [
      `Current retirement nest egg of $${(profile.currentRetirementSavings || 0).toLocaleString()} provides solid baseline capital`,
      `Clear target timeline with ${yearsToRetire} years to execute proactive restructuring`,
    ],
    immediateActionPoints: scorecard.priorityActions.length > 0
      ? scorecard.priorityActions
      : [
          "Model multi-year Roth conversion runway prior to Required Minimum Distributions",
          "Lock in an optimal Social Security claiming timeline for higher earner",
        ],
    provider: "deterministic-fallback",
    model: "CFP-RuleEngine-v1",
    latencyMs: Date.now() - startTime,
  };
}
