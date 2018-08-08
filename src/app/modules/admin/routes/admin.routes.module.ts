import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';
import { AdminUsersComponent } from '../../AdminUsers/containers/admin-users/admin-users.component';

/** define module routes */
export const routes: Route[] = [
  {
    path: '', data: { isMenu: true, title: 'Admin', isAuthRequired: true, roles: ['admin', 'users'] }, children: [
      {
        path: 'users', data: { isMenu: true, title: 'Users', link: 'users', isAuthRequired: true, roles: ['admin', 'users'] }, component: AdminUsersComponent
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
  exports: [RouterModule],
})
export class adminRouterModule { }