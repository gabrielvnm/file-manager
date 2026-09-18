import { Component, OnInit } from '@angular/core';
import { FileItem, FileType } from '../types/file-item';
import { PLACEHOLDER_FILES } from './placeholder';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  files: FileItem[] = [];

  readonly iconByType: Record<FileType, string> = {
    pdf:  'assets/icons/pdf-icon.png',
    png:  'assets/icons/png-icon.png',
    jpeg: 'assets/icons/jpeg-icon.png',
  };

  ngOnInit(): void {
    // TODO: replace with a call to the backend service.
    // The template doesn't care where `files` comes from.
    this.files = PLACEHOLDER_FILES;
  }

  trackById(_index: number, file: FileItem): number {
    return file.id;
  }
}