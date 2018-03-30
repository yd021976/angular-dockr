import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';

import {TemplatesComponent} from '../components/templates/templates.component';

/** define module routes */
const routes = [
  {
    path: '', children: [
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
  exports: [
    RouterModule
  ],
})
export class templatesRouterModule { }