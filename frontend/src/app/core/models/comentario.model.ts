export interface Comentario {
  id: number;
  arquivoId: number;
  autor: string;
  texto: string;
  dataCriacao: string;        
}

export interface ComentarioCreatePayload {
  autor: string;
  texto: string;
}