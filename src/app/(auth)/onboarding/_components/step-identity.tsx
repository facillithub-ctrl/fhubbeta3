"use client";

import { useState, useEffect, useRef } from "react";
import { User, Camera, AtSign, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { StepProps } from "@/types/onboarding";
import { cn } from "@/shared/utils/cn";

const compliments = ["Que nome daora!", "Disponível e incrível.", "Ótima escolha!", "Esse vai ficar famoso.", "Curti, autêntico!"];

// Listas Padronizadas
const pronounsList = ["Ele/Dele", "Ela/Dela", "Elu/Delu", "Ela/Dele", "Outros", "Prefiro não dizer"];
const genderList = ["Masculino", "Feminino", "Não-binário", "Gênero Fluido", "Agênero", "Outros", "Prefiro não dizer"];
const sexualityList = ["Heterossexual", "Homossexual", "Bissexual", "Pansexual", "Assexual", "Outros", "Prefiro não dizer"];

export default function StepIdentity({ data, update, onNext }: StepProps) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update("profileImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleHandleChange = (val: string) => {
    const formatted = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    update("handle", formatted);
    setAvailable(null);
    setMessage("");
    setChecking(false);
  };

  useEffect(() => {
    if (!data.handle || data.handle.length < 3) {
        setChecking(false);
        return;
    }

    let isMounted = true;
    setChecking(true);
    
    const timer = setTimeout(() => {
      // Simulação
      const isTaken = data.handle === "admin" || data.handle === "root";
      
      if (isMounted) {
        setChecking(false);
        if (!isTaken) {
          setAvailable(true);
          setMessage(compliments[Math.floor(Math.random() * compliments.length)]);
        } else {
          setAvailable(false);
          setMessage("Este handle já está em uso.");
        }
      }
    }, 800);

    return () => {
        isMounted = false;
        clearTimeout(timer);
    };
  }, [data.handle]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Avatar Upload */}
      <div className="flex flex-col items-center justify-center mb-8">
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
        
        <div onClick={() => fileInputRef.current?.click()} className="relative group cursor-pointer w-32 h-32">
            <div className="w-full h-full rounded-full bg-white border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-brand-purple transition-all shadow-sm relative">
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Alterar</span>
                </div>
                {data.profileImage ? (
                    <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover relative z-10" />
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

      <div className="space-y-5">
          {/* Handle */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">@Handle (Usuário)</label>
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
            <div className="h-4 ml-1">
                {message && <p className={cn("text-[10px] font-bold", available ? "text-green-600" : "text-red-500")}>{message}</p>}
            </div>
          </div>

          {/* Grid de Identidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pronomes</label>
                <div className="relative">
                    <select 
                        value={data.pronouns || ""}
                        onChange={(e) => update("pronouns", e.target.value)} 
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700"
                    >
                        <option value="" disabled>Selecione</option>
                        {pronounsList.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gênero</label>
                <div className="relative">
                    <select 
                        value={data.gender || ""}
                        onChange={(e) => update("gender", e.target.value)} 
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700"
                    >
                        <option value="" disabled>Selecione</option>
                        {genderList.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</div>
                </div>
              </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Orientação (Opcional)</label>
            <div className="relative">
                <select 
                    value={data.sexuality || ""}
                    onChange={(e) => update("sexuality", e.target.value)} 
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple appearance-none cursor-pointer text-gray-700"
                >
                    <option value="" disabled>Prefiro não dizer</option>
                    {sexualityList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</div>
            </div>
          </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!available || checking || !data.pronouns}
        className="w-full mt-6 bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Continuar
      </button>
    </div>
  );
}