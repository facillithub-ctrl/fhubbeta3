import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/utils/cn";
import { AccessibilityProvider } from "@/shared/providers/accessibility-provider";
import { AccessibilityWidget } from "@/components/accessibility/accessibility-widget";
import { Toaster } from "@/components/ui/toaster"; // Opcional, mas recomendado para toasts

// Configuração da Fonte
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Facillit Hub",
    default: "Facillit Hub",
  },
  description: "Seu Ecossistema Corporativo & Educacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          inter.variable
        )}
      >
        {/* Provider de Acessibilidade envolvendo toda a app */}
        <AccessibilityProvider>
          
          {/* Widget de Acessibilidade (Botão flutuante visível em todas as páginas) */}
          <AccessibilityWidget />
          
          {children}
          
          {/* Componente para notificações (Toasts) */}
          <Toaster />
          
        </AccessibilityProvider>
      </body>
    </html>
  );
}