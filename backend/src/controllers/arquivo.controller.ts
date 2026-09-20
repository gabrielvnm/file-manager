import type { Request, Response } from 'express'
import path from 'node:path'
import crypto from 'node:crypto'
import { promises as fs } from 'node:fs'
import { criarArquivoDto, atualizarArquivoDto } from '../dtos/arquivo.dto.js'
import * as arquivosService from '../services/arquivos.service.js'

const UPLOAD_DIR = 'uploads/'

// GET /arquivos
export function listarArquivos(req: Request, res: Response) {
  res.json(arquivosService.listar())
}

// GET /arquivos/:id
export function buscarArquivo(req: Request, res: Response) {
  const id = Number(req.params.id)
  const arquivo = arquivosService.buscarPorId(id)
  if (!arquivo) {
    res.status(404).json({ erro: 'Arquivo não encontrado.' })
    return
  }
  res.json(arquivo)
}

// GET /arquivos/:id/download
export function baixarArquivo(req: Request, res: Response) {
  const id = Number(req.params.id)
  const arquivo = arquivosService.buscarPorId(id)
  if (!arquivo) {
    res.status(404).json({ erro: 'Arquivo não encontrado.' })
    return
  }

  const ext = path.extname(arquivo.caminho)
  const downloadName = `${arquivo.nome}${ext}`

  res.download(arquivo.caminho, downloadName, err => {
    if (err && !res.headersSent) {
      res.status(500).json({ erro: 'Falha ao enviar o arquivo.' })
    }
  })
}

// POST /arquivos
export async function criarArquivo(req: Request, res: Response) {
  const resultado = criarArquivoDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  if (!req.file || !req.tipoDetectado) {
    res.status(500).json({ erro: 'Estado inconsistente no upload.' })
    return
  }

  const { nome, descricao } = resultado.data
  const tipo = req.tipoDetectado

  const ext = tipo === 'jpeg' ? 'jpg' : tipo
  const filename = `${crypto.randomUUID()}.${ext}`
  const caminho = path.join(UPLOAD_DIR, filename)

  try {
    await fs.writeFile(caminho, req.file.buffer)
  } catch {
    res.status(500).json({ erro: 'Falha ao salvar o arquivo.' })
    return
  }

  const novo = arquivosService.criar({ nome, caminho, tipo, descricao })
  res.status(201).json(novo)
}

// PATCH /arquivos/:id
export function atualizarArquivo(req: Request, res: Response) {
  const id = Number(req.params.id)
  const resultado = atualizarArquivoDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }
  const arquivo = arquivosService.atualizar(id, resultado.data)
  if (!arquivo) {
    res.status(404).json({ erro: 'Arquivo não encontrado.' })
    return
  }
  res.json(arquivo)
}

// DELETE /arquivos/:id
export async function removerArquivo(req: Request, res: Response) {
  const id = Number(req.params.id)
  const arquivo = arquivosService.buscarPorId(id)
  if (!arquivo) {
    res.status(404).json({ erro: 'Arquivo não encontrado.' })
    return
  }

  try {
    await fs.unlink(arquivo.caminho)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      res.status(500).json({ erro: 'Falha ao remover o arquivo.' })
      return
    }
  }

  arquivosService.remover(id)
  res.status(204).send()
}