import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISandboxUserLogin } from '../../sandbox-userLogin';

@Component({
  selector: 'user-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;

  constructor(@Inject('sandbox-user-login') private sandbox: ISandboxUserLogin) {
    this.isAuthenticated$ = this.sandbox.isAuthenticated$;
  }

  ngOnInit() { }

  onLogout() {
    this.sandbox.logout();
  }
}
