import * as React from "react"

// Versão simplificada do hook use-toast para corrigir o erro de build
// Se você precisar da funcionalidade visual completa depois, execute: npx shadcn-ui@latest add toast

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = ({ title, description, variant }: ToastProps) => {
    console.log("Toast notification:", { title, description, variant }) // Log para debug
    setToasts((prev) => [...prev, { title, description, variant }])
    
    // Retorna funções simuladas para manter compatibilidade
    return {
      id: Math.random().toString(),
      dismiss: () => {},
      update: () => {},
    }
  }

  return {
    toast,
    toasts,
    dismiss: () => {},
  }
}