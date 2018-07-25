import { Injectable, Injector, InjectionToken } from '@angular/core';
import * as user_model from '../store/models/user.model';
import * as feathersClient from 'feathers/client';

/**
 * Interface that feathers service must provide (@see feathersServiceToken)
 */
export interface IFeatherService {
  authenticate(payload?: user_model.loginCredentials): Promise<any>;
  logout(): Promise<void>;
  isAuth(): Promise<boolean>;
}

/**
 * Interface that "user login" service must provide
 */
export interface IUserLoginService extends IFeatherService{
  authUser(): Promise<any>;
}

/**
 * Mock feather service if no one is provided by top level modules
 */
class feathersMock implements IUserLoginService {
  authenticate(payload: user_model.loginCredentials) {
    return new Promise<boolean>((resolve, reject) => { resolve(true); });
  }
  logout() {
    return new Promise<void>((resolve, reject) => { resolve(); });
  }
  isAuth() {
    return new Promise<boolean>((resolve, reject) => { resolve(true); });
  }
  authUser() {
    return new Promise<boolean>((resolve, reject) => { resolve(true); });
  }
}

class loginService implements IUserLoginService {
  constructor(private feathers: IFeatherService) { }

  authenticate(payload?) {
    return this.feathers.authenticate(payload);
  }

  logout() {
    return this.feathers.logout();
  }

  isAuth() {
    return this.feathers.isAuth();
  }
  authUser():Promise<any> { 
    return this.isAuth()
      .then((isAuth) => {
        // We already have a token stored in local storage => Try to authenticate again
        if (isAuth) {
          return this.authenticate()
            .then(response => {
              // this.store.dispatch(new user_actions.userLoginSuccess(response));
              return response;
            })
          // We don't have a valid token in local storage : auth as anonymous
        } else {
          return this.authenticate({ strategy: 'anonymous' })
            .then(response => {
              // this.store.dispatch(new user_actions.userLoginSuccess(response));
              return response;
            })
        }
      })
      // Error occured in the process
      .catch(error => {
        // this.store.dispatch(new user_actions.userLoginError(error.message));
        throw error;
      })
  }
}

/**
 * declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
 */
export const feathersServiceToken: InjectionToken<IFeatherService> = new InjectionToken<IFeatherService>('FeatherService');

/**
 * Declare "LoginService" token that this module provides
 */
export const LoginServiceToken: InjectionToken<IUserLoginService> = new InjectionToken<IUserLoginService>('LoginService');

export const loginServiceFactory = (injector: Injector) => {
  var feathers = null;
  try {
    feathers = injector.get(feathersServiceToken);
    return new loginService(feathers);
  }
  catch{
    feathers = new feathersMock();
  }
  return feathers;

}


