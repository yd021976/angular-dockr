import { schema } from 'normalizr';

export interface IFile {
  _id: string;
  name: string;
  extension: string;
  path: string;
  url: string;
}

export interface IFiles {
  files: IFile[],
  error: string,
  isError: boolean
}

export const schemas = new schema.Entity('files', {}, { idAttribute: '_id' });