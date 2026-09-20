import { Router } from 'express'
import { criarComentario, listarComentarios, removerComentario } from '../controllers/comentarios.controller.js'


const router = Router()

router.get('/arquivos/:id/comentarios', listarComentarios)
router.post('/arquivos/:id/comentarios', criarComentario)
router.delete('/comentarios/:id', removerComentario)

export default router