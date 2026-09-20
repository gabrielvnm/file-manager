import { eq, sql } from 'drizzle-orm'
import { db } from '../db/index.js'
import { arquivos, comentarios } from '../db/schema.js'

export type Tipo = 'pdf' | 'jpeg' | 'png'

export type Arquivo = {
  id: number
  nome: string
  caminho: string
  tipo: Tipo
  descricao: string | null
  dataUpload: Date
  commentCount: number
}

const arquivoComContagem = {
  id: arquivos.id,
  nome: arquivos.nome,
  caminho: arquivos.caminho,
  tipo: arquivos.tipo,
  descricao: arquivos.descricao,
  dataUpload: arquivos.dataUpload,
  commentCount: sql<number>`count(${comentarios.id})`.as('commentCount'),
}

function paraDto(row: {
  id: number
  nome: string
  caminho: string
  tipo: Tipo
  descricao: string | null
  dataUpload: Date
  commentCount: number
}): Arquivo {
  return {
    id: row.id,
    nome: row.nome,
    caminho: row.caminho,
    tipo: row.tipo,
    descricao: row.descricao,
    dataUpload: row.dataUpload,
    commentCount: row.commentCount,
  }
}

export function listar(): Arquivo[] {
  const rows = db
    .select(arquivoComContagem)
    .from(arquivos)
    .leftJoin(comentarios, eq(comentarios.arquivoId, arquivos.id))
    .groupBy(arquivos.id)
    .all()
  return rows.map(paraDto)
}

export function buscarPorId(id: number): Arquivo | undefined {
  const row = db
    .select(arquivoComContagem)
    .from(arquivos)
    .leftJoin(comentarios, eq(comentarios.arquivoId, arquivos.id))
    .where(eq(arquivos.id, id))
    .groupBy(arquivos.id)
    .get()
  return row ? paraDto(row) : undefined
}

export function criar(dados: {
  nome: string
  caminho: string
  tipo: Tipo
  descricao?: string | undefined
}): Arquivo {
  const row = db
    .insert(arquivos)
    .values({
      nome: dados.nome,
      caminho: dados.caminho,
      tipo: dados.tipo,
      descricao: dados.descricao ?? null,
      dataUpload: new Date(),
    })
    .returning()
    .get()
  return paraDto({ ...row, commentCount: 0 })
}

export function atualizar(
  id: number,
  dados: { nome?: string | undefined; descricao?: string | null | undefined },
): Arquivo | undefined {
  const updated = db
    .update(arquivos)
    .set(dados)
    .where(eq(arquivos.id, id))
    .returning()
    .get()
  if (!updated) return undefined
  return buscarPorId(id)
}

export function remover(id: number): Arquivo | undefined {
  const row = db
    .delete(arquivos)
    .where(eq(arquivos.id, id))
    .returning()
    .get()
  return row ? paraDto({ ...row, commentCount: 0 }) : undefined
}