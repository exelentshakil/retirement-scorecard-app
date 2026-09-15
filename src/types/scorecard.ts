export type IndicatorStatus = "green" | "yellow" | "red";

export interface QuestionOption {
  id: string;
  label: string;
  points: number;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  type: "multiple_choice" | "yes_no" | "number" | "text";
  maxPoints: number;
  options?: QuestionOption[];
}

export interface ScorecardCategory {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  weight: number; // percentage (e.g., 20 = 20%)
  iconName: string;
  questions: Question[];
  thresholds: {
    green: number; // e.g., 75
    yellow: number; // e.g., 50
  };
}

export interface ProspectProfile {
  clientName: string;
  spouseName: string;
  currentAge: number;
  targetRetirementAge: number;
  currentAnnualIncome: number;
  targetMonthlyRetirementIncome: number;
  currentRetirementSavings: number;
  annualSavingsRate: number;
  advisorName: string;
  advisoryFirm: string;
  assessmentDate: string;
  advisorNotes: string;
  firmPhone?: string;
  firmEmail?: string;
  firmWebsite?: string;
}

export interface CategoryScoreResult {
  categoryId: string;
  categoryTitle: string;
  shortTitle: string;
  pointsEarned: number;
  maxPoints: number;
  percentageScore: number; // 0-100
  status: IndicatorStatus;
  statusLabel: string;
  keyFinding: string;
  recommendedAction: string;
}

export interface OverallScoreResult {
  overallScore: number; // 0-100
  overallStatus: IndicatorStatus;
  overallStatusLabel: string;
  readinessSummary: string;
  categoryResults: CategoryScoreResult[];
  statusCounts: {
    green: number;
    yellow: number;
    red: number;
  };
  priorityActions: string[];
}
