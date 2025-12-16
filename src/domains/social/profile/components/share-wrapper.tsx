// src/domains/social/profile/components/share-wrapper.tsx
'use client'

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog"; // shadcn/ui
import { Button } from "@/shared/ui/button";
import ProfileShareCard from "./ProfileShareCard"; // Arquivo enviado pelo usuário
import { useProfileShare } from "./hooks/useProfileShare"; // Lógica extraída do index.ts enviado
import { PublicProfileDTO } from "../types";

export function ProfileShareCardWrapper({ profile }: { profile: PublicProfileDTO }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    // Adaptando os dados do DTO para o formato esperado pelo componente do usuário
    const profileForCard = {
        name: profile.name,
        username: profile.username,
        role: "Member", // Ou derivado
        avatarUrl: profile.avatarUrl,
        // ... outros campos necessários pelo componente original
    };

    const stats = {
        followers: profile.followersCount,
        following: profile.followingCount
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Compartilhar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-transparent border-none shadow-none p-0 flex flex-col items-center">
                <div className="w-full flex justify-center mb-4">
                     {/* Aqui renderizamos o componente visual enviado pelo usuário */}
                     <ProfileShareCard 
                        innerRef={cardRef}
                        profile={profileForCard as any} // Cast necessário se tipagem divergir
                        stats={stats}
                        theme="light"
                        isExporting={false}
                     />
                </div>
                {/* Botões de ação do modal (Download/Share) integrariam com exportAsImage.ts */}
                <Button onClick={() => alert('Integrar função handleGenerate aqui')} className="w-full max-w-[300px]">
                    Baixar Imagem
                </Button>
            </DialogContent>
        </Dialog>
    );
}