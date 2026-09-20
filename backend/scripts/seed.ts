import { promises as fs } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileTypeFromFile } from 'file-type'
import { eq } from 'drizzle-orm'
import { db } from '../src/db/index.js'
import { arquivos } from '../src/db/schema.js'

const SEED_DIR = path.resolve('seed-files')
const UPLOAD_DIR = path.resolve('uploads')

const ALLOWED: Record<string, 'pdf' | 'jpeg' | 'png'> = {
  pdf: 'pdf',
  jpg: 'jpeg',
  jpeg: 'jpeg',
  png: 'png',
}

async function limpar(): Promise<void> {
  db.delete(arquivos).run()

  const entries = await fs.readdir(UPLOAD_DIR)
  await Promise.all(
    entries
      .filter(name => name !== '.gitkeep')
      .map(name => fs.unlink(path.join(UPLOAD_DIR, name))),
  )
}

async function semear(): Promise<void> {
  const entries = await fs.readdir(SEED_DIR)
  const files = entries.filter(name => !name.startsWith('.'))

  for (const filename of files) {
    const origem = path.join(SEED_DIR, filename)
    const detected = await fileTypeFromFile(origem)

    if (!detected || !(detected.ext in ALLOWED)) {
      console.warn(`skipping ${filename}: tipo não permitido`)
      continue
    }

    const tipo = ALLOWED[detected.ext]
    if (!tipo) {
      console.warn(`skipping ${filename}: tipo desconhecido`)
      continue
    }

    const ext = tipo === 'jpeg' ? 'jpg' : tipo
    const novoNome = `${crypto.randomUUID()}.${ext}`
    const destino = path.join(UPLOAD_DIR, novoNome)

    await fs.copyFile(origem, destino)

    const nome = path.parse(filename).name

    db.insert(arquivos)
      .values({
        nome,
        caminho: path.join('uploads', novoNome),
        tipo,
      })
      .run()

    console.log(`seeded ${nome} (${tipo}) -> uploads/${novoNome}`)
  }
}

async function main(): Promise<void> {
  await limpar()
  await semear()
  console.log('seed concluído')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})