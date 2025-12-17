import * as React from "react"

export type ToastActionElement = React.ReactNode

// Tipo interno seguro com todas as props
export type ToastState = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastState[]>([])

  const toast = React.useCallback(({ ...props }: Omit<ToastState, "id" | "open" | "onOpenChange">) => {
    const id = Math.random().toString(36).substring(2, 9)
    
    // Objeto completo com ID
    const newToast: ToastState = { 
        id, 
        open: true, 
        onOpenChange: (open) => {
            if (!open) dismiss(id)
        },
        ...props 
    }
    
    setToasts((prev) => [newToast, ...prev])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Partial<ToastState>) => {
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