import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as user_model from '../../store/models/user.model';
import * as user_actions from '../../store/actions/user.actions';
import user_selectors from '../../store/selectors/user.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public credentials: user_model.loginCredentials = { strategy: 'local', email: '', password: '' };
  public AuthError$: Observable<string>;
  private subscribes: Array<Subscription>;
  private redirectTo:Array<any>;

  constructor(public store: Store<user_model.IUser>, public route: ActivatedRoute) {
    this.AuthError$ = this.store.select(user_selectors.getError);
    this.subscribes = new Array();
  }

  ngOnInit() {
    this.subscribes.push(this.route
      .queryParams
      .subscribe(params => {
        // Defaults to '' if no query param provided.
        this.redirectTo = params['redirectTo'] || <any>[];
      }));
  }
  ngOnDestroy() {
    this.subscribes.forEach(sub => sub.unsubscribe());
  }

  onLogin() {
    this.store.dispatch(new user_actions.userLogin({ credentials: this.credentials, redirectTo: this.redirectTo }));
  }
}
