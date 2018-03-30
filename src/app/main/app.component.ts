import { Component, HostBinding, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { themeItem } from '../ui-components/nav-bar/nav-bar.component';
import { Store } from '@ngrx/store';
import { user_module } from '../shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];
  public isAuthenticated$: Observable<boolean>;
  @HostBinding('class') componentCssClass; // Binding for theme change


  constructor(public router: Router, public store: Store<any>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(user_module.store.selectors.isAuthenticated);
  }


  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  ngOnDestroy() { }

  onLogin() {
    this.store.dispatch(new user_module.store.actions.userLoginNavigate());
  }
  onLogout() {
    this.store.dispatch(new user_module.store.actions.userLogoutNavigate());
  }
}
