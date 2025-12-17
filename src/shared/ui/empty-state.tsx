import { LucideIcon, PackageOpen } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button"; // Ajuste o import conforme seu projeto

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title = "Nada por aqui",
  description = "Não encontramos nenhum item para exibir neste momento.",
  icon: Icon = PackageOpen,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in zoom-in-95 duration-500",
        className
      )}
    >
      <div className="bg-gray-50 p-4 rounded-full mb-4 border border-gray-100">
        <Icon className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      
      <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {action && (
        <Button 
            variant="outline" 
            size="sm" 
            onClick={action.onClick}
            className="text-xs font-semibold h-8"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}