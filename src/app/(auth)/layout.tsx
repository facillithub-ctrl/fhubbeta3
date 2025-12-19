import type { Metadata } from "next";
// Se você quiser manter o footer global, importe-o. 
// Caso contrário, pode removê-lo daqui e colocar manualmente nas páginas onde faz sentido.
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
    // Removemos todas as classes de padding, margin e background específico.
    // Deixamos o 'children' ocupar o espaço que ele precisar (full screen).
    <div className="relative flex min-h-screen flex-col">
      
      {/* O conteúdo da página (Login/Register/Onboarding) é renderizado aqui */}
      <main className="flex-1">
        {children}
      </main>

      {/* O Footer aqui é opcional. 
         Como suas páginas de Login já têm designs complexos, 
         um footer fixo no layout pode ficar sobreposto.
         Sugestão: Use apenas se o AuthFooter for discreto/flutuante.
      */}
      <AuthFooter />
    </div>
  );
}