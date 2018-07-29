import { Injectable, Inject } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as user_components from '../components';
import { ISandboxUserLogin } from '../sandbox-user-login';

@Injectable()
export class loginGuard implements CanActivate, CanActivateChild {

  constructor(
    @Inject('sandbox-user-login') private sandbox: ISandboxUserLogin,
    private _router: Router,
    private dialog: MatDialog) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called -- ' + new Date(Date.now()));
    const requiredRoles: Array<any> = _route.data['roles'] ? _route.data['roles'] : [];

    // Restrict access to roles defined in route data
    if (requiredRoles.length != 0) {
      // Ensure a user is authenticated (anonymous or real user)
      return this.sandbox.authUser()
        .then(user => {
          // If user role doesn't meet requirements : Cancel navigation
          if (!this.checkPrivileges(user.role, _route.data['roles'])) {
            this._showDialog({
              requiredRoles: _route['roles'],
              title: _route.data['title'],
              url: state.url
            });
            return false;

            // User role meet route requirements
          } else {
            return true;
          }
        })
        // Error while authenticate user
        .catch(error => {
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
  }

  /**
  * Check if user role matches on of the route required roles
  */
  private checkPrivileges(userRole: string, requiredRoles: Array<string>): boolean {
    if (userRole === undefined) return false;

    return requiredRoles.some((val, index) => {
      return val === userRole
    });
  }

  /**
   * show dialog to redirect to login page if user does not meet route role requirements
   */
  private _showDialog(data: { requiredRoles: Array<string>, title: string, url: string }) {
    // does user want to login to access this page ?
    var dial = this.dialog.open(user_components.AuthDialogComponent, {
      data:
      {
        title: "You are not allowed to view this page",
        requiredRoles: data.requiredRoles,
        message: `Do you want to log in as a different user to access page ${data.title} ?`
      }
    })
      .afterClosed().subscribe((selection) => {
        if (selection == true) {
          this._router.navigate(['login'], { queryParams: { redirectTo: data.url } });
        }
      });
  }
}