import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/utils/cn"; // Precisaremos criar o utils/cn logo abaixo

// Configuração da fonte Inter
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Facillit Hub",
  description: "Ecossistema integrado de gestão e educação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(
        "min-h-screen bg-brand-light font-sans antialiased", 
        inter.variable
      )}>
        {children}
      </body>
    </html>
  );
}