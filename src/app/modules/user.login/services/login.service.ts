import { InjectionToken } from '@angular/core';
import * as user_model from '../store/models/user.model';

/**
 * Interface that backend (feathers for example) service must provide (@see backendServiceToken)
 */
export interface IBackendService {
  authenticate(payload?: user_model.loginCredentials): Promise<user_model.loginSuccess>;
  logout(): Promise<void>;
  isAuth(): Promise<boolean>;
}

/**
 * Interface that "user login" service must provide
 */
export interface IUserLoginService extends IBackendService {
  authUser(): Promise<any>;
}

/**
 * Mock feather service if no one is provided by top level modules
 */
class loginServiceMock implements IUserLoginService {
  authenticate(payload: user_model.loginCredentials) {
    return new Promise<user_model.loginSuccess>((resolve, reject) => { resolve({}); });
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
  constructor(private backendService: IBackendService) { }

  authenticate(payload?): Promise<user_model.loginSuccess> {
    let userModel: user_model.loginSuccess = {};

    return this.backendService.authenticate(payload).then((user) => {
      Object.assign(userModel, user);
      return userModel;
    });
  }

  logout() {
    return this.backendService.logout();
  }

  isAuth() {
    return this.backendService.isAuth();
  }
  authUser(): Promise<user_model.loginSuccess> {
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
export const backendServiceToken: InjectionToken<IBackendService> = new InjectionToken<IBackendService>('user.login.backendservice');

/**
 * Declare "LoginService" token that this module provides
 */
export const LoginServiceToken: InjectionToken<IUserLoginService> = new InjectionToken<IUserLoginService>('LoginService');

/**
 * 
 * @param backendService 
 */
export const loginServiceFactory = (backendService:IBackendService) => {
  if (backendService) {
    return new loginService(backendService);
  } else {
    return new loginServiceMock();
  }
}


