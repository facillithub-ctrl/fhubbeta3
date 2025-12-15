import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, ShieldCheck, LayoutGrid, GraduationCap, ArrowLeft, Check } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      
      {/* --- COLUNA 1: LOGIN FORM --- */}
      <div className="w-full max-w-[440px] mx-auto flex flex-col animate-in slide-in-from-left-8 duration-700 order-1 lg:order-1">
        
        {/* Navegação de Voltar */}
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-purple transition-colors font-bold group">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-purple/10 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                Voltar para o Início
            </Link>
        </div>

        {/* Header Mobile (Logo) */}
        <div className="lg:hidden flex justify-center mb-6">
            <div className="relative w-16 h-16">
                <Image src="/assets/images/accont.svg" alt="ID" fill className="object-contain" />
            </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-3 text-center lg:text-left">
          Acessar o Hub
        </h1>
        <p className="text-gray-500 text-base mb-8 text-center lg:text-left leading-relaxed">
          Entre com seu Facillit ID para gerenciar sua vida acadêmica, profissional e empresarial.
        </p>

        <form className="w-full space-y-5">
            <div className="group">
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder=" " 
                        className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium placeholder-transparent focus:placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all shadow-sm"
                        id="email"
                    />
                    <label 
                        htmlFor="email"
                        className="absolute left-5 top-4 text-gray-500 text-base transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-brand-purple peer-focus:font-bold cursor-text pointer-events-none"
                    >
                        E-mail ou ID
                    </label>
                    <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-brand-purple transition-colors" />
                </div>
            </div>

            <div className="group">
                <div className="relative">
                    <input 
                        type="password" 
                        placeholder=" "
                        className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium placeholder-transparent focus:placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all shadow-sm"
                        id="password"
                    />
                    <label 
                        htmlFor="password"
                        className="absolute left-5 top-4 text-gray-500 text-base transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-brand-purple peer-focus:font-bold cursor-text pointer-events-none"
                    >
                        Senha
                    </label>
                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-brand-purple transition-colors" />
                </div>
            </div>

            {/* Opções Auxiliares (Manter Sessão & Esqueci Senha) */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-brand-purple peer-checked:border-brand-purple transition-all bg-white"></div>
                        <Check className="w-3.5 h-3.5 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">Manter sessão</span>
                </label>

                <Link href="/forgot" className="text-sm font-bold text-brand-purple hover:text-brand-dark hover:underline transition-colors">
                    Recuperar senha
                </Link>
            </div>

            <button className="w-full bg-brand-dark hover:bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-brand-dark/10 hover:shadow-brand-dark/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3">
                Entrar no Hub
                <ArrowRight className="w-5 h-5" />
            </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-gray-600 mb-4">Ainda não tem identidade digital?</p>
            <Link 
                href="/register" 
                className="inline-flex w-full py-3.5 items-center justify-center font-bold text-brand-purple bg-purple-50 border border-purple-100 rounded-2xl hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-sm"
            >
                Criar Facillit ID
            </Link>
        </div>
      </div>

      {/* --- COLUNA 2: CARD EXPLICATIVO (Agora visível no Mobile também) --- */}
      <div className="w-full order-2 lg:order-2 mt-8 lg:mt-0 relative h-auto lg:h-full lg:min-h-[640px] bg-gray-50 rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 overflow-hidden border border-gray-100 shadow-inner flex flex-col justify-between">
         
         {/* Background Decorativo */}
         <div className="absolute top-[-20%] right-[-20%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gradient opacity-10 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none"></div>
         
         <div className="relative z-10">
            {/* Logo Account em Destaque (Aumentado) */}
            <div className="mb-8 lg:mb-12">
                <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white rounded-3xl shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 lg:mb-8 transition-transform hover:scale-105 duration-500">
                    <Image 
                        src="/assets/images/accont.svg" 
                        alt="ID" 
                        width={64} 
                        height={64} 
                        className="object-contain w-10 h-10 lg:w-16 lg:h-16"
                    />
                </div>
                <h2 className="text-2xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Um único ID.<br/>
                    <span className="text-transparent bg-clip-text bg-brand-gradient">Infinitas possibilidades.</span>
                </h2>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-md">
                    O Facillit Account centraliza sua jornada. Conecte seus estudos, gerencie sua produtividade e acesse recursos corporativos com segurança máxima.
                </p>
            </div>

            {/* Features (Cards Informativos) */}
            <div className="space-y-3 lg:space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0"><GraduationCap className="w-6 h-6"/></div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm lg:text-base">Perfil Acadêmico Unificado</h4>
                        <p className="text-xs text-gray-500">Histórico escolar, notas e certificações em um só lugar.</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0"><LayoutGrid className="w-6 h-6"/></div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm lg:text-base">Hub de Produtividade</h4>
                        <p className="text-xs text-gray-500">Integração nativa com Facillit Day, Finances e Projetos.</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0"><ShieldCheck className="w-6 h-6"/></div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm lg:text-base">Segurança Enterprise</h4>
                        <p className="text-xs text-gray-500">Proteção de dados avançada, 2FA e gestão de dispositivos.</p>
                    </div>
                </div>
            </div>
         </div>
         
         {/* Footer do Card */}
         <div className="relative z-10 mt-8 pt-6 border-t border-gray-200/50 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sistema Operacional • v3.0
         </div>
      </div>

    </div>
  );
}