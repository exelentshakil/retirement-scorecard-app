"use client";

import React from "react";
import { ShieldCheck, Code, Printer, Lock, CheckCircle2, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 no-print transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 4 Architectural Decision Cards */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Enterprise Architectural Decisions &amp; Engineering Specifications
            </h3>
            <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)]">
              Phase 1 Deliverable • Production Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Decision 1: Decoupled Schema */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  <Code className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Decoupled JSON Schema
                </h4>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Categories, questions, point weights, and R/Y/G thresholds are isolated in pure TypeScript/JSON. Any non-technical employee or future developer can update rules in minutes.
              </p>
            </div>

            {/* Decision 2: Guaranteed 8.5x11 Print */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <Printer className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Strict 8.5×11 Portrait PDF
                </h4>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Uses strict CSS <code className="font-mono bg-[var(--color-surface)] px-1 rounded">@page &#123; size: letter portrait; &#125;</code> rules tested for Windows Google Chrome &amp; Edge. Eliminates catastrophic 2-page overflow bugs.
              </p>
            </div>

            {/* Decision 3: Privacy & Zero PII */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  <Lock className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Zero PII Storage Policy
                </h4>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Prospect data exists exclusively in-memory during the active advisor session. Zero external database persistence in Phase 1 ensures total SEC/FINRA client privacy compliance.
              </p>
            </div>

            {/* Decision 4: Dual AI & Math Fallback */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  <Cpu className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Resilient 3-Tier Fallback
                </h4>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Primary OpenAI gpt-4o-mini executive commentary with Google Gemini 2.0 Flash secondary and 100% deterministic local CFP-RuleEngine for zero outage risk.
              </p>
            </div>
          </div>
        </div>

        {/* System Technical Specs & Compliance Grid */}
        <div className="pt-6 border-t border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
              Core Framework
            </span>
            <span className="text-[var(--color-text-primary)] font-semibold block">
              Next.js 15 App Router
            </span>
            <span className="text-[var(--color-text-secondary)]">TypeScript 5.7 • Zod 3.23</span>
          </div>

          <div>
            <span className="font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
              Design Architecture
            </span>
            <span className="text-[var(--color-text-primary)] font-semibold block">
              Tailwind CSS v4
            </span>
            <span className="text-[var(--color-text-secondary)]">Stripe/Institutional Wealth Theme</span>
          </div>

          <div>
            <span className="font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
              Print Specification
            </span>
            <span className="text-[var(--color-text-primary)] font-semibold block">
              Letter Portrait (8.5&quot; × 11&quot;)
            </span>
            <span className="text-[var(--color-text-secondary)]">Windows 10/11 &amp; macOS Tested</span>
          </div>

          <div>
            <span className="font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
              Compliance Standard
            </span>
            <span className="text-[var(--color-text-primary)] font-semibold block">
              SEC / FINRA Ready
            </span>
            <span className="text-[var(--color-text-secondary)]">Standard Educational Disclaimers</span>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>
              Engineered by <strong>Shakil Ahmed</strong> • Founder, BarakahSoft LLC
            </span>
          </div>
          <div>
            <span>Verified Upwork Partner • 12+ Years Enterprise Systems Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
