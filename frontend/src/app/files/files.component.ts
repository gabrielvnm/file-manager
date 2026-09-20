import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Arquivo, TipoArquivo } from '../core/models/arquivo.model';
import { AppError } from '../core/models/api-error.model';
import { ArquivoService } from '../core/services/arquivo.service';
import { normalizeHttpError } from '../core/http-error.util';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  arquivos: Arquivo[] = [];
  loading = false;
  error: AppError | null = null;

  filtroTipo: TipoArquivo | 'todos' = 'todos';
  ordenacao: 'dataUpload' | 'commentCount' = 'dataUpload';

  readonly iconByType: Record<TipoArquivo, string> = {
    pdf:  'assets/icons/pdf-icon.png',
    png:  'assets/icons/png-icon.png',
    jpeg: 'assets/icons/jpeg-icon.png',
  };

  constructor(private arquivoService: ArquivoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.error = null;
    this.arquivoService.listarArquivos().subscribe({
      next: (arquivos) => {
        this.arquivos = arquivos;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = normalizeHttpError(err);
        this.loading = false;
      }
    });
  }

  get arquivosVisiveis(): Arquivo[] {
    const filtrados =
      this.filtroTipo === 'todos'
        ? this.arquivos
        : this.arquivos.filter((a) => a.tipo === this.filtroTipo);

    return [...filtrados].sort((a, b) => {
      if (this.ordenacao === 'commentCount') {
        return b.commentCount - a.commentCount;
      }
      return new Date(b.dataUpload).getTime() - new Date(a.dataUpload).getTime();
    });
  }

  trackById(_index: number, arquivo: Arquivo): number {
    return arquivo.id;
  }
}