import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Arquivo,
  ArquivoUpdatePayload,
  ArquivoUploadPayload
} from '../models/arquivo.model';

@Injectable({ providedIn: 'root' })
export class ArquivoService {
  private readonly apiUrl = `${environment.apiUrl}/arquivos`;

  constructor(private http: HttpClient) {}

  listarArquivos(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(this.apiUrl);
  }

  buscarArquivo(id: number): Observable<Arquivo> {
    return this.http.get<Arquivo>(`${this.apiUrl}/${id}`);
  }

  enviarArquivo(payload: ArquivoUploadPayload): Observable<Arquivo> {
    const form = new FormData();
    form.append('arquivo', payload.arquivo, payload.arquivo.name);
    form.append('nome', payload.nome);
    if (payload.descricao != null && payload.descricao !== '') {
      form.append('descricao', payload.descricao);
    }
    return this.http.post<Arquivo>(this.apiUrl, form);
  }

  atualizarArquivo(id: number, payload: ArquivoUpdatePayload): Observable<Arquivo> {
    return this.http.patch<Arquivo>(`${this.apiUrl}/${id}`, payload);
  }

  deletarArquivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  baixarArquivo(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }
}