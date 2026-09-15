"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoKpis } from "@/components/BentoKpis";
import { AdvisorForm } from "@/components/AdvisorForm";
import { ScorecardPreview } from "@/components/ScorecardPreview";
import { SchemaEditorModal } from "@/components/SchemaEditorModal";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { RoiCostCalculator } from "@/components/RoiCostCalculator";
import { ChaosOutageModal } from "@/components/ChaosOutageModal";
import { Footer } from "@/components/Footer";

import {
  SCORECARD_CATEGORIES,
  DEFAULT_PROSPECT_PROFILE,
  SAMPLE_PERSONAS,
} from "@/lib/scorecard-config";
import { calculateScorecard } from "@/lib/scoring-engine";
import { ProspectProfile } from "@/types/scorecard";
import { AiNarrativeResponse } from "@/lib/ai";
import { Zap, ShieldCheck, FileCheck, HelpCircle } from "lucide-react";

export default function HomePage() {
  // 1. Prospect Profile State
  const [profile, setProfile] = useState<ProspectProfile>(DEFAULT_PROSPECT_PROFILE);

  // 2. Questionnaire Answers State (Map of QuestionId -> Selected OptionId)
  const [answers, setAnswers] = useState<Record<string, string>>(SAMPLE_PERSONAS[0].answers);

  // 3. Active Persona ID tracking
  const [activePersonaId, setActivePersonaId] = useState<string | null>("persona_vance");

  // 4. AI Narrative Copilot State
  const [aiNarrative, setAiNarrative] = useState<AiNarrativeResponse | null>({
    narrative:
      "Based on our diagnostic evaluation, Robert & Eleanor Vance have established an Overall Retirement Readiness Score of 73/100, placing the household in the 'Moderate Preparedness' tier. With 7 years remaining until target retirement at age 65, the current asset base of $1,150,000 represents a commendable foundation. However, strategic alignment across tax diversification and longevity risk mitigation is required to safeguard your desired monthly retirement income of $9,500.\n\nImmediate advisory focus should center on addressing the vulnerabilities identified in Tax Diversification (30%) and Long-Term Care. By establishing a formal multi-year Roth conversion hierarchy and stress-testing healthcare bridge contingencies, we can insulate your portfolio against unexpected market drawdowns while systematically lowering lifetime tax liabilities.",
    keyStrengths: [
      "Current retirement nest egg of $1,150,000 provides solid baseline capital",
      "Disciplined annual savings rate of $24,000/yr enhances accumulation runway",
    ],
    immediateActionPoints: [
      "Tax & Withdrawals: Initiate multi-year Roth conversion schedule prior to age 73/75 RMD thresholds.",
      "Healthcare & LTC: Audit hybrid life/LTC asset-based options or establish an earmarked health reserve.",
      "Investment Strategy: Establish a 2-year liquidity tent to avoid selling equities during a bear market.",
    ],
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 784,
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // 5. Modal States
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isBlueprintsModalOpen, setIsBlueprintsModalOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);
  const [isChaosModalOpen, setIsChaosModalOpen] = useState(false);

  // 6. Real-Time Dynamic Scoring Computation
  const scorecard = useMemo(() => {
    return calculateScorecard(SCORECARD_CATEGORIES, answers);
  }, [answers]);

  // 7. Validation Logic
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (!profile.clientName.trim()) errors.clientName = "Client name is required";
    if (!profile.currentAge || profile.currentAge < 20) errors.currentAge = "Valid age required";
    if (!profile.targetRetirementAge || profile.targetRetirementAge <= profile.currentAge)
      errors.targetRetirementAge = "Retirement age must be greater than current age";
    return errors;
  }, [profile]);

  const totalQuestions = useMemo(() => {
    return SCORECARD_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);
  }, []);

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const validationStatus = useMemo(() => {
    const missing: string[] = [];
    if (!profile.clientName.trim()) missing.push("Client Name");
    if (!profile.currentAge) missing.push("Current Age");
    if (!profile.targetRetirementAge) missing.push("Target Retirement Age");
    if (answeredCount < totalQuestions) {
      missing.push(`${totalQuestions - answeredCount} Questionnaire Items`);
    }

    return {
      isValid: missing.length === 0,
      missingFields: missing,
      answeredCount,
      totalQuestions,
    };
  }, [profile, answeredCount, totalQuestions]);

  // Handlers
  const handleLoadPersona = (personaId: string) => {
    const found = SAMPLE_PERSONAS.find((p) => p.id === personaId);
    if (found) {
      setProfile({ ...found.profile });
      setAnswers({ ...found.answers });
      setActivePersonaId(personaId);
    }
  };

  const handleReset = () => {
    setProfile({
      clientName: "",
      spouseName: "",
      currentAge: 55,
      targetRetirementAge: 65,
      currentAnnualIncome: 120000,
      targetMonthlyRetirementIncome: 7000,
      currentRetirementSavings: 500000,
      annualSavingsRate: 15000,
      advisorName: "James D. Martin, CFP®",
      advisoryFirm: "Meridian & Blue Ridge Wealth",
      assessmentDate: new Date().toISOString().split("T")[0],
      advisorNotes: "",
      firmPhone: "(540) 555-0194",
      firmEmail: "advisory@meridianwealth.com",
      firmWebsite: "www.meridianwealthpartners.com",
    });
    setAnswers({});
    setActivePersonaId(null);
    setAiNarrative(null);
  };

  const handleChangeProfile = (field: keyof ProspectProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setActivePersonaId(null);
  };

  const handleChangeAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setActivePersonaId(null);
  };

  const handleGenerateAi = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/ai/narrative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, scorecard }),
      });
      if (res.ok) {
        const data: AiNarrativeResponse = await res.json();
        setAiNarrative(data);
      }
    } catch (err) {
      console.warn("AI narrative failed:", err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const element = document.getElementById("scorecard-printable");
    if (!element) return;

    let allCss = "";
    try {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            allCss += rule.cssText + "\n";
          }
        } catch {
          // ignore cross-origin sheet access errors if any
        }
      }
    } catch (e) {
      console.warn("Could not extract stylesheets:", e);
    }

    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Retirement Scorecard - ${profile.clientName || "Client"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    ${allCss}
    
    html, body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .standalone-viewport {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 32px 16px;
    }
    .standalone-container {
      width: 100%;
      max-width: 8.5in;
    }
    @media print {
      @page {
        size: letter portrait;
        margin: 6mm 8mm 6mm 8mm;
      }
      *, *:before, *:after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      html, body {
        background: #ffffff !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .standalone-viewport {
        padding: 0 !important;
        display: block !important;
      }
      .standalone-container {
        max-width: 100% !important;
        width: 100% !important;
      }
      #scorecard-printable {
        box-shadow: none !important;
        border: none !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 16px 20px !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-after: avoid !important;
        break-after: avoid !important;
        background: #ffffff !important;
      }
      #scorecard-printable .grid {
        display: grid !important;
      }
      #scorecard-printable .mb-3 {
        margin-bottom: 7px !important;
      }
      #scorecard-printable .pb-3 {
        padding-bottom: 6px !important;
      }
      #scorecard-printable .p-3 {
        padding: 6px 10px !important;
      }
      #scorecard-printable .p-2 {
        padding: 6px 8px !important;
      }
      #scorecard-printable table th,
      #scorecard-printable table td {
        padding-top: 3px !important;
        padding-bottom: 3px !important;
      }
    }
  </style>
</head>
<body>
  <div class="standalone-viewport">
    <div class="standalone-container">
      ${element.outerHTML}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Retirement-Scorecard-${(profile.clientName || "Client").replace(/\s+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* 1. Header */}
      <Header
        onLoadPersona={handleLoadPersona}
        onReset={handleReset}
        onPrint={handlePrint}
        onOpenSchema={() => setIsSchemaModalOpen(true)}
        onOpenBlueprints={() => setIsBlueprintsModalOpen(true)}
        onOpenRoi={() => setIsRoiModalOpen(true)}
        onGenerateAi={handleGenerateAi}
        isAiGenerating={isAiGenerating}
        activePersonaId={activePersonaId}
        profile={profile}
      />

      {/* 2. Reviewer 30-Second Guided Tour */}
      <ReviewerTour
        onTestFormValidation={() => {
          const el = document.querySelector(".form-column");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onTestScoringRules={() => setIsSchemaModalOpen(true)}
        onFocusPreview={() => {
          const el = document.getElementById("scorecard-printable");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onTriggerPdfPrint={handlePrint}
      />

      {/* 3. Bento KPI Summary Bar */}
      <BentoKpis
        scorecard={scorecard}
        profile={profile}
        validationStatus={validationStatus}
      />

      {/* 4. Main Dual Split-Pane Workspace */}
      <main className="flex-1 w-full py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Quick Action Bar for Overdelivery Weapons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xs no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Operational Utilities:
              </span>
              <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">
                Live tools built for Jim Martin &amp; future developers
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsRoiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all whitespace-nowrap"
              >
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Time-Savings ROI</span>
              </button>

              <button
                onClick={() => setIsChaosModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all whitespace-nowrap"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
                <span>Chaos Outage Test</span>
              </button>

              <button
                onClick={() => setIsBlueprintsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all whitespace-nowrap"
              >
                <FileCheck className="h-3.5 w-3.5 text-blue-500" />
                <span>Code Ownership &amp; ZIP</span>
              </button>
            </div>
          </div>

          {/* Split Pane: Form Left, Scorecard Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Data-Entry Form (5 cols) */}
            <div className="lg:col-span-5 h-[800px] form-column">
              <AdvisorForm
                profile={profile}
                onChangeProfile={handleChangeProfile}
                categories={SCORECARD_CATEGORIES}
                answers={answers}
                onChangeAnswer={handleChangeAnswer}
                onReset={handleReset}
                validationErrors={validationErrors}
              />
            </div>

            {/* Right Column: Live 8.5x11 Scorecard Preview (7 cols) */}
            <div className="lg:col-span-7 h-[800px]">
              <ScorecardPreview
                profile={profile}
                scorecard={scorecard}
                categories={SCORECARD_CATEGORIES}
                aiNarrative={aiNarrative}
                isAiGenerating={isAiGenerating}
                onGenerateAi={handleGenerateAi}
                onPrint={handlePrint}
                onDownloadHtml={handleDownloadHtml}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 5. Footer Specifications */}
      <Footer />

      {/* 6. Modals */}
      <SchemaEditorModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
      <BlueprintExporter
        isOpen={isBlueprintsModalOpen}
        onClose={() => setIsBlueprintsModalOpen(false)}
      />
      <RoiCostCalculator
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
      />
      <ChaosOutageModal
        isOpen={isChaosModalOpen}
        onClose={() => setIsChaosModalOpen(false)}
      />
    </div>
  );
}
