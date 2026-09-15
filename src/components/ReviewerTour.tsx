"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, Sparkles, FileText, Sliders, ShieldCheck, Printer } from "lucide-react";

interface ReviewerTourProps {
  onTestFormValidation: () => void;
  onTestScoringRules: () => void;
  onFocusPreview: () => void;
  onTriggerPdfPrint: () => void;
}

export function ReviewerTour({
  onTestFormValidation,
  onTestScoringRules,
  onFocusPreview,
  onTriggerPdfPrint,
}: ReviewerTourProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const toggleStep = (stepNum: number, action: () => void) => {
    action();
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps((prev) => [...prev, stepNum]);
    }
  };

  const steps = [
    {
      num: 1,
      tag: "Form Intake",
      title: "Data-Entry & Validation",
      desc: "Fast intake with Yes/No pills, multiple choice, and required field validation.",
      actionLabel: "Test Intake Form",
      action: onTestFormValidation,
      icon: FileText,
    },
    {
      num: 2,
      tag: "Scoring Rules",
      title: "R / Y / G Status Engine",
      desc: "Scores 5 pillars against customizable thresholds with traffic-light badges.",
      actionLabel: "View Scoring Rules",
      action: onTestScoringRules,
      icon: Sliders,
    },
    {
      num: 3,
      tag: "8.5×11 Portrait",
      title: "Live Scorecard Preview",
      desc: "Institutional portrait layout updates in real-time as questions are toggled.",
      actionLabel: "Inspect 8.5×11 Layout",
      action: onFocusPreview,
      icon: ShieldCheck,
    },
    {
      num: 4,
      tag: "Single-Page PDF",
      title: "One-Click Print & Export",
      desc: "CSS @page letter portrait locks exact 1-page margins with zero Windows spillover.",
      actionLabel: "Test Print PDF",
      action: onTriggerPdfPrint,
      icon: Printer,
    },
  ];

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] py-4 no-print reviewer-tour">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
              ★
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Interactive 30-Second Verification Tour (RFP Requirements Checklist)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              Verification Progress: <span className="text-[var(--color-brand-accent)] font-bold">{completedSteps.length}/4 Steps</span> ({progressPercent}%)
            </span>
            <div className="w-24 h-2 bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isDone = completedSteps.includes(s.num);
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className={`flex flex-col justify-between p-3 rounded-xl border transition-all ${
                  isDone
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
                    : "bg-[var(--color-panel-subtle)] border-[var(--color-border)] hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold font-mono text-[var(--color-text-primary)]">
                        0{s.num}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        {s.tag}
                      </span>
                    </div>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={() => toggleStep(s.num, s.action)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-brand-accent)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] shadow-xs transition-colors whitespace-nowrap shrink-0"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{s.actionLabel}</span>
                  <ChevronRight className="h-3 w-3 ml-auto text-[var(--color-text-muted)]" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
