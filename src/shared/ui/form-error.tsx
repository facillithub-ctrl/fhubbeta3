import { AlertTriangle, Info } from "lucide-react"; // Ícones (assumindo lucide-react, padrão shadcn)
import { AppError } from "@/lib/errors/types";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

interface FormErrorProps {
  error?: AppError; // O objeto de erro completo
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  // Define cores baseadas na categoria (opcional, mas legal visualmente)
  const isAuthError = error.category === 'AUTH';
  const isSystemError = error.category === 'SYSTEM' || error.category === 'DATABASE';
  
  return (
    <div 
      className={cn(
        "rounded-md p-4 mb-4 border flex flex-col gap-2 animate-in fade-in slide-in-from-top-2",
        // Estilos condicionais
        isSystemError 
          ? "bg-red-50 border-red-200 text-red-900" 
          : "bg-orange-50 border-orange-200 text-orange-900",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 opacity-80" />
        
        <div className="flex-1 space-y-1">
          <p className="font-medium text-sm">
            {error.message}
          </p>
          
          {/* Código do erro discreto */}
          <p className="text-[10px] opacity-60 uppercase tracking-wider font-mono">
            Ref: {error.code}
          </p>
        </div>
      </div>

      {/* Botão de Ação (se existir no erro) */}
      {error.action && (
        <div className="pl-8 mt-1">
          <Link 
            href={error.action.url}
            className={cn(
              "text-xs font-semibold underline-offset-4 hover:underline inline-flex items-center gap-1",
              isSystemError ? "text-red-700 decoration-red-700" : "text-orange-700 decoration-orange-700"
            )}
          >
            {error.action.label} 
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}