"use client";

import { useEffect, useState } from "react";
import { AtSign, CheckCircle2, XCircle, Loader2, Camera, ChevronDown, User } from "lucide-react";
import { OnboardingData } from "@/types/onboarding";
import { cn } from "@/shared/utils/cn";
import { checkHandleAvailability } from "../actions";

// Listas de opções
const pronounsList = ["Ele/Dele", "Ela/Dela", "Elu/Delu", "Ela/Dele", "Outros", "Prefiro não dizer"];
const genderList = ["Masculino", "Feminino", "Não-binário", "Gênero Fluido", "Agênero", "Outros", "Prefiro não dizer"];
const sexualityList = ["Heterossexual", "Homossexual", "Bissexual", "Pansexual", "Assexual", "Outros", "Prefiro não dizer"];

interface StepIdentityProps {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onNext: () => void;
}

export default function StepIdentity({ data, update, onNext }: StepIdentityProps) {
  const [handleInput, setHandleInput] = useState(data.handle || "");
  const [status, setStatus] = useState<'idle' | 'loading' | 'available' | 'unavailable'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Efeito de Debounce para verificar o handle
  useEffect(() => {
    const timer = setTimeout(async () => {
        if (!handleInput || handleInput.length < 3) {
            setStatus('idle');
            setFeedbackMsg("");
            return;
        }

        if (handleInput === data.handle && data.handle.length >= 3) {
            setStatus('available');
            return;
        }

        setStatus('loading');
        
        const result = await checkHandleAvailability(handleInput);
        
        if (result.available) {
            setStatus('available');
            setFeedbackMsg("Disponível para uso.");
            update('handle', handleInput.toLowerCase());
        } else {
            setStatus('unavailable');
            setFeedbackMsg(result.message || "Indisponível.");
        }
    }, 600);

    return () => clearTimeout(timer);
  }, [handleInput, update, data.handle]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            update('profileImage', reader.result as string);
        };
        reader.readAsDataURL(file);
     }
  };

  // AJUSTE: Removida a obrigatoriedade da imagem (!!data.profileImage)
  const isValid = 
      status === 'available' && 
      !!data.pronouns && 
      !!data.gender;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* 1. Foto de Perfil (Opcional) */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative group">
            <div className={cn(
                "w-28 h-28 rounded-full border-4 flex items-center justify-center overflow-hidden bg-gray-50 transition-all",
                data.profileImage ? "border-brand-purple" : "border-gray-100 group-hover:border-brand-purple/50"
            )}>
                {data.profileImage ? (
                    <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User className="w-10 h-10 text-gray-300" />
                )}
            </div>
            
            <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-brand-dark text-white p-2 rounded-full cursor-pointer hover:bg-black transition-colors shadow-sm z-10"
            >
                <Camera className="w-3.5 h-3.5" />
                <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                />
            </label>
        </div>
        {/* Texto indicando que é opcional */}
        <p className="text-xs text-gray-400 font-medium">
            Adicionar foto <span className="text-gray-300">(Opcional)</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* 2. Handle Input */}
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">@Handle (Usuário)</label>
            <div className="relative group">
                <input 
                    type="text" 
                    value={handleInput}
                    onChange={(e) => {
                        const val = e.target.value.toLowerCase().replace(/\s/g, '');
                        setHandleInput(val);
                    }}
                    className={cn(
                        "w-full pl-10 pr-10 py-3.5 bg-white border rounded-xl text-sm font-bold outline-none transition-all placeholder:text-gray-300 placeholder:font-normal",
                        status === 'available' ? "border-green-500 text-green-700 focus:ring-1 focus:ring-green-500" :
                        status === 'unavailable' ? "border-red-300 text-red-600 focus:ring-1 focus:ring-red-300" :
                        "border-gray-200 focus:ring-1 focus:ring-brand-purple focus:border-brand-purple"
                    )}
                    placeholder="usuario_unico"
                    autoComplete="off"
                />
                <AtSign className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", status === 'available' ? "text-green-500" : "text-gray-300")} />
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                    {status === 'loading' && <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />}
                    {status === 'available' && <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />}
                    {status === 'unavailable' && <XCircle className="w-5 h-5 text-red-500 animate-in zoom-in" />}
                </div>
            </div>
            <div className="h-4 ml-1">
                {feedbackMsg && (
                    <p className={cn(
                        "text-[10px] font-bold animate-in fade-in slide-in-from-top-1",
                        status === 'available' ? "text-green-600" : "text-red-500"
                    )}>
                        {feedbackMsg}
                    </p>
                )}
            </div>
        </div>

        {/* 3. Grid de Identidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pronomes</label>
                <div className="relative">
                    <select 
                        value={data.pronouns || ""}
                        onChange={(e) => update("pronouns", e.target.value)} 
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700 hover:border-gray-300 transition-colors"
                    >
                        <option value="" disabled>Selecione</option>
                        {pronounsList.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gênero</label>
                <div className="relative">
                    <select 
                        value={data.gender || ""}
                        onChange={(e) => update("gender", e.target.value)} 
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700 hover:border-gray-300 transition-colors"
                    >
                        <option value="" disabled>Selecione</option>
                        {genderList.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>

        {/* 4. Sexualidade */}
        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Orientação (Opcional)</label>
            <div className="relative">
                <select 
                    value={data.sexuality || ""}
                    onChange={(e) => update("sexuality", e.target.value)} 
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700 hover:border-gray-300 transition-colors"
                >
                    <option value="" disabled>Prefiro não dizer</option>
                    {sexualityList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* Botão de Continuar */}
      <div className="pt-4">
        <button 
            onClick={onNext}
            disabled={!isValid}
            className="w-full bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
            Confirmar Identidade
        </button>
        {!isValid && (
            <p className="text-[10px] text-center text-gray-400 mt-2">
                Preencha os campos obrigatórios (*) para continuar
            </p>
        )}
      </div>
    </div>
  );
}