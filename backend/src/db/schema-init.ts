import { sqlite } from './index.js'

export function initSchema(): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS arquivos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      caminho TEXT NOT NULL,
      tipo TEXT NOT NULL,
      descricao TEXT,
      data_upload INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      arquivo_id INTEGER NOT NULL,
      autor TEXT NOT NULL,
      texto TEXT NOT NULL,
      data_criacao INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (arquivo_id) REFERENCES arquivos(id) ON DELETE CASCADE
    );
  `)
}