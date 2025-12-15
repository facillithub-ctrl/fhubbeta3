import { Header } from "@/shared/ui/header";
import { Footer } from "@/shared/ui/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header Flutuante */}
      <Header />
      
      {/* Conteúdo com espaçamento para o header fixo */}
      <div className="flex-grow min-h-screen pt-24">
          {children}
      </div>

      {/* Footer Completo */}
      <Footer />
    </>
  );
}