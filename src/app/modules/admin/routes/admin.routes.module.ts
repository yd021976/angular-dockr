import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';
import { AdminUsersComponent } from '../../AdminUsers/containers/admin-users/admin-users.component';

/** define module routes */
export const routes: Route[] = [
  {
    path: '', data: { isMenu: true, title: 'Admin', isAuthRequired: false, roles: [] }, children: [
      {
        path: 'users', data: { isMenu: true, title: 'Users', link: 'users', isAuthRequired: false, roles: [] }, component: AdminUsersComponent
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