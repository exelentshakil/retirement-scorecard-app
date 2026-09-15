#!/usr/bin/env python3
"""
Single-Page PDF Estimate Generator for Jim Martin (Retirement Scorecard Web App)
Strictly adheres to BarakahSoft 6 Direct Flex Children Mandate (Zero Middle Void)
and accurate Upwork partner credentials.
"""

import os
import re
import base64
import subprocess
import sys

def get_base64_image(file_path):
    if not os.path.exists(file_path):
        print(f"Error: Asset not found: {file_path}", file=sys.stderr)
        return ""
    with open(file_path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(file_path)[1].lower()
    mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png"
    return f"data:{mime};base64,{base64.b64encode(data).decode('utf-8')}"

def build_html():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    docs_dir = os.path.join(base_dir, "docs")
    
    headshot_b64 = get_base64_image(os.path.join(docs_dir, "headshot.jpeg"))
    logo_b64 = get_base64_image(os.path.join(docs_dir, "logo.png"))
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Engineering Scope & Commercial Estimate — Web App for Retirement Scorecard</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
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
      line-height: 1.30;
      font-size: 9.4px;
    }}
    
    /* THE 6 DIRECT FLEX CHILDREN ROOT CONTAINER */
    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}
    
    /* 1. EXECUTIVE HEADER & METADATA */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f2942;
      padding-bottom: 6px;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #1d4ed8;
      margin-bottom: 2px;
      white-space: nowrap;
    }}
    h1 {{
      margin: 0;
      font-size: 15px;
      font-weight: 800;
      color: #0f2942;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }}
    .subtitle {{
      margin: 1px 0 0 0;
      font-size: 9.0px;
      color: #475569;
      font-weight: 500;
      white-space: nowrap;
    }}
    .meta-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 5px 9px;
      text-align: right;
      font-size: 8.4px;
      line-height: 1.35;
      white-space: nowrap;
    }}
    .meta-row {{
      display: flex;
      justify-content: flex-end;
      gap: 6px;
    }}
    .meta-label {{
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 7.5px;
    }}
    .meta-val {{
      color: #0f172a;
      font-weight: 700;
    }}
    
    /* 2. MILESTONE SCOPE TABLE */
    .scope-block {{
      margin-top: 5px;
    }}
    .section-title {{
      font-size: 9.2px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f2942;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }}
    .section-title::before {{
      content: "";
      display: inline-block;
      width: 3px;
      height: 9px;
      background: #2563eb;
      border-radius: 1px;
    }}
    table.scope-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 8.6px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
    }}
    table.scope-table th {{
      background: #0f2942;
      color: #ffffff;
      text-align: left;
      padding: 4px 6px;
      font-size: 8.0px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }}
    table.scope-table td {{
      padding: 4.5px 6px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }}
    table.scope-table tr:nth-child(even) td {{
      background: #f8fafc;
    }}
    table.scope-table tfoot td {{
      background: #0f172a !important;
      color: #ffffff !important;
      font-weight: 800 !important;
      font-size: 9.0px !important;
      border: none;
      padding: 5px 6px;
    }}
    .phase-badge {{
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 700;
      font-size: 7.5px;
      padding: 1px 4px;
      border-radius: 3px;
      text-transform: uppercase;
    }}
    .ready-badge {{
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      font-weight: 700;
      font-size: 7.5px;
      padding: 1px 4px;
      border-radius: 3px;
    }}
    
    /* 3. 2-COLUMN MODULAR SPECIFICATION GRID */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 4px;
    }}
    .card-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 6px 8px;
    }}
    .card-box h3 {{
      margin: 0 0 4px 0;
      font-size: 8.8px;
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .item-list {{
      margin: 0;
      padding-left: 12px;
      font-size: 8.2px;
      color: #334155;
    }}
    .item-list li {{
      margin-bottom: 2.5px;
    }}
    .item-list strong {{
      color: #0f172a;
    }}
    
    /* 4. COMMERCIAL TERMS BOX (4-COLUMN) */
    .terms-box {{
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 6px 8px;
      margin-top: 4px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      font-size: 7.8px;
    }}
    .term-item {{
      border-left: 2px solid #2563eb;
      padding-left: 5px;
    }}
    .term-title {{
      font-weight: 800;
      color: #0f2942;
      text-transform: uppercase;
      font-size: 7.4px;
      margin-bottom: 1px;
    }}
    .term-desc {{
      color: #475569;
      line-height: 1.25;
    }}
    
    /* 5. FORMAL ACCEPTANCE AUTHORIZATION */
    .auth-block {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 6px 10px;
      margin-top: 4px;
    }}
    .sig-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }}
    .sig-col {{
      display: flex;
      flex-direction: column;
    }}
    .sig-line {{
      border-bottom: 1px solid #94a3b8;
      height: 18px;
      display: flex;
      align-items: flex-end;
      padding-bottom: 2px;
    }}
    .sig-cursive {{
      font-family: 'Brush Script MT', 'Apple Chancery', 'Segoe Script', cursive;
      font-size: 15px;
      color: #1e3a8a;
      line-height: 1;
    }}
    .sig-label {{
      font-size: 7.6px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 2px;
    }}
    .sig-client-tag {{
      font-size: 8.0px;
      color: #0f766e;
      font-weight: 700;
    }}
    
    /* 6. EXECUTIVE SIGNATURE FOOTER */
    .footer-container {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1.5px solid #e2e8f0;
      padding-top: 5px;
      margin-top: 4px;
      font-size: 7.8px;
      color: #64748b;
    }}
    .footer-left {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .footer-avatar {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1.5px solid #0f2942;
      object-fit: cover;
    }}
    .footer-logo {{
      height: 15px;
      width: auto;
      object-fit: contain;
    }}
    .footer-meta {{
      line-height: 1.25;
    }}
    .footer-meta strong {{
      color: #0f2942;
      font-size: 8.2px;
    }}
    .footer-right {{
      text-align: right;
      line-height: 1.25;
    }}
    .demo-tag {{
      display: inline-block;
      background: #1e293b;
      color: #38bdf8;
      font-weight: 700;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-size: 7.4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }}
  </style>
</head>
<body>

  <div class="page-container">
    <!-- 1. EXECUTIVE HEADER & METADATA -->
    <div class="header">
      <div>
        <div class="brand-title">BarakahSoft LLC • Systems Engineering • Ref #BS-2026-RET-031</div>
        <h1>Web App for Retirement Scorecard — Advisory Platform</h1>
        <div class="subtitle">Client Discovery &amp; Delivery Scope Prepared for: Jim Martin • Christiansburg, VA, USA</div>
      </div>
      <div class="meta-card">
        <div class="meta-row"><span class="meta-label">Date:</span> <span class="meta-val">September 15, 2026</span></div>
        <div class="meta-row"><span class="meta-label">Target Stack:</span> <span class="meta-val">Next.js 15 • React 19 • Tailwind v4</span></div>
        <div class="meta-row"><span class="meta-label">Contract Type:</span> <span class="meta-val">Fixed-Price Milestone ($300.00)</span></div>
        <div class="meta-row"><span class="meta-label">Live Systems Prototype:</span> <span class="meta-val" style="color: #0284c7;">retirement-scorecard-app.vercel.app</span></div>
      </div>
    </div>

    <!-- 2. MILESTONE SCOPE TABLE -->
    <div class="scope-block">
      <div class="section-title">Execution Milestones &amp; Investment Schedule</div>
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 14%;">Milestone</th>
            <th style="width: 54%;">Technical Scope &amp; Architectural Deliverables</th>
            <th style="width: 10%;">Timeline</th>
            <th style="width: 10%;">Rate</th>
            <th style="width: 12%;">Investment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="ready-badge">Phase 0: Live</span></td>
            <td><strong>Interactive Architecture Prototype &amp; Operational Cockpit:</strong> Deployed live demo with 5-pillar advisory questionnaire, live score computation engine, R/Y/G pills, 8.5x11 live preview, and zero-PII client-side state.</td>
            <td>Completed</td>
            <td>$0.00</td>
            <td><strong>$0.00 (Ready Now)</strong></td>
          </tr>
          <tr>
            <td><span class="phase-badge">Phase 1: Delivery</span></td>
            <td><strong>Core Production Web App, Decoupled Rules &amp; Windows PDF Engine:</strong> Integration of firm branding, logo &amp; color tokens, decoupled JSON scoring schema (`scorecard-config.ts`), vector-accurate CSS `@page` Letter portrait print engine, required-field validation, reset functionality, and complete Git source code ownership transfer.</td>
            <td>3–4 Days</td>
            <td>$30.00/hr</td>
            <td><strong>$300.00</strong></td>
          </tr>
          <tr>
            <td><span class="phase-badge" style="background: #f1f5f9; color: #475569;">Phase 2: Post-Launch</span></td>
            <td><strong>30-Day Hypercare Warranty &amp; Windows PC Print Quality Assurance:</strong> Cross-browser testing on Windows PCs (Edge, Chrome, Firefox), testing across 100%, 125%, 150% display scaling, and minor wording or scoring rule tweaks.</td>
            <td>30 Days</td>
            <td>Included</td>
            <td><strong>$0.00 (Warranty)</strong></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">TOTAL FIXED INVESTMENT (Phase 0 Live + Phase 1 Delivery + 30-Day Hypercare)</td>
            <td>3–4 Days</td>
            <td>Fixed</td>
            <td>$300.00 USD</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- 3. 2-COLUMN MODULAR SPECIFICATION GRID -->
    <div class="grid-2col">
      <div class="card-box">
        <h3>Architecture &amp; Print Consistency Guardrails</h3>
        <ul class="item-list">
          <li><strong>Single-Page 8.5x11 Guarantee:</strong> Pure CSS `@page {{ size: letter portrait; margin: 8mm 10mm; }}` with automatic `@media print` element suppression, eliminating 2-page spillovers on Windows PCs.</li>
          <li><strong>Standalone Offline HTML Export:</strong> 1-click bundled offline export allowing advisors to save and print scorecards on enterprise computers with restricted PDF print drivers.</li>
          <li><strong>Zero-PII Storage Policy:</strong> In-memory React state lifecycle ensures zero prospect financial data is persisted to disks, databases, or cookies during initial discovery.</li>
          <li><strong>Decoupled Scoring Engine:</strong> Category weights, question options, and R/Y/G cutoffs (Green &ge; 75%, Yellow &ge; 50%) isolated in clean JSON configuration files.</li>
        </ul>
      </div>

      <div class="card-box">
        <h3>Future Developer &amp; Operational Extensibility</h3>
        <ul class="item-list">
          <li><strong>Non-Technical Configurator:</strong> Intuitive Schema Inspector modal (`/api/export-schema`) enabling future staff to modify questions and scoring weights without code rewrites.</li>
          <li><strong>Real AI Executive Synthesizer:</strong> Optional dual-provider narrative copilot (OpenAI `gpt-4o-mini` + Gemini `2.0-flash` with deterministic `CFP-RuleEngine-v1` offline lock).</li>
          <li><strong>Turnkey Setup Documentation:</strong> Complete `README.md` with 1-step Vercel deployment button, local setup instructions (`npm run dev`), and Windows print checklist.</li>
          <li><strong>100% Intellectual Property Transfer:</strong> Full source code, Git commit history, and asset ownership transferred with zero vendor lock-in.</li>
        </ul>
      </div>
    </div>

    <!-- 4. COMMERCIAL TERMS BOX (4-COLUMN) -->
    <div class="terms-box">
      <div class="terms-grid">
        <div class="term-item">
          <div class="term-title">Escrow Protection</div>
          <div class="term-desc">100% funded via Upwork Escrow milestone; released solely upon final acceptance and Windows print verification.</div>
        </div>
        <div class="term-item">
          <div class="term-title">Full IP Ownership</div>
          <div class="term-desc">100% copyright, source code, and design assets transferred immediately upon delivery. No licensing or recurring fees.</div>
        </div>
        <div class="term-item">
          <div class="term-title">30-Day Hypercare SLA</div>
          <div class="term-desc">Dedicated bug-fixing warranty covering any edge-case browser or layout adjustments across advisor workstations.</div>
        </div>
        <div class="term-item">
          <div class="term-title">Quote Validity</div>
          <div class="term-desc">Terms and $300 fixed fee guaranteed for 30 days from issuance. Turnaround 3 to 4 business days upon start.</div>
        </div>
      </div>
    </div>

    <!-- 5. FORMAL ACCEPTANCE AUTHORIZATION -->
    <div class="auth-block">
      <div class="sig-grid">
        <div class="sig-col">
          <div class="sig-line">
            <span class="sig-cursive">Shakil Ahmed</span>
          </div>
          <div class="sig-label">Authorized Provider Signature • Shakil Ahmed, Founder &amp; Principal Systems Architect</div>
        </div>
        <div class="sig-col">
          <div class="sig-line">
            <span class="sig-client-tag">[ Accepted via Upwork Contract Offer / Sign-off ]</span>
          </div>
          <div class="sig-label">Authorized Client Signature • Jim Martin (Client)</div>
        </div>
      </div>
    </div>

    <!-- 6. EXECUTIVE SIGNATURE FOOTER -->
    <div class="footer-container">
      <div class="footer-left">
        <img class="footer-avatar" src="{headshot_b64}" alt="Shakil Ahmed" />
        <img class="footer-logo" src="{logo_b64}" alt="BarakahSoft" />
        <div class="footer-meta">
          <strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering<br>
          Shakil Ahmed • Verified Upwork Partner • 12+ Yrs Systems Architecture • Former Lead Engineer at Legiit ($1M ARR)
        </div>
      </div>
      <div class="footer-right">
        <span class="demo-tag">Live System Verified</span><br>
        Demo Cockpit: <strong style="color: #0f2942;">retirement-scorecard-app.vercel.app</strong><br>
        Christiansburg, VA Advisory Engagement • Ref #BS-2026-RET-031
      </div>
    </div>
  </div>

</body>
</html>
"""

    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated HTML estimate at: {html_path}")

    # Compile with Headless Chrome using absolute file URI
    chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if not os.path.exists(chrome_bin):
        print(f"Error: Chrome binary not found at {chrome_bin}", file=sys.stderr)
        sys.exit(1)

    chrome_cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    print("Compiling PDF with Headless Chrome...")
    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Chrome PDF generation error: {res.stderr}", file=sys.stderr)
        sys.exit(1)

    # Audits
    if not os.path.exists(pdf_path):
        print("Error: PDF was not created!", file=sys.stderr)
        sys.exit(1)

    file_size_kb = os.path.getsize(pdf_path) / 1024
    print(f"PDF generated successfully: {pdf_path} ({file_size_kb:.1f} KB)")

    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = len(re.findall(rb"/Type\s*/Page[^s]", pdf_bytes))
    print(f"Page Count Audit: {pages} page(s)")
    if pages != 1:
        print(f"CRITICAL ERROR: PDF has {pages} pages! Expected exactly 1 page.", file=sys.stderr)
        sys.exit(1)

    if file_size_kb < 300:
        print(f"WARNING: PDF size is suspiciously low ({file_size_kb:.1f} KB). Check for missing assets.", file=sys.stderr)

    print("ESTIMATE.pdf generated and audited successfully!")

if __name__ == "__main__":
    build_html()
