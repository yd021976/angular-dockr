import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';

import { LoginComponent } from '../containers/login/login.component';
import { LogoutComponent } from '../containers/logout/logout.component';
import * as guards from '../guards';

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
export class userLoginRouterModule {
  constructor(private router: Router, private route: ActivatedRoute) {
    // Add loginGuard to each route that require an authentificated user (use of "isAuthRequired" route data)
    this.router.config.
      filter(route => route.data && route.data.isAuthRequired).
      map(route => {
        route.canActivate = route.canActivate ? [guards.loginGuard].concat(route.canActivate) : [guards.loginGuard];
        route.canActivateChild = route.canActivateChild ? [guards.loginGuard].concat(route.canActivateChild) : [guards.loginGuard];
      })
  }
}