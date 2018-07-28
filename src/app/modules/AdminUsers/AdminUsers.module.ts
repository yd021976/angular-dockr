import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { UsersComponent } from './components/users/users.component';
import { AdminUsersRouterModule } from './routes/AdminUsers.routes.module';
import * as users_reducers from './store/reducers';
import { UsersListComponent } from './components/users.list/users.list.component';


@NgModule({
  imports: [
    CommonModule,
    AdminUsersRouterModule,
    StoreModule.forFeature('users', users_reducers.reducer)
  ],
  declarations: [UsersComponent, UsersListComponent]
})
export class AdminUsersModule { }
