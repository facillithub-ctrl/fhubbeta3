import { Construction } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function StartupsEcosystemPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-6 rounded-full bg-primary/10 p-6">
        <Construction className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        Startups Ecosystem
      </h1>
      <p className="text-muted-foreground max-w-[500px] mb-8 text-lg">
        Estamos preparando um ambiente incrível para este módulo. 
        Em breve você terá acesso a todas as funcionalidades.
      </p>
      <Link href="/select-hub">
        <Button variant="outline">Voltar para Seleção</Button>
      </Link>
    </div>
  );
}
