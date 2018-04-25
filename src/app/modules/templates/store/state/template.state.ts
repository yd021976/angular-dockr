import { NormalizedState, normalized, createSchemaSelectors } from 'ngrx-normalizr';

export type error = {
  hasError: boolean,
  error: string
}

export interface ITemplates extends NormalizedState {
  selectedTemplateId: string;
  selectedZoneId: string;
  error: error
}

export const initialState = function (): ITemplates {
  return {
    selectedTemplateId: '',
    selectedZoneId: '',
    error: {
      hasError: false,
      error: '',
    },
    normalized: {
      entities: {},
      result: []
    }
  }
}