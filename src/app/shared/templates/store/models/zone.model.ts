import { schema } from 'normalizr';

export interface IZone {
  _id: string;
  name: string;
}

export const schemas = new schema.Entity('zones', {}, { idAttribute: '_id' });