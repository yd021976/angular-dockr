import { Component, HostBinding, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { themeItem } from '../shared/ui-components/nav-bar/nav-bar.component';
import { user_login_module } from '../modules/user.login';
import * as sandbox from './sandbox-app';
import { BackdropComponent } from '../shared/ui-components/backdrop/backdrop.component';
import { OutletComponent } from '../shared/ui-components/outlet/outlet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];

  // @HostBinding('@.disabled')
  @HostBinding('class') componentCssClass; // Binding for theme change


  constructor(@Inject(sandbox.sandboxAppToken) public sandbox: sandbox.ISandboxApp, public router: Router) { }

  ngOnInit() {
    return this.sandbox.initApiBackend()
      .then((status) => {
        this.sandbox.authUser();
      })
      .catch(error => {

      })
  }

  ngOnDestroy() { }

  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  onLogin() {
    this.sandbox.navigateLogin();
  }
  onLogout() {
    this.sandbox.navigateLogout();
  }
}
