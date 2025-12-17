import * as React from "react"

// --- Definições de Tipo Novas e Claras ---

export type ToastActionElement = React.ReactNode

// O que você envia ao chamar a função toast()
export type ToastInput = {
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  duration?: number
}

// O que o componente Toaster lê (inclui ID obrigatório)
export type Toast = ToastInput & {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Para compatibilidade com o Toaster existente
export type ToastProps = Toast 

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  // Função disparadora blindada
  const toast = React.useCallback((props: ToastInput) => {
    const id = Math.random().toString(36).slice(2)
    
    const newToast: Toast = {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss(id)
      },
    }

    setToasts((prev) => [newToast, ...prev])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (updateProps: ToastInput) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updateProps } : t)))
      },
    }
  }, [])

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prev) => 
      id ? prev.filter((t) => t.id !== id) : []
    )
  }, [])

  return {
    toast,
    toasts,
    dismiss,
  }
}