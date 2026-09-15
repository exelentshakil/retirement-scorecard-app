"use client";

import React from "react";
import { OverallScoreResult, ProspectProfile } from "@/types/scorecard";
import { Activity, CheckCircle, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BentoKpisProps {
  scorecard: OverallScoreResult;
  profile: ProspectProfile;
  validationStatus: {
    isValid: boolean;
    missingFields: string[];
    answeredCount: number;
    totalQuestions: number;
  };
}

export function BentoKpis({ scorecard, profile, validationStatus }: BentoKpisProps) {
  const getBadgeVariant = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return "success" as const;
      case "yellow":
        return "warning" as const;
      case "red":
        return "danger" as const;
    }
  };

  // Safe income calculation
  const monthlyTarget = profile.targetMonthlyRetirementIncome || 9500;
  const currentSavings = profile.currentRetirementSavings || 1150000;
  // 4% safe withdrawal annual rule of thumb / 12 months
  const estimatedMonthlyDraw = Math.round((currentSavings * 0.04) / 12);
  const replacementRatio = Math.min(100, Math.round((estimatedMonthlyDraw / monthlyTarget) * 100));

  return (
    <div className="w-full py-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] no-print bento-kpi">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bento 1: Overall Readiness Score */}
          <Card className="p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Overall Readiness
              </span>
              <Badge variant={getBadgeVariant(scorecard.overallStatus)} className="gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {scorecard.overallStatusLabel}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {scorecard.overallScore}
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-muted)]">/ 100 pts</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2 line-clamp-1">
              {scorecard.statusCounts.green} Green • {scorecard.statusCounts.yellow} Yellow • {scorecard.statusCounts.red} Red
            </p>
          </Card>

          {/* Bento 2: R/Y/G Indicator Breakdown */}
          <Card className="p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Status Pillar Distribution
              </span>
              <Activity className="h-4 w-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {scorecard.statusCounts.green}
                </span>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Green</span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
                <span className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400">
                  {scorecard.statusCounts.yellow}
                </span>
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">Yellow</span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50">
                <span className="text-xl font-bold font-mono text-rose-700 dark:text-rose-400">
                  {scorecard.statusCounts.red}
                </span>
                <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">Red</span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Target: 5/5 Green Pillars for Optimal Transition
            </p>
          </Card>

          {/* Bento 3: Income Replacement Ratio */}
          <Card className="p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Target Monthly Income
              </span>
              <TrendingUp className="h-4 w-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                ${monthlyTarget.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">/ month</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                <span>Safe Portfolio Yield (~4%):</span>
                <span className="font-mono font-semibold">${estimatedMonthlyDraw.toLocaleString()}/mo</span>
              </div>
              <Progress value={replacementRatio} indicatorClassName="bg-blue-600 dark:bg-blue-400" />
            </div>
          </Card>

          {/* Bento 4: Form & Validation Readiness */}
          <Card className="p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Validation & PDF Readiness
              </span>
              <Shield className="h-4 w-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {validationStatus.answeredCount}/{validationStatus.totalQuestions}
              </span>
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Answered</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {validationStatus.isValid ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  100% Validated • Ready for PDF Export
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {validationStatus.missingFields.length} Required Field{validationStatus.missingFields.length > 1 ? "s" : ""} Pending
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
