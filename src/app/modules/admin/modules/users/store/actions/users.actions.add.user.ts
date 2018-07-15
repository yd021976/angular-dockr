import { Action } from '@ngrx/store';
import * as users_model from '../models/users.model';

export const USERS_ADD = "[USERS] ADD";
export const USERS_ADD_SUCCESS = "[USERS] ADD SUCCESS";
export const USERS_ADD_ERROR = "[USERS] ADD ERROR";

export class addUser implements Action {
    readonly type = USERS_ADD;
    constructor(public payload:users_model.IUser) { }
}
export class addUserSuccess implements Action {
    readonly type = USERS_ADD_SUCCESS;
    constructor(public payload: users_model.IUser) { }
}
export class addUserError implements Action {
    readonly type = USERS_ADD_ERROR;
    constructor(public payload: string) { }
}

export type All =
    addUser |
    addUserSuccess |
    addUserError;