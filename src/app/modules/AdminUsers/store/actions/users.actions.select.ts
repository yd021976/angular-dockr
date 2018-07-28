import { Action } from '@ngrx/store';
import * as users_model from '../models';

export enum actionTypes {
  SELECT_USERS = "[USERS] SELECT USER",
}

export class selectUser implements Action {
  readonly type = actionTypes.SELECT_USERS;
  constructor(public payload:users_model.IUser) { }
}

export type All = selectUser;