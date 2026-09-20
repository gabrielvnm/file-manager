import { z } from 'zod'

export const criarArquivoDto = z.object({
  nome: z
    .string({
      error: issue =>
        issue.input === undefined
          ? 'O campo nome é obrigatório.'
          : 'O nome deve ser um texto.',
    })
    .min(1, 'O nome deve ter ao menos 1 caractere.'),
  descricao: z.string().optional(),
})

export const atualizarArquivoDto = criarArquivoDto.partial()

export type CriarArquivoDto = z.infer<typeof criarArquivoDto>
export type AtualizarArquivoDto = z.infer<typeof atualizarArquivoDto>