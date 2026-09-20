import type { Request, Response } from 'express'
import { criarComentarioDto } from '../dtos/comentario.dto.js'
import * as comentariosService from '../services/comentarios.service.js'

// GET /arquivos/:id/comentarios
export function listarComentarios(req: Request, res: Response) {
  const arquivoId = Number(req.params.id)
  const lista = comentariosService.listarPorArquivo(arquivoId)
  res.json(lista)
}

// POST /arquivos/:id/comentarios
export function criarComentario(req: Request, res: Response) {
  const arquivoId = Number(req.params.id)

  const resultado = criarComentarioDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  const comentario = comentariosService.criar(arquivoId, resultado.data)
  if (!comentario) {
    res.status(404).json({ erro: 'Arquivo não encontrado.' })
    return
  }
  res.status(201).json(comentario)
}

// DELETE /comentarios/:id
export function removerComentario(req: Request, res: Response) {
  const id = Number(req.params.id)
  const removido = comentariosService.remover(id)
  if (!removido) {
    res.status(404).json({ erro: 'Comentário não encontrado.' })
    return
  }
  res.status(204).send()
}