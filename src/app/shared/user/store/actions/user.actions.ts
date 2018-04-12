import * as user_model from '../models/user.model';
import { Action } from '@ngrx/store';
import { Credentials } from 'feathers-authentication-client';

export const USER_LOGIN = '[USER] LOGIN';
export const USER_LOGIN_NAVIGATE = '[USER] LOGIN NAVIGATE';
export const USER_LOGIN_SUCCESS = '[USER] LOGIN SUCCESS';
export const USER_LOGIN_ERROR = '[USER] LOGIN ERROR';
export const USER_LOGOUT = '[USER] LOGOUT';
export const USER_LOGOUT_NAVIGATE = '[USER] LOGOUT NAVIGATE';
export const USER_LOGOUT_SUCCESS = '[USER] LOGOUT SUCCESS';
export const USER_LOGOUT_ERROR = '[USER] LOGOUT ERROR';
export const USER_CHECK_AUTH = '[USER] CHECK AUTH';



/** Getter actions */
export class userLogin implements Action {
  readonly type = USER_LOGIN;
  constructor(public payload?: {credentials:user_model.loginCredentials, redirectTo:Array<any>}) { }
}
export class userLoginNavigate implements Action {
  readonly type = USER_LOGIN_NAVIGATE;
  constructor() { }
}
export class userLoginSuccess implements Action {
  readonly type = USER_LOGIN_SUCCESS;
  constructor(public payload: {credentials:user_model.loginSuccess}) { }
}
export class userLoginError implements Action {
  readonly type = USER_LOGIN_ERROR;
  constructor(public payload: string) { }
}
export class userLogout implements Action {
  readonly type = USER_LOGOUT;
}
export class userLogoutNavigate implements Action {
  readonly type = USER_LOGOUT_NAVIGATE;
  constructor() { }
}
export class userLogoutSuccess implements Action {
  readonly type = USER_LOGOUT_SUCCESS;
}
export class userLogoutError implements Action {
  readonly type = USER_LOGOUT_ERROR;
  constructor(public payload: string) { }
}
// TODO: Should we keep this action or just use loginService methods ?
export class userCheckAuth implements Action {
  readonly type = USER_CHECK_AUTH;
  constructor() { }
}


export type All =
  userLogin |
  userLoginNavigate |
  userLoginSuccess |
  userLoginError |
  userLogout |
  userLogoutNavigate |
  userLogoutSuccess |
  userLogoutError |
  userCheckAuth;