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

// Estes valores devem bater com os do switch/case no actions.ts
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
  facillitId?: string;
  
  // Campos de Identidade
  pronouns: string;
  gender: string;
  sexuality?: string; // Opcional
  
  address: AddressData | null;
  profileTypes: ProfileType[]; 
  selectedModules: string[]; // IDs dos módulos
  aiLevel: AiLevel;
  deviceTrusted: boolean;
  permissions: {
    recommendations: boolean;
    dataAnalysis: boolean;
  };
}

// Interface para os componentes de Step
export interface StepProps {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: (data?: Partial<OnboardingData>) => void; // Atualizado para aceitar dados parciais
  isLoading?: boolean;
}