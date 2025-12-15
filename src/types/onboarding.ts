export interface OnboardingData {
  handle: string;
  profileImage: string | null;
  address: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero?: string;
    complemento?: string;
  } | null;
  profileType: "student" | "professional" | "enterprise" | "none" | null;
  selectedModules: string[];
  aiLevel: "moderate" | "intermediate" | "advanced";
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