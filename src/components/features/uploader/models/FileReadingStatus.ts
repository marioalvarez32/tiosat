export interface FileReadingStatus {
  fileDirectory: string;
  filePath: string;
  status: 'loading' | 'success' | 'error' | 'pending';
  message?: string;
  originalFile?: File;
}