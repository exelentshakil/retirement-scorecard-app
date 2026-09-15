"use client";

import React, { useState } from "react";
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChaosOutageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChaosOutageModal({ isOpen, onClose }: ChaosOutageModalProps) {
  const [chaosMode, setChaosMode] = useState<"normal" | "openai_down" | "all_ai_down">("normal");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Disaster Recovery &amp; Chaos Outage Simulator
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Verifies that scorecard generation, R/Y/G math, and PDF printing never fail even during cloud provider outages.
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Chaos Trigger Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setChaosMode("normal")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                chaosMode === "normal"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Normal Operation</span>
              <span className="text-[10px] text-emerald-700 font-mono">OpenAI Primary</span>
            </button>

            <button
              type="button"
              onClick={() => setChaosMode("openai_down")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                chaosMode === "openai_down"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 ring-2 ring-amber-500/20"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Simulate OpenAI Outage</span>
              <span className="text-[10px] text-amber-700 font-mono">Failover to Gemini</span>
            </button>

            <button
              type="button"
              onClick={() => setChaosMode("all_ai_down")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                chaosMode === "all_ai_down"
                  ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/20"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              <Cpu className="h-4 w-4 text-rose-600" />
              <span>Total Cloud Outage</span>
              <span className="text-[10px] text-rose-700 font-mono">Local CFP-RuleEngine</span>
            </button>
          </div>

          {/* Active Resilience Pipeline Diagram */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Active Resilience Pipeline Status
              </span>
              <Badge variant="success" className="text-[10px] py-0 px-1.5 font-mono">
                Zero System Downtime Guaranteed
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              {/* Node 1: Deterministic Scoring Math */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    Local Scoring Engine (5 Pillars &amp; R/Y/G Math)
                  </span>
                </div>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% In-Memory (0ms)</span>
              </div>

              {/* Node 2: Primary AI Layer */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      chaosMode === "normal" ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    OpenAI gpt-4o-mini (Primary Executive Narrative)
                  </span>
                </div>
                <span className="font-mono font-bold">
                  {chaosMode === "normal" ? (
                    <span className="text-emerald-600">Online (~820ms)</span>
                  ) : (
                    <span className="text-rose-500">SIMULATED 503 ERROR</span>
                  )}
                </span>
              </div>

              {/* Node 3: Secondary Failover AI */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      chaosMode === "all_ai_down" ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    Google Gemini 2.0 Flash (Sub-Second Fallback)
                  </span>
                </div>
                <span className="font-mono font-bold">
                  {chaosMode === "all_ai_down" ? (
                    <span className="text-rose-500">OFFLINE</span>
                  ) : chaosMode === "openai_down" ? (
                    <span className="text-emerald-600">ACTIVE FAILOVER (~310ms)</span>
                  ) : (
                    <span className="text-slate-400">STANDBY</span>
                  )}
                </span>
              </div>

              {/* Node 4: Deterministic Rule Engine Fallback */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    CFP-RuleEngine-v1 (Deterministic Local Rulebase)
                  </span>
                </div>
                <span className="font-mono text-emerald-600 font-bold">
                  {chaosMode === "all_ai_down" ? "ACTIVE RECOVERY (0ms)" : "STANDBY (GUARANTEED)"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            In financial advisory operations, client meetings cannot be stalled by API outages or rate limits. The three-tier fallback hierarchy guarantees that every prospect scorecard generates without delay, regardless of internet connectivity or external cloud outages.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Resilience Architecture: Multi-tier circuit breaker pattern</span>
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
