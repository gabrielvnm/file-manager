import type { Request, Response, NextFunction } from 'express'
import { fileTypeFromBuffer } from 'file-type'

const ALLOWED: Record<string, 'pdf' | 'jpeg' | 'png'> = {
  pdf: 'pdf',
  jpg: 'jpeg',
  png: 'png',
}
declare global {
  namespace Express {
    interface Request {
      tipoDetectado?: 'pdf' | 'jpeg' | 'png' | undefined
    }
  }
}

export async function detectarTipo(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    res.status(400).json({ erro: 'Nenhum arquivo enviado.' })
    return
  }

  const detected = await fileTypeFromBuffer(req.file.buffer)

  if (!detected || !(detected.ext in ALLOWED)) {
    res.status(400).json({
      erro: 'Formato de arquivo não permitido. Use pdf, jpeg ou png.',
    })
    return
  }

  req.tipoDetectado = ALLOWED[detected.ext]
  next()
}