import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { UsersDetailComponent } from './components/user.detail/user.detail.component';
import * as users_reducers from './store/reducers';
import { UsersListComponent } from './components/users.list/users.list.component';
import { AdminUsersComponent } from './containers/admin-users/admin-users.component';
import * as adminUsers_service from './services/users';
import * as sandbox from './sandbox-AdminUsers';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', users_reducers.reducer),
  ],
  declarations: [UsersDetailComponent, UsersListComponent, AdminUsersComponent],
  exports: [AdminUsersComponent],
  providers: [
    /**
     * REST service for users management
     */
    {
      provide: adminUsers_service.adminUsersServiceToken,
      useFactory: adminUsers_service.AdminUsersServiceFactory,
      deps: [Injector]
    },
    /**
     * Abstract facade to access state/services/business logic
     */
    {
      provide: sandbox.sandboxServiceToken,
      useClass: sandbox.sandboxAdminUsers
    }
  ]
})
export class AdminUsersModule { }
