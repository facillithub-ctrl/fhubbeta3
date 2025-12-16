// src/domains/social/profile/components/follow-button.tsx
'use client'

import { useState, useTransition } from "react";
import { Button } from "@/shared/ui/button"; // shadcn/ui
import { toggleFollowAction } from "../actions";
import { useToast } from "@/shared/hooks/use-toast"; // shadcn/ui
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
        setIsFollowing(previousState); // Revert
        toast({ title: "Erro", description: result.error, variant: "destructive" });
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