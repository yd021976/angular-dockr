import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as rxjs from 'rxjs';


import { themeItem } from '../shared/ui-components/nav-bar/nav-bar.component';
import { Store } from '@ngrx/store';
import { userLogin_module } from '../modules/userLogin';
import { BackdropComponent } from '../shared/ui-components/backdrop/backdrop.component';
import { OutletComponent } from '../shared/ui-components/outlet/outlet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];
  public isAuthenticated$: rxjs.Observable<boolean>;
  // @HostBinding('@.disabled')
  @HostBinding('class') componentCssClass; // Binding for theme change


  constructor(public router: Router, public store: Store<any>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(userLogin_module.store.selectors.isAuthenticated);
  }

  ngOnDestroy() { }

  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  onLogin() {
    this.store.dispatch(new userLogin_module.store.actions.userLoginNavigate());
  }
  onLogout() {
    this.store.dispatch(new userLogin_module.store.actions.userLogoutNavigate());
  }
}
