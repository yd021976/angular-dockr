import { NormalizedState, normalized, createSchemaSelectors } from 'ngrx-normalizr';

export type error = {
  hasError: boolean,
  error: string
}

export interface IUser {
}

export const initialState = function (): IUser {
  return {

  }
}