// src/domains/social/profile/components/share-wrapper.tsx
'use client'

import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Share, Download, Loader2 } from "lucide-react";

// Imports corrigidos
import { ProfileShareCard } from "./ProfileShareCard"; 
import { useProfileShare } from "./hooks/useProfileShare";
import { PublicProfileDTO } from "../types";

export function ProfileShareCardWrapper({ profile }: { profile: PublicProfileDTO }) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Hook personalizado
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

    // Carrega imagens em base64 ao abrir para evitar problemas de CORS
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
                <Button variant="outline" className="w-full gap-2">
                    <Share className="w-4 h-4" />
                    Compartilhar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] bg-gray-50/50 border-none shadow-none p-0 flex flex-col items-center">
                
                <div className="w-full flex flex-col items-center gap-6 p-6">
                    {/* Área de Preview (Renderiza o componente ou a imagem gerada) */}
                    <div className="relative shadow-2xl rounded-[30px] overflow-hidden border border-gray-200">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-[300px] h-auto object-contain" />
                        ) : (
                            <div className="scale-[0.55] origin-top-left w-[540px] h-[960px] -mb-[420px] -mr-[240px]">
                                <ProfileShareCard 
                                    innerRef={cardRef}
                                    profile={profile}
                                    stats={stats}
                                    avatarOverride={safeAvatarUrl}
                                    logoOverride={safeLogoUrl}
                                    isExporting={false}
                                />
                            </div>
                        )}
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-4 w-full justify-center">
                        {!previewUrl ? (
                            <Button 
                                onClick={() => handleGenerate(cardRef.current)} 
                                disabled={isGenerating}
                                className="w-full max-w-[200px] bg-brand-primary"
                            >
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                                Gerar Card
                            </Button>
                        ) : (
                            <>
                                <Button onClick={handleShare} className="flex-1 max-w-[150px] bg-brand-primary">
                                    Compartilhar
                                </Button>
                                <Button variant="outline" onClick={clearPreview}>
                                    Voltar
                                </Button>
                                <a href={previewUrl} download={`perfil-${profile.username}.png`}>
                                    <Button variant="ghost" size="icon">
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}