import * as React from "react"

// Tipos para as ações do Toast (botões dentro dele)
export type ToastActionElement = React.ReactNode

// Tipo público para quem CHAMA a função toast()
export type ToastProps = {
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// Tipo interno do estado (inclui o ID obrigatório)
type ToasterToast = ToastProps & {
  id: string
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  const toast = React.useCallback(({ ...props }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    
    const newToast: ToasterToast = { 
      id, 
      ...props, 
      open: true 
    }
    
    setToasts((prev) => [...prev, newToast])

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      update: (updatedProps: ToastProps) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedProps } : t)))
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