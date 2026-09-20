import { HttpErrorResponse } from '@angular/common/http';
import {
  AppError,
  isApiErroCampos,
  isApiErroSimples
} from './models/api-error.model';

export function normalizeHttpError(err: HttpErrorResponse): AppError {
  const status = err.status;
  const body = err.error;

  if (isApiErroCampos(body)) {
    return {
      message: 'Verifique os campos destacados.',
      fieldErrors: body.erros,
      status
    };
  }

  if (isApiErroSimples(body)) {
    return { message: body.erro, status };
  }

  if (status === 0) {
    return { message: 'Não foi possível conectar ao servidor.', status };
  }

  return { message: 'Ocorreu um erro inesperado.', status };
}