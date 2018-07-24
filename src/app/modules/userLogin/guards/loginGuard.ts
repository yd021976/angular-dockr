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
import { ValueTransformer } from '@angular/compiler/src/util';

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
    this.observableSubscribe = this.store.select(user_selectors.default.role).subscribe((role) => {
      this.userRole = role
    }
    );
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called -- ' + new Date(Date.now()));
    const requiredRoles: Array<any> = _route.data['roles'] ? _route.data['roles'] : [];
    // return true;

    // Restrict access to roles defined in route data
    if (requiredRoles.length != 0) {
      // Ensure a user is authenticated (anonymous or real user)
      return this._ensureAuthUser(_route)
        .then(isAuth => {
          // If user role doesn't meet requirements : Cancel navigation
          if (!this.checkPrivileges(this.userRole,_route.data['roles'])) {
            // does user want to login to access this page ?
            var dial = this.dialog.open(user_components.AuthDialogComponent, {
              data:
              {
                title: "You are not allowed to view this page",
                requiredRoles: _route.data['roles'],
                message: `Do you want to log in as a different user to access page ${_route.data['title']} ?`
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
    return true;
    // return this._ensureAuthUser(_route);
  }

  private _ensureAuthUser(_route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.authUser().then((auth) => {
      return true;
    }).catch((err) => {
      return false;
    })
  }

  /**
   * Ensure we have user authenticated, at least authenticate as anonymous user
   */
  private async authUser(): Promise<boolean> {
    return this.loginService.isAuth()
      .then((isAuth) => {
        // We already have a token stored in local storage => Try to authenticate again
        if (isAuth) {
          return this.loginService.authenticate()
            .then(response => {
              this.store.dispatch(new user_actions.userLoginSuccess(response));
              return true;
            })
          // We don't have a valid token in local storage : auth as anonymous
        } else {
          return this.loginService.authenticate({ strategy: 'anonymous' })
            .then(response => {
              this.store.dispatch(new user_actions.userLoginSuccess(response));
              return true;
            })
        }
      })
      // Error occured in the process
      .catch(error => {
        this.store.dispatch(new user_actions.userLoginError(error.message));
        return false;
      })
  }

  /**
   * Check if user role matches on of the route required roles
   */
  private checkPrivileges(userRole: string, requiredRoles: Array<string>): boolean {
    if (userRole===undefined) return false;

    return requiredRoles.some((val, index) => { 
      return val === userRole }
    );
  }
}