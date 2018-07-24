import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as user_model from '../../store/models/user.model';
import * as user_actions from '../../store/actions/user.actions';
import user_selectors from '../../store/selectors/user.selectors';
import { ISandboxUserLogin } from '../../sandbox-userLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public credentials: user_model.loginCredentials = { strategy: 'local', email: '', password: '' };
  public AuthError$: Observable<string>;
  private subscribes: Array<Subscription>;
  private redirectTo: Array<any>;

  constructor(@Inject('sandbox-user-login') private sandbox: ISandboxUserLogin, public route: ActivatedRoute) {
    this.AuthError$ = this.sandbox.authenticateErrors$;
    this.subscribes = new Array<Subscription>(); // Streams subscriptions objects (to clean up after destroy)
  }

  ngOnInit() {
    /**
     * Get url to redirect to after login success
     */
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
    // TODO: Find a way to redirect when loggin user is successfull
    this.sandbox.login(this.credentials, this.redirectTo);
  }
}
