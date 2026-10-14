export interface IStorageService {
  upload(file: Buffer, key: string, mimeType: string): Promise<string>;
  getSignedUrl(key: string): Promise<string>;
  getSignedUrl(key?: string | null): Promise<string | null>;
  delete(key: string): Promise<void>;
  download(storageKey: string): Promise<Buffer>;
}
