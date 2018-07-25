import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import selectors from './store/selectors/user.selectors';
import { loginCredentials, IUser } from './store/models/user.model';
import * as userLogin_actions from './store/actions/user.actions';
import * as userLogin_services from './services';
/**
 * sandbox interface
 */
export interface ISandboxUserLogin {
  authenticateErrors$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string>;
  login(credentials: loginCredentials, redirect: Array<any>): void;
  logout(): void;
  authUser(): Promise<any>;
}



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
  constructor(private store: Store<any>, @Inject(userLogin_services.LoginServiceToken) private loginService: userLogin_services.IUserLoginService ) {
    this.authenticateErrors$ = this.store.select(selectors.getError);
    this.isAuthenticated$ = this.store.select(selectors.isAuthenticated);
    this.userRole$ = this.store.select(selectors.role);
  }

  /**
   * Login user
   */
  login(credentials, redirectTo) {
    this.store.dispatch(new userLogin_actions.userLogin({ credentials: credentials, redirectTo: redirectTo }));
  }

  logout() {
    this.store.dispatch(new userLogin_actions.userLogout());
  }

  /**
   * Authenticate the user with :
   * 1 - The current JWT stored in localstorage
   * 2 - As anonymous user if there is no valid JWT
   */
  authUser(): Promise<any> {
    return this.loginService.authUser()
      .then((credentials) => {
        this.store.dispatch(new userLogin_actions.userLoginSuccess(credentials));
        return credentials;
      })
      .catch((error) => {
        this.store.dispatch(new userLogin_actions.userLoginError(error.message));
        throw error;
      })
  }
}