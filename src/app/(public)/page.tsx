import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      
      {/* --- HERO SECTION (Placeholder) --- */}
      <section className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white">
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gradient opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm mb-4">
             <Sparkles className="w-4 h-4 text-brand-purple" />
             <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">O Futuro da Gestão Digital</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Transforme ideias em <br/>
            <span className="text-transparent bg-clip-text ">resultados reais.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Um ecossistema integrado que une educação, produtividade e gestão corporativa em uma única plataforma inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register" className="px-8 py-4 bg-brand-dark text-white rounded-full font-bold text-lg shadow-xl shadow-brand-dark/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/ecossistema" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors">
              Explorar Ecossistema
            </Link>
          </div>
        </div>
      </section>

      {/* --- Espaço para testar o Scroll e ver o Header Glassmorphism --- */}
      <section className="w-full py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue rolando...</h2>
          <p className="text-gray-500">Veja o Header se transformar e o Footer aparecer lá embaixo.</p>
          <div className="h-[400px]"></div>
        </div>
      </section>

    </main>
  );
}