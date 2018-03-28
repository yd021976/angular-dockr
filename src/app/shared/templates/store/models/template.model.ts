import { schema } from 'normalizr';
import * as zone_model from './zone.model';

export interface ITemplate {
  _id: string;
  name: string;
  zones: Array<zone_model.IZone>;
}

export const schemas = new schema.Entity('templates', { zones: [zone_model.schemas] }, { idAttribute: '_id' });