import { schema } from 'normalizr';

export interface IUser {
  id: string;
  email: string;
  authenticated: boolean;
  role: string;
  token: string;
  error: string;
}

export const schemas = new schema.Entity('users');


/** Login credentials type */
export type loginCredentials = {
  strategy: string,
  email?: string,
  password?: string,
  requestedUrl? : string
}
export type loginSuccess = {
  email?: string;
  nickname?: string;
  preferences?: any;
  role?: string;
}