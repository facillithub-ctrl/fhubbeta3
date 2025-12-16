"use client";

import { useState } from "react";
import { MapPin, Loader2, Search, Crosshair, AlertTriangle } from "lucide-react";
import { StepProps, AddressData } from "@/types/onboarding";
import { cn } from "@/shared/utils/cn";

const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function StepLocation({ data, update, onNext, onBack }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const updateAddress = (field: keyof AddressData, value: string) => {
    const currentAddress = data.address || { cep: "", logradouro: "", bairro: "", localidade: "", uf: "", numero: "", complemento: "" };
    update("address", { ...currentAddress, [field]: value });
  };

  // Integração VIACEP
  const handleCepBlur = async () => {
    const cep = data.address?.cep?.replace(/\D/g, "") || "";
    if (cep.length === 8) {
        setLoading(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const json = await res.json();
            if (!json.erro) {
                update("address", {
                    cep: data.address?.cep || "",
                    logradouro: json.logradouro,
                    bairro: json.bairro,
                    localidade: json.localidade,
                    uf: json.uf,
                    numero: "",
                    complemento: ""
                });
            }
        } catch (error) {
            console.error("Erro ao buscar CEP", error);
        } finally {
            setLoading(false);
        }
    }
  };

  // Integração GEOLOCATION API + Nominatim (Reverse Geocoding Free)
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
        setGeoError("Geolocalização não suportada.");
        return;
    }

    setLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            // Usando OpenStreetMap Nominatim para reverso (Gratuito e sem chave API para demo)
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const json = await res.json();
            const addr = json.address;

            update("address", {
                cep: addr.postcode?.replace("-", "") || "",
                logradouro: addr.road || "",
                bairro: addr.suburb || addr.neighbourhood || "",
                localidade: addr.city || addr.town || addr.village || "",
                uf: addr.state_code || "", // Pode precisar de map para sigla BR
                numero: "",
                complemento: ""
            });
        } catch (error) {
            setGeoError("Erro ao obter endereço.");
        } finally {
            setLoading(false);
        }
    }, (error) => {
        setLoading(false);
        setGeoError("Permissão negada ou indisponível.");
    });
  };

  const address = data.address || { cep: "", logradouro: "", localidade: "", uf: "", bairro: "" };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Mapa Animado Visual */}
      <div className="w-full h-32 bg-white rounded-2xl border border-gray-100 relative overflow-hidden flex items-center justify-center shadow-sm">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
         
         <div className={cn("transition-all duration-700 flex flex-col items-center z-10", address.localidade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-60")}>
            <MapPin className={cn("w-8 h-8 text-brand-purple mb-1", address.localidade && "animate-bounce")} />
            {address.localidade && (
                <span className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                    {address.localidade}, {address.uf}
                </span>
            )}
         </div>

         {loading && <Loader2 className="absolute z-20 w-8 h-8 text-brand-purple animate-spin" />}
      </div>

      {geoError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold">
              <AlertTriangle className="w-4 h-4" /> {geoError}
          </div>
      )}

      <div className="grid grid-cols-1 gap-4">
         <button 
            onClick={handleGeolocation}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand-purple/5 hover:bg-brand-purple/10 text-brand-purple font-bold text-sm rounded-xl border border-brand-purple/10 transition-all active:scale-95"
         >
            <Crosshair className="w-4 h-4" /> Usar minha localização atual
         </button>

         <div className="relative">
             <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-100"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-white px-2 text-gray-400 font-bold">Ou digite</span>
             </div>
         </div>

         <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">CEP</label>
                <div className="relative">
                    <input 
                        type="text" maxLength={9}
                        value={address.cep}
                        onChange={(e) => updateAddress("cep", e.target.value)}
                        onBlur={handleCepBlur}
                        className="w-full pl-3 pr-8 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all" 
                        placeholder="00000"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                </div>
            </div>

            <div className="col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cidade</label>
                <input 
                    type="text" readOnly
                    value={address.localidade}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed" 
                    placeholder="Automático"
                />
            </div>
         </div>
      </div>
      
      <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Endereço</label>
          <input 
              type="text" 
              value={address.logradouro}
              onChange={(e) => updateAddress("logradouro", e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all" 
              placeholder="Rua, Av..."
          />
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            ←
        </button>
        <button 
            onClick={onNext}
            disabled={!address.localidade}
            className="flex-1 bg-brand-dark hover:bg-black text-white font-bold text-sm rounded-xl shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Confirmar e Avançar
        </button>
      </div>
    </div>
  );
}