import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Route } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';

/** define module routes */
const routes: Route[] = [
  {
    path: '', component: UsersComponent, data: { isMenu: false, title: 'Users', link: '', isAuthRequired: false, roles: [] }
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  exports: [],
})
export class usersRouterModule { }