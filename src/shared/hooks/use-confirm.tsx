"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"; // Verifique se o caminho está correto (src/components/ui ou src/shared/ui)

interface UseConfirmProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "default";
}

export const useConfirm = ({
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
}: UseConfirmProps) => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel} size="sm">
            {cancelText}
          </Button>
          <Button 
            variant={variant} 
            onClick={handleConfirm}
            size="sm"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm] as const;
};