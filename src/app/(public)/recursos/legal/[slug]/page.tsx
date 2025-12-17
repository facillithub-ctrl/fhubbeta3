import { sanitClient } from "@/infrastructure/sanit/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, Globe, History, Printer } from "lucide-react";
import { Button } from "@/shared/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanitClient.getBySlug(slug);
  if (!doc) return { title: "Documento não encontrado" };
  return {
    title: `${doc.title} | Jurídico Facillit Hub`,
    description: doc.description,
  };
}

export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await sanitClient.getBySlug(slug);

  if (!doc || doc.type !== 'LEGAL_TERM') {
    notFound();
  }

  const effectiveDate = doc.effectiveDate 
    ? new Date(doc.effectiveDate).toLocaleDateString('pt-BR') 
    : new Date(doc.updatedAt).toLocaleDateString('pt-BR');

  return (
    <article className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Header do Documento */}
      <header className="border-b border-slate-100 pb-8 mb-10">
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge icon={Globe} text={doc.region || "BR-BRASIL"} />
          <Badge icon={Calendar} text={`Vigor: ${effectiveDate}`} />
          <Badge icon={History} text={`Versão ${doc.version || '1.0'}`} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          {doc.title}
        </h1>
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
              FH
            </div>
            <span className="text-sm font-medium text-slate-700">
              {doc.author || "Facillit Hub - Jurídico"}
            </span>
          </div>
          <button 
            onClick={() => window.print()}
            className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Imprimir
          </button>
        </div>
      </header>

      {/* Conteúdo Renderizado (Tailwind Typography) */}
      <div 
        className="
          prose prose-slate max-w-none 
          prose-headings:text-slate-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-4
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-strong:text-slate-900
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        "
        dangerouslySetInnerHTML={{ __html: doc.body || "" }}
      />

      <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 font-mono">
          ID: {doc.id} • ÚLTIMA ATUALIZAÇÃO: {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
        </p>
      </footer>
    </article>
  );
}

function Badge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
}