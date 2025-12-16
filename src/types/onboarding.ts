// src/types/onboarding.ts

export interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero?: string;
  complemento?: string;
  ddd?: string;
  gia?: string;
  ibge?: string;
  siafi?: string;
}

export type ProfileType = 
  | "education" 
  | "individuals" 
  | "schools" 
  | "startups" 
  | "enterprise" 
  | null;

export type AiLevel = "moderate" | "intermediate" | "advanced";

export interface OnboardingData {
  // Identidade
  handle: string;
  profileImage: string | null;
  
  // Localização
  address: AddressData | null;
  
  // Perfil & Contexto
  profileType: ProfileType;
  
  // Módulos (IDs dos apps selecionados)
  selectedModules: string[];
  
  // Inteligência Artificial
  aiLevel: AiLevel;
  deviceTrusted: boolean;
  permissions: {
    recommendations: boolean;
    dataAnalysis: boolean;
  };
}

// CORREÇÃO: Generic para garantir tipagem estrita no update
export interface StepProps {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
  isLoading?: boolean;
}