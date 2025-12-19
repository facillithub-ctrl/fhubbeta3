"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
// Ajuste na importação para garantir que pegue o arquivo correto (renomearemos o arquivo abaixo)
import ProfileShareCard from "./ProfileShareCard"; 
import { UserProfile } from "@/types/account";
import { Button } from "@/shared/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { exportAsImage } from "@/shared/utils/export-as-image";
import { useToast } from "@/shared/hooks/use-toast";

// MUDANÇA: export default function
export default function ShareWrapper({ children, profile }: { children: React.ReactNode, profile: UserProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsExporting(true);
    try {
        const element = document.getElementById("profile-share-card");
        if (element) {
            // Pequeno delay para garantir renderização
            await new Promise(r => setTimeout(r, 100));
            await exportAsImage(element, `facillit-${profile.handle}`);
            toast({ title: "Sucesso", description: "Cartão salvo no seu dispositivo!" });
        }
    } catch (e) {
        console.error(e);
        toast({ title: "Erro", description: "Não foi possível salvar a imagem.", variant: "destructive" });
    } finally {
        setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/u/${profile.handle}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copiado!" });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 bg-transparent border-none shadow-none overflow-hidden flex flex-col items-center gap-6 outline-none focus:outline-none">
         
         {/* Container do Cartão */}
         <div className="relative">
             <div id="profile-share-card" className="transform scale-[0.85] sm:scale-100 transition-transform origin-top">
                 <ProfileShareCard profile={profile} />
             </div>
         </div>

         {/* Ações do Modal */}
         <div className="flex items-center gap-3 p-2 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-2xl animate-in slide-in-from-bottom-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" onClick={handleCopyLink}>
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button onClick={handleDownload} disabled={isExporting} className="rounded-full px-6">
                {isExporting ? "Salvando..." : <><Download className="w-4 h-4 mr-2" /> Salvar Imagem</>}
            </Button>
         </div>

      </DialogContent>
    </Dialog>
  );
}