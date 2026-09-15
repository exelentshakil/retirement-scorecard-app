"use client";

import React, { useState } from "react";
import {
  ProspectProfile,
  OverallScoreResult,
  ScorecardCategory,
} from "@/types/scorecard";
import {
  Printer,
  Download,
  Shield,
  FileText,
} from "lucide-react";
import { AiNarrativeResponse } from "@/lib/ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScorecardPreviewProps {
  profile: ProspectProfile;
  scorecard: OverallScoreResult;
  categories: ScorecardCategory[];
  aiNarrative: AiNarrativeResponse | null;
  isAiGenerating: boolean;
  onGenerateAi: () => void;
  onPrint: () => void;
  onDownloadHtml: () => void;
}

export function ScorecardPreview({
  profile,
  scorecard,
  aiNarrative,
  onPrint,
  onDownloadHtml,
}: ScorecardPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState<"fit" | "75" | "100">("fit");

  const getStatusBadge = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
          dot: "bg-emerald-500",
          bar: "bg-emerald-500",
          label: "Optimal / On Track",
        };
      case "yellow":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-300",
          dot: "bg-amber-500",
          bar: "bg-amber-500",
          label: "Needs Attention",
        };
      case "red":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-300",
          dot: "bg-rose-500",
          bar: "bg-rose-500",
          label: "Critical Action",
        };
    }
  };

  const overallBadge = getStatusBadge(scorecard.overallStatus);
  const yearsToRetire = Math.max(0, (profile.targetRetirementAge || 65) - (profile.currentAge || 58));
  const estimatedSafeMonthlyDraw = Math.round(((profile.currentRetirementSavings || 0) * 0.04) / 12);

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xs overflow-hidden scorecard-preview-container">
      {/* Scorecard Control Toolbar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Live 8.5 × 11-inch Portrait Preview
          </span>
          <Badge variant="outline" className="text-xs font-mono font-semibold py-0.5 hidden sm:inline-flex">
            Letter (8.5&quot; × 11&quot;)
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom Selector */}
          <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-0.5 text-xs font-semibold">
            <Button
              onClick={() => setZoomLevel("fit")}
              variant={zoomLevel === "fit" ? "secondary" : "ghost"}
              size="xs"
              className={`h-6 px-2 text-xs ${
                zoomLevel === "fit" ? "font-bold text-[var(--color-brand-accent)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              Fit
            </Button>
            <Button
              onClick={() => setZoomLevel("75")}
              variant={zoomLevel === "75" ? "secondary" : "ghost"}
              size="xs"
              className={`h-6 px-2 text-xs ${
                zoomLevel === "75" ? "font-bold text-[var(--color-brand-accent)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              75%
            </Button>
            <Button
              onClick={() => setZoomLevel("100")}
              variant={zoomLevel === "100" ? "secondary" : "ghost"}
              size="xs"
              className={`h-6 px-2 text-xs ${
                zoomLevel === "100" ? "font-bold text-[var(--color-brand-accent)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              100%
            </Button>
          </div>

          {/* Download Standalone HTML Button */}
          <Button
            onClick={onDownloadHtml}
            variant="outline"
            size="sm"
            className="text-xs font-semibold gap-1.5"
            title="Download standalone offline HTML/PDF report"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export HTML</span>
          </Button>

          {/* Direct Print to PDF */}
          <Button
            onClick={onPrint}
            variant="brand"
            size="sm"
            className="text-xs font-bold gap-1.5"
            title="Generate print-ready single-page PDF with exact letter portrait margins"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print PDF</span>
          </Button>
        </div>
      </div>

      {/* Preview Viewport Container */}
      <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 bg-slate-200/70 dark:bg-slate-900/50 flex justify-center items-start preview-viewport-container">
        {/* Printable 8.5 x 11-inch Portrait Sheet */}
        <div
          id="scorecard-printable"
          style={{
            width: zoomLevel === "100" ? "8.5in" : zoomLevel === "75" ? "6.375in" : "100%",
            maxWidth: "8.5in",
            minHeight: zoomLevel === "100" ? "11in" : zoomLevel === "75" ? "8.25in" : "11in",
          }}
          className="bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-200 font-sans shrink-0"
        >
          {/* 1. Header & Institutional Branding */}
          <div className="border-b-2 border-slate-900 pb-3 mb-3 section-header">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-[#0f2942] text-white font-serif font-bold text-lg sm:text-xl shadow-xs">
                  M
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-[#0f2942] uppercase font-sans whitespace-nowrap truncate leading-tight">
                    {profile.advisoryFirm || "Meridian & Blue Ridge Wealth"}
                  </h1>
                  <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap truncate">
                    Private Wealth Management • Retirement Diagnostic
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 pt-0.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300 whitespace-nowrap">
                  Confidential Scorecard
                </span>
                <p className="text-[10px] text-slate-500 mt-1 font-mono whitespace-nowrap">
                  Date: {profile.assessmentDate || new Date().toISOString().split("T")[0]}
                </p>
              </div>
            </div>

            {/* Client & Advisor Metadata Bar */}
            <div className="grid grid-cols-12 gap-2 mt-2 pt-2 border-t border-slate-200 text-xs items-center">
              <div className="col-span-3 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">
                  Primary Client
                </span>
                <span className="font-bold text-slate-900 truncate block whitespace-nowrap">
                  {profile.clientName || "Client Name"}
                </span>
              </div>
              <div className="col-span-4 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5 whitespace-nowrap">
                  Age / Target Retirement
                </span>
                <span className="font-bold text-slate-900 block font-mono whitespace-nowrap text-[11px] sm:text-xs">
                  Age {profile.currentAge} ➔ Retire {profile.targetRetirementAge} ({yearsToRetire} yrs)
                </span>
              </div>
              <div className="col-span-2 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5 whitespace-nowrap">
                  Invested Assets
                </span>
                <span className="font-bold text-slate-900 block font-mono whitespace-nowrap">
                  ${(profile.currentRetirementSavings || 0).toLocaleString()}
                </span>
              </div>
              <div className="col-span-3 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5 whitespace-nowrap">
                  Lead Advisor
                </span>
                <span className="font-bold text-slate-900 truncate block whitespace-nowrap">
                  {profile.advisorName || "Lead Advisor, CFP®"}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Executive Readiness Overview (Gauge & Actuarial Summary) */}
          <div className="grid grid-cols-12 gap-3.5 mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            {/* Left Gauge Box */}
            <div className="col-span-4 flex flex-col items-center justify-center p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Retirement Readiness Score
              </span>
              <div className="relative flex items-center justify-center my-1">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#0f2942] tabular-nums tracking-tight">
                  {scorecard.overallScore}
                </div>
                <span className="text-xs font-bold text-slate-400 ml-1">/100</span>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${overallBadge.bg}`}
              >
                <span className={`h-2 w-2 rounded-full ${overallBadge.dot}`} />
                <span>{scorecard.overallStatusLabel}</span>
              </div>
            </div>

            {/* Right Diagnostic Summary */}
            <div className="col-span-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5 mb-1">
                  <Shield className="h-4 w-4 text-[#0f2942]" />
                  <span>Executive Readiness Diagnostic</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {scorecard.readinessSummary}
                </p>
              </div>

              {/* Financial Runway Snapshot */}
              <div className="grid grid-cols-3 gap-2 pt-1.5 mt-1.5 border-t border-slate-200 text-center text-xs">
                <div className="p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Target Monthly</span>
                  <span className="font-mono font-bold text-slate-900">
                    ${(profile.targetMonthlyRetirementIncome || 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Safe 4% Draw</span>
                  <span className="font-mono font-bold text-slate-900">
                    ${estimatedSafeMonthlyDraw.toLocaleString()}/mo
                  </span>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Pillar Status</span>
                  <span className="font-mono font-bold text-slate-900">
                    {scorecard.statusCounts.green}G • {scorecard.statusCounts.yellow}Y • {scorecard.statusCounts.red}R
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. The 5 Core Pillars Breakdown Table */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Core Planning Pillar Diagnostics
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                5 Pillars • Weighted Evaluation
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-1.5 px-2.5 w-[26%]">Pillar Category</th>
                    <th className="py-1.5 px-2 w-[14%] text-center">Score</th>
                    <th className="py-1.5 px-2 w-[16%] text-center">Status</th>
                    <th className="py-1.5 px-2.5 w-[44%]">Diagnostic Takeaway & Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {scorecard.categoryResults.map((cat) => {
                    const badge = getStatusBadge(cat.status);
                    return (
                      <tr key={cat.categoryId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-2.5 align-top">
                          <span className="font-bold text-slate-900 block leading-tight">
                            {cat.shortTitle}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Weight: 20%
                          </span>
                        </td>
                        <td className="py-1.5 px-2 align-top text-center font-mono">
                          <div className="font-bold text-slate-900">
                            {cat.percentageScore}%
                          </div>
                          <div className="w-16 mx-auto h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full ${badge.bar}`}
                              style={{ width: `${cat.percentageScore}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-1.5 px-2 align-top text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${badge.bg}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>
                        </td>
                        <td className="py-1.5 px-2.5 align-top">
                          <p className="text-[11px] font-medium text-slate-800 leading-snug">
                            {cat.keyFinding}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            <strong className="text-slate-700">Action:</strong> {cat.recommendedAction}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Advisor Strategic Narrative & AI Copilot Section */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3 advisor-commentary-box">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#0f2942]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Advisor Executive Commentary
                </h4>
              </div>
              {aiNarrative && (
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-600">
                  {aiNarrative.provider.toUpperCase()} • {aiNarrative.model} • {aiNarrative.latencyMs}ms
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-700 leading-snug space-y-1 advisor-commentary-text">
              {aiNarrative ? (
                aiNarrative.narrative.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p className="italic text-slate-500">
                  &quot;Based on the initial diagnostic, the Vance household has established a solid asset base but requires proactive withdrawal sequencing and healthcare bridge planning to eliminate sequence of returns vulnerability.&quot; (Click &apos;AI Commentary&apos; in header to generate full executive review).
                </p>
              )}
            </div>
          </div>

          {/* 5. Priority Action Plan & Next Steps */}
          <div className="mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Prioritized Strategic Action Plan
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {scorecard.priorityActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs flex items-start gap-2 action-plan-card"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0f2942] text-white text-[10px] font-bold font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-[10px] text-slate-700 leading-snug font-medium">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Professional Sign-off & Compliance Disclosures */}
          <div className="border-t border-slate-300 pt-2 mt-auto text-[9px] text-slate-500 compliance-section">
            <div className="flex items-center justify-between gap-2 mb-1 font-mono">
              <div>
                Prepared by: <strong className="text-slate-800">{profile.advisorName || "Lead Advisor, CFP®"}</strong> • {profile.advisoryFirm}
              </div>
              <div>
                Tel: {profile.firmPhone || "(540) 555-0194"} • Email: {profile.firmEmail || "advisory@meridianwealth.com"}
              </div>
            </div>
            <p className="leading-tight text-slate-400 compliance-text">
              IMPORTANT COMPLIANCE DISCLOSURE: This Retirement Readiness Scorecard is provided for informational and educational purposes only and does not constitute formal legal, tax, or investment advice. Projections are based on client-provided inputs, actuarial estimates, and standardized assumptions. Past performance does not guarantee future results. Securities and advisory services offered through Meridian &amp; Blue Ridge Wealth LLC, an SEC-registered investment adviser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
