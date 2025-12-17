import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AccessibilityProvider } from "@/shared/providers/accessibility-provider";
import { AccessibilityWidget } from "@/components/accessibility/accessibility-widget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Facillit Hub",
  description: "Seu ecossistema educacional e corporativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AccessibilityProvider>
          {children}
          <AccessibilityWidget />
        </AccessibilityProvider>
        <Toaster />
      </body>
    </html>
  );
}