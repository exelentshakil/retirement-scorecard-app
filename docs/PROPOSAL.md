Retirement Scorecard

hi jim,

built a working prototype for your retirement scorecard before submitting this proposal so you don't have to guess how it looks or functions:

live demo: https://retirement-scorecard-app.vercel.app
source code: https://github.com/exelentshakil/retirement-scorecard-app

you can open it right now, test the 5-pillar questionnaire, watch the red/yellow/green indicators compute in real time, and click print pdf or download the standalone html report to test it on your windows machine.

answering your questions directly:

1. similar forms, report generators, and pdf applications built
i have 12+ years building enterprise full-stack web apps and led engineering at legiit where we scaled an internal command center to $1m arr. over the past 4 years i've built dozens of dynamic report generators and intake systems, including:
- an institutional wealth & portfolio diagnostic tool with live risk-tolerance scoring and single-page client summary export
- a multi-step commercial roof & property estimator generating instant 1-page pdf proposals directly from inspection data
- a healthcare compliance intake portal converting complex questionnaire responses into clean audit reports with zero server-side pii storage

2. recommended technology stack
next.js 15 (app router), react 19, and typescript with tailwind css.
why this stack:
- it runs as a fast, responsive single-page app with zero database dependencies for phase 1.
- prospect data stays 100% in browser memory and resets cleanly when you click reset or close the tab, keeping prospect privacy intact.
- all questions, point weights, categories, and r/y/g cutoffs live in a single decoupled configuration file (src/lib/scorecard-config.ts). a future developer or non-technical employee can add questions or tweak scoring in 2 minutes without touching the UI code. you can even click "rules schema" in the top header of the demo to see how clean the json schema is.

3. how i ensure the pdf prints consistently on one page on windows pcs
windows pdf print spillovers happen because default browser margins, unconstrained flex containers, and windows display scaling (125% or 150% dpi) push content past the 11-inch boundary.
i eliminate this using three specific guardrails:
- explicit css page rules: @page { size: letter portrait; margin: 8mm 10mm; } paired with -webkit-print-color-adjust: exact so background colors and badges print crisply.
- print container isolation: in print mode, the header, advisor form, kpi bars, and navigation auto-hide (@media print), leaving only the calibrated #scorecard-printable container locked to a fixed 248mm vertical height (well inside letter portrait's 279.4mm height).
- dual export option: in addition to native browser print (ctrl+p / window.print), i included a 1-click "download standalone html" button in the demo. this exports a self-contained single-page file with inlined styles that prints cleanly on any locked-down corporate windows workstation.

4. timeline and fixed-price quote
- timeline: 3 to 4 business days for complete delivery.
- fixed-price quote: $300.00 total (matches your posted budget exactly).
- milestone structure: phase 0 (the working prototype) is already built and live right now ($0.00). phase 1 covers your exact branding, logo, colors, final question rules, and testing on your team's windows computers for $300.00. 30 days of free bug-fix support is included after delivery.

5. source code and full ownership rights
yes, 100% confirmed. you will receive full, unencumbered ownership of all source code, git repository history, documentation, and assets. no recurring platform fees, no third-party dependencies, no vendor lock-in.

brief video intro on my background:
https://youtube.com/shorts/kK3XZd5PNOk

take a look at the live demo and let me know what questions or branding adjustments you'd like to see. ready to start immediately.

shakil
