import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';

import { TemplatesContainer } from '../containers';

/** define module routes */
const routes: Route[] = [
  {
    path: 'templates_menu', data: { isMenu: true, title: 'Manage Templates', icon: 'settings', isAuthRequired: true, roles: ['admin','users'] }, children: [
      {
        path: 'templates', component: TemplatesContainer, data: { isMenu: true, title: 'Templates', link: 'templates_menu/templates', isAuthRequired: true, roles: ['admin','users'] }
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  exports: [
    RouterModule
  ],
})
export class templatesRouterModule { }