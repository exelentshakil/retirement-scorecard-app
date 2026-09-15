import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Retirement Scorecard Pro | Wealth Advisory Internal Planning System",
  description: "Internal financial advisory web application for rapid prospect retirement readiness intake, automated R/Y/G scoring rules, live letter-sized preview, and one-click PDF generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] antialiased selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-950 dark:selection:text-blue-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central Demo Traffic Hub Analytics */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=retirement-scorecard-app"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
      </body>
    </html>
  );
}
