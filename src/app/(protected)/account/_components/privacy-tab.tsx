"use client";

import { useState } from "react";
import { ProfilePrivacySettings } from "@/types/account";
import { updatePrivacySettings } from "../actions";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { Eye, UserCheck, Globe, Save } from "lucide-react";
// CORREÇÃO 1: Importar o Hook useToast em vez da função toast direta
import { useToast } from "@/shared/hooks/use-toast";
import { cn } from "@/shared/utils/cn";

interface PrivacyTabProps {
  settings: ProfilePrivacySettings;
}

export default function PrivacyTab({ settings }: PrivacyTabProps) {
  const [formData, setFormData] = useState<ProfilePrivacySettings>(settings);
  const [isLoading, setIsLoading] = useState(false);
  
  // CORREÇÃO 2: Destruturar a função toast do hook
  const { toast } = useToast();

  const handleToggle = (key: keyof ProfilePrivacySettings) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const res = await updatePrivacySettings(formData);
    setIsLoading(false);

    if (res.success) {
      toast({ 
        title: "Privacidade atualizada", 
        description: "Suas preferências foram salvas com segurança." 
        // Nota: Se 'success' não existir no seu tema, remova ou use 'default'
      });
    } else {
      toast({ 
        title: "Erro", 
        description: res.error, 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Central de Privacidade</h2>
          <p className="text-sm text-muted-foreground">Controle quem vê suas informações e como você aparece no ecossistema.</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            {isLoading ? "Salvando..." : <><Save className="w-4 h-4" /> Salvar Alterações</>}
        </Button>
      </div>

      <div className="grid gap-6">
        
        {/* Bloco 1: Visibilidade Pública */}
        <section className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Visibilidade Pública</h3>
            </div>
            <div className="p-4 space-y-4">
                <ToggleRow 
                    label="Perfil Público" 
                    desc="Permitir que pessoas fora da sua organização vejam seu perfil básico."
                    checked={formData.isPublic}
                    onChange={() => handleToggle('isPublic')}
                />
                <ToggleRow 
                    label="Indexação em Buscadores" 
                    desc="Permitir que Google e Bing mostrem seu perfil nos resultados (SEO)."
                    checked={true} // Mock: precisa adicionar ao DB
                    onChange={() => {}} 
                    disabled={!formData.isPublic}
                />
            </div>
        </section>

        {/* Bloco 2: Dados Sensíveis */}
        <section className="bg-card border border-border rounded-xl overflow-hidden">
             <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Dados Visíveis</h3>
            </div>
            <div className="p-4 space-y-4">
                <ToggleRow 
                    label="Exibir E-mail" 
                    desc="Mostrar seu e-mail de contato no perfil público."
                    checked={formData.showEmail}
                    onChange={() => handleToggle('showEmail')}
                />
                <ToggleRow 
                    label="Exibir Localização" 
                    desc="Mostrar cidade/estado (baseado no IP ou cadastro)."
                    checked={formData.showLocation}
                    onChange={() => handleToggle('showLocation')}
                />
                <ToggleRow 
                    label="Exibir Formação Acadêmica" 
                    desc="Listar suas escolas e cursos concluídos."
                    checked={formData.showEducation}
                    onChange={() => handleToggle('showEducation')}
                />
            </div>
        </section>

        {/* Bloco 3: Interações */}
        <section className="bg-card border border-border rounded-xl overflow-hidden">
             <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Interações</h3>
            </div>
            <div className="p-4 space-y-4">
                <ToggleRow 
                    label="Permitir Mensagens" 
                    desc="Outros usuários podem enviar mensagens diretas para você."
                    checked={formData.allowMessages}
                    onChange={() => handleToggle('allowMessages')}
                />
                <ToggleRow 
                    label="Solicitações de Conexão" 
                    desc="Permitir que enviem pedidos de amizade/conexão."
                    checked={true} // Mock
                    onChange={() => {}}
                />
            </div>
        </section>
      </div>
    </div>
  );
}

// Componente Auxiliar
function ToggleRow({ label, desc, checked, onChange, disabled }: { label: string, desc: string, checked: boolean, onChange: () => void, disabled?: boolean }) {
    return (
        <div className={cn("flex items-center justify-between", disabled && "opacity-50 pointer-events-none")}>
            <div className="space-y-0.5">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <p className="text-xs text-muted-foreground max-w-[90%]">{desc}</p>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
        </div>
    )
}