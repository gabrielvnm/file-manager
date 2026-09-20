export type TipoArquivo = 'pdf' | 'jpeg' | 'png';

export interface Arquivo {
  id: number;
  nome: string;
  caminho: string;            
  tipo: TipoArquivo;
  descricao: string | null;
  dataUpload: string;         
  commentCount: number;
}

export interface ArquivoUpdatePayload {
  nome?: string;
  descricao?: string | null;
}

export interface ArquivoUploadPayload {
  arquivo: File;
  nome: string;
  descricao?: string | null;
}