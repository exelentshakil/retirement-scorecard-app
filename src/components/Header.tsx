"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Printer,
  RotateCcw,
  Sparkles,
  Code2,
  Download,
  Shield,
  FileSpreadsheet,
  Zap,
} from "lucide-react";
import { SAMPLE_PERSONAS } from "@/lib/scorecard-config";
import { ProspectProfile } from "@/types/scorecard";

interface HeaderProps {
  onLoadPersona: (personaId: string) => void;
  onReset: () => void;
  onPrint: () => void;
  onOpenSchema: () => void;
  onOpenBlueprints: () => void;
  onOpenRoi: () => void;
  onGenerateAi: () => void;
  isAiGenerating: boolean;
  activePersonaId: string | null;
  profile: ProspectProfile;
}

export function Header({
  onLoadPersona,
  onReset,
  onPrint,
  onOpenSchema,
  onOpenBlueprints,
  onOpenRoi,
  onGenerateAi,
  isAiGenerating,
  activePersonaId,
  profile,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md transition-colors no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Left: Firm Identity & Cockpit Context */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <span className="font-serif font-bold text-lg tracking-tight">M</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] truncate">
                  Meridian & Blue Ridge Wealth
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Scorecard v1.0
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate hidden md:block">
                Internal Advisory Intake & Single-Page PDF Engine • No External PII Stored
              </p>
            </div>
          </div>

          {/* Center/Right: Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Persona Quick Loader */}
            <div className="hidden lg:flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)] shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] px-2">
                Quick Persona:
              </span>
              {SAMPLE_PERSONAS.map((p) => {
                const isSelected = activePersonaId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onLoadPersona(p.id)}
                    title={p.description}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-[var(--color-surface)] text-[var(--color-brand-accent)] shadow-xs border border-[var(--color-border)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/60"
                    }`}
                  >
                    {p.label.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* AI Narrative Copilot */}
            <button
              onClick={onGenerateAi}
              disabled={isAiGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors whitespace-nowrap shrink-0"
              title="Generate tailored executive advisory commentary using Dual AI engine"
            >
              <Sparkles className={`h-3.5 w-3.5 ${isAiGenerating ? "animate-spin text-indigo-500" : ""}`} />
              <span className="hidden sm:inline">AI Commentary</span>
            </button>

            {/* Rules & Schema Configurator */}
            <button
              onClick={onOpenSchema}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors whitespace-nowrap shrink-0"
              title="Inspect or modify decoupled questions, scoring rules, and R/Y/G thresholds"
            >
              <Code2 className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span className="hidden md:inline">Rules & Schema</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-[var(--color-brand)] text-white hover:bg-slate-800 dark:hover:bg-blue-600 shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
              title="Print or export guaranteed 8.5x11 inch single-page PDF report"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print PDF</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors shrink-0"
              title="Clear all fields and start a fresh prospect"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-lg transition-colors shrink-0"
              title="Toggle color theme (Light/Dark)"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
