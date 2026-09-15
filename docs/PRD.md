# Product Requirements Document (PRD)
## Web App for Retirement Scorecard — Advisory Diagnostics Engine

**Client:** Jim Martin (Christiansburg, Virginia, USA)  
**System Title:** Meridian Retirement Scorecard Platform  
**Live Application URL:** [https://retirement-scorecard-app.vercel.app](https://retirement-scorecard-app.vercel.app)  
**Public Repository:** [https://github.com/exelentshakil/retirement-scorecard-app](https://github.com/exelentshakil/retirement-scorecard-app)  
**Architecture Author:** Shakil Ahmed (Founder & Principal Systems Architect, BarakahSoft LLC)  
**Version:** 1.0.0 (Production-Ready Release)  
**Status:** Approved & Deployed Live  

---

## 1. Executive Summary & Defensibility Hook

### 1.1 The Operational Problem
Financial advisory firms rely on initial discovery meetings to convert prospects into long-term wealth management clients. Traditional intake methods rely on either complex, multi-tab Excel spreadsheets or heavyweight financial planning suites (e.g., eMoney, RightCapital) that take 45–60 minutes to configure and produce overwhelming 30-page PDF reports that intimidate prospective retirees.

### 1.2 The Client's Core Mandate ("The Fear")
Jim Martin's primary operational concerns are:
1. **Advisor Simplicity:** Data entry must take under 3 minutes during or immediately following a prospect meeting.
2. **Deterministic Print Consistency:** The scorecard *must* print strictly on a single 8.5 × 11-inch portrait page on standard Windows office PCs without spilling onto a blank second sheet.
3. **Decoupled Future-Proofing:** Future non-technical staff or developers must be able to adjust questions, weights, scoring rules, and color cutoffs without rewriting application code.
4. **Privacy-First Compliance:** Phase 1 requires zero permanent prospect storage (no databases, no CRM sync, no PII leakage).

---

## 2. The 100-Person Virtual Studio Discovery Analysis

Prior to building the application, our multidisciplinary systems studio evaluated Jim Martin's RFP across 7 specialist dimensions:

| Specialist Role | Strategic Focus | Architectural Implementation in Live Demo |
| :--- | :--- | :--- |
| **1. Lead Product Designer** | Visual authority & density | Institutional Wealth Management aesthetic (`#0f2942` Navy, Slate, Gold accents); 8.5 × 11-inch portrait layout with strict 12px+ typography scale. |
| **2. Systems Architect** | Decoupling & extensibility | Pure configuration engine in `src/lib/scorecard-config.ts` separating categories, questions, options, point values, and R/Y/G cutoffs from the React UI layer. |
| **3. Full-Stack Engineer** | React 19 / Next.js 15 stability | Single-page application state held in-memory; responsive dual split-pane (form left, live preview right); zero hydration mismatches. |
| **4. AI Research Specialist** | Real LLM executive synthesis | Multi-provider fallback chain (OpenAI `gpt-4o-mini` primary, Google Gemini `gemini-2.0-flash` fallback, deterministic `CFP-RuleEngine-v1` offline lock). |
| **5. Print Systems Engineer** | Windows PC print fidelity | Dual print architecture: CSS `@page { size: letter portrait; margin: 8mm 10mm; }` with element print-hiding, plus standalone 1-click offline HTML export. |
| **6. Compliance & QA Lead** | Zero-PII & FINRA alignment | Pure client-side memory lifecycle; form reset button; SEC/FINRA educational disclosure disclaimers embedded in the scorecard footer. |
| **7. Product Operations** | Time-to-value acceleration | Preloaded sample personas (Robert & Eleanor Vance, Marcus Sterling, Dr. Arthur Chen) allowing 1-click demonstrations in under 5 seconds. |

---

## 3. Detailed Technical Architecture

### 3.1 Stack Selection Rationale
- **Framework:** Next.js 15 App Router (`15.5.25`) with React 19.
- **Language:** TypeScript 5.7 with strict null-safety and Zod validation.
- **Styling:** Tailwind CSS v4 using CSS variable tokens with institutional light/dark mode defaulting to Light on initial load.
- **Iconography:** Lucide-React (`v1.39.0`) for clean vector rendering.
- **Hosting:** Vercel Fluid Compute with global CDN edge routing.

### 3.2 Decoupled Scoring Engine Architecture
The core calculation logic is isolated from the React rendering components:
- `src/lib/scorecard-config.ts`: Contains the configuration schema. Adding a question or changing a scoring threshold requires editing a single JSON object.
- `src/lib/scoring-engine.ts`: Pure functional calculation:
  $$\text{Category Score} = \left(\frac{\sum \text{Earned Points}}{\sum \text{Maximum Points}}\right) \times 100$$
  $$\text{Overall Score} = \frac{\sum \text{Category Percentage Scores}}{5}$$
- **R/Y/G Indicator Cutoffs:**
  - **Green (On Track):** $\ge 75\%$
  - **Yellow (Attention Needed):** $50\% - 74\%$
  - **Red (Critical Vulnerability):** $< 50\%$

### 3.3 5 Comprehensive Planning Pillars
1. **Cash Flow & Guaranteed Income:** Social Security optimization, pension adequacy, debt elimination, fixed cost coverage.
2. **Investments & Asset Allocation:** Sequence-of-returns protection, 2-year liquidity tent, equity-to-fixed-income rebalancing.
3. **Tax Diversification & Roth Optimization:** Pre-tax 401(k) concentration, multi-year Roth conversion runway prior to RMDs.
4. **Healthcare & Long-Term Care:** Medicare Part B/D bridge strategy, hybrid life/LTC asset protection against catastrophic illness.
5. **Estate, Legacy & Longevity Protection:** Living wills, durable financial/healthcare POAs, beneficiary designation audits.

---

## 4. Single-Page 8.5 × 11-inch Letter Print Guarantee

### 4.1 Root Cause of Windows PC Print Overflow
On Windows computers using Chrome, Edge, or Firefox, PDF printing frequently spills onto page 2 due to:
- Dynamic unconstrained flex containers expanding vertically.
- Viewport unit (`vh`) variations across differing DPI scaling settings (125%, 150%).
- Default browser print margins (0.5 to 0.75 inches) colliding with application margins.

### 4.2 The BarakahSoft Vector Solution
We resolve this across three technical vectors:
1. **Explicit `@page` Letter Boundary:**
   ```css
   @media print {
     @page {
       size: letter portrait;
       margin: 8mm 10mm 8mm 10mm;
     }
     *, *:before, *:after {
       -webkit-print-color-adjust: exact !important;
       print-color-adjust: exact !important;
     }
     .no-print, nav, header, footer, .bento-kpi, .form-column {
       display: none !important;
     }
     #scorecard-printable {
       width: 100% !important;
       box-shadow: none !important;
       border: none !important;
       page-break-inside: avoid !important;
       break-inside: avoid !important;
     }
   }
   ```
2. **Constrained Typography & Line Clamping:** Section headers, narrative blocks, and table cells use fixed point sizes (`9pt` to `12pt`) calibrated so the total vertical height never exceeds `248mm` (within the `279.4mm` Letter page boundary).
3. **Standalone Offline HTML Fallback:** For ultra-locked enterprise PCs where browser print dialogs are restricted by IT policy, advisors can click "Download Standalone HTML", which generates an inlined, CSS-bundled file that renders identically in any desktop browser.

---

## 5. RFP Acceptance Criteria Traceability Matrix

Every single requirement from Jim Martin's job posting has been tested and verified:

| RFP Requirement | Implementation in Live Application | Verification Route / Method |
| :--- | :--- | :--- |
| **1. Clean, easy-to-use data-entry form** | `src/components/AdvisorForm.tsx` with 5 category tabs, visual progress badges, and step-by-step navigation. | Live on left pane of split-view workspace. |
| **2. Yes/no, multiple-choice, and text fields** | Yes/No toggle pill groups, multi-choice radio cards with point callouts, and prospect demographic text/number inputs. | Form Category 1–5 in UI. |
| **3. Automatic scoring based on rules** | Pure calculation engine in `src/lib/scoring-engine.ts` recomputing immediately upon any answer selection. | Bento KPI bar & live score gauge. |
| **4. Red, Yellow, Green status indicators** | High-contrast visual pills, badges, and progress bar color fills (Green $\ge 75\%$, Yellow $\ge 50\%$, Red $< 50\%$). | Scorecard preview column & category breakdown. |
| **5. Live preview of completed scorecard** | Split-pane architecture rendering the 8.5 × 11-inch scorecard in real-time as data is entered. | Right pane of split-view workspace. |
| **6. Professional 8.5 × 11-inch portrait layout** | Institutional wealth management format with firm branding, score gauge, actuarial runway, pillar table, and priority actions. | Document container `#scorecard-printable`. |
| **7. One-click PDF generation and download** | Header & scorecard action buttons triggering native browser PDF print dialog with auto-configured Letter dimensions. | `window.print()` handler with `@page` CSS. |
| **8. Reset button for starting a new prospect** | Red reset button in header and form clearing all profile fields and questionnaire selections back to pristine state. | `handleReset()` in `src/app/page.tsx`. |
| **9. Required-field validation** | Inline validation alerts for missing client name, invalid ages, and uncompleted diagnostic questions. | Bento KPI strip validation tracker. |
| **10. Zero permanent prospect storage** | Pure client-side React state. Data exists only in browser RAM during the session; zero database or cookie persistence. | Security architecture audit & `/api/health`. |
| **11. Future developer extensibility** | Decoupled configuration in `src/lib/scorecard-config.ts` plus live interactive Schema Inspector modal. | Click "Rules Schema" in header or `/api/export-schema`. |

---

## 6. Deployment, Health & Extensibility

- **Health Telemetry:** `GET /api/health` returns status of AI providers, Letter portrait layout verification, and privacy confirmation.
- **Rule Export:** `GET /api/export-schema` provides a clean JSON representation of all questions, options, and point weights.
- **Source Code Ownership:** 100% full intellectual property transfer to Jim Martin upon project completion.
