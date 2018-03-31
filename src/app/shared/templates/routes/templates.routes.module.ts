import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';

import { TemplatesComponent } from '../components/templates/templates.component';
import { user_module } from '../../user';

/** define module routes */
const routes: Route[] = [
  {
    path: '', canActivate: [user_module.guards.loginGuard], children: [
      {
        path: 'templates_home', component: TemplatesComponent, data: { isMenu: true, title: 'Templates', link: 'templates_home' }
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    user_module.guards.loginGuard
  ],
  exports: [
    RouterModule
  ],
})
export class templatesRouterModule { }