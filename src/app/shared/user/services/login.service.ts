import { Injectable, Injector, InjectionToken } from '@angular/core';
import * as user_model from '../store/models/user.model';


/**
 * Interface that feathers service must provide (@see feathersServiceToken)
 */
export interface service {
  user: any;
  authenticate(payload?: user_model.loginCredentials): Promise<any>
  logout(): Promise<any>
  isAuth(): Promise<any>
}

/**
 * Mock feather service if no one is provided by top level modules
 */
class feathersMock implements service {
  user: any;
  authenticate(payload: user_model.loginCredentials) {
    return new Promise<any>((resolve, reject) => { resolve(true); });
  }
  logout() {
    return new Promise<any>((resolve, reject) => { resolve(true); });
  }
  isAuth() {
    return new Promise<any>((resolve, reject) => { resolve(true); });
  }
}


/**
 * declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
 */
export const feathersServiceToken:InjectionToken<service> = new InjectionToken<service>('FeatherService');

/**
 * Declare "LoginService" token that this module provides
 */
export const LoginServiceToken:InjectionToken<service> = new InjectionToken<service>('LoginService');

export const loginServiceFactory = (injector: Injector) => {
  var feathers = null;
  try {
    feathers = injector.get(feathersServiceToken);
    return feathers;
  }
  catch{
    feathers = new feathersMock();
  }
  return feathers;

}


