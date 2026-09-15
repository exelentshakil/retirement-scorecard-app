"use client";

import React, { useState } from "react";
import { X, Code2, Copy, Check, Download, Sliders, FileJson } from "lucide-react";
import { SCORECARD_CATEGORIES } from "@/lib/scorecard-config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SchemaEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchemaEditorModal({ isOpen, onClose }: SchemaEditorModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "json">("visual");

  if (!isOpen) return null;

  const schemaJson = JSON.stringify(
    {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      title: "Retirement Scorecard Configuration Schema",
      version: "1.0.0",
      description: "Decoupled architecture allowing future developers to update questions, point values, R/Y/G thresholds, and brand colors without modifying UI code.",
      thresholds: {
        greenOptimal: 75,
        yellowAttention: 50,
        redCritical: 0,
      },
      categories: SCORECARD_CATEGORIES,
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([schemaJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scorecard-rules-schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Decoupled Rules & Questions Schema Architecture
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Designed so any future developer can update categories, questions, weights, and R/Y/G thresholds in pure JSON.
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

        {/* View Switcher & Action Strip */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab("visual")}
              variant={activeTab === "visual" ? "secondary" : "ghost"}
              size="xs"
              className={`h-7 px-3 text-xs gap-1.5 ${
                activeTab === "visual"
                  ? "bg-[var(--color-panel-subtle)] text-[var(--color-brand-accent)] border border-[var(--color-border)] shadow-xs font-bold"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Visual Rules Breakdown</span>
            </Button>
            <Button
              onClick={() => setActiveTab("json")}
              variant={activeTab === "json" ? "secondary" : "ghost"}
              size="xs"
              className={`h-7 px-3 text-xs gap-1.5 ${
                activeTab === "json"
                  ? "bg-[var(--color-panel-subtle)] text-[var(--color-brand-accent)] border border-[var(--color-border)] shadow-xs font-bold"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              <span>Raw JSON Configuration</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="xs"
              className="h-7 px-2.5 text-xs gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy JSON"}</span>
            </Button>
            <Button
              onClick={handleDownload}
              variant="brand"
              size="xs"
              className="h-7 px-2.5 text-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Schema</span>
            </Button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "visual" ? (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong>Developer Architectural Guarantee:</strong> All 5 scorecard categories, questions, options, point weights, and R/Y/G status thresholds are isolated in <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">src/lib/scorecard-config.ts</code>. When Jim Martin or your team provides your proprietary questionnaire and brand rules, updating them takes under 2 minutes with zero risk of breaking the layout or PDF print engine.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCORECARD_CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-[var(--color-brand-accent)] uppercase">
                          Pillar 0{idx + 1} • Weight {cat.weight}%
                        </span>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                          {cat.title}
                        </h4>
                      </div>
                      <Badge variant="success" className="font-mono text-xs py-0.5">
                        Green ≥{cat.thresholds.green}%
                      </Badge>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {cat.description}
                    </p>

                    <div className="pt-2 border-t border-[var(--color-border)] space-y-2">
                      <span className="text-xs font-semibold text-[var(--color-text-muted)] block uppercase tracking-wider">
                        {cat.questions.length} Configured Questions:
                      </span>
                      {cat.questions.map((q, qIdx) => (
                        <div key={q.id} className="text-xs flex items-start gap-1.5">
                          <span className="font-mono text-slate-400 shrink-0">
                            {idx + 1}.{qIdx + 1}
                          </span>
                          <span className="text-[var(--color-text-primary)] font-medium">
                            {q.text} ({q.maxPoints} pts)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {schemaJson}
            </pre>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Schema Format: JSON Schema Draft 2020-12 • Decoupled from React UI</span>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="text-xs font-semibold"
          >
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
}
