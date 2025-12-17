import * as React from "react"

export type ToastActionElement = React.ReactNode

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type ToastArgs = Omit<ToastProps, "id">

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback(({ ...props }: ToastArgs) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastProps = { id, ...props, open: true }
    
    setToasts((prev) => [...prev, newToast])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (updatedProps: ToastArgs) => {
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