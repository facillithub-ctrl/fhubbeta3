import type { Metadata } from "next";
import { AuthFooter } from "@/shared/ui/auth-footer";

export const metadata: Metadata = {
  title: "Facillit ID",
  description: "Acesse sua conta Facillit Hub.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-gray-900 font-sans selection:bg-brand-purple/20 selection:text-brand-purple">
      
      {/* Área Principal (Centralizada Verticalmente e Horizontalmente) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-[1400px] mx-auto">
        {children}
      </main>

      {/* Footer Adaptativo (Fixo no fluxo, fundo transparente) */}
      <AuthFooter />
    </div>
  );
}