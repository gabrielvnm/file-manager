import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { comentarios, arquivos } from '../db/schema.js'

export type Comentario = {
  id: number
  arquivoId: number
  autor: string
  texto: string
  dataCriacao: Date
}

function paraDto(row: {
  id: number
  arquivoId: number
  autor: string
  texto: string
  dataCriacao: Date
}): Comentario {
  return {
    id: row.id,
    arquivoId: row.arquivoId,
    autor: row.autor,
    texto: row.texto,
    dataCriacao: row.dataCriacao,
  }
}

export function listarPorArquivo(arquivoId: number): Comentario[] {
  const rows = db
    .select()
    .from(comentarios)
    .where(eq(comentarios.arquivoId, arquivoId))
    .all()
  return rows.map(paraDto)
}

export function criar(
  arquivoId: number,
  dados: { autor: string; texto: string },
): Comentario | undefined {
  // Guard: the parent file must exist. This mirrors the behavior of the
  // comment endpoints — 404 if the arquivo doesn't exist.
  const pai = db
    .select({ id: arquivos.id })
    .from(arquivos)
    .where(eq(arquivos.id, arquivoId))
    .get()
  if (!pai) return undefined

  const row = db
    .insert(comentarios)
    .values({
      arquivoId,
      autor: dados.autor,
      texto: dados.texto,
    })
    .returning()
    .get()
  return paraDto(row)
}

export function remover(id: number): Comentario | undefined {
  const row = db
    .delete(comentarios)
    .where(eq(comentarios.id, id))
    .returning()
    .get()
  return row ? paraDto(row) : undefined
}