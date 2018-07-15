// import { schema } from 'normalizr';

export interface IUser {
  _id?: string;
  mail: string;
  role?:Array<string>;
}

// export const schemas = new schema.Entity('users', { idAttribute: '_id' });