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
  Users,
} from "lucide-react";
import { SAMPLE_PERSONAS } from "@/lib/scorecard-config";
import { ProspectProfile } from "@/types/scorecard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  onGenerateAi,
  isAiGenerating,
  activePersonaId,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md transition-colors no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Left: Firm Identity & Cockpit Context */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <span className="font-serif font-bold text-lg tracking-tight">M</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)] truncate">
                  Meridian & Blue Ridge Wealth
                </span>
                <Badge variant="success" className="hidden sm:inline-flex gap-1 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Scorecard v1.0
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate hidden md:block">
                Advisory Scorecard Engine • Zero PII Stored
              </p>
            </div>
          </div>

          {/* Center/Right: Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Persona Quick Loader */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[var(--color-panel-subtle)] p-1 rounded-xl border border-[var(--color-border)] shadow-2xs shrink-0">
              <div className="flex items-center gap-1 px-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] select-none">
                <Users className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0" />
                <span className="hidden xl:inline">Persona:</span>
              </div>
              <div className="flex items-center gap-1">
                {SAMPLE_PERSONAS.map((p) => {
                  const isSelected = activePersonaId === p.id;
                  const dotColor =
                    p.statusColor === "green"
                      ? "bg-emerald-500"
                      : p.statusColor === "yellow"
                      ? "bg-amber-500"
                      : "bg-rose-500";

                  return (
                    <Button
                      key={p.id}
                      onClick={() => onLoadPersona(p.id)}
                      title={`${p.label} • ${p.badge}\n${p.description}`}
                      variant={isSelected ? "secondary" : "ghost"}
                      size="xs"
                      className={`h-7 px-2.5 text-xs font-semibold ${
                        isSelected
                          ? "bg-[var(--color-surface)] text-[var(--color-brand-accent)] shadow-xs border border-[var(--color-border)] font-bold"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} shrink-0`} />
                      <span>{p.firstName || p.shortName}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* AI Narrative Copilot */}
            <Button
              onClick={onGenerateAi}
              disabled={isAiGenerating}
              variant="accent"
              size="sm"
              title="Generate tailored executive advisory commentary using Dual AI engine"
            >
              <Sparkles className={`h-3.5 w-3.5 ${isAiGenerating ? "animate-spin text-indigo-500" : ""}`} />
              <span className="hidden sm:inline">AI Commentary</span>
            </Button>

            {/* Rules & Schema Configurator */}
            <Button
              onClick={onOpenSchema}
              variant="outline"
              size="sm"
              title="Inspect or modify decoupled questions, scoring rules, and R/Y/G thresholds"
            >
              <Code2 className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span className="hidden md:inline xl:hidden">Schema</span>
              <span className="hidden xl:inline">Rules & Schema</span>
            </Button>

            {/* Print / Save PDF Button */}
            <Button
              onClick={onPrint}
              variant="brand"
              size="sm"
              title="Print or export guaranteed 8.5x11 inch single-page PDF report"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print PDF</span>
            </Button>

            {/* Reset Button */}
            <Button
              onClick={onReset}
              variant="ghost"
              size="icon-sm"
              className="hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              title="Clear all fields and start a fresh prospect"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              variant="ghost"
              size="icon-sm"
              title="Toggle color theme (Light/Dark)"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
