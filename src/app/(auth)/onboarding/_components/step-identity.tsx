"use client";

import { useState, useEffect, useRef } from "react";
import { User, Camera, AtSign, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { StepProps } from "@/types/onboarding";
import { cn } from "@/shared/utils/cn";

const compliments = ["Que nome daora!", "Disponível e incrível.", "Ótima escolha!", "Esse vai ficar famoso.", "Curti, autêntico!"];

export default function StepIdentity({ data, update, onNext }: StepProps) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manipulação de Upload de Imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manipulação do Handle
  const handleHandleChange = (val: string) => {
    const formatted = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    update("handle", formatted);
    
    // Reset visual imediato - seguro aqui pois é um event handler
    setAvailable(null); 
    setMessage("");
  };

  // Effect APENAS para a verificação assíncrona (Debounce)
  useEffect(() => {
  if (!data.handle || data.handle.length < 3) return;

  setChecking(true); // 👈 warning aqui

    
    const timer = setTimeout(() => {
      setChecking(false);
      
      // Simulação de verificação de API
      const isTaken = data.handle === "admin" || data.handle === "root";
      
      if (!isTaken) {
        setAvailable(true);
        setMessage(compliments[Math.floor(Math.random() * compliments.length)]);
      } else {
        setAvailable(false);
        setMessage("Este handle já está em uso.");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [data.handle]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Avatar Upload */}
      <div className="flex flex-col items-center justify-center mb-8">
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
            accept="image/*"
        />
        
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer w-32 h-32"
        >
            <div className="w-full h-full rounded-full bg-white border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-brand-purple transition-all shadow-sm relative">
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Alterar</span>
                </div>
                
                {data.profileImage ? (
                    <img 
                        src={data.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover relative z-10" 
                    />
                ) : (
                    <User className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors relative z-10" />
                )}
            </div>
            
            <div className="absolute bottom-1 right-1 w-9 h-9 bg-brand-purple text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition-transform z-30">
                <Camera className="w-4 h-4" />
            </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 font-medium">Toque para adicionar foto</p>
      </div>

      {/* Handle Input */}
      <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Seu @handle único</label>
            <div className="relative group">
                <input 
                    type="text" 
                    value={data.handle}
                    onChange={(e) => handleHandleChange(e.target.value)} 
                    className={cn(
                        "w-full pl-10 pr-10 py-4 bg-white border rounded-xl text-sm font-bold outline-none transition-all placeholder:text-gray-300 placeholder:font-normal",
                        available === true ? "border-green-500 text-green-700 focus:ring-green-500/20" :
                        available === false ? "border-red-300 text-red-600 focus:ring-red-200" :
                        "border-gray-200 focus:ring-2 focus:ring-brand-purple/10 focus:border-brand-purple"
                    )}
                    placeholder="ex: joaosilva"
                />
                <AtSign className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", available ? "text-green-500" : "text-gray-300")} />
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                    {checking && <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />}
                    {!checking && available === true && <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />}
                    {!checking && available === false && <XCircle className="w-5 h-5 text-red-400 animate-in zoom-in" />}
                </div>
            </div>
            
            <div className="h-5 ml-1">
                {message && (
                    <p className={cn(
                        "text-[11px] font-bold animate-in slide-in-from-left-2",
                        available ? "text-green-600" : "text-red-500"
                    )}>
                        {message}
                    </p>
                )}
            </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!available}
        className="w-full mt-6 bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Confirmar Identidade
      </button>
    </div>
  );
}