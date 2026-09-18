export type FileType = 'pdf' | 'png' | 'jpeg';

export interface FileItem {
  id: number;
  name: string;
  desc: string;
  type: FileType;
  uploadedAt: Date;
  comments: number;
}