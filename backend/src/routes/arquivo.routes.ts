import { Router } from 'express';
import {
    listarArquivos,
    buscarArquivo,
    criarArquivo,
    atualizarArquivo,
    removerArquivo,
    baixarArquivo
} from '../controllers/arquivo.controller.js';
import { upload } from '../middleware/upload.js';
import { detectarTipo } from '../middleware/detectarTipo.js';

const router = Router()


router.get('/', listarArquivos)
router.get('/:id/download', baixarArquivo)
router.get('/:id', buscarArquivo)
router.post('/', upload.single('arquivo'),detectarTipo, criarArquivo)
router.patch('/:id', atualizarArquivo)
router.delete('/:id', removerArquivo)

export default router