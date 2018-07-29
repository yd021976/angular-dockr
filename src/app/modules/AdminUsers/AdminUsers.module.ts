import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { UsersDetailComponent } from './components/user.detail/user.detail.component';
import * as users_reducers from './store/reducers';
import { UsersListComponent } from './components/users.list/users.list.component';
import { AdminUsersComponent } from './containers/admin-users/admin-users.component';
import { sandboxAdminUsers} from './sandbox-AdminUsers';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', users_reducers.reducer),
  ],
  declarations: [UsersDetailComponent, UsersListComponent, AdminUsersComponent],
  exports: [AdminUsersComponent],
  providers: [
    {
      provide: 'sandbox-admin-users',
      useClass: sandboxAdminUsers
    }
  ]
})
export class AdminUsersModule { }
