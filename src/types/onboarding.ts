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

export interface StepProps {
  data: OnboardingData;
  update: (key: keyof OnboardingData, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
  isLoading?: boolean;
}