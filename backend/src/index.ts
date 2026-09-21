import express from 'express'
import cors from 'cors'
import arquivoRoutes from './routes/arquivo.routes.js'
import comentarioRoutes from './routes/comentario.routes.js'
import { runSeed } from '../scripts/seed.js'
import { initSchema } from './db/schema-init.js'

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`Origem não permitida pelo CORS: ${origin}`))
  },
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/arquivos', arquivoRoutes)
app.use(comentarioRoutes)

app.use((req, res) => {
  res.status(404).json({ error: `Rota ${req.method} ${req.url} não encontrada.` })
})

initSchema()
await runSeed()

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})