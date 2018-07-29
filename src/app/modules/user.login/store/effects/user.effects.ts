import { Injectable, Inject } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import * as user_service from '../../services/index';
import * as user_actions from '../actions/user.actions';

@Injectable()
export class effects {
  constructor(
    @Inject(user_service.LoginServiceToken) private featherService: user_service.IUserLoginService,
    private router: Router,
    private actions$: Actions) { }


  /**
  * navigate to login page
  */
  @Effect({ dispatch: false })
  navigateLogin$: Observable<user_actions.userLoginNavigate> = this.actions$
    .ofType<user_actions.userLoginNavigate>(user_actions.USER_LOGIN_NAVIGATE)
    .do(_ => {
      return this.router.navigate(['login']);
    });

  /**
  * navigate to logout page
  */
  @Effect({ dispatch: false })
  navigateLogout$: Observable<user_actions.userLogoutNavigate> = this.actions$
    .ofType<user_actions.userLogoutNavigate>(user_actions.USER_LOGOUT_NAVIGATE)
    .do(_ => {
      return this.router.navigate(['logout']);
    });


  /** 
  * Loggin action effect : Request Feathers server to authenticate a new user, then dispatch success or error actions
  */
  // @Effect()
  // loginUser$: Observable<Action> = this.actions$
  //   .ofType<user_actions.userLogin>(user_actions.USER_LOGIN)
  //   .switchMap(action =>
  //     this.featherService.logout() // First ensure logout current user
  //       .then(() => this.featherService.authenticate(action.payload.credentials)) // Then login new user
  //       .then((authenticatedUser) => {
  //         return new user_actions.userLoginSuccess({ credentials: authenticatedUser, redirectTo: action.payload.redirectTo })
  //       })
  //       .catch((error) => { return new user_actions.userLogout(), new user_actions.userLoginError(error.message) })
  //   )

  /**
   * After login success navigate to last requested url. Default to / if payload is empty.
   */
  // @Effect({ dispatch: false })
  // loginUserSuccess$: Observable<Action> = this.actions$
  //   .ofType<user_actions.userLoginSuccess>(user_actions.USER_LOGIN_SUCCESS)
  //     .do((action) => {
  //     if (action.payload.redirectTo) this.router.navigateByUrl(action.payload.redirectTo);
  //   });


  @Effect()
  logoutUser$: Observable<Action> = this.actions$.ofType<user_actions.userLogout>(user_actions.USER_LOGOUT)
    .mergeMap((action) =>
      this.featherService.logout()
        .then(() => { return new user_actions.userLogoutSuccess() })
        .catch((error) => { return new user_actions.userLogoutError(error.message) })
    );

  // @Effect()
  // checkAuth$: Observable<Action> = this.actions$.ofType<user_actions.userCheckAuth>(user_actions.USER_CHECK_AUTH)
  //   .mergeMap((action) =>
  //     // Query if we are authenticated  
  //     this.featherService.isAuth()
  //       .then((response) => {
  //         // If JWT is valid, authenticate user otherwise ensure logout user
  //         return response == true ? new user_actions.userLogin() : new user_actions.userLogout();
  //       })
  //       // Error while check auth
  //       .catch((error) => {
  //         return new user_actions.userLogout();
  //       })
  //   )
}