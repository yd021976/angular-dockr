import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';

import { TemplatesComponent } from '../components/templates/templates.component';

/** define module routes */
const routes: Route[] = [
  {
    path: '', data: { isMenu: true, title: 'Manage Templates', icon: 'settings', isAuthRequired: true, roles: ['admin,users'] }, children: [
      {
        path: 'templates_home', component: TemplatesComponent, data: { isMenu: true, title: 'Templates', link: 'templates_home', isAuthRequired: true, roles: ['admin,users'] }
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