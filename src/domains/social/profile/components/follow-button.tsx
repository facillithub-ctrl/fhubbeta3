'use client'

import { useState, useTransition } from "react";
// Ajuste este caminho se o seu Button estiver em outro lugar, mas parece correto conforme seu erro anterior
import { Button } from "@/shared/ui/button"; 
import { toggleFollowAction } from "../actions";
// CORREÇÃO: Esta importação exige que o arquivo src/hooks/use-toast.ts exista.
// Se der erro, rode: npx shadcn-ui@latest add toast
import { useToast } from "@/hooks/use-toast"; 
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  targetId: string;
  initialIsFollowing: boolean;
  isLoggedIn: boolean;
}

export function FollowButton({ targetId, initialIsFollowing, isLoggedIn }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleFollow = () => {
    if (!isLoggedIn) {
      // Redireciona para login com callback para voltar aqui
      router.push(`/login?callbackUrl=${window.location.pathname}`);
      return;
    }

    // Optimistic UI update
    const previousState = isFollowing;
    setIsFollowing(!isFollowing);

    startTransition(async () => {
      const result = await toggleFollowAction({ targetUserId: targetId });
      
      if (result.error) {
        setIsFollowing(previousState); // Revert a mudança se falhar
        toast({ 
          title: "Erro", 
          description: result.error, 
          variant: "destructive" 
        });
      }
    });
  };

  return (
    <Button 
      onClick={handleFollow} 
      disabled={pending}
      variant={isFollowing ? "outline" : "default"}
      className={isFollowing ? "border-gray-200 text-gray-700" : "bg-brand-primary text-white"}
    >
      {isFollowing ? "Seguindo" : "Seguir"}
    </Button>
  );
}