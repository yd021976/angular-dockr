import { Component, HostBinding, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { themeItem } from '../ui-components/nav-bar/nav-bar.component';
import user_selectors from '../shared/user/store/selectors/user.selectors';
import * as user_actions from '../shared/user/store/actions/user.actions';
import * as user_services from '../shared/user/services';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];
  public isAuthenticated$: Observable<boolean>;
  @HostBinding('class') componentCssClass; // Binding for theme change


  constructor(public router: Router, public store:Store<any>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(user_selectors.isAuthenticated);
    this.store.dispatch(new user_actions.userCheckAuth());
  }
  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  onLogin() {
    this.store.dispatch(new user_actions.userLoginNavigate());
  }
  onLogout() {
    this.store.dispatch(new user_actions.userLogoutNavigate());
  }
}
