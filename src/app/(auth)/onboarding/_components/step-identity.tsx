"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, User, Check, ArrowRight, Sparkles } from "lucide-react";
import { StepProps } from "@/types/onboarding";

export default function StepIdentity({ data, update, onNext }: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update("profileImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Sua Identidade</h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">Como você quer ser reconhecido no ecossistema Facillit?</p>
      </div>

      <div className="flex flex-col items-center">
        <div 
            className="relative group cursor-pointer w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-brand-purple to-brand-green shadow-2xl shadow-brand-purple/20 transition-transform hover:scale-105"
            onClick={() => fileInputRef.current?.click()}
        >
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white relative flex items-center justify-center">
                {data.profileImage ? (
                    <Image src={data.profileImage} alt="Profile" fill className="object-cover" />
                ) : (
                    <User className="w-24 h-24 text-gray-200" />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-white text-brand-purple p-3 rounded-full shadow-lg border border-gray-100">
                <Sparkles className="w-5 h-5 fill-brand-purple" />
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="relative group">
            <input 
                type="text" 
                value={data.handle}
                onChange={(e) => update("handle", e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))}
                placeholder="seu.usuario" 
                className="w-full text-center px-6 py-6 bg-gray-50 border-2 border-transparent rounded-2xl text-3xl font-black text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 outline-none transition-all"
                autoFocus
            />
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-2xl font-bold text-gray-300 pointer-events-none group-focus-within:text-brand-purple group-focus-within:opacity-100 opacity-0 transition-all">@</div>
            
            {data.handle.length > 3 && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-green bg-green-50 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 animate-in zoom-in">
                    <Check className="w-4 h-4" /> Livre
                </div>
            )}
        </div>
        
        <button 
            onClick={onNext}
            disabled={!data.handle}
            className="w-full bg-brand-dark hover:bg-black text-white text-xl font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
            Continuar <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}