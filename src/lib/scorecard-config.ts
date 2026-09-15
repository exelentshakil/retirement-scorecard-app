import { ScorecardCategory, ProspectProfile } from "@/types/scorecard";

export const DEFAULT_PROSPECT_PROFILE: ProspectProfile = {
  clientName: "Robert & Eleanor Vance",
  spouseName: "Eleanor Vance",
  currentAge: 58,
  targetRetirementAge: 65,
  currentAnnualIncome: 185000,
  targetMonthlyRetirementIncome: 9500,
  currentRetirementSavings: 1150000,
  annualSavingsRate: 24000,
  advisorName: "James D. Martin, CFP®",
  advisoryFirm: "Meridian & Blue Ridge Wealth",
  assessmentDate: new Date().toISOString().split("T")[0],
  advisorNotes: "Client is seeking clarity on income gap after corporate downsizing and want to evaluate Roth conversion timing before Social Security FRA at age 67.",
  firmPhone: "(540) 555-0194",
  firmEmail: "advisory@meridianwealth.com",
  firmWebsite: "www.meridianwealthpartners.com",
};

export const SCORECARD_CATEGORIES: ScorecardCategory[] = [
  {
    id: "cash_flow",
    title: "Income & Cash Flow Sustainability",
    shortTitle: "Cash Flow & Income",
    description: "Evaluates guaranteed lifetime income streams, expense coverage ratio, and Social Security optimization.",
    weight: 20,
    iconName: "DollarSign",
    thresholds: {
      green: 75,
      yellow: 50,
    },
    questions: [
      {
        id: "q_guaranteed_income",
        text: "What percentage of essential living expenses will be covered by guaranteed lifetime income (pension, Social Security, annuities)?",
        helpText: "Guaranteed income creates a permanent safety floor insulating the household from market volatility.",
        type: "multiple_choice",
        maxPoints: 20,
        options: [
          { id: "opt_g1", label: "75% to 100%+ covered by guaranteed income", points: 20, description: "High security floor; market drops will not impact baseline lifestyle." },
          { id: "opt_g2", label: "50% to 74% covered by guaranteed income", points: 14, description: "Moderate floor; portfolio withdrawals required for standard expenses." },
          { id: "opt_g3", label: "25% to 49% covered by guaranteed income", points: 8, description: "Low floor; heavily reliant on continuous portfolio appreciation." },
          { id: "opt_g4", label: "Under 25% or unknown", points: 3, description: "Critical exposure; vulnerable to prolonged market drawdowns." },
        ],
      },
      {
        id: "q_expense_budget",
        text: "Has a formal net-of-tax retirement expense budget been established?",
        helpText: "Includes inflation adjustments, travel goals, and property tax escalations.",
        type: "yes_no",
        maxPoints: 5,
        options: [
          { id: "opt_b_yes", label: "Yes, itemized & stress-tested budget", points: 5 },
          { id: "opt_b_no", label: "No, estimated rough ballpark only", points: 1 },
        ],
      },
      {
        id: "q_social_security",
        text: "Has an optimal Social Security claiming strategy been modeled?",
        helpText: "Delaying from age 62 to 70 increases monthly benefit by up to 77% guaranteed.",
        type: "multiple_choice",
        maxPoints: 5,
        options: [
          { id: "opt_ss1", label: "Optimized claiming age modeled (e.g. age 70 for primary earner)", points: 5 },
          { id: "opt_ss2", label: "Planned at Full Retirement Age (66-67)", points: 3 },
          { id: "opt_ss3", label: "Plan to claim as early as age 62", points: 1 },
          { id: "opt_ss4", label: "Not yet analyzed", points: 0 },
        ],
      },
    ],
  },
  {
    id: "investments",
    title: "Investment Strategy & Asset Allocation",
    shortTitle: "Investment Strategy",
    description: "Assesses portfolio diversification, sequence of returns risk buffer, and glidepath discipline.",
    weight: 20,
    iconName: "TrendingUp",
    thresholds: {
      green: 75,
      yellow: 50,
    },
    questions: [
      {
        id: "q_asset_allocation",
        text: "Does the current asset allocation match your planned retirement timeline and risk capacity?",
        helpText: "Ensures the portfolio balances inflation growth against capital preservation.",
        type: "multiple_choice",
        maxPoints: 15,
        options: [
          { id: "opt_aa1", label: "Formally aligned with glidepath; rebalanced annually", points: 15, description: "Targeted balance of growth and safety matched to actuarial needs." },
          { id: "opt_aa2", label: "Broadly diversified across equities and bonds", points: 10, description: "General diversification without formal risk horizon calibration." },
          { id: "opt_aa3", label: "Aggressively tilted in equities (>85% stocks near retirement)", points: 5, description: "High growth potential but acute downside risk entering distribution phase." },
          { id: "opt_aa4", label: "Heavy cash holding (<2% yield, inflation risk)", points: 4, description: "Losing purchasing power to annual CPI inflation over 25+ years." },
        ],
      },
      {
        id: "q_emergency_reserve",
        text: "Do you maintain a dedicated liquid emergency fund of 6-12 months of expenses?",
        helpText: "Held in high-yield cash or short Treasury bills outside speculative markets.",
        type: "yes_no",
        maxPoints: 5,
        options: [
          { id: "opt_em_yes", label: "Yes, fully funded liquid reserve intact", points: 5 },
          { id: "opt_em_no", label: "No, under-funded or invested in equities", points: 0 },
        ],
      },
      {
        id: "q_sequence_risk",
        text: "Is there a dedicated strategy to protect against Sequence of Returns Risk?",
        helpText: "A market crash in the first 3-5 years of retirement can permanently deplete portfolio longevity.",
        type: "multiple_choice",
        maxPoints: 10,
        options: [
          { id: "opt_seq1", label: "2-3 year safe cash/bond tent to avoid selling in a market downturn", points: 10 },
          { id: "opt_seq2", label: "Aware of sequence risk but no dedicated buffer", points: 5 },
          { id: "opt_seq3", label: "No contingency plan for early retirement market drop", points: 1 },
        ],
      },
    ],
  },
  {
    id: "tax_planning",
    title: "Tax Diversification & Withdrawal Sequencing",
    shortTitle: "Tax & Withdrawals",
    description: "Examines account structure balance across taxable, tax-deferred, and tax-free buckets.",
    weight: 20,
    iconName: "Receipt",
    thresholds: {
      green: 75,
      yellow: 50,
    },
    questions: [
      {
        id: "q_tax_buckets",
        text: "How are your current retirement assets distributed across tax buckets?",
        helpText: "Tax flexibility in retirement allows advisors to engineer lower marginal tax brackets.",
        type: "multiple_choice",
        maxPoints: 15,
        options: [
          { id: "opt_tx1", label: "Diversified across 3 buckets: Taxable, Tax-Deferred (401k/IRA), Tax-Free (Roth/HSA)", points: 15 },
          { id: "opt_tx2", label: "Majority Tax-Deferred with moderate Roth or taxable assets", points: 9 },
          { id: "opt_tx3", label: "100% Tax-Deferred (future Required Minimum Distribution tax bomb)", points: 4 },
          { id: "opt_tx4", label: "Uncertain of tax status across accounts", points: 2 },
        ],
      },
      {
        id: "q_roth_conversions",
        text: "Is there a multi-year Roth conversion plan in place before age 73/75 RMDs begin?",
        helpText: "Taking advantage of low-income gap years between retirement and Social Security.",
        type: "yes_no",
        maxPoints: 5,
        options: [
          { id: "opt_rc_yes", label: "Yes, systematic conversion roadmap modeled", points: 5 },
          { id: "opt_rc_no", label: "No, have not explored strategic conversions", points: 0 },
        ],
      },
      {
        id: "q_withdrawal_sequencing",
        text: "Has a tax-efficient withdrawal order been established across accounts?",
        helpText: "Proper ordering can extend portfolio survival by 3 to 7 years.",
        type: "multiple_choice",
        maxPoints: 10,
        options: [
          { id: "opt_ws1", label: "Mathematically optimized distribution hierarchy to minimize lifetime taxes", points: 10 },
          { id: "opt_ws2", label: "Standard rule-of-thumb order (Taxable then Deferred then Roth)", points: 5 },
          { id: "opt_ws3", label: "No formal withdrawal hierarchy in place", points: 1 },
        ],
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare, Medicare & Long-Term Care",
    shortTitle: "Healthcare & LTC",
    description: "Evaluates pre-65 bridge coverage, Medicare supplemental plans, and extended care contingencies.",
    weight: 20,
    iconName: "ShieldCheck",
    thresholds: {
      green: 75,
      yellow: 50,
    },
    questions: [
      {
        id: "q_pre65_bridge",
        text: "If retiring prior to Medicare age 65, what is your health insurance bridge plan?",
        helpText: "Average out-of-pocket bridge costs can exceed $1,200-$2,000/month per couple.",
        type: "multiple_choice",
        maxPoints: 10,
        options: [
          { id: "opt_hc1", label: "Retiring at 65+ on Medicare OR covered by retiree health benefits", points: 10 },
          { id: "opt_hc2", label: "Dedicated bridge strategy (COBRA or ACA exchange with subsidy planning)", points: 8 },
          { id: "opt_hc3", label: "Plan to pay private commercial rates without formal subsidy planning", points: 3 },
          { id: "opt_hc4", label: "Retiring before 65 with no health insurance bridge identified", points: 0 },
        ],
      },
      {
        id: "q_medicare_strategy",
        text: "Have you analyzed Medicare Supplemental (Medigap) vs. Medicare Advantage & IRMAA surcharges?",
        helpText: "Income-Related Monthly Adjustment Amounts (IRMAA) can increase Part B/D premiums dramatically.",
        type: "yes_no",
        maxPoints: 5,
        options: [
          { id: "opt_med_yes", label: "Yes, supplemental plan selected & IRMAA brackets calculated", points: 5 },
          { id: "opt_med_no", label: "No, have not evaluated Medicare supplemental choices", points: 1 },
        ],
      },
      {
        id: "q_ltc_contingency",
        text: "What is your plan for extended nursing, assisted living, or memory care?",
        helpText: "70% of 65-year-olds will need some form of long-term care; median nursing room is $108k/year.",
        type: "multiple_choice",
        maxPoints: 15,
        options: [
          { id: "opt_ltc1", label: "Dedicated Hybrid Life/LTC insurance policy or earmarked asset reserve ($300k+)", points: 15 },
          { id: "opt_ltc2", label: "Traditional long-term care policy or partial family care network", points: 8 },
          { id: "opt_ltc3", label: "Plan to rely on family or spend down assets to qualify for Medicaid", points: 3 },
          { id: "opt_ltc4", label: "No long-term care plan or financial protection in place", points: 0 },
        ],
      },
    ],
  },
  {
    id: "estate_legacy",
    title: "Estate, Longevity & Wealth Protection",
    shortTitle: "Estate & Longevity",
    description: "Validates wills, trusts, durable powers of attorney, healthcare proxies, and beneficiary titling.",
    weight: 20,
    iconName: "FileCheck2",
    thresholds: {
      green: 75,
      yellow: 50,
    },
    questions: [
      {
        id: "q_estate_docs",
        text: "What is the current status of your core estate planning legal documents?",
        helpText: "Outdated documents can cause probate delays, guardianship disputes, and unintended tax liabilities.",
        type: "multiple_choice",
        maxPoints: 15,
        options: [
          { id: "opt_est1", label: "Comprehensive package updated <3 years (Trust, Will, Financial POA, Healthcare Proxy)", points: 15 },
          { id: "opt_est2", label: "Basic Will and POA exist, but drafted >5 years ago or in another state", points: 9 },
          { id: "opt_est3", label: "Only a basic Will; no Healthcare Directive or Financial Power of Attorney", points: 4 },
          { id: "opt_est4", label: "No formal estate planning documents currently executed", points: 0 },
        ],
      },
      {
        id: "q_beneficiary_review",
        text: "Have primary and contingent beneficiary designations been audited within the past 12 months?",
        helpText: "Beneficiary designations on retirement accounts override instructions in your Will.",
        type: "yes_no",
        maxPoints: 5,
        options: [
          { id: "opt_ben_yes", label: "Yes, audited & aligned with estate plan", points: 5 },
          { id: "opt_ben_no", label: "No, haven't verified designations recently", points: 0 },
        ],
      },
      {
        id: "q_longevity_horizon",
        text: "What longevity age horizon is your retirement plan stress-tested against?",
        helpText: "For a 65-year-old couple, there is a 50% probability that one spouse reaches age 92.",
        type: "multiple_choice",
        maxPoints: 10,
        options: [
          { id: "opt_lng1", label: "Stress-tested through age 95-100 for both spouses", points: 10 },
          { id: "opt_lng2", label: "Planned through age 85-90", points: 6 },
          { id: "opt_lng3", label: "Planned to average US life expectancy (~80-82)", points: 2 },
        ],
      },
    ],
  },
];

// Presets for quick advisor demos
export const SAMPLE_PERSONAS = [
  {
    id: "persona_vance",
    shortName: "Robert Vance",
    firstName: "Robert",
    lastName: "Vance",
    statusColor: "yellow",
    score: 61,
    label: "Robert & Eleanor Vance (Age 58)",
    badge: "Typical Pre-Retiree • Score ~73",
    description: "Solid 401k savings ($1.15M), but heavy tax-deferred concentration and missing long-term care protection.",
    profile: {
      clientName: "Robert & Eleanor Vance",
      spouseName: "Eleanor Vance",
      currentAge: 58,
      targetRetirementAge: 65,
      currentAnnualIncome: 185000,
      targetMonthlyRetirementIncome: 9500,
      currentRetirementSavings: 1150000,
      annualSavingsRate: 24000,
      advisorName: "James D. Martin, CFP®",
      advisoryFirm: "Meridian & Blue Ridge Wealth",
      assessmentDate: new Date().toISOString().split("T")[0],
      advisorNotes: "Client is seeking clarity on income gap after corporate downsizing and wants to evaluate Roth conversion timing before Social Security FRA at age 67.",
      firmPhone: "(540) 555-0194",
      firmEmail: "advisory@meridianwealth.com",
      firmWebsite: "www.meridianwealthpartners.com",
    },
    answers: {
      q_guaranteed_income: "opt_g2", // 14
      q_expense_budget: "opt_b_yes", // 5
      q_social_security: "opt_ss2", // 3 (Score: 22/30 = 73%)
      q_asset_allocation: "opt_aa2", // 10
      q_emergency_reserve: "opt_em_yes", // 5
      q_sequence_risk: "opt_seq2", // 5 (Score: 20/30 = 67%)
      q_tax_buckets: "opt_tx3", // 4 (100% tax-deferred)
      q_roth_conversions: "opt_rc_no", // 0
      q_withdrawal_sequencing: "opt_ws2", // 5 (Score: 9/30 = 30% RED)
      q_pre65_bridge: "opt_hc2", // 8
      q_medicare_strategy: "opt_med_yes", // 5
      q_ltc_contingency: "opt_ltc3", // 3 (Score: 16/30 = 53% YELLOW)
      q_estate_docs: "opt_est2", // 9
      q_beneficiary_review: "opt_ben_yes", // 5
      q_longevity_horizon: "opt_lng1", // 10 (Score: 24/30 = 80% GREEN)
    },
  },
  {
    id: "persona_sterling",
    shortName: "Marcus Sterling",
    firstName: "Marcus",
    lastName: "Sterling",
    statusColor: "red",
    score: 18,
    label: "Marcus Sterling (Age 48)",
    badge: "Under-prepared Executive • Score ~46",
    description: "High earner ($290k), but negligible emergency buffer, aggressive equity concentration, and zero estate plan.",
    profile: {
      clientName: "Marcus Sterling",
      spouseName: "",
      currentAge: 48,
      targetRetirementAge: 60,
      currentAnnualIncome: 290000,
      targetMonthlyRetirementIncome: 14000,
      currentRetirementSavings: 580000,
      annualSavingsRate: 35000,
      advisorName: "James D. Martin, CFP®",
      advisoryFirm: "Meridian & Blue Ridge Wealth",
      assessmentDate: new Date().toISOString().split("T")[0],
      advisorNotes: "Executive experiencing lifestyle inflation. Wants early retirement at 60 but has severe asset shortfall and no risk management.",
      firmPhone: "(540) 555-0194",
      firmEmail: "advisory@meridianwealth.com",
      firmWebsite: "www.meridianwealthpartners.com",
    },
    answers: {
      q_guaranteed_income: "opt_g4", // 3
      q_expense_budget: "opt_b_no", // 1
      q_social_security: "opt_ss4", // 0 (Score: 4/30 = 13% RED)
      q_asset_allocation: "opt_aa3", // 5 (aggressive stocks)
      q_emergency_reserve: "opt_em_no", // 0
      q_sequence_risk: "opt_seq3", // 1 (Score: 6/30 = 20% RED)
      q_tax_buckets: "opt_tx2", // 9
      q_roth_conversions: "opt_rc_no", // 0
      q_withdrawal_sequencing: "opt_ws3", // 1 (Score: 10/30 = 33% RED)
      q_pre65_bridge: "opt_hc4", // 0
      q_medicare_strategy: "opt_med_no", // 1
      q_ltc_contingency: "opt_ltc4", // 0 (Score: 1/30 = 3% RED)
      q_estate_docs: "opt_est4", // 0
      q_beneficiary_review: "opt_ben_no", // 0
      q_longevity_horizon: "opt_lng2", // 6 (Score: 6/30 = 20% RED)
    },
  },
  {
    id: "persona_chen",
    shortName: "Dr. Chen",
    firstName: "Dr. Chen",
    lastName: "",
    statusColor: "green",
    score: 100,
    label: "Dr. Arthur & Helen Chen (Age 64)",
    badge: "Retirement Ready • Score ~93",
    description: "Physician couple with comprehensive pensions, diversified Roth balances, hybrid LTC policy, and current trusts.",
    profile: {
      clientName: "Dr. Arthur & Helen Chen",
      spouseName: "Helen Chen",
      currentAge: 64,
      targetRetirementAge: 65,
      currentAnnualIncome: 340000,
      targetMonthlyRetirementIncome: 15000,
      currentRetirementSavings: 2850000,
      annualSavingsRate: 60000,
      advisorName: "James D. Martin, CFP®",
      advisoryFirm: "Meridian & Blue Ridge Wealth",
      assessmentDate: new Date().toISOString().split("T")[0],
      advisorNotes: "Ready for transition next quarter. Evaluating final distribution order and multi-generational gifting strategy.",
      firmPhone: "(540) 555-0194",
      firmEmail: "advisory@meridianwealth.com",
      firmWebsite: "www.meridianwealthpartners.com",
    },
    answers: {
      q_guaranteed_income: "opt_g1", // 20
      q_expense_budget: "opt_b_yes", // 5
      q_social_security: "opt_ss1", // 5 (Score: 30/30 = 100% GREEN)
      q_asset_allocation: "opt_aa1", // 15
      q_emergency_reserve: "opt_em_yes", // 5
      q_sequence_risk: "opt_seq1", // 10 (Score: 30/30 = 100% GREEN)
      q_tax_buckets: "opt_tx1", // 15
      q_roth_conversions: "opt_rc_yes", // 5
      q_withdrawal_sequencing: "opt_ws1", // 10 (Score: 30/30 = 100% GREEN)
      q_pre65_bridge: "opt_hc1", // 10
      q_medicare_strategy: "opt_med_yes", // 5
      q_ltc_contingency: "opt_ltc1", // 15 (Score: 30/30 = 100% GREEN)
      q_estate_docs: "opt_est1", // 15
      q_beneficiary_review: "opt_ben_yes", // 5
      q_longevity_horizon: "opt_lng1", // 10 (Score: 30/30 = 100% GREEN)
    },
  },
];
