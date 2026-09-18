import { Component } from '@angular/core';
import { UploadFormValue } from '../types/upload-form';
import { FileType } from '../types/file-item';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  model: UploadFormValue = {
    fileName: '',
    desc: '',
    type: 'pdf',
  };

  submitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  readonly fileTypes: { value: FileType; label: string }[] = [
    { value: 'pdf',  label: 'PDF' },
    { value: 'png',  label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' },
  ];

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    // TODO: replace with a service call to the backend.
    // For now, just simulate a successful submission.
    this.submitting = true;

    // Simulated success — remove this whole block when the real call goes in.
    setTimeout(() => {
      this.submitting = false;
      this.successMessage = `Arquivo "${this.model.fileName}" enviado com sucesso!`;
      this.resetForm();

      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }, 600);
  }

  resetForm(): void {
    this.model = { fileName: '', desc: '', type: 'pdf' };
    this.errorMessage = null;
  }

  dismissSuccess(): void {
    this.successMessage = null;
  }
}