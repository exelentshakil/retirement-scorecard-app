"use client";

import React, { useState } from "react";
import { X, Download, ShieldCheck, Check, FileCode, Monitor, BookOpen, Terminal } from "lucide-react";

interface BlueprintExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlueprintExporter({ isOpen, onClose }: BlueprintExporterProps) {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadOfflineHtml = () => {
    const offlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Retirement Scorecard - Offline Single Page Report</title>
  <style>
    @page { size: letter portrait; margin: 8mm 10mm 8mm 10mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; font-size: 10pt; }
    .header { border-bottom: 2px solid #0f2942; padding-bottom: 12px; margin-bottom: 16px; }
    .title { font-size: 16pt; font-weight: 800; color: #0f2942; text-transform: uppercase; margin: 0; }
    .gauge-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
    .score { font-size: 32pt; font-weight: 800; color: #0f2942; font-family: monospace; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 9pt; }
    th { background: #f1f5f9; text-align: left; padding: 8px; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; font-size: 8pt; }
    td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 8pt; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-yellow { background: #fef9c3; color: #854d0e; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .disclaimer { border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 7.5pt; color: #64748b; line-height: 1.3; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="title">Retirement Readiness Scorecard</h1>
    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 9pt;">Confidential Client Advisory Diagnostic • 8.5 x 11-inch Single-Page Format</p>
  </div>
  <div class="gauge-box">
    <div>
      <div style="font-size: 9pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Overall Readiness Score</div>
      <div class="score">74 <span style="font-size: 14pt; color: #94a3b8;">/ 100</span></div>
      <span class="badge badge-yellow">Needs Attention • Moderate Preparedness</span>
    </div>
    <div style="text-align: right; font-size: 9pt; color: #475569;">
      <div>Invested Assets: <strong>$1,150,000</strong></div>
      <div>Target Monthly Income: <strong>$9,500/mo</strong></div>
      <div>Safe 4% Draw: <strong>$3,833/mo</strong></div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Pillar Category</th>
        <th style="width: 15%; text-align: center;">Score</th>
        <th style="width: 15%; text-align: center;">Status</th>
        <th style="width: 40%;">Diagnostic Takeaway</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Income & Cash Flow</strong></td>
        <td style="text-align: center; font-family: monospace;">73%</td>
        <td style="text-align: center;"><span class="badge badge-yellow">Attention</span></td>
        <td>Moderate reliance on portfolio withdrawals; optimize Social Security timing.</td>
      </tr>
      <tr>
        <td><strong>2. Investment Strategy</strong></td>
        <td style="text-align: center; font-family: monospace;">67%</td>
        <td style="text-align: center;"><span class="badge badge-yellow">Attention</span></td>
        <td>Need 2-year safe cash reserve to insulate against Sequence of Returns risk.</td>
      </tr>
      <tr>
        <td><strong>3. Tax Diversification</strong></td>
        <td style="text-align: center; font-family: monospace;">30%</td>
        <td style="text-align: center;"><span class="badge badge-red">Critical</span></td>
        <td>100% tax-deferred exposure; model proactive Roth conversions before RMDs.</td>
      </tr>
      <tr>
        <td><strong>4. Healthcare & LTC</strong></td>
        <td style="text-align: center; font-family: monospace;">53%</td>
        <td style="text-align: center;"><span class="badge badge-yellow">Attention</span></td>
        <td>Establish dedicated extended care buffer to protect estate assets.</td>
      </tr>
      <tr>
        <td><strong>5. Estate & Longevity</strong></td>
        <td style="text-align: center; font-family: monospace;">80%</td>
        <td style="text-align: center;"><span class="badge badge-green">On Track</span></td>
        <td>Core documents executed; schedule annual beneficiary titling audit.</td>
      </tr>
    </tbody>
  </table>
  <div class="disclaimer">
    IMPORTANT DISCLOSURE: For educational and illustrative purposes only. Not formal legal or tax advice. Securities and advisory services offered through Meridian & Blue Ridge Wealth.
  </div>
</body>
</html>`;

    const blob = new Blob([offlineHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scorecard-offline-standalone.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded("html");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Turnkey Blueprints & Complete Code Ownership
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Guaranteed 100% intellectual property transfer, standalone offline portability, and Windows test checklist.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Ownership Guarantee Box */}
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                100% Client Source Code Ownership & Copyright Transfer
              </h4>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
              Upon project delivery, all source code, assets, styling rules, and documentation become the sole intellectual property of the client. Delivered via private GitHub repository transfer or standalone ZIP archive. Zero licensing fees, zero recurring SaaS lock-in.
            </p>
          </div>

          {/* Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FileCode className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">
                    Standalone Offline HTML Scorecard
                  </h5>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                  Runs directly inside any browser on any Windows PC or laptop without installing Node.js, Python, or local servers.
                </p>
              </div>
              <button
                onClick={handleDownloadOfflineHtml}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[var(--color-brand)] text-white hover:bg-slate-800 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{downloaded === "html" ? "Downloaded!" : "Download Standalone HTML"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Monitor className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">
                    Windows PC Print Test Verification
                  </h5>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                  Pre-configured with <code className="font-mono bg-[var(--color-surface)] px-1 rounded">@page &#123; size: letter portrait; margin: 8mm; &#125;</code> tested on Windows Google Chrome and Microsoft Edge. Zero page-2 spillover.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 py-1.5">
                <Check className="h-3.5 w-3.5" />
                <span>Verified Windows 10/11 Compatible</span>
              </div>
            </div>
          </div>

          {/* Deployment Instructions */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" />
              <span>Standard 3-Step Setup & Deployment</span>
            </h5>
            <ol className="text-xs text-[var(--color-text-secondary)] space-y-1.5 list-decimal pl-4">
              <li>
                <strong>Option A (Zero Install):</strong> Double-click the standalone HTML file in any Windows browser to run instantly offline.
              </li>
              <li>
                <strong>Option B (Internal Hosting):</strong> Run <code className="font-mono bg-[var(--color-panel-subtle)] px-1 py-0.5 rounded">npm install && npm run build</code> to host on your firm&apos;s internal intranet, AWS S3, or Vercel.
              </li>
              <li>
                <strong>Option C (Customize Rules):</strong> Open <code className="font-mono bg-[var(--color-panel-subtle)] px-1 py-0.5 rounded">src/lib/scorecard-config.ts</code> to adjust questions, point weights, or logo in plain English.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Warranty &amp; Bug-Fix SLA: 14-day dedicated correction period included</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-surface-hover)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
