import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from '../core/models/api-error.model';
import { normalizeHttpError } from '../core/http-error.util';
import { ArquivoService } from '../core/services/arquivo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  readonly form: FormGroup;
  readonly acceptedTypes = '.pdf,.png,.jpeg,.jpg';

  selectedFile: File | null = null;
  submitting = false;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly arquivoService: ArquivoService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    this.selectedFile = file;
    
    this.errorMessage = null;
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.form.invalid || !this.selectedFile) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.arquivoService
      .enviarArquivo({
        arquivo: this.selectedFile,
        nome: this.form.value.nome,
        descricao: this.form.value.descricao
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          
          this.router.navigate(['/files']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          const appError: AppError = normalizeHttpError(err);
          this.errorMessage = appError.message;
          this.applyFieldErrors(appError.fieldErrors);
        }
      });
  }

  resetForm(): void {
    this.form.reset({ nome: '', descricao: '' });
    this.selectedFile = null;
    this.errorMessage = null;
    
    const input = document.getElementById('arquivo') as HTMLInputElement | null;
    if (input) {
      input.value = '';
    }
  }

  
  private applyFieldErrors(fieldErrors?: Record<string, string[]>): void {
    if (!fieldErrors) {
      return;
    }
    for (const [field, messages] of Object.entries(fieldErrors)) {
      const control = this.form.get(field);
      if (control && messages.length > 0) {
        control.setErrors({ ...(control.errors ?? {}), server: messages[0] });
        control.markAsTouched();
      }
    }
  }
}