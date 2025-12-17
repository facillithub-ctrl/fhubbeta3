'use client'

import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Share, Download, Loader2, Send } from "lucide-react";

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
        <>
            <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <ProfileShareCard 
                    innerRef={cardRef}
                    profile={profile}
                    stats={stats}
                    avatarOverride={safeAvatarUrl}
                    logoOverride={safeLogoUrl}
                    isExporting={false}
                />
            </div>

            <Dialog onOpenChange={(open) => !open && clearPreview()}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 rounded-full px-4 border-gray-200 hover:bg-gray-50 text-gray-600">
                        <Share className="w-4 h-4" />
                        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Compartilhar</span>
                    </Button>
                </DialogTrigger>
                
                <DialogContent className="
                    fixed bottom-0 left-0 right-0 top-auto 
                    translate-y-0 translate-x-0 
                    w-full max-w-md mx-auto 
                    rounded-t-[2rem] rounded-b-none 
                    border-none shadow-[0_-10px_40px_rgba(0,0,0,0.1)] 
                    bg-white p-6 gap-6
                    data-[state=open]:animate-in data-[state=closed]:animate-out 
                    data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300
                    md:bottom-auto md:top-[50%] md:translate-y-[-50%] md:rounded-[2rem]
                ">
                    <DialogTitle className="text-center font-bold text-lg text-gray-900">
                        Compartilhar Perfil
                    </DialogTitle>
                    
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-200 md:hidden"></div>

                    <div className="flex flex-col gap-3 w-full pb-4">
                        
                        {!previewUrl ? (
                            // [CORREÇÃO] bg-black text-white explícito
                            <Button 
                                onClick={() => handleGenerate(cardRef.current)} 
                                disabled={isGenerating}
                                className="w-full h-14 rounded-2xl bg-black hover:bg-gray-800 text-white font-bold text-base shadow-lg shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-between px-6 border-none"
                            >
                                <span className="flex items-center gap-3">
                                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin"/> : <Download className="w-5 h-5" />}
                                    Salvar Imagem
                                </span>
                                <span className="text-xs font-normal opacity-60 bg-white/20 px-2 py-1 rounded-lg">PNG</span>
                            </Button>
                        ) : (
                            <a href={previewUrl} download={`facillit-${profile.username}.png`} className="w-full">
                                {/* [CORREÇÃO] bg-black text-white explícito */}
                                <Button className="w-full h-14 rounded-2xl bg-black hover:bg-gray-800 text-white font-bold text-base shadow-lg shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-between px-6 border-none">
                                    <span className="flex items-center gap-3">
                                        <Download className="w-5 h-5" />
                                        Baixar Imagem Pronta
                                    </span>
                                    <span className="text-xs font-normal opacity-80 bg-white/20 px-2 py-1 rounded-lg">Salvar</span>
                                </Button>
                            </a>
                        )}

                        <Button 
                            variant="outline"
                            onClick={handleShare}
                            className="w-full h-14 rounded-2xl border-2 border-gray-100 bg-white hover:bg-gray-50 text-gray-900 font-bold text-base flex items-center justify-between px-6"
                        >
                            <span className="flex items-center gap-3">
                                <Send className="w-5 h-5" />
                                Enviar Link
                            </span>
                        </Button>

                         <Button 
                            variant="ghost"
                            onClick={clearPreview}
                            className="w-full h-12 rounded-xl text-gray-500 font-medium hover:bg-transparent hover:text-gray-900"
                        >
                            Cancelar
                        </Button>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}