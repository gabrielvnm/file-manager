import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const arquivos = sqliteTable('arquivos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  caminho: text('caminho').notNull(),
  tipo: text('tipo', { enum: ['pdf', 'jpeg', 'png'] }).notNull(),
  descricao: text('descricao'),
  dataUpload: integer('data_upload', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type ArquivoRow = typeof arquivos.$inferSelect;
export type NovoArquivo = typeof arquivos.$inferInsert;

export const comentarios = sqliteTable('comentarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  arquivoId: integer('arquivo_id')
    .notNull()
    .references(() => arquivos.id, { onDelete: 'cascade' }),
  autor: text('autor').notNull(),
  texto: text('texto').notNull(),
  dataCriacao: integer('data_criacao', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type ComentarioRow = typeof comentarios.$inferSelect
export type NovoComentario = typeof comentarios.$inferInsert