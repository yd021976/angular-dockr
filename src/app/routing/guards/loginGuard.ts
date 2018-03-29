import { Injectable, Inject } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as user_services from '../../shared/user/services/login.service';
import * as user_actions from '../../shared/user/store/actions/user.actions';


@Injectable()
export class loginGuard implements CanActivate, CanActivateChild {
  private authObservable$: Observable<boolean>;

  constructor(private _router: Router, @Inject(user_services.LoginServiceToken) private loginService: user_services.service, private store: Store<any>) {
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called');

    return this.checkAuth(_route);
  }
  canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivateChild called');
    return this.checkAuth(_route);
  }

  private checkAuth(_route: ActivatedRouteSnapshot) {

    // LoginService has no logged in user sets
    if (this.loginService.user == null) {
      return new Promise<boolean>((resolve, reject) => {
        this.loginService.isAuth()
          .then((isAuth) => {
            // We already have a token stored in local storage => Try to authenticate again
            if (isAuth) {
              this.loginService.authenticate()
                .then(response => {
                  this.store.dispatch(new user_actions.userLoginSuccess(response));
                  resolve(true);
                })
                .catch(error => {
                  this.store.dispatch(new user_actions.userLoginError(error.message));
                  resolve(false);
                });
              
              // We don't have a valid token in local storage
            } else {
              this.store.dispatch(new user_actions.userLogout());
              resolve(false);
            }
          })
          // Error occured in the process
          .catch(error => {
            this.store.dispatch(new user_actions.userLoginError(error.message));
            resolve(false);
          })
      });

      // LoginService has already a logged in user sets
    } else {
      return new Promise<boolean>((resolve, reject) => {
        this.loginService.isAuth()
          .then(isAuth => {
            if (isAuth) {
              // Ensure store is up to date with logged in user
              this.store.dispatch(new user_actions.userLoginSuccess(this.loginService.user));
              resolve(true);
            } else {
              // Token has expired
              this.store.dispatch(new user_actions.userLogout());
              resolve(false);
            }
          })
          // Error while check isAuth()
          .catch(error => {
            this.store.dispatch(new user_actions.userLoginError(error.message));
            resolve(false);
          });
      });
    }
  }
}