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

// Removemos o 'null' daqui para facilitar a tipagem dos arrays
export type ProfileType = 
  | "education" 
  | "individuals" 
  | "schools" 
  | "startups" 
  | "enterprise";

export type AiLevel = "moderate" | "intermediate" | "advanced";

export interface OnboardingData {
  handle: string;
  profileImage: string | null;
  address: AddressData | null;
  
  // MUDANÇA: Array de strings para múltipla seleção
  profileTypes: ProfileType[]; 
  
  selectedModules: string[];
  aiLevel: AiLevel;
  deviceTrusted: boolean;
  permissions: {
    recommendations: boolean;
    dataAnalysis: boolean;
  };
}

export interface StepProps {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
  isLoading?: boolean;
}