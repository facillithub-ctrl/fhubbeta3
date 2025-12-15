"use client";

import { useState } from "react";
import { MapPin, Search, Loader2, AlertCircle, Check } from "lucide-react";
import { StepProps } from "@/types/onboarding";

export default function StepLocation({ data, update, onNext, onBack }: StepProps) {
  const [cep, setCep] = useState(data.address?.cep || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddress = async () => {
    if (cep.length < 8) return;
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = await res.json();
      
      if (addressData.erro) {
        setError("CEP não encontrado.");
        update("address", null);
      } else {
        update("address", { ...addressData, cep });
      }
    } catch (err) {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Localização</h1>
        <p className="text-gray-500 text-lg">Para ajustar fuso horário e sugestões locais.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="flex gap-3">
            <div className="relative flex-1 group">
                <input 
                    type="text" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="Digite seu CEP" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple font-mono text-lg tracking-wide transition-all"
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-brand-purple" />}
            </div>
            <button 
                onClick={fetchAddress}
                disabled={cep.length < 8 || loading}
                className="px-8 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
                Buscar
            </button>
        </div>

        {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" /> {error}
            </div>
        )}

        {data.address && (
            <div className="bg-white border-2 border-brand-green/30 p-6 rounded-3xl shadow-sm space-y-5 animate-in slide-in-from-top-4 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-green"></div>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-2xl text-brand-green shrink-0"><MapPin className="w-6 h-6"/></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            Endereço Confirmado <Check className="w-4 h-4 text-brand-green" />
                        </h3>
                        <p className="text-gray-600 mt-1 font-medium">{data.address.logradouro}</p>
                        <p className="text-gray-500 text-sm">{data.address.bairro}, {data.address.localidade} - {data.address.uf}</p>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100 mt-auto">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Voltar</button>
        <button 
            onClick={onNext} 
            disabled={!data.address}
            className="bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-brand-dark/10 hover:shadow-brand-dark/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
            Confirmar e Avançar <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}