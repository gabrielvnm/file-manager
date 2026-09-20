import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Comentario,
  ComentarioCreatePayload
} from '../models/comentario.model';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarComentarios(arquivoId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(
      `${this.apiUrl}/arquivos/${arquivoId}/comentarios`
    );
  }

  adicionarComentario(
    arquivoId: number,
    payload: ComentarioCreatePayload
  ): Observable<Comentario> {
    return this.http.post<Comentario>(
      `${this.apiUrl}/arquivos/${arquivoId}/comentarios`,
      payload
    );
  }

  deletarComentario(comentarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comentarios/${comentarioId}`);
  }
}