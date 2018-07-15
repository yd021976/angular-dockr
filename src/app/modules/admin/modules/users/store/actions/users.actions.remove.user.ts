import { Action } from '@ngrx/store';
import * as users_model from '../models/users.model';

export const USERS_REMOVE = "[USERS] REMOVE";
export const USERS_REMOVE_SUCCESS = "[USERS] REMOVE SUCCESS";
export const USERS_REMOVE_ERROR = "[USERS] REMOVE ERROR";

export class removeUser implements Action {
    readonly type = USERS_REMOVE;
    constructor(public payload:users_model.IUser) { }
}
export class removeUserSuccess implements Action {
    readonly type = USERS_REMOVE_SUCCESS;
    constructor(public payload: users_model.IUser) { }
}
export class removeUserError implements Action {
    readonly type = USERS_REMOVE_ERROR;
    constructor(public payload: string) { }
}

export type All =
    removeUser |
    removeUserSuccess |
    removeUserError;