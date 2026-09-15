#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
Web App for Retirement Scorecard — Client: Jim Martin (Christiansburg, VA, USA)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Percentage Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Formal Estimate - Web App for Retirement Scorecard</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.4px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 6px;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #0f2942;
      padding-bottom: 6px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #0284c7;
      margin-bottom: 2px;
      white-space: nowrap;
    }}
    h1 {{
      font-size: 14px;
      font-weight: 800;
      color: #0f2942;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .subtitle {{
      font-size: 8.6px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
      white-space: nowrap;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 8.3px;
      text-align: right;
      line-height: 1.36;
      white-space: nowrap;
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope & Milestones Table */
    .scope-block {{
      margin-top: 0;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }}
    .section-title {{
      font-size: 9.6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f2942;
      border-left: 3px solid #0284c7;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.2px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.2px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.8px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 3.8px 6px;
      font-size: 8.5px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.5px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.8px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.9px;
      margin-top: 1px;
      line-height: 1.22;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.2px 6px;
      font-size: 8.8px;
    }}

    /* 3. 2-Column Technical & Financial Breakdown */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 9px;
    }}
    .card-box-title {{
      font-size: 8.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f2942;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2px 0;
      font-size: 7.8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.8px;
      color: #334155;
      margin-bottom: 2px;
      padding-left: 10px;
      position: relative;
      line-height: 1.22;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 5px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #0284c7;
      text-transform: uppercase;
      font-size: 7.7px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 11px;
    }}
    .auth-title {{
      font-size: 8.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 7.9px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 3px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 14px;
      color: #0f2942;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 90px;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      font-family: ui-monospace, monospace;
      font-size: 8px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
      white-space: nowrap;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #0f2942;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.8px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.5px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2.5px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 17px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.6px;
      color: #0369a1;
      background: #e0f2fe;
      border: 1px solid #bae6fd;
      padding: 1.5px 6px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Systems Architecture • Ref #BS-2026-RET-SCORE</div>
      <h1>Web App for Retirement Scorecard — Advisory Diagnostics Engine</h1>
      <p class="subtitle">Clean Prospect Intake • Decoupled 5-Pillar Scoring • 8.5×11 Letter Print Lock • Zero-PII In-Memory Storage</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Jim Martin (Christiansburg, VA, USA)</div>
      <div><strong>Timeline:</strong> 3–4 Business Days (Turnkey Delivery)</div>
      <div><strong>Turnkey Package:</strong> <strong>$300.00 Fixed USD</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Production Scope &amp; Milestone Delivery Schedule</h2>
      <div class="section-meta">Live Cockpit: https://retirement-scorecard-app.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 12%;">Milestone</th>
          <th style="width: 58%;">Architecture &amp; Production Engineering Deliverables</th>
          <th style="width: 10%; text-align: center;">Timeline</th>
          <th style="width: 8%; text-align: center;">Share</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive Architecture Prototype &amp; Operational Cockpit (Live)</div>
            <div class="phase-desc">Working 5-pillar advisory questionnaire, live mathematical scoring calculation, R/Y/G status indicators, dual-provider OpenAI/Gemini AI narrative engine, and live 8.5x11 portrait preview. Built upfront to de-risk delivery.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">Live Now</td>
          <td style="text-align: center; color: #16a34a; font-weight: 700;">Included</td>
          <td style="text-align: right; font-weight: 800; color: #16a34a;">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Advisor Intake Form, Dynamic Field Types &amp; In-Memory Validation</div>
            <div class="phase-desc">Polished data-entry form with Yes/No toggle pill groups, multi-choice radio cards with point weights, and prospect demographic inputs. Real-time required-field validation and instant one-click prospect reset lifecycle.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">1 Day</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7;">25%</td>
          <td style="text-align: right; font-weight: 700;">$75.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Decoupled Scoring Architecture, 5-Pillar Rules &amp; R/Y/G Indicators</div>
            <div class="phase-desc">Pure calculation engine in <code>src/lib/scoring-engine.ts</code>. Category point aggregation, overall readiness score (0-100), automated Red (&lt;50%), Yellow (50-74%), and Green (&ge;75%) status badges, and dynamic priority actions.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">1 Day</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7;">25%</td>
          <td style="text-align: right; font-weight: 700;">$75.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 3</td>
          <td>
            <div class="phase-name">Vector-Accurate 8.5×11 Portrait PDF Engine &amp; Print Consistency Lock</div>
            <div class="phase-desc">CSS <code>@page {{ size: letter portrait; margin: 8mm 10mm; }}</code> with strict <code>@media print</code> element suppression. Guaranteed single-page print boundary eliminating 2-page spillovers across standard Windows PCs and browsers.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">1 Day</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7;">25%</td>
          <td style="text-align: right; font-weight: 700;">$75.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 4</td>
          <td>
            <div class="phase-name">Standalone Offline HTML Export, Schema Inspector &amp; AI Copilot</div>
            <div class="phase-desc">One-click bundled offline HTML export with inlined styles for locked-down corporate PCs; live Schema Inspector modal (<code>/api/export-schema</code>) for non-technical rule updates; optional dual-provider AI executive commentary.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">0.5 Day</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7;">17%</td>
          <td style="text-align: right; font-weight: 700;">$50.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 5</td>
          <td>
            <div class="phase-name">Windows PC Cross-Browser Staging QA, Reset Lifecycle &amp; 100% Handover</div>
            <div class="phase-desc">Cross-browser print testing on Windows 10/11 (Edge, Chrome, Firefox) across 100%, 125%, 150% display scaling; complete source code ownership transfer, step-by-step setup documentation, and 30-day bug-fix warranty.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">0.5 Day</td>
          <td style="text-align: center; font-weight: 700; color: #0284c7;">8%</td>
          <td style="text-align: right; font-weight: 700;">$25.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Total Turnkey Production Scope (All Requirements Covered)</td>
          <td style="text-align: center; font-weight: 800;">3–4 Days</td>
          <td style="text-align: center; font-weight: 800;">100%</td>
          <td style="text-align: right; font-weight: 800; font-family: ui-monospace, monospace; font-size: 10px;">$300.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Technical & Financial Breakdown -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Milestone Escrow &amp; Release Schedule</div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 0: Interactive Architectural Prototype (Live)</span>
        <span class="milestone-val" style="color: #16a34a;">$0.00 (Delivered)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M1: Advisor Intake Form &amp; Validation Engine</span>
        <span class="milestone-val">$75.00 (Net 1 Day)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M2: Decoupled Scoring Architecture &amp; R/Y/G Rules</span>
        <span class="milestone-val">$75.00 (Net 2 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M3: Vector-Accurate 8.5x11 PDF Print Engine</span>
        <span class="milestone-val">$75.00 (Net 3 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M4: Standalone HTML Export &amp; Schema Inspector</span>
        <span class="milestone-val">$50.00 (Net 3.5 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M5: Windows PC QA &amp; 100% Source Code Transfer</span>
        <span class="milestone-val">$25.00 (Net 4 Days)</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Architecture &amp; Print Consistency Guardrails</div>
      <div class="guardrail-item"><strong>Single-Page 8.5x11 Guarantee:</strong> Vector CSS <code>@page</code> Letter portrait rules lock content to 248mm max height</div>
      <div class="guardrail-item"><strong>Zero-PII Storage Policy:</strong> Pure client-side in-memory state; zero permanent database or cookie storage</div>
      <div class="guardrail-item"><strong>Decoupled JSON Configuration:</strong> All questions, weights, and cutoffs isolated in <code>scorecard-config.ts</code></div>
      <div class="guardrail-item"><strong>Dual Export Options:</strong> Browser vector PDF print (Ctrl+P) + 1-click standalone offline HTML file</div>
      <div class="guardrail-item"><strong>Multi-Provider AI Fallback:</strong> OpenAI gpt-4o-mini + Gemini 2.0 Flash + deterministic CFP rule engine</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Fixed-Price Guarantee</div>
        <div class="term-body">100% milestone-based fixed investment ($300.00). Zero hidden fees, zero vendor markups, zero scope creep.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Bug Warranty</div>
        <div class="term-body">Full post-deployment coverage for browser layout adjustments, scoring tweaks, and print QA at $0 extra.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% Code Ownership</div>
        <div class="term-body">All source code, Git history, and assets transferred directly to your team with no recurring licensing fees.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Handover &amp; Setup Docs</div>
        <div class="term-body">Step-by-step documentation for running locally (<code>npm run dev</code>) or deploying in 1-click to Vercel.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.4px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Provider Signature</span>
          <span class="auth-label" style="width: 90px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Jim Martin (Christiansburg, VA, USA)</div>
        <div>Signatory: <strong>Jim Martin</strong> • Authorized Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 90px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder &amp; Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Wealth &amp; AI Systems Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://retirement-scorecard-app.vercel.app" target="_blank" class="demo-badge">retirement-scorecard-app.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("Saved estimate.html to:", html_path)

    # Compile with Headless Chrome using absolute file URI
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
        print("File size:", os.path.getsize(pdf_path), "bytes")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    # Verify page count
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    print(f"Verified PDF page count: {len(pages)} page(s)")
    if len(pages) != 1:
        print(f"CRITICAL ERROR: Expected exactly 1 page, got {len(pages)}!", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    build_estimate()
