import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as userLogin_service from '../modules/user.login/services';
import * as userLogin_selectors from '../modules/user.login/store/selectors/user.selectors';
import * as userLogin_actions from '../modules/user.login/store/actions/user.actions';
import { eventHandler, feathersServiceToken } from '../shared/services/feathers/feathers.service';

export const sandboxAppToken: InjectionToken<ISandboxApp> = new InjectionToken<ISandboxApp>('sandbox-app');

export interface ISandboxApp {
  isAuthenticated$: Observable<boolean>;

  authUser(): void;
  navigateLogin();
  navigateLogout();
}

@Injectable()
export class mockSandboxApp implements ISandboxApp {
  isAuthenticated$;

  constructor(@Inject(feathersServiceToken) private feathers) {
    let a = 0;
  }
  authUser() { }
  navigateLogin() { }
  navigateLogout() { }
}


@Injectable()
export class sandboxApp implements ISandboxApp {
  public isAuthenticated$: Observable<boolean>;

  constructor(
    @Inject(userLogin_service.LoginServiceToken) private userLoginService: userLogin_service.IUserLoginService,
    private store: Store<any>) {
    this.isAuthenticated$ = this.store.select(userLogin_selectors.isAuthenticated);
  }

  private _apiBackendHandler(eventName: string, eventData: any) {
  }


  navigateLogin() {
    this.store.dispatch(new userLogin_actions.userLoginNavigate());
  }


  navigateLogout() {
    this.store.dispatch(new userLogin_actions.userLogoutNavigate());
  }


  /**
   * Authenticate user with JWT in localstorage if any, otherwise as anonymous
   */
  authUser() {
    this.userLoginService.authUser().then(user => {
      this.store.dispatch(new userLogin_actions.userLoginSuccess(user));
    }).catch(error => {
      this.store.dispatch(new userLogin_actions.userLoginError(error.message));
    })
  }
}