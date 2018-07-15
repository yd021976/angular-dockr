import { Action } from '@ngrx/store';
import * as users_model from '../models/users.model';

export const USERS_GET_LIST = "[USERS] GET LIST";
export const USERS_GET_LIST_SUCCESS = "[USERS] GET LIST SUCCESS";
export const USERS_GET_LIST_ERROR = "[USERS] GET LIST ERROR";

export class getUsersList implements Action {
    readonly type = USERS_GET_LIST;
    constructor() { }
}
export class getUsersListSuccess implements Action {
    readonly type = USERS_GET_LIST_SUCCESS;
    constructor(public payload: users_model.IUser[]) { }
}
export class getUsersListError implements Action {
    readonly type = USERS_GET_LIST_ERROR;
    constructor(public payload: string) { }
}



export type All =
    getUsersList |
    getUsersListSuccess |
    getUsersListError;