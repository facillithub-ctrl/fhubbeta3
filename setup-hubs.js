const fs = require('fs');
const path = require('path');

// Configuração dos Hubs
const hubs = [
  { id: 'education', title: 'Education Hub' },
  { id: 'schools', title: 'Schools Management' },
  { id: 'startups', title: 'Startups Ecosystem' },
  { id: 'enterprise', title: 'Enterprise Solutions' },
  { id: 'individuals', title: 'Personal Space' }
];

// Caminho base onde as pastas serão criadas
const basePath = path.join(__dirname, 'src', 'app', '(protected)', 'dashboard');

// Conteúdo padrão para page.tsx
const getPageContent = (title) => `import { Construction } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function ${title.replace(/\s/g, '')}Page() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-6 rounded-full bg-primary/10 p-6">
        <Construction className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        ${title}
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
`;

// Conteúdo padrão para layout.tsx
const getLayoutContent = (title) => `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${title}",
  description: "Gerenciamento do módulo ${title}",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
`;

// Conteúdo padrão para actions.ts
const getActionsContent = () => `'use server'

// Placeholder para Server Actions deste módulo
export async function exampleAction() {
  return { success: true };
}
`;

// Função Principal
async function createHubs() {
  console.log("🚀 Iniciando criação dos Hubs...");

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  hubs.forEach((hub) => {
    const hubPath = path.join(basePath, hub.id);

    // Criar pasta do hub
    if (!fs.existsSync(hubPath)) {
      fs.mkdirSync(hubPath, { recursive: true });
      console.log(`✅ Pasta criada: /dashboard/${hub.id}`);
    }

    // Criar page.tsx
    fs.writeFileSync(path.join(hubPath, 'page.tsx'), getPageContent(hub.title));
    
    // Criar layout.tsx
    fs.writeFileSync(path.join(hubPath, 'layout.tsx'), getLayoutContent(hub.title));

    // Criar actions.ts
    fs.writeFileSync(path.join(hubPath, 'actions.ts'), getActionsContent());
  });

  console.log("\n✨ Todos os hubs foram criados com sucesso!");
  console.log("👉 Rotas disponíveis:");
  hubs.forEach(h => console.log(`   - /dashboard/${h.id}`));
}

createHubs();