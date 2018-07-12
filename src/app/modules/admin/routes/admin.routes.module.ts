import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';
import { UsersModule } from '../modules/users/users.module';

/** define module routes */
const routes: Route[] = [
  {
    path: 'admin_home', data: { isMenu: true, title: 'Admin', link: 'admin_home', isAuthRequired: false, roles: [] },
    loadChildren: '../modules/users/users.module'
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
export class adminRouterModule { }