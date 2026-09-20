import { z } from 'zod'

export const criarComentarioDto = z.object({
  autor: z.string().min(1),
  texto: z.string().min(1),
})

export const atualizarComentarioDto = criarComentarioDto.partial()