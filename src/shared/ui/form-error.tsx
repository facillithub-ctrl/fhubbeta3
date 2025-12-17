import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { AppError } from "@/lib/errors/types";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

interface FormErrorProps {
  error?: AppError;
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  // Categorização para cor da borda/ícone
  const isSystemError = error.category === 'SYSTEM' || error.category === 'DATABASE';
  
  return (
    <div 
      className={cn(
        "w-full rounded-lg border px-4 py-3 bg-white shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-300",
        isSystemError 
          ? "border-red-500/30 text-red-600" 
          : "border-amber-500/40 text-amber-700",
        className
      )}
    >
      {isSystemError ? (
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      ) : (
        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
      )}
      
      <div className="flex-1">
        <p className="text-xs font-medium font-sans leading-relaxed">
          {error.message}
        </p>
        
        {/* Código técnico discreto (opcional, bom para suporte) */}
        <p className="text-[9px] font-mono opacity-50 mt-1 uppercase tracking-wider">
          ERR: {error.code}
        </p>

        {/* Botão de Ação Minimalista */}
        {error.action && (
          <div className="mt-2">
            <Link 
              href={error.action.url}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide hover:underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              {error.action.label} 
              <ArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}