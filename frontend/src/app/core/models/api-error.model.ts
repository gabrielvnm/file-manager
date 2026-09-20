export interface ApiErroSimples {
  erro: string;
}

export interface ApiErroCampos {
  erros: Record<string, string[]>;
}

export interface AppError {
  message: string;
  fieldErrors?: Record<string, string[]>;
  status?: number;
}

export function isApiErroSimples(e: unknown): e is ApiErroSimples {
  return !!e && typeof e === 'object' && 'erro' in e;
}

export function isApiErroCampos(e: unknown): e is ApiErroCampos {
  return !!e && typeof e === 'object' && 'erros' in e;
}