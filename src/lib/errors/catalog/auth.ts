import { AppError } from "../types";

export const AUTH_ERRORS = {
  // Login
  INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    message: 'E-mail ou senha incorretos. Tente novamente.',
    techDescription: 'Falha no signInWithPassword do Supabase. Credenciais inválidas.',
    category: 'AUTH',
    httpStatus: 401
  } as AppError,
  
  USER_NOT_FOUND: {
    code: 'AUTH_002',
    message: 'Não encontramos uma conta com este e-mail.',
    techDescription: 'Usuário não existe na tabela auth.users.',
    category: 'AUTH',
    action: { label: 'Criar uma conta', url: '/register' }
  } as AppError,

  // Registro
  EMAIL_ALREADY_IN_USE: {
    code: 'AUTH_003',
    message: 'Este e-mail já está cadastrado.',
    techDescription: 'Tentativa de signUp com email existente.',
    category: 'AUTH',
    action: { label: 'Recuperar Senha', url: '/forgot-password' }
  } as AppError,

  WEAK_PASSWORD: {
    code: 'AUTH_004',
    message: 'Sua senha é muito fraca. Use letras, números e símbolos.',
    techDescription: 'Senha não atende aos requisitos de segurança do Supabase.',
    category: 'VALIDATION'
  } as AppError,
  
  // Geral
  SESSION_EXPIRED: {
    code: 'AUTH_005',
    message: 'Sua sessão expirou. Faça login novamente para continuar.',
    techDescription: 'Token JWT inválido ou expirado.',
    category: 'AUTH',
    action: { label: 'Ir para Login', url: '/login' }
  } as AppError,
};