import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';

import { MatSelectComponent } from '../components/mat-select/mat-select.component';

/** define module routes */
const routes: Route[] = [
  {
    path: '', data: { isMenu: true, title: 'Tests', icon: 'settings', isAuthRequired: false, roles: [] }, children: [
      {
        path: 'tests-mat-select', component: MatSelectComponent, data: { isMenu: true, title: 'Mat Select', link: 'tests-mat-select', isAuthRequired: false, roles: [] }
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
export class testsRouterModule { }