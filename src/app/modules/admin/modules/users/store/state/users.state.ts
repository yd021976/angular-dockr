import { NormalizedState, normalized, createSchemaSelectors } from 'ngrx-normalizr';
import * as users_model from '../models';

export type error = {
  hasError: boolean,
  error: string
}

export const initialState = function (): users_model.IUser {
  return {
    _id: '',
    mail: '',
    role : []
  }
}