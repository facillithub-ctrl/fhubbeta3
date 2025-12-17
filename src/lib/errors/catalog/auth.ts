import { AppError } from "../types";

export const AUTH_ERRORS = {
  // --- LOGIN ---
  INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    message: 'E-mail ou senha incorretos.',
    techDescription: 'Credenciais inválidas no signInWithPassword.',
    category: 'AUTH',
  } as AppError,
  
  // --- REGISTRO ---
  EMAIL_ALREADY_IN_USE: {
    code: 'AUTH_002',
    message: 'Este e-mail já possui uma conta Facillit.',
    techDescription: 'User already registered (Supabase 422/400).',
    category: 'AUTH',
    action: { label: 'Fazer Login', url: '/login' }
  } as AppError,

  PASSWORDS_DO_NOT_MATCH: {
    code: 'AUTH_003',
    message: 'As senhas digitadas não conferem.',
    techDescription: 'Validação de confirmação de senha falhou no server action.',
    category: 'VALIDATION'
  } as AppError,

  WEAK_PASSWORD_LENGTH: {
    code: 'AUTH_004',
    message: 'A senha deve ter no mínimo 6 caracteres.',
    techDescription: 'Senha curta (< 6 chars).',
    category: 'VALIDATION'
  } as AppError,

  WEAK_PASSWORD_GENERIC: {
    code: 'AUTH_005',
    message: 'Senha muito fraca. Escolha uma combinação mais segura.',
    techDescription: 'Supabase rejeitou a senha (security policy).',
    category: 'VALIDATION'
  } as AppError,

  // --- SISTEMA ---
  RATE_LIMIT_EXCEEDED: {
    code: 'SYS_429',
    message: 'Muitas tentativas. Aguarde um momento antes de tentar novamente.',
    techDescription: 'Supabase Rate Limit Exceeded.',
    category: 'SYSTEM'
  } as AppError,

  GENERIC_ERROR: {
    code: 'SYS_500',
    message: 'Não foi possível completar a ação. Tente novamente.',
    techDescription: 'Erro não tratado no bloco try/catch.',
    category: 'SYSTEM'
  } as AppError,
};