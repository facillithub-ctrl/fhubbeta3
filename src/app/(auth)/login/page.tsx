import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-[420px] flex flex-col items-center animate-in zoom-in-95 duration-500 ease-out">
      
      {/* 1. Logo da Conta (Obrigatório: accont.svg) */}
      <div className="relative w-32 h-32 mb-6 transition-transform hover:scale-105 duration-500">
        <Image 
            src="/assets/images/accont.svg" // O arquivo que você mandou
            alt="Facillit Account" 
            fill 
            className="object-contain"
            priority
        />
      </div>

      {/* 2. Cabeçalho */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
        Facillit ID
      </h1>
      <p className="text-gray-500 text-center mb-8 text-base">
        Use seu ID para acessar o Hub Education, Schools e Enterprise.
      </p>

      {/* 3. Formulário Premium */}
      <form className="w-full space-y-5">
        
        <div className="group">
            <div className="relative">
                <input 
                    type="email" 
                    placeholder=" " // Truque para o label flutuante (opcional) ou placeholder normal
                    className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium placeholder-transparent focus:placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all shadow-sm"
                    id="email"
                />
                <label 
                    htmlFor="email"
                    className="absolute left-5 top-4 text-gray-500 text-base transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-brand-purple peer-focus:font-bold cursor-text pointer-events-none"
                >
                    E-mail ou ID
                </label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-brand-purple transition-colors">
                    <Mail className="w-5 h-5" />
                </div>
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
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-brand-purple transition-colors">
                    <Lock className="w-5 h-5" />
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <Link href="/forgot" className="text-sm font-semibold text-brand-purple hover:text-brand-dark transition-colors">
                    Esqueceu a senha?
                </Link>
            </div>
        </div>

        {/* Botão de Ação Principal */}
        <button className="w-full bg-brand-dark hover:bg-black text-white font-bold text-lg py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(66,4,126,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3">
            Continuar
            <ArrowRight className="w-5 h-5" />
        </button>

      </form>

      {/* 4. Divisor Discreto */}
      <div className="relative w-full my-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-wider">Novo no Hub?</span></div>
      </div>

      {/* 5. Link para Cadastro */}
      <Link 
        href="/register" 
        className="w-full py-3.5 text-center font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
      >
        Criar Facillit ID
      </Link>

    </div>
  );
}