import { Injectable, Inject } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import * as user_services from '../services/login.service';
import * as user_actions from '../store/actions/user.actions';
import * as user_components from '../components';
import * as user_model from '../store/models/user.model';
import * as user_selectors from '../store/selectors/user.selectors';
import { Subscription } from '../../../../../node_modules/rxjs';

@Injectable()
export class loginGuard implements CanActivate, CanActivateChild {
  private observableSubscribe: Subscription;
  private userRole = "";

  constructor(
    private _router: Router,
    @Inject(user_services.LoginServiceToken) private loginService: user_services.userService,
    private store: Store<any>,
    private dialog: MatDialog
  ) {
    this.observableSubscribe = this.store.select(user_selectors.default.role).subscribe((role) => { this.userRole = role });
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called -- ' + new Date(Date.now()));
    const requiredRoles: Array<any> = _route.data['roles'] ? _route.data['roles'] : [];
    const roleBool = requiredRoles[this.userRole];

    // Restrict access to roles defined in route data
    if (requiredRoles.length != 0) {
      // Ensure a user is authneticated (anonymous or real user)
      return this._ensureAuthUser(_route)
        .then(isAuth => {
          // User role doesn't meet requirements : Cancel navigation
          if (requiredRoles[this.userRole] === undefined) {
            // does user want to login to access this page ?
            var dial = this.dialog.open(user_components.AuthDialogComponent, {
              data:
              {
                title: "You are not allowed to view this page",
                message: "Do you want to login to access page '" + _route.data['title'] + "'"
              }
            })
              .afterClosed().subscribe((selection) => {
                if (selection == true) {
                  this._router.navigate(['login'], { queryParams: { redirectTo: _route.url } });
                }
              });
            return false;

            // User role meet route requirements
          } else {
            return true;
          }
        })
        // Error while authenticate user
        .catch(error => {
          this.store.dispatch(new user_actions.userLoginError('[AuthGuard] Error in <canActivate>:' + error.message));
          return false;
        })
    } else {
      // No role restriction needed by route, user can navigate
      return true;
    }

  }
  canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivateChild called');
    return this._ensureAuthUser(_route);
  }

  private _ensureAuthUser(_route: ActivatedRouteSnapshot) {
    // LoginService has no logged in user sets
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        this.authUser(resolve, reject);
      }, 500);
    });
  }

  /**
   * Ensure we have user authenticated (anonymous or not)
   */
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

          // We don't have a valid token in local storage : auth as anonymous
        } else {
          this.loginService.authenticate({ strategy: 'anonymous' })
            .then(response => {
              this.store.dispatch(new user_actions.userLoginSuccess(response));
              resolve(true);
            })
            .catch(error => {
              this.store.dispatch(new user_actions.userLoginError(error.message));
              resolve(false);
            });
        }
      })
      // Error occured in the process
      .catch(error => {
        this.store.dispatch(new user_actions.userLoginError(error.message));
        resolve(false);
      })
  }
}