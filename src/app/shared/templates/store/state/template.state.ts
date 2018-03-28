import { NormalizedState, normalized, createSchemaSelectors } from 'ngrx-normalizr';

export interface ITemplates extends NormalizedState {
  selectedTemplateId: string;
  selectedZoneId: string;
}

export const initialState = function (): ITemplates {
  return {
    selectedTemplateId: '',
    selectedZoneId: '',
    normalized: {
      entities: {},
      result: []
    }
  }
}