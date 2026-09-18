import { FileType } from './file-item';

export interface UploadFormValue {
  fileName: string;
  desc: string;
  type: FileType;
}