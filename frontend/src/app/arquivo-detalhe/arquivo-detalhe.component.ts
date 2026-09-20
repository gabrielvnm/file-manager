import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppError } from '../core/models/api-error.model';
import { Arquivo } from '../core/models/arquivo.model';
import { Comentario } from '../core/models/comentario.model';
import { normalizeHttpError } from '../core/http-error.util';
import { ArquivoService } from '../core/services/arquivo.service';
import { ComentarioService } from '../core/services/comentario.service';

@Component({
  selector: 'app-arquivo-detalhe',
  templateUrl: './arquivo-detalhe.component.html',
  styleUrls: ['./arquivo-detalhe.component.css']
})
export class ArquivoDetalheComponent implements OnInit {
  arquivo: Arquivo | null = null;
  comentarios: Comentario[] = [];
  mostrandoFormulario = false;
  novoAutor = '';
  novoTexto = '';
  salvandoComentario = false;
  editing = false;
  saving = false;
  editNome = '';
  editDescricao = '';

  loading = true;
  error: AppError | null = null;
  downloading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly arquivoService: ArquivoService,
    private readonly comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id) || id <= 0) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.carregar(id);
  }

  editar(): void {
    if (!this.arquivo) return;
    this.editNome = this.arquivo.nome;
    this.editDescricao = this.arquivo.descricao ?? '';
    this.error = null;
    this.editing = true;
  }

  cancelarEdicao(): void {
    this.editing = false;
    this.editNome = '';
    this.editDescricao = '';
    this.error = null;
  }
  salvarEdicao(): void {
    if (!this.arquivo || this.saving) return;

    const nome = this.editNome.trim();
    const descricao = this.editDescricao.trim();
    if (nome === '') return;

    this.saving = true;

    this.arquivoService
      .atualizarArquivo(this.arquivo.id, {
        nome,
        descricao: descricao === '' ? null : descricao
      })
      .subscribe({
        next: (atualizado) => {
          this.arquivo = atualizado;
          this.editing = false;
          this.saving = false;
          this.editNome = '';
          this.editDescricao = '';
        },
        error: (err: HttpErrorResponse) => {
          this.error = normalizeHttpError(err);
          this.saving = false;
        }
      });
  }

  excluir(): void {
    if (!this.arquivo) return;
    if (!window.confirm('Excluir este arquivo? Os comentários também serão removidos.')) return;

    const id = this.arquivo.id;
    this.arquivoService.deletarArquivo(id).subscribe({
      next: () => {
        this.router.navigate(['/files']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = normalizeHttpError(err);
      }
    });
  }

  novoComentario(): void {
    this.mostrandoFormulario = true;
  }

  cancelarComentario(): void {
    this.mostrandoFormulario = false;
    this.novoAutor = '';
    this.novoTexto = '';
  }

  salvarComentario(): void {
    if (!this.arquivo || this.salvandoComentario) return;

    const autor = this.novoAutor.trim();
    const texto = this.novoTexto.trim();
    if (autor === '' || texto === '') return;

    this.salvandoComentario = true;

    this.comentarioService
      .adicionarComentario(this.arquivo.id, { autor, texto })
      .subscribe({
        next: (comentario) => {
          this.comentarios = [...this.comentarios, comentario];
          this.novoAutor = '';
          this.novoTexto = '';
          this.mostrandoFormulario = false;
          this.salvandoComentario = false;

          // Keep the parent list's commentCount in sync if the user navigates back.
          if (this.arquivo) {
            this.arquivo = {
              ...this.arquivo,
              commentCount: this.arquivo.commentCount + 1
            };
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = normalizeHttpError(err);
          this.salvandoComentario = false;
        }
      });
  }

  removerComentario(comentario: Comentario): void {
    if (!window.confirm('Remover este comentário?')) return;

    this.comentarioService.deletarComentario(comentario.id).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(c => c.id !== comentario.id);
        if (this.arquivo) {
          this.arquivo = {
            ...this.arquivo,
            commentCount: Math.max(0, this.arquivo.commentCount - 1)
          };
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = normalizeHttpError(err);
      }
    });
  }
  carregar(id: number): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      arquivo: this.arquivoService.buscarArquivo(id),
      comentarios: this.comentarioService.listarComentarios(id)
    }).subscribe({
      next: ({ arquivo, comentarios }) => {
        this.arquivo = arquivo;
        this.comentarios = comentarios;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = normalizeHttpError(err);
        this.loading = false;
      }
    });
  }

  baixar(): void {
    if (!this.arquivo || this.downloading) {
      return;
    }

    this.downloading = true;
    const arquivoAtual = this.arquivo;

    this.arquivoService.baixarArquivo(arquivoAtual.id).subscribe({
      next: (blob) => {
        const filename = this.buildDownloadFilename(arquivoAtual);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = normalizeHttpError(err);
        this.downloading = false;
      }
    });
  }

  trackByComentarioId(_index: number, comentario: Comentario): number {
    return comentario.id;
  }

  private buildDownloadFilename(arquivo: Arquivo): string {
    const suffix = `.${arquivo.tipo}`;
    return arquivo.nome.toLowerCase().endsWith(suffix)
      ? arquivo.nome
      : `${arquivo.nome}${suffix}`;
  }
}