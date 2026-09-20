import express from 'express'
import cors from 'cors'
import arquivoRoutes from './routes/arquivo.routes.js'
import comentarioRoutes from './routes/comentario.routes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/arquivos', arquivoRoutes)
app.use(comentarioRoutes)

app.use((req, res) => {
  res.status(404).json({ error: `Rota ${req.method} ${req.url} não encontrada.` })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})