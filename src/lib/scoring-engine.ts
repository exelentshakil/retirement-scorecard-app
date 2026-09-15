import {
  ScorecardCategory,
  CategoryScoreResult,
  OverallScoreResult,
  IndicatorStatus,
} from "@/types/scorecard";

export function calculateScorecard(
  categories: ScorecardCategory[],
  answers: Record<string, string>
): OverallScoreResult {
  const categoryResults: CategoryScoreResult[] = [];
  let statusCounts = { green: 0, yellow: 0, red: 0 };
  let weightedScoreSum = 0;
  let totalWeight = 0;

  const priorityActions: string[] = [];

  for (const cat of categories) {
    let catPointsEarned = 0;
    let catMaxPoints = 0;

    for (const q of cat.questions) {
      catMaxPoints += q.maxPoints;
      const selectedOptionId = answers[q.id];
      if (selectedOptionId && q.options) {
        const option = q.options.find((opt) => opt.id === selectedOptionId);
        if (option) {
          catPointsEarned += option.points;
        }
      }
    }

    const percentage = catMaxPoints > 0 ? Math.round((catPointsEarned / catMaxPoints) * 100) : 0;

    let status: IndicatorStatus = "red";
    let statusLabel = "Critical Gap";

    if (percentage >= cat.thresholds.green) {
      status = "green";
      statusLabel = "On Track";
      statusCounts.green += 1;
    } else if (percentage >= cat.thresholds.yellow) {
      status = "yellow";
      statusLabel = "Needs Attention";
      statusCounts.yellow += 1;
    } else {
      status = "red";
      statusLabel = "Critical Action";
      statusCounts.red += 1;
    }

    // Determine Key Findings & Actions based on category and status
    let keyFinding = "";
    let recommendedAction = "";

    switch (cat.id) {
      case "cash_flow":
        if (status === "green") {
          keyFinding = "Guaranteed income baseline covers essential living expenses comfortably.";
          recommendedAction = "Maintain disciplined inflation adjustments and annual budget checkups.";
        } else if (status === "yellow") {
          keyFinding = "Moderate reliance on portfolio withdrawals; partial income gap identified.";
          recommendedAction = "Optimize Social Security claiming timeline to maximize guaranteed monthly income.";
        } else {
          keyFinding = "Critical shortage of guaranteed income; acute vulnerability to market drawdowns.";
          recommendedAction = "Structure a dedicated guaranteed floor via fixed indexed annuities or deferred benefits.";
        }
        break;

      case "investments":
        if (status === "green") {
          keyFinding = "Balanced asset allocation with dedicated sequence of returns risk buffer.";
          recommendedAction = "Execute disciplined annual rebalancing along retirement glidepath.";
        } else if (status === "yellow") {
          keyFinding = "General diversification present, but emergency cash or sequence buffer is thin.";
          recommendedAction = "Establish a 2-year liquidity tent to avoid selling equities during a bear market.";
        } else {
          keyFinding = "High concentration risk; mismatch between portfolio volatility and retirement horizon.";
          recommendedAction = "Immediately de-risk volatile equity holdings and build liquid cash reserves.";
        }
        break;

      case "tax_planning":
        if (status === "green") {
          keyFinding = "Strong tax-bracket diversification across taxable, deferred, and Roth buckets.";
          recommendedAction = "Model opportunistic Roth conversions during low-tax bracket calendar years.";
        } else if (status === "yellow") {
          keyFinding = "Overweight in traditional tax-deferred accounts; potential future RMD tax spikes.";
          recommendedAction = "Initiate multi-year Roth conversion schedule prior to age 73/75 RMD thresholds.";
        } else {
          keyFinding = "100% tax-deferred exposure; vulnerable to ordinary income tax rates on all withdrawals.";
          recommendedAction = "Restructure future savings contributions toward Roth and build tax-free reserves.";
        }
        break;

      case "healthcare":
        if (status === "green") {
          keyFinding = "Comprehensive healthcare bridge, Medicare strategy, and extended care contingency in place.";
          recommendedAction = "Review Medicare Part D formulary and HSA investment allocations annually.";
        } else if (status === "yellow") {
          keyFinding = "Basic healthcare identified, but long-term care or pre-65 bridge funding is unhedged.";
          recommendedAction = "Audit hybrid life/LTC asset-based options or establish an earmarked health reserve.";
        } else {
          keyFinding = "Zero protection against catastrophic medical or prolonged nursing care costs.";
          recommendedAction = "Formalize an immediate healthcare contingency plan to shield estate assets.";
        }
        break;

      case "estate_legacy":
        if (status === "green") {
          keyFinding = "All primary estate documents, trusts, powers of attorney, and beneficiaries up to date.";
          recommendedAction = "Conduct annual beneficiary verification across all institutional accounts.";
        } else if (status === "yellow") {
          keyFinding = "Core documents exist but are aging (>5 yrs) or missing medical directives.";
          recommendedAction = "Engage estate attorney to refresh powers of attorney and align trust funding.";
        } else {
          keyFinding = "No formal estate legal documents executed; high risk of costly probate proceedings.";
          recommendedAction = "Execute basic Will, Durable Financial POA, and Healthcare Proxy without delay.";
        }
        break;

      default:
        keyFinding = `Category score: ${percentage}% based on current responses.`;
        recommendedAction = "Review underlying question responses with your wealth advisor.";
    }

    categoryResults.push({
      categoryId: cat.id,
      categoryTitle: cat.title,
      shortTitle: cat.shortTitle,
      pointsEarned: catPointsEarned,
      maxPoints: catMaxPoints,
      percentageScore: percentage,
      status,
      statusLabel,
      keyFinding,
      recommendedAction,
    });

    if (status === "red" || status === "yellow") {
      priorityActions.push(`${cat.shortTitle}: ${recommendedAction}`);
    }

    weightedScoreSum += percentage * (cat.weight / 100);
    totalWeight += cat.weight;
  }

  const overallScore = Math.round(totalWeight > 0 ? (weightedScoreSum / totalWeight) * 100 : 0);

  let overallStatus: IndicatorStatus = "red";
  let overallStatusLabel = "Significant Risk Exposure";
  let readinessSummary = "Significant strategic gaps exist in core retirement pillars. Comprehensive restructuring is required prior to retirement transition.";

  if (overallScore >= 80) {
    overallStatus = "green";
    overallStatusLabel = "Retirement Ready";
    readinessSummary = "Comprehensive preparation demonstrated across major financial pillars. Household is in an enviable position with well-structured income, tax, and risk mitigations.";
  } else if (overallScore >= 60) {
    overallStatus = "yellow";
    overallStatusLabel = "Moderate Preparedness";
    readinessSummary = "Solid baseline foundation established, but notable vulnerabilities in tax planning, healthcare bridge, or sequence of returns risk require proactive advisor attention.";
  }

  return {
    overallScore,
    overallStatus,
    overallStatusLabel,
    readinessSummary,
    categoryResults,
    statusCounts,
    priorityActions: priorityActions.slice(0, 3), // Top 3 priority actions
  };
}
