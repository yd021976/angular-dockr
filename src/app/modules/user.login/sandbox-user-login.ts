import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as userLogin_selectors from './store/selectors/user.selectors';
import { loginCredentials } from './store/models/user.model';
import * as userLogin_actions from './store/actions/user.actions';
import * as userLogin_services from './services';
import * as userLogin_model from './store/models/user.model';
/**
 * sandbox interface
 */
export interface ISandboxUserLogin {
  authenticateErrors$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string>;
  login(credentials: loginCredentials): Promise<boolean>;
  logout(): Promise<any>;
  authUser(): Promise<userLogin_model.loginSuccess>;
}

export const sandboxUserLoginToken = new InjectionToken<ISandboxUserLogin>('sandbox');


/**
 * Sandbox implementation
 */
@Injectable()
export class sandboxUserLogin implements ISandboxUserLogin {
  public authenticateErrors$: Observable<string>;
  public isAuthenticated$: Observable<boolean>;
  public userRole$: Observable<string>;

  /**
   * Ctor
   */
  constructor(
    private store: Store<any>,
    @Inject(userLogin_services.LoginServiceToken) private loginService: userLogin_services.IUserLoginService) {

    // Init observable streams from store
    this.authenticateErrors$ = this.store.select(userLogin_selectors.getError);
    this.isAuthenticated$ = this.store.select(userLogin_selectors.isAuthenticated);
    this.userRole$ = this.store.select(userLogin_selectors.userRole);
  }

  /**
   * Login user
   */
  login(credentials): Promise<boolean> {
    return this.loginService.logout().then(() => {
      return this.loginService.authenticate(credentials).then((user) => {
        this.store.dispatch(new userLogin_actions.userLoginSuccess(user));
        return true;
      })
    }).catch((error) => {
      this.store.dispatch(new userLogin_actions.userLoginError(error.message));
      return false;
    })
    // this.store.dispatch(new userLogin_actions.userLogin({ credentials: credentials, redirectTo: redirectTo }));
  }

  logout(): Promise<any> {
    return this.loginService.logout()
      .then(() => this.store.dispatch(new userLogin_actions.userLogoutSuccess()))
      .catch((error) => this.store.dispatch(new userLogin_actions.userLogoutError(error.message)))
  }

  /**
   * Authenticate the user with :
   * 1 - The current JWT stored in localstorage
   * 2 - As anonymous user if there is no valid JWT
   */
  authUser(): Promise<userLogin_model.loginSuccess> {
    return this.loginService.authUser()
      .then((user) => {
        this.store.dispatch(new userLogin_actions.userLoginSuccess(user));
        return user;
      })
      .catch((error) => {
        this.store.dispatch(new userLogin_actions.userLoginError(error.message));
        throw error;
      })
  }
}