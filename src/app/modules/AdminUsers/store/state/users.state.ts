import { NormalizedState } from 'ngrx-normalizr';

export type error = {
  hasError: boolean,
  error: string
}

export interface IUsers extends NormalizedState {
  selectedUser: string,
  isLoading: boolean,
  error: error
}

export const initialState = function (): IUsers {
  return {
    isLoading: false,
    selectedUser: '',
    error: { hasError: false, error: '' },
    normalized: {
      entities: {},
      result: []
    }
  }
}