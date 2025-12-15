import Link from "next/link";
import Image from "next/image";
import { ArrowRight, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[420px] flex flex-col items-center animate-in slide-in-from-right-8 duration-500 ease-out">
      
      {/* Logo Menor no Topo */}
      <div className="relative w-20 h-20 mb-6">
        <Image src="/assets/images/accont.svg" alt="ID" fill className="object-contain" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
        Criar seu Facillit ID
      </h1>
      <p className="text-gray-500 text-center mb-8 text-sm">
        Uma única conta para conectar seus estudos, trabalho e vida pessoal.
      </p>

      <form className="w-full space-y-4">
        
        {/* Nome */}
        <div className="relative">
            <input 
                type="text" 
                placeholder="Nome Completo"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
            />
            <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* E-mail */}
        <div className="relative">
            <input 
                type="email" 
                placeholder="nome@email.com"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
            />
            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Senha */}
        <div className="relative">
            <input 
                type="password" 
                placeholder="Senha (min. 8 caracteres)"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="pt-2">
            <button className="w-full bg-brand-green text-brand-dark font-bold text-lg py-4 rounded-full shadow-lg shadow-brand-green/20 hover:shadow-xl hover:shadow-brand-green/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                Criar Conta
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>

        <p className="text-xs text-center text-gray-400 px-4 pt-2">
            Ao continuar, você concorda com os <Link href="/terms" className="underline hover:text-brand-dark">Termos de Uso</Link> do Facillit Hub.
        </p>

      </form>

      <div className="mt-8 text-sm font-medium text-gray-600">
        Já tem um ID?{' '}
        <Link href="/login" className="text-brand-purple hover:underline">
            Fazer Login
        </Link>
      </div>

    </div>
  );
}