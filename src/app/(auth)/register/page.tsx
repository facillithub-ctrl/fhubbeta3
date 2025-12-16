"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// CORREÇÃO: Importar da nova estrutura
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // CORREÇÃO: Instanciar o cliente
  const supabase = createClient();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (data.user) router.push("/onboarding");
      
    } catch (err: unknown) {
      console.error("Erro no registro:", err);
      let message = "Erro ao criar conta. Tente novamente.";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* --- COLUNA ESQUERDA: FORMULÁRIO (50%) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-[440px] animate-in slide-in-from-left-6 duration-700 py-10">
          
          <div className="mb-10">
             <div className="inline-flex items-center gap-3 mb-6 group cursor-default">
                <div className="w-10 h-10 bg-brand-purple text-white rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
                    F
                </div>
                <div>
                    <h2 className="text-sm font-bold text-gray-900 leading-none tracking-tight">Facillit ID</h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Criar Conta</p>
                </div>
             </div>

             <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                Comece sua jornada.
             </h1>
             <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Crie um único acesso para conectar estudos, trabalho e produtividade.
             </p>
          </div>

          {error && (
              <div className="mb-6 p-4 bg-white border border-red-100 text-red-600 rounded-xl text-xs font-bold flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> 
                  <span className="leading-relaxed">{error}</span>
              </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome</label>
                      <input 
                          type="text" required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300"
                          placeholder="Seu nome"
                      />
                  </div>
                  <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sobrenome</label>
                      <input 
                          type="text" required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                          placeholder="Sobrenome"
                      />
                  </div>
              </div>

              <div className="space-y-1.5 group">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">E-mail Principal</label>
                  <div className="relative">
                    <input 
                        type="email" required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                        placeholder="nome@exemplo.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                  </div>
              </div>

              <div className="space-y-1.5 group">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">Criar Senha</label>
                  <div className="relative">
                    <input 
                        type="password" required minLength={6}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                        placeholder="Mínimo 6 caracteres"
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                  </div>
              </div>

              <button 
                  type="submit" disabled={loading}
                  className="w-full mt-6 bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Criar ID Gratuito"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
          </form>

           <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500 mb-8">
                Já possui identidade? <Link href="/login" className="font-bold text-brand-purple hover:text-brand-dark hover:underline transition-colors">Fazer Login</Link>
              </p>
              
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <SecureEnvironmentCard />
              </div>
          </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA: VISUAL (Pure White) --- */}
      <div className="hidden lg:flex flex-col relative bg-white items-center justify-start pt-20 px-12 order-2 border-l border-gray-100 overflow-hidden min-h-screen">
         
         {/* TEXTO NO TOPO */}
         <div className="relative z-10 w-full max-w-lg mb-12 animate-in slide-in-from-top-8 duration-1000">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-snug mb-4">
                &ldquo;A simplicidade é o grau máximo de sofisticação. O Facillit unifica tudo o que você precisa em um só lugar.&rdquo;
            </h2>
            <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-brand-purple"></div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Manifesto 2025</p>
            </div>
         </div>

         {/* ELEMENTOS GRÁFICOS (Clean Border Cards) */}
         <div className="w-full max-w-lg grid grid-cols-2 gap-4 relative z-10">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col gap-3 group">
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-brand-purple group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Hub Central</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Todos os seus apps em um dashboard unificado.</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col gap-3 group translate-y-8">
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Colaboração</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Conecte-se com times, escolas e mentores.</p>
                </div>
            </div>

             {/* Card 3 */}
             <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col gap-3 group">
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Performance</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Ferramentas otimizadas para alta produtividade.</p>
                </div>
            </div>

            {/* Card 4 - Status */}
             <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col justify-center items-start gap-2 group translate-y-8">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">System Online</span>
                </div>
                <div className="flex -space-x-3 mt-2">
                     {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-[9px] font-bold text-gray-400 ring-1 ring-gray-100">
                            U{i}
                         </div>
                     ))}
                     <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-[9px] font-bold">
                        +1M
                     </div>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
}