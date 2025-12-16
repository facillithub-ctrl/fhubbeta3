"use client";

import { BadgeCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type VerificationTier = 'none' | 'verified' | 'professional' | 'creator' | 'official';

interface VerificationBadgeProps {
  tier: VerificationTier;
  className?: string;
  showTooltip?: boolean;
}

const badgeConfig = {
  none: { color: "", label: "" },
  verified: { 
    // Azul - Identidade Pessoal (Padrão)
    color: "text-blue-500 fill-blue-500/10", 
    label: "Identidade Verificada" 
  },
  professional: { 
    // Verde - Empresas e Escolas
    color: "text-emerald-500 fill-emerald-500/10", 
    label: "Conta Profissional" 
  },
  creator: { 
    // Amarelo/Dourado - Criadores e Influencers
    color: "text-yellow-500 fill-yellow-500/10", 
    label: "Criador Verificado" 
  },
  official: { 
    // Vermelho - Administração do Sistema
    color: "text-red-500 fill-red-500/10", 
    label: "Equipe Facillit Hub" 
  }
};

export function VerificationBadge({ tier, className, showTooltip = true }: VerificationBadgeProps) {
  if (!tier || tier === 'none') return null;

  const config = badgeConfig[tier];

  return (
    <div className="inline-flex items-center justify-center align-middle group relative ml-1.5 align-baseline">
      <BadgeCheck 
        className={cn("w-4 h-4", config.color, className)} 
        strokeWidth={2.5}
      />
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
          {config.label}
          {/* Seta do Tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}