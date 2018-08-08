import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { RemoveData, SetData } from 'ngrx-normalizr';
import { IUser, schemas } from "./store/models/users.model";
import * as adminUsers_selectors from './store/selectors/users.selectors';
import * as adminUsers_actions from './store/actions';
import * as adminUsers_services from './services/users';

export const sandboxServiceToken: InjectionToken<ISandboxAdminUsers> = new InjectionToken<ISandboxAdminUsers>('sandbox-admin-users');

export interface ISandboxAdminUsers {
  users$: Observable<Array<IUser>>;
  role$: Observable<any>;
  isLoading$: Observable<boolean>;
  loadingUsers$: Observable<boolean>;
  loadingError$: Observable<string>;

  loadUsers(): void;
  selectUser(IUser): void;
  saveUser(IUser): void;
}

@Injectable()
export class sandboxAdminUsers implements ISandboxAdminUsers {
  public users$;
  public selectedUser$;
  public role$;
  public isLoading$: Observable<boolean>;
  public loadingUsers$: Observable<boolean>;
  public loadingError$: Observable<string>;

  constructor(private store: Store<any>, @Inject(adminUsers_services.adminUsersServiceToken) private usersService: adminUsers_services.IAdminUsersService) {
    this.users$ = this.store.select(adminUsers_selectors.default.getUsersList);
    this.loadingError$ = this.store.select(adminUsers_selectors.default.getErrorMessage);
    this.isLoading$ = this.store.select(adminUsers_selectors.default.isLoading);

    this.role$ = new Observable<any>(); // TODO: update stream with real "admin user selector"
  }
  public loadUsers() {
    this.store.dispatch(new adminUsers_actions.loadUsers());
    this.usersService.getAll().then((users) => {
      var data: Array<IUser> = users['data'] ? users['data'] : users;
      this.store.dispatch(new adminUsers_actions.loadUsersSuccess(data));
      this.store.dispatch(new SetData({ data: data, schema: schemas }));
    }).catch((error) => {
      this.store.dispatch(new SetData({ data: [], schema: schemas }));
      this.store.dispatch(new adminUsers_actions.loadUsersError(error.message));
    })
  }
  public selectUser() { }
  public saveUser() { }
}