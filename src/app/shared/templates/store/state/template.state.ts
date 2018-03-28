import { NormalizedState, normalized, createSchemaSelectors } from 'ngrx-normalizr';

export interface ITemplates extends NormalizedState {
  selectedTemplateId: string;
  selectedZoneId: string;
  error: {
    hasError: boolean,
    error: string
  }
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