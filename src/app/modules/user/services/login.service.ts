import { Injectable, Injector, InjectionToken } from '@angular/core';
import * as user_model from '../store/models/user.model';
import * as feathersClient from 'feathers/client';


/**
 * Interface that feathers service must provide (@see feathersServiceToken)
 */
export interface userService {
  user: any;
  authenticate(payload?: user_model.loginCredentials): Promise<any>;
  logout(): Promise<void>;
  isAuth(): Promise<boolean>;
}

/**
 * Mock feather service if no one is provided by top level modules
 */
class feathersMock implements userService {
  user: any;
  authenticate(payload: user_model.loginCredentials) {
    return new Promise<boolean>((resolve, reject) => { resolve(true); });
  }
  logout() {
    return new Promise<void>((resolve, reject) => { resolve(); });
  }
  isAuth() {
    return new Promise<boolean>((resolve, reject) => { resolve(true); });
  }
}

class loginService implements userService {
  user: any;
  constructor(private feathers: userService) { }

  authenticate(payload?) {
    return this.feathers.authenticate(payload);
  }

  logout() {
    return this.feathers.logout();
  }

  isAuth() {
    return this.feathers.isAuth();
  }
}

/**
 * declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
 */
export const feathersServiceToken: InjectionToken<userService> = new InjectionToken<userService>('FeatherService');

/**
 * Declare "LoginService" token that this module provides
 */
export const LoginServiceToken: InjectionToken<userService> = new InjectionToken<userService>('LoginService');

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


