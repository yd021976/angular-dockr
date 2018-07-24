import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import selectors from './store/selectors/user.selectors';
import { loginCredentials,IUser } from './store/models/user.model';
import * as user_actions from './store/actions/user.actions';

/**
 * sandbox interface
 */
export interface ISandboxUserLogin {
  authenticateErrors$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  login(credentials: loginCredentials, redirect: Array<any>): void;
  logout(): void;
}



/**
 * Sandbox implementation
 */
export class sandboxUserLogin implements ISandboxUserLogin {
  public authenticateErrors$: Observable<string>;
  public isAuthenticated$: Observable<boolean>;

  /**
   * Ctor
   */
  constructor(private store: Store<IUser>) {
    this.authenticateErrors$ = this.store.select(selectors.getError);
    this.isAuthenticated$ = this.store.select(selectors.isAuthenticated);
  }

  /**
   * Login user
   */
  login(credentials, redirectTo) {
    this.store.dispatch(new user_actions.userLogin({ credentials: credentials, redirectTo: redirectTo }));
  }

  logout() {

  }
}