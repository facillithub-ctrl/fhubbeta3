import { sanitClient } from "@/infrastructure/sanit/client";
import Link from "next/link";
import { Scale, FileText, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  // Busca menu dinamicamente do SANIT
  const menuData = await sanitClient.getLegalMenu();
  const docs = menuData?.data || [];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header Institucional */}
      <header className="bg-white border-b py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-600 mb-4 font-semibold text-sm tracking-widest uppercase">
            <Scale className="h-4 w-4" />
            <span>Central de Governança</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Transparência e Termos
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl text-lg">
            Acesse todos os documentos legais, políticas e termos que regem nossa relação com você.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar de Navegação */}
          <aside className="lg:col-span-3">
            <nav className="sticky top-24 flex flex-col gap-1">
              <span className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Documentos Disponíveis
              </span>
              
              {docs.length > 0 ? docs.map((doc) => (
                <Link key={doc.slug} href={`/recursos/legal/${doc.slug}`}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-slate-600 font-normal hover:text-blue-600 hover:bg-blue-50/50"
                  >
                    <FileText className="mr-2 h-4 w-4 text-slate-400" />
                    {doc.title}
                  </Button>
                </Link>
              )) : (
                <p className="px-3 text-sm text-slate-400 italic">Nenhum documento publicado.</p>
              )}

              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link href="/ajuda">
                  <Button variant="outline" className="w-full justify-between group">
                    Central de Ajuda
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900" />
                  </Button>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Área de Conteúdo */}
          <main className="lg:col-span-9">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[500px] p-8 md:p-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}