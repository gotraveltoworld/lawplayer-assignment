export const IMGUR_API = 'https://api.imgur.com/3/image';
export const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
export enum IMG_STATUS {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}
