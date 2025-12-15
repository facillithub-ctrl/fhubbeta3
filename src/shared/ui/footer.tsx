"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, Linkedin, Youtube, Twitter, 
  ArrowRight, Mail, MapPin, Phone, Heart, Globe, 
  ShieldCheck, ArrowUpRight
} from 'lucide-react';

// --- Dados do Footer ---
const footerData = {
  solutions: [
    { title: "Education", href: "/education" },
    { title: "Schools", href: "/schools" },
    { title: "Startups", href: "/startups" },
    { title: "Enterprise", href: "/enterprise" },
    { title: "Individuals", href: "/individuals" },
  ],
  company: [
    { title: "Sobre Nós", href: "/sobre" },
    { title: "Carreiras", href: "/recursos/carreiras", badge: "Vagas" },
    { title: "Blog", href: "/recursos/blog" },
    { title: "Imprensa", href: "/imprensa" },
    { title: "Contato", href: "/contato" },
  ],
  resources: [
    { title: "Central de Ajuda", href: "/help" },
    { title: "Comunidade", href: "/comunidade" },
    { title: "Status do Sistema", href: "/status" },
    { title: "Desenvolvedores (API)", href: "/api" },
  ],
  legal: [
    { title: "Privacidade", href: "/legal/privacidade" },
    { title: "Termos de Uso", href: "/legal/termos" },
    { title: "Cookies", href: "/legal/cookies" },
    { title: "Compliance", href: "/legal/compliance" },
  ],
  social: [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]
};

// ============================================================================
// 1. FOOTER COMPLETO (Enterprise / Marketing)
// Ideal para: Home, Landing Pages, Institucional
// ============================================================================
export function Footer() {
  return (
    <footer className="bg-[#0f0f11] text-white pt-24 pb-12 relative overflow-hidden font-sans border-t border-white/5">
      
      {/* Elementos de Fundo (Glows Premium) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[128px] pointer-events-none opacity-30 mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[128px] pointer-events-none opacity-20 mix-blend-screen" />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* --- Top Section: Newsletter & Branding --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-b border-white/5 pb-16">
          
          {/* Coluna da Marca */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="block relative w-44 h-12 opacity-90 hover:opacity-100 transition-opacity">
              <Image 
                src="/assets/images/LOGO/logotipo/branco.png" 
                alt="Facillit Hub" 
                fill 
                className="object-contain object-left"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm text-sm">
              Simplificando a jornada digital através de um ecossistema integrado de educação, gestão e tecnologia.
            </p>
            <div className="flex gap-3 pt-2">
               {footerData.social.map((social) => (
                 <a 
                   key={social.label} 
                   href={social.href} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 group"
                   aria-label={social.label}
                 >
                   <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 </a>
               ))}
            </div>
          </div>

          {/* Coluna Newsletter (Call to Action) */}
          <div className="lg:col-span-8 lg:pl-12">
             <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gradient opacity-10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                   <div className="max-w-md">
                      <h3 className="text-2xl font-bold mb-2 text-white">Fique à frente do futuro</h3>
                      <p className="text-gray-400 text-sm">Receba atualizações exclusivas do ecossistema e insights de mercado.</p>
                   </div>
                   
                   <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="email" 
                          placeholder="Seu e-mail corporativo" 
                          className="w-full sm:w-72 bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all"
                        />
                      </div>
                      <button className="bg-white text-brand-dark font-bold py-3.5 px-6 rounded-xl transition-all hover:bg-brand-purple hover:text-white hover:shadow-lg hover:shadow-brand-purple/20 flex items-center justify-center gap-2 active:scale-95">
                        Inscrever
                        <ArrowRight className="w-4 h-4" />
                      </button>
                   </form>
                </div>
             </div>
          </div>
        </div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-20">
           <div className="space-y-6">
              <h4 className="font-bold text-base text-white">Ecossistema</h4>
              <ul className="space-y-3">
                {footerData.solutions.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-gray-400 hover:text-brand-green transition-colors text-sm font-medium block w-fit">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-bold text-base text-white">Empresa</h4>
              <ul className="space-y-3">
                {footerData.company.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 w-fit group">
                      {item.title}
                      {item.badge && <span className="text-[9px] font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/20 px-1.5 py-0.5 rounded uppercase tracking-wider">{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-bold text-base text-white">Recursos</h4>
              <ul className="space-y-3">
                {footerData.resources.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium block w-fit">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>
           
           {/* Contato Rico */}
           <div className="col-span-2 lg:col-span-2 space-y-6 pl-0 lg:pl-8 border-l border-white/0 lg:border-white/5">
              <h4 className="font-bold text-base text-white">Fale Conosco</h4>
              <ul className="space-y-5">
                 <li className="flex items-start gap-4 text-gray-400 text-sm group cursor-default">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-colors">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <span className="mt-1.5">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP - Brasil</span>
                 </li>
                 <li className="flex items-center gap-4 text-gray-400 text-sm group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <a href="mailto:contato@facillithub.com" className="hover:text-white transition-colors">contato@facillithub.com</a>
                 </li>
                 <li className="flex items-center gap-4 text-gray-400 text-sm group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-colors">
                        <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+5511999999999" className="hover:text-white transition-colors">+55 (11) 99999-9999</a>
                 </li>
              </ul>
           </div>
        </div>

        {/* --- Bottom Section: Copyright & Legal --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-gray-500 text-xs flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Facillit Hub Inc.</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-700"></span>
              <span className="flex items-center gap-1">Feito com <Heart className="w-3 h-3 text-brand-purple fill-brand-purple" /> no Brasil.</span>
           </div>

           <div className="flex flex-wrap justify-center gap-6">
              {footerData.legal.map(item => (
                 <Link key={item.title} href={item.href} className="text-gray-500 hover:text-white text-xs transition-colors font-medium">
                    {item.title}
                 </Link>
              ))}
              <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                All Systems Operational
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
}

// ============================================================================
// 2. FOOTER SIMPLES (Login / Register / Checkout)
// Ideal para: Telas onde o foco deve estar na ação principal
// ============================================================================
export function FooterSimple() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 font-sans">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
         
         {/* Logo Escura */}
         <Link href="/" className="relative w-32 h-8 opacity-80 hover:opacity-100 transition-opacity">
            <Image 
              src="/assets/images/LOGO/logotipo/logo preta (1).png" 
              alt="Facillit Hub" 
              fill 
              className="object-contain object-left"
            />
         </Link>

         {/* Copyright Minimalista */}
         <div className="text-gray-400 text-xs text-center font-medium">
            &copy; {new Date().getFullYear()} Facillit Hub Inc. Todos os direitos reservados.
         </div>

         {/* Links Essenciais com Ícones Sutis */}
         <div className="flex items-center gap-6">
            <Link href="/help" className="text-gray-500 hover:text-brand-purple text-xs font-bold transition-colors flex items-center gap-1.5">
                Ajuda
            </Link>
            <Link href="/legal/privacidade" className="text-gray-500 hover:text-brand-purple text-xs font-bold transition-colors">
                Privacidade
            </Link>
            <Link href="/legal/termos" className="text-gray-500 hover:text-brand-purple text-xs font-bold transition-colors">
                Termos
            </Link>
            <div className="w-px h-4 bg-gray-200 hidden md:block"></div>
            <Link href="/" className="text-gray-400 hover:text-gray-800 transition-colors">
                <Globe className="w-4 h-4" />
            </Link>
         </div>
      </div>
    </footer>
  );
}