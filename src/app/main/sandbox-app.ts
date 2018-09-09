import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as userLogin_service from '../modules/user.login/services';
import * as userLogin_selectors from '../modules/user.login/store/selectors/user.selectors';
import * as userLogin_actions from '../modules/user.login/store/actions/user.actions';
import { FeathersService, feathersServiceToken, IConnectionState } from '../shared/services/feathers/feathers.service';

export const sandboxAppToken: InjectionToken<ISandboxApp> = new InjectionToken<ISandboxApp>('sandbox-app');

export interface ISandboxApp {
  isAuthenticated$: Observable<boolean>;
  ApiServiceConnectionState$: Observable<IConnectionState>;
  // apiService: FeathersService,
  authUser(): void;
  navigateLogin();
  navigateLogout();
}

@Injectable()
export class mockSandboxApp implements ISandboxApp {
  isAuthenticated$;
  ApiServiceConnectionState$;

  constructor(@Inject(feathersServiceToken) public apiService) { }
  authUser() { }
  navigateLogin() { }
  navigateLogout() { }
}


@Injectable()
export class sandboxApp implements ISandboxApp {
  public isAuthenticated$: Observable<boolean>;
  public ApiServiceConnectionState$: Observable<IConnectionState>;

  constructor(
    @Inject(feathersServiceToken) private apiService:FeathersService,
    @Inject(userLogin_service.LoginServiceToken) private userLoginService: userLogin_service.IUserLoginService,
    private store: Store<any>) {
    this.isAuthenticated$ = this.store.select(userLogin_selectors.isAuthenticated);
    this.ApiServiceConnectionState$ = this.apiService.connectionState$;
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