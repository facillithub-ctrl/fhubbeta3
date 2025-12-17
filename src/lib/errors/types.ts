export type ErrorCategory = 'AUTH' | 'ONBOARDING' | 'VALIDATION' | 'SYSTEM' | 'DATABASE';

export type ErrorActionLink = {
  label: string; // O texto do botão, ex: "Ver Status do Sistema"
  url: string;   // O link para onde vai
};

export interface AppError {
  code: string;            // Identificador único (ex: AUTH_001)
  message: string;         // Mensagem paa o usuário final
  techDescription: string; // Detalhe técnico para logs
  category: ErrorCategory;
  httpStatus?: number;
  action?: ErrorActionLink; // Opcional: botão de ação
}

// Tipo de retorno padrão para todas as Server Actions
export type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: AppError; // Retorna o objeto completo de erro
  inputs?: Record<string, string>;
};