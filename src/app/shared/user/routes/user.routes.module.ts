import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';

import * as user_guards from '../guards';

/** define module routes */
const routes = [
  {
    path: 'login', component: LoginComponent, data: { isMenu: false, title: 'Login' }
  }, {
    path: 'logout', component: LogoutComponent, data: { isMenu: false }
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class userRouterModule {
  constructor(private router: Router, private route: ActivatedRoute) {
    // Add loginGuard to all routes that require an authentificated user
    this.router.config.
      filter(route => route.data && route.data.isAuthRequired).
      map(route => {
        route.canActivate = route.canActivate ? [user_guards.loginGuard].concat(route.canActivate) : [user_guards.loginGuard];
        route.canActivateChild = route.canActivateChild ? [user_guards.loginGuard].concat(route.canActivateChild) : [user_guards.loginGuard];
      })
  }
}