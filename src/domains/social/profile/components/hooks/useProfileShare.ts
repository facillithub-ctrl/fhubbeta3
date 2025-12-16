// src/domains/social/profile/components/hooks/useProfileShare.ts
import { useState, useCallback } from 'react';
import { generateImageBlob, shareNativeFile, preloadImage } from '@/shared/utils/export-as-image';
// CORREÇÃO: Ajustado o caminho para apontar para onde o hook realmente está (src/hooks/use-toast.ts)
import { useToast } from '@/hooks/use-toast'; 

export const useProfileShare = (profileName: string, avatarUrl?: string | null) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [safeAvatarUrl, setSafeAvatarUrl] = useState<string | null>(null);
    const [safeLogoUrl, setSafeLogoUrl] = useState<string | null>(null);

    const { toast } = useToast();

    const prepareEnvironment = useCallback(async () => {
        if (avatarUrl) {
            const avatarBase64 = await preloadImage(avatarUrl);
            setSafeAvatarUrl(avatarBase64); 
        }
        // Certifique-se que esta imagem existe em public/assets/...
        const logoBase64 = await preloadImage('/assets/images/accont.svg');
        setSafeLogoUrl(logoBase64);
    }, [avatarUrl]);

    const handleGenerate = useCallback(async (elementRef: HTMLElement | null) => {
        if (!elementRef) return;

        setIsGenerating(true);
        setPreviewFile(null);

        try {
            const fileName = `facillit-${profileName.replace(/[^a-z0-9]/gi, '_')}`;
            const file = await generateImageBlob(elementRef, fileName, '#ffffff');
            
            if (file) {
                setPreviewFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                throw new Error("Arquivo vazio");
            }
        } catch (error) {
            toast({ title: 'Erro', description: 'Falha ao gerar imagem.', variant: 'destructive' });
        } finally {
            setIsGenerating(false);
        }
    }, [profileName, toast]);

    const handleShare = useCallback(async () => {
        if (!previewFile) return;
        
        const success = await shareNativeFile(
            previewFile, 
            'Meu Perfil Facillit', 
            `Acesse: ${window.location.origin}/u/${profileName}`
        );

        if (success) {
            toast({ title: 'Sucesso', description: 'Compartilhamento iniciado.' });
        } else {
            toast({ title: 'Atenção', description: 'Salve a imagem manualmente.' });
        }
    }, [previewFile, profileName, toast]);

    const clearPreview = useCallback(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setPreviewFile(null);
    }, [previewUrl]);

    return {
        isGenerating,
        previewUrl,
        safeAvatarUrl,
        safeLogoUrl,
        prepareEnvironment,
        handleGenerate,
        handleShare,
        clearPreview
    };
};