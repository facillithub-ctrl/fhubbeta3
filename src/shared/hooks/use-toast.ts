import * as React from "react"

// Tipo para conteúdo (botões, etc)
export type ToastActionElement = React.ReactNode

// RENOMEADO: De 'ToastProps' para 'ToasterToast' para evitar colisão
export type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  const toast = React.useCallback(({ ...props }: Omit<ToasterToast, "id" | "open" | "onOpenChange">) => {
    // Gera ID único
    const id = Math.random().toString(36).substring(2, 9)
    
    const newToast: ToasterToast = { 
        id, 
        open: true, 
        onOpenChange: (open) => {
            if (!open) dismiss(id)
        },
        ...props 
    }
    
    setToasts((prev) => [...prev, newToast])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Partial<ToasterToast>) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...props } : t)))
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