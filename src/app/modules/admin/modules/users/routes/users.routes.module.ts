import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';

import { UsersComponent } from '../components/users/users.component';

/** define module routes */
const routes: Route[] = [
  {
    path: 'users_home', component: UsersComponent, data: { isMenu: true, title: 'Users', link: 'users_home', isAuthRequired: false, roles: [] }
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
export class usersRouterModule { }