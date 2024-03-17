export type Status = 'IDLE' | 'UPLOADING' | 'DONE' | 'ERROR';
export interface Post {
  id: number;
  coverUrl: string;
  imgurCoverUrl?: string;
  status: Status;
}
