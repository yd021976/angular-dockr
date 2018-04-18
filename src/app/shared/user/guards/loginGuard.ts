import { Injectable, Inject } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import * as user_services from '../services/login.service';
import * as user_actions from '../store/actions/user.actions';
import * as user_components from '../components';

@Injectable()
export class loginGuard implements CanActivate, CanActivateChild {
  private authObservable$: Observable<boolean>;

  constructor(
    private _router: Router,
    @Inject(user_services.LoginServiceToken) private loginService: user_services.userService,
    private store: Store<any>,
    private dialog: MatDialog
  ) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called -- ' + new Date(Date.now()));

    // Only perform auth checking if route require a authenticated user
    if (_route.data['isAuthRequired']) {
      return this._checkAuth(_route)
        .then(isAuth => {
          if (isAuth == false) {
            // does user want to login to access this page ?
            this.dialog.open(user_components.AuthDialogComponent, {
              data:
                {
                  title: "Authenticated user required",
                  message: "Do you want to login to access page '" + _route.data['title'] + "'"
                }
            }).afterClosed().subscribe((selection) => {
              if (selection == true) {
                return this._router.navigate(['login'], {
                  queryParams:
                    {
                      redirectTo: _route.url
                    }
                });
              } else {
                return false;
              }
            })
          } else {
            return true;
          }
        })
        .catch(error => {
          this.store.dispatch(new user_actions.userLoginError('[AuthGuard] Error in <canActivate>:' + error.message));
          return false;
        })
    } else {
      return true;
    }

  }
  canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivateChild called');
    return this._checkAuth(_route);
  }

  private _checkAuth(_route: ActivatedRouteSnapshot) {
    // LoginService has no logged in user sets
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        this.authUser(resolve, reject);
      }, 500);
    });
  }

  private authUser(resolve, reject) {
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
  }
}