import { Action } from '@ngrx/store';
import * as users_model from '../models/users.model';

export const USERS_UPDATE = "[USERS] UPDATE";
export const USERS_UPDATE_SUCCESS = "[USERS] UPDATE SUCCESS";
export const USERS_UPDATE_ERROR = "[USERS] UPDATE ERROR";

export class updateUser implements Action {
    readonly type = USERS_UPDATE;
    constructor(public payload:users_model.IUser) { }
}
export class updateUserSuccess implements Action {
    readonly type = USERS_UPDATE_SUCCESS;
    constructor(public payload: users_model.IUser) { }
}
export class updateUserError implements Action {
    readonly type = USERS_UPDATE_ERROR;
    constructor(public payload: string) { }
}

export type All =
    updateUser |
    updateUserSuccess |
    updateUserError;