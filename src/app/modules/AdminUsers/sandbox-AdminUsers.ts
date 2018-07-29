import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { IUser } from "./store/models/users.model";
import * as adminUsers_selectors from './store/selectors/users.selectors';

export interface ISandboxAdminUsers {
  users$: Observable<Array<IUser>>;
  role$: Observable<any>;
  selectUser(IUser);
  saveUser(IUser);
}

@Injectable()
export class sandboxAdminUsers implements ISandboxAdminUsers {
  public users$;
  public role$;
  constructor(private store: Store<IUser>) {
    this.users$ = this.store.select(adminUsers_selectors.default.getUsersList);
    this.role$ = new Observable<any>(); // TODO: update stream with real "admin user selector"
   }
  public selectUser() { }
  public saveUser() { }
}