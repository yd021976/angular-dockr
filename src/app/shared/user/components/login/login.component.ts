import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as user_model from '../../store/models/user.model';
import * as user_actions from '../../store/actions/user.actions';
import user_selectors from '../../store/selectors/user.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: user_model.loginCredentials = { strategy: 'local', email: '', password: '' };
  public AuthError$: Observable<string>;

  constructor(public store: Store<user_model.IUser>) {
    this.AuthError$ = this.store.select(user_selectors.getError);
  }

  ngOnInit() {
  }

  onLogin() {
    this.store.dispatch(new user_actions.userLogin(this.credentials));
  }
}
