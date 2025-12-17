"use client";

import Link from 'next/link';
import { 
  Instagram, Linkedin, Youtube, Twitter, 
  ArrowRight, Mail, MapPin, Phone, Heart, Globe, 
  LayoutDashboard
} from 'lucide-react';

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

export function Footer() {
  return (
    <footer className="bg-card text-foreground pt-24 pb-12 relative overflow-hidden font-sans border-t border-border transition-colors duration-300">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px] pointer-events-none opacity-30 mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none opacity-20 mix-blend-multiply dark:mix-blend-screen" />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-b border-border/50 pb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                  <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
               </div>
               <span className="text-xl font-bold tracking-tight text-foreground">Facillit Hub</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm text-sm">
              Simplificando a jornada digital através de um ecossistema integrado de educação, gestão e tecnologia.
            </p>
            <div className="flex gap-3 pt-2">
               {footerData.social.map((social) => (
                 <a 
                   key={social.label} 
                   href={social.href} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                   aria-label={social.label}
                 >
                   <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 </a>
               ))}
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-12">
             <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                   <div className="max-w-md">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Fique à frente do futuro</h3>
                      <p className="text-muted-foreground text-sm">Receba atualizações exclusivas do ecossistema e insights de mercado.</p>
                   </div>
                   
                   <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="email" 
                          placeholder="Seu e-mail corporativo" 
                          className="w-full sm:w-72 bg-background border border-input rounded-xl py-3.5 pl-11 pr-4 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                      <button className="bg-primary text-primary-foreground font-bold py-3.5 px-6 rounded-xl transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 active:scale-95">
                        Inscrever
                        <ArrowRight className="w-4 h-4" />
                      </button>
                   </form>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-20">
           <div className="space-y-6">
              <h4 className="font-bold text-base text-foreground">Ecossistema</h4>
              <ul className="space-y-3">
                {footerData.solutions.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block w-fit">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-bold text-base text-foreground">Empresa</h4>
              <ul className="space-y-3">
                {footerData.company.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2 w-fit group">
                      {item.title}
                      {item.badge && <span className="text-[9px] font-bold bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded uppercase tracking-wider">{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-bold text-base text-foreground">Recursos</h4>
              <ul className="space-y-3">
                {footerData.resources.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium block w-fit">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>
           
           <div className="col-span-2 lg:col-span-2 space-y-6 pl-0 lg:pl-8 border-l border-border/0 lg:border-border/50">
              <h4 className="font-bold text-base text-foreground">Fale Conosco</h4>
              <ul className="space-y-5">
                 <li className="flex items-start gap-4 text-muted-foreground text-sm group cursor-default">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <span className="mt-1.5">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP - Brasil</span>
                 </li>
                 <li className="flex items-center gap-4 text-muted-foreground text-sm group">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <a href="mailto:contato@facillithub.com" className="hover:text-foreground transition-colors">contato@facillithub.com</a>
                 </li>
                 <li className="flex items-center gap-4 text-muted-foreground text-sm group">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+5511999999999" className="hover:text-foreground transition-colors">+55 (11) 99999-9999</a>
                 </li>
              </ul>
           </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-muted-foreground text-xs flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Facillit Hub Inc.</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-border"></span>
              <span className="flex items-center gap-1">Feito com <Heart className="w-3 h-3 text-red-500 fill-red-500" /> no Brasil.</span>
           </div>

           <div className="flex flex-wrap justify-center gap-6">
              {footerData.legal.map(item => (
                 <Link key={item.title} href={item.href} className="text-muted-foreground hover:text-foreground text-xs transition-colors font-medium">
                    {item.title}
                 </Link>
              ))}
              <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-muted border border-border text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                All Systems Operational
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterSimple() {
  return (
    <footer className="bg-background border-t border-border py-10 font-sans">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
         <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Facillit Hub</span>
         </Link>
         <div className="text-muted-foreground text-xs text-center font-medium">
            &copy; {new Date().getFullYear()} Facillit Hub Inc. Todos os direitos reservados.
         </div>
         <div className="flex items-center gap-6">
            <Link href="/help" className="text-muted-foreground hover:text-primary text-xs font-bold transition-colors flex items-center gap-1.5">Ajuda</Link>
            <Link href="/legal/privacidade" className="text-muted-foreground hover:text-primary text-xs font-bold transition-colors">Privacidade</Link>
            <Link href="/legal/termos" className="text-muted-foreground hover:text-primary text-xs font-bold transition-colors">Termos</Link>
            <div className="w-px h-4 bg-border hidden md:block"></div>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors"><Globe className="w-4 h-4" /></Link>
         </div>
      </div>
    </footer>
  );
}