export type ErrorCategory = 'AUTH' | 'ONBOARDING' | 'VALIDATION' | 'SYSTEM' | 'DATABASE';

export type ErrorActionLink = {
  label: string;
  url: string;
};

export interface AppError {
  code: string;
  message: string;
  techDescription?: string;
  category: ErrorCategory;
  httpStatus?: number;
  action?: ErrorActionLink;
}

// CORREÇÃO: Padrão alterado de 'any' para 'null'. 
// Isso garante que se não passarmos um tipo, 'data' não pode receber qualquer lixo.
export type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: AppError;
  inputs?: Record<string, string>; 
};