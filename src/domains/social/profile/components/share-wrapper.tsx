// src/domains/social/profile/components/share-wrapper.tsx
'use client'

import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Share, Download, Loader2, X } from "lucide-react";

import { ProfileShareCard } from "./ProfileShareCard"; 
import { useProfileShare } from "./hooks/useProfileShare";
import { PublicProfileDTO } from "../types";

export function ProfileShareCardWrapper({ profile }: { profile: PublicProfileDTO }) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    const { 
        isGenerating, 
        previewUrl, 
        safeAvatarUrl, 
        safeLogoUrl,
        prepareEnvironment, 
        handleGenerate,
        handleShare,
        clearPreview
    } = useProfileShare(profile.username, profile.avatarUrl);

    useEffect(() => {
        prepareEnvironment();
    }, [prepareEnvironment]);

    const stats = {
        followers: profile.followersCount,
        following: profile.followingCount
    };

    return (
        <Dialog onOpenChange={(open) => !open && clearPreview()}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 hover:bg-gray-50 border-gray-200 text-gray-700">
                    <Share className="w-4 h-4" />
                    <span className="hidden sm:inline">Compartilhar</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-[400px] md:max-w-[600px] bg-white border-none shadow-2xl p-0 overflow-hidden rounded-3xl flex flex-col max-h-[90vh]">
                <DialogTitle className="sr-only">Compartilhar perfil</DialogTitle>
                
                {/* Header do Dialog */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <h3 className="font-bold text-gray-900">Compartilhar Perfil</h3>
                    {/* Botão de fechar nativo do DialogContent já existe, mas se quiser customizar pode por aqui */}
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-6 flex flex-col items-center justify-center min-h-[400px]">
                    {/* Área de Preview */}
                    <div className="relative shadow-sm rounded-2xl overflow-hidden border border-gray-200 bg-white transition-all duration-300">
                        {previewUrl ? (
                            // Mostra a imagem gerada (limpa)
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full max-w-[280px] h-auto object-contain block" 
                            />
                        ) : (
                            // Mostra o componente React escalado para caber no modal
                            <div className="w-[280px] h-[500px] relative overflow-hidden bg-white">
                                <div className="absolute top-0 left-0 origin-top-left transform scale-[0.5185]">
                                    {/* 540px * 0.5185 ~= 280px */}
                                    <ProfileShareCard 
                                        innerRef={cardRef}
                                        profile={profile}
                                        stats={stats}
                                        avatarOverride={safeAvatarUrl}
                                        logoOverride={safeLogoUrl}
                                        isExporting={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer com Ações */}
                <div className="p-6 bg-white border-t border-gray-100 flex flex-col gap-3 z-10">
                    {!previewUrl ? (
                        <Button 
                            onClick={() => handleGenerate(cardRef.current)} 
                            disabled={isGenerating}
                            className="w-full h-12 text-base bg-brand-primary hover:bg-brand-dark transition-all rounded-xl font-bold"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2"/>
                                    Gerando imagem...
                                </>
                            ) : "Gerar Card para Download"}
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={clearPreview} className="flex-1 h-12 rounded-xl border-gray-200 font-bold text-gray-600">
                                Voltar
                            </Button>
                            
                            <a href={previewUrl} download={`facillit-${profile.username}.png`} className="flex-1">
                                <Button className="w-full h-12 bg-brand-primary hover:bg-brand-dark rounded-xl font-bold gap-2">
                                    <Download className="w-4 h-4" />
                                    Baixar Imagem
                                </Button>
                            </a>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    );
}