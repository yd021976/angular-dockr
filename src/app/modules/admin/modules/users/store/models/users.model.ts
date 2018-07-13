import { schema } from 'normalizr';
// import * as zone_model from './zone.model';

export interface IUsers {
  _id?: string;
  mail: string;
  role?:string;
}

// export const schemas = new schema.Entity('users', { idAttribute: '_id' });