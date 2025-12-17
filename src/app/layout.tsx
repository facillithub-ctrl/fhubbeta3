import type { Metadata } from "next";
import { Inter } from "next/font/google"; //
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // ou seu caminho de toast

// Configuração da Fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define a variável CSS
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}