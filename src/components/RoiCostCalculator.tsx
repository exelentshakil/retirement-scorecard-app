"use client";

import React, { useState } from "react";
import { X, Calculator, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface RoiCostCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoiCostCalculator({ isOpen, onClose }: RoiCostCalculatorProps) {
  const [advisorCount, setAdvisorCount] = useState<number>(3);
  const [prospectsPerMonth, setProspectsPerMonth] = useState<number>(15);
  const [advisorHourlyValue, setAdvisorHourlyValue] = useState<number>(250);

  if (!isOpen) return null;

  // Manual Word/Excel scorecard creation: ~45 mins (0.75 hrs)
  // Automated Web App: ~3 mins (0.05 hrs)
  const hoursSavedPerProspect = 0.7; // ~42 mins saved
  const totalProspectsPerMonth = advisorCount * prospectsPerMonth;
  const monthlyHoursSaved = Math.round(totalProspectsPerMonth * hoursSavedPerProspect);
  const monthlyDollarsSaved = Math.round(monthlyHoursSaved * advisorHourlyValue);
  const annualDollarsSaved = monthlyDollarsSaved * 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Advisory Operational ROI &amp; Time-Savings Engine
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Quantifies firm capacity recaptured by replacing manual spreadsheet / Word scorecards.
              </p>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            size="icon-sm"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Sliders & Calculation Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Monthly Hours Saved */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                Hours Recaptured
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-950 dark:text-blue-200">
                {monthlyHoursSaved} hrs
              </span>
              <span className="text-[10px] text-blue-700/80 dark:text-blue-400 block mt-0.5">
                per month across firm
              </span>
            </div>

            {/* Metric 2: Monthly Value */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                Monthly Savings
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-950 dark:text-emerald-200">
                ${monthlyDollarsSaved.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400 block mt-0.5">
                in advisor capacity
              </span>
            </div>

            {/* Metric 3: Annualized Value */}
            <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                Annualized ROI
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-purple-950 dark:text-purple-200">
                ${annualDollarsSaved.toLocaleString()}
              </span>
              <span className="text-[10px] text-purple-700/80 dark:text-purple-400 block mt-0.5">
                recaptured billable time
              </span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-5 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
            {/* Slider 1: Number of Advisors */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                <span>Number of Advisors / Intake Staff:</span>
                <span className="font-mono text-[var(--color-brand-accent)] font-bold">{advisorCount} advisors</span>
              </div>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[advisorCount]}
                onValueChange={(val) => setAdvisorCount(val[0])}
              />
            </div>

            {/* Slider 2: Prospects Per Month per Advisor */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                <span>Prospect Scorecards per Advisor / Month:</span>
                <span className="font-mono text-[var(--color-brand-accent)] font-bold">{prospectsPerMonth} reviews</span>
              </div>
              <Slider
                min={3}
                max={50}
                step={1}
                value={[prospectsPerMonth]}
                onValueChange={(val) => setProspectsPerMonth(val[0])}
              />
            </div>

            {/* Slider 3: Advisor Billable / Value Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                <span>Effective Advisor Billable Rate ($/hr):</span>
                <span className="font-mono text-[var(--color-brand-accent)] font-bold">${advisorHourlyValue}/hr</span>
              </div>
              <Slider
                min={100}
                max={500}
                step={25}
                value={[advisorHourlyValue]}
                onValueChange={(val) => setAdvisorHourlyValue(val[0])}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Payback Period:</strong> At {totalProspectsPerMonth} monthly prospect reviews, a custom web application achieves 100% financial breakeven in less than <strong>3 business days</strong>.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Based on average 45-min manual vs. 3-min automated intake</span>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="text-xs font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
