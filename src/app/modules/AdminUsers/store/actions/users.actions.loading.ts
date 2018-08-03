import { Action } from '@ngrx/store';
import * as users_model from '../models';

export enum loadingTypes {
  LOAD_USERS = "[USERS] LOAD",
  LOAD_USERS_SUCCESS = "[USERS] LOAD SUCCESS",
  LOAD_USERS_ERROR = "[USERS] LOAD ERROR"
}

export class loadUsers implements Action {
  readonly type = loadingTypes.LOAD_USERS;
  constructor() { }
}

export class loadUsersSuccess implements Action {
  readonly type = loadingTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: users_model.IUser[]) { }
}

export class loadUsersError implements Action {
  readonly type = loadingTypes.LOAD_USERS_ERROR;
  constructor(public payload: string) { }
}

export type loadingClasses = loadUsers | loadUsersSuccess | loadUsersError;