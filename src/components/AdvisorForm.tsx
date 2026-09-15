"use client";

import React, { useState } from "react";
import {
  ProspectProfile,
  ScorecardCategory,
  Question,
  QuestionOption,
} from "@/types/scorecard";
import {
  User,
  DollarSign,
  TrendingUp,
  Receipt,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface AdvisorFormProps {
  profile: ProspectProfile;
  onChangeProfile: (field: keyof ProspectProfile, value: any) => void;
  categories: ScorecardCategory[];
  answers: Record<string, string>;
  onChangeAnswer: (questionId: string, optionId: string) => void;
  onReset: () => void;
  validationErrors: Record<string, string>;
}

export function AdvisorForm({
  profile,
  onChangeProfile,
  categories,
  answers,
  onChangeAnswer,
  onReset,
  validationErrors,
}: AdvisorFormProps) {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const getTabLabel = (id: string, fallback: string) => {
    switch (id) {
      case "profile":
        return "Profile";
      case "cash_flow":
        return "Income";
      case "investments":
        return "Invest";
      case "tax_planning":
        return "Taxes";
      case "healthcare":
        return "Health";
      case "estate_legacy":
        return "Estate";
      default:
        return fallback;
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    ...categories.map((c) => ({
      id: c.id,
      label: getTabLabel(c.id, c.shortTitle),
      icon: getCategoryIcon(c.id),
    })),
  ];

  function getCategoryIcon(id: string) {
    switch (id) {
      case "cash_flow":
        return DollarSign;
      case "investments":
        return TrendingUp;
      case "tax_planning":
        return Receipt;
      case "healthcare":
        return ShieldCheck;
      case "estate_legacy":
        return FileCheck2;
      default:
        return User;
    }
  }

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xs overflow-hidden">
      {/* Form Navigation Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Advisor Data-Entry Form
          </span>
          <span className="text-xs font-semibold text-[var(--color-text-muted)]">
            Required Fields (<span className="text-rose-500 font-bold">*</span>)
          </span>
        </div>

        {/* Segmented Horizontal Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? "bg-[var(--color-surface)] text-[var(--color-brand-accent)] shadow-xs border border-[var(--color-border)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Body Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Tab 1: Prospect Profile & Financial Inputs */}
        {activeTab === "profile" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] mb-1">
                Prospect Identification & Target Goals
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Enter prospect information. These variables drive the live scorecard preview and executive summary.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Primary Client Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.clientName}
                  onChange={(e) => onChangeProfile("clientName", e.target.value)}
                  placeholder="e.g. Robert & Eleanor Vance"
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.clientName
                      ? "border-rose-300 dark:border-rose-800 bg-rose-50/30"
                      : "border-[var(--color-border)]"
                  }`}
                />
                {validationErrors.clientName && (
                  <p className="text-xs text-rose-600 mt-1">{validationErrors.clientName}</p>
                )}
              </div>

              {/* Spouse Name */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Spouse / Co-Client (Optional)
                </label>
                <input
                  type="text"
                  value={profile.spouseName}
                  onChange={(e) => onChangeProfile("spouseName", e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Current Age */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Current Primary Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="20"
                  max="95"
                  value={profile.currentAge || ""}
                  onChange={(e) => onChangeProfile("currentAge", parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.currentAge
                      ? "border-rose-300 dark:border-rose-800 bg-rose-50/30"
                      : "border-[var(--color-border)]"
                  }`}
                />
              </div>

              {/* Target Retirement Age */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Target Retirement Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="40"
                  max="95"
                  value={profile.targetRetirementAge || ""}
                  onChange={(e) => onChangeProfile("targetRetirementAge", parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.targetRetirementAge
                      ? "border-rose-300 dark:border-rose-800 bg-rose-50/30"
                      : "border-[var(--color-border)]"
                  }`}
                />
              </div>

              {/* Current Annual Income */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Current Household Annual Income ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)]">$</span>
                  <input
                    type="number"
                    step="1000"
                    value={profile.currentAnnualIncome || ""}
                    onChange={(e) => onChangeProfile("currentAnnualIncome", parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Target Monthly Retirement Income */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Desired Monthly Retirement Income ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)]">$</span>
                  <input
                    type="number"
                    step="500"
                    value={profile.targetMonthlyRetirementIncome || ""}
                    onChange={(e) => onChangeProfile("targetMonthlyRetirementIncome", parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Current Total Retirement Savings */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Total Current Retirement Savings ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)]">$</span>
                  <input
                    type="number"
                    step="5000"
                    value={profile.currentRetirementSavings || ""}
                    onChange={(e) => onChangeProfile("currentRetirementSavings", parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Annual Savings Rate */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Annual Contribution / Savings Addition ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)]">$</span>
                  <input
                    type="number"
                    step="1000"
                    value={profile.annualSavingsRate || ""}
                    onChange={(e) => onChangeProfile("annualSavingsRate", parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Advisor Name */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Lead Advisor Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.advisorName}
                  onChange={(e) => onChangeProfile("advisorName", e.target.value)}
                  placeholder="e.g. James D. Martin, CFP®"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Advisory Firm */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  Advisory Firm Name
                </label>
                <input
                  type="text"
                  value={profile.advisoryFirm}
                  onChange={(e) => onChangeProfile("advisoryFirm", e.target.value)}
                  placeholder="e.g. Meridian & Blue Ridge Wealth"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Advisor Notes */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                Advisor Diagnostic Notes & Client Context
              </label>
              <textarea
                rows={3}
                value={profile.advisorNotes}
                onChange={(e) => onChangeProfile("advisorNotes", e.target.value)}
                placeholder="Include qualitative client objectives, retirement concerns, and legacy goals..."
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab(categories[0].id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:bg-slate-800 transition-colors"
              >
                <span>Continue to {categories[0].shortTitle}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2-6: Dynamic Categories & Questions */}
        {activeCategory && (
          <div className="space-y-6">
            <div className="border-b border-[var(--color-border)] pb-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                  Pillar Diagnostic • Weight {activeCategory.weight}%
                </span>
                <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)]">
                  Thresholds: Green ≥{activeCategory.thresholds.green}% | Yellow ≥{activeCategory.thresholds.yellow}%
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                {activeCategory.title}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                {activeCategory.description}
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-5">
              {activeCategory.questions.map((q, qIndex) => {
                const selectedOptionId = answers[q.id];
                const isAnswered = !!selectedOptionId;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isAnswered
                        ? "bg-[var(--color-panel-subtle)] border-[var(--color-border)]"
                        : "bg-[var(--color-surface)] border-amber-200 dark:border-amber-800/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold font-mono text-[var(--color-text-secondary)]">
                          {qIndex + 1}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                            {q.text}
                          </h4>
                          {q.helpText && (
                            <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                              <HelpCircle className="h-3 w-3 shrink-0" />
                              <span>{q.helpText}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] shrink-0">
                        Max {q.maxPoints} pts
                      </span>
                    </div>

                    {/* Question Options */}
                    {q.type === "yes_no" && q.options ? (
                      /* Yes / No Toggle Pills */
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {q.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => onChangeAnswer(q.id, opt.id)}
                              className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${
                                isSelected
                                  ? opt.label.startsWith("Yes")
                                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                                    : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/20"
                                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                              }`}
                            >
                              <span>{opt.label}</span>
                              <span className="font-mono text-xs opacity-75">
                                +{opt.points} pts
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : q.options ? (
                      /* Multiple Choice Option Cards */
                      <div className="space-y-2 mt-3">
                        {q.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => onChangeAnswer(q.id, opt.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                                isSelected
                                  ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-[var(--color-text-primary)] ring-2 ring-blue-500/20"
                                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-[var(--color-border)] bg-[var(--color-surface)]"
                                    }`}
                                  >
                                    {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                  </div>
                                  <span className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                                    {opt.label}
                                  </span>
                                </div>
                                {opt.description && (
                                  <p className="text-xs text-[var(--color-text-muted)] mt-1 pl-6">
                                    {opt.description}
                                  </p>
                                )}
                              </div>
                              <span className="text-xs font-mono font-bold text-[var(--color-brand-accent)] px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] shrink-0">
                                {opt.points} / {q.maxPoints} pts
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = categories.findIndex((c) => c.id === activeTab);
                  if (currentIndex === 0) {
                    setActiveTab("profile");
                  } else {
                    setActiveTab(categories[currentIndex - 1].id);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Section</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = categories.findIndex((c) => c.id === activeTab);
                  if (currentIndex < categories.length - 1) {
                    setActiveTab(categories[currentIndex + 1].id);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--color-brand)] text-white hover:bg-slate-800 transition-colors"
              >
                <span>
                  {categories.findIndex((c) => c.id === activeTab) === categories.length - 1
                    ? "Review Completed Scorecard →"
                    : `Next: ${categories[categories.findIndex((c) => c.id === activeTab) + 1]?.shortTitle} →`}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
