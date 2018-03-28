import { Injectable, Inject } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import * as user_services from '../../services';
import { Observable } from "rxjs/Observable";
import * as userActions from "../actions/user.actions";
import { Router } from "@angular/router";


@Injectable()
export class effects {
  constructor(
    @Inject(user_services.feathersServiceToken) private featherService: user_services.service,
    private router: Router,
    private actions$: Actions) { }


  /**
  * navigate to login page
  */
  @Effect({ dispatch: false })
  navigateLogin$: Observable<userActions.userLoginNavigate> = this.actions$
    .ofType<userActions.userLoginNavigate>(userActions.USER_LOGIN_NAVIGATE)
    .do(_ => {
      return this.router.navigate(['login']);
    });

  /**
  * navigate to logout page
  */
  @Effect({ dispatch: false })
  navigateLogout$: Observable<userActions.userLogoutNavigate> = this.actions$
    .ofType<userActions.userLogoutNavigate>(userActions.USER_LOGOUT_NAVIGATE)
    .do(_ => {
      return this.router.navigate(['logout']);
    });


  /** 
  * Loggin action effect : Request Feathers server to authenticate user, then dispatch success or error actions
  */
  @Effect()
  loginUser$: Observable<Action> = this.actions$.ofType<userActions.userLogin>(userActions.USER_LOGIN)
    .mergeMap((action) =>
      this.featherService.authenticate(action.payload)
        .then((response) => {
          return new userActions.userLoginSuccess(response);
        })
        .catch(error => {
          return new userActions.userLoginError(error.message);
        })
    );

  @Effect()
  logoutUser$: Observable<Action> = this.actions$.ofType<userActions.userLogout>(userActions.USER_LOGOUT)
    .mergeMap((action) =>
      this.featherService.logout()
        .then(() => { return new userActions.userLogoutSuccess() })
        .catch((error) => { return new userActions.userLogoutError(error.message) })
    );

  @Effect()
  checkAuth$: Observable<Action> = this.actions$.ofType<userActions.userCheckAuth>(userActions.USER_CHECK_AUTH)
    .mergeMap((action) =>
      // Query if we are authenticated  
      this.featherService.isAuth()
        .then((response) => {
          // If JWT is valid, authenticate user otherwise ensure logout user
          return response == true ? new userActions.userLogin() : new userActions.userLogout();
        })
        // Error while check auth
        .catch((error) => {
          return new userActions.userLogout();
        })
    )
}