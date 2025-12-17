import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Layout, 
  ShieldCheck, 
  Users 
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background blur-3xl opacity-40" />
        
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Novidade: Módulo de Acessibilidade 2.0
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Seu Ecossistema <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Corporativo & Educacional
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Gerencie identidades, acesse múltiplos módulos e escale sua operação com segurança e acessibilidade nativa.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="h-12 w-full sm:w-auto px-8 text-base shadow-lg shadow-primary/25">
                Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-12 w-full sm:w-auto px-8 text-base bg-background/50 backdrop-blur-sm">
                Conheça a Plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
            title="Segurança Unificada"
            description="Autenticação robusta, logs de auditoria e controle de acesso granular para todas as suas aplicações."
          />
          <FeatureCard 
            icon={<Layout className="h-10 w-10 text-secondary" />}
            title="Módulos Integrados"
            description="Navegue entre o LMS, ERP e CRM sem múltiplos logins. Uma conta, infinitas possibilidades."
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Acessibilidade Nativa"
            description="Interface adaptável para todos. Alto contraste, leitura facilitada e suporte a tecnologias assistivas."
          />
        </div>
      </section>

      {/* Social Proof / Footer simplificado */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 Facillit Hub. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}