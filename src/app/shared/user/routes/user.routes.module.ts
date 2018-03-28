import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';


/** define module routes */
const routes = [
  {
    path: 'login', component: LoginComponent, data: { isMenu: false, title: 'Login' }
  }, {
    path: 'logout', component: LogoutComponent, data: { isMenu: false }
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
export class userRouterModule { }