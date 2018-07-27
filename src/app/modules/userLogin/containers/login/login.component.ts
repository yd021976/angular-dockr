import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as user_model from '../../store/models/user.model';
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
  private redirectTo: string;

  constructor(@Inject('sandbox-user-login') private sandbox: ISandboxUserLogin, public route: ActivatedRoute, private router: Router) {
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
        this.redirectTo = params['redirectTo'] || '/';
      }));
  }
  ngOnDestroy() {
    this.subscribes.forEach(sub => sub.unsubscribe());
  }

  /**
   * Authenticate user and if successfull, redirect to last requested URL if any
   */
  onLogin() {
    this.sandbox.login(this.credentials).then((result) => {
      if (result == true) {
        this.router.navigateByUrl(this.redirectTo);
      }
    })
  }
}
