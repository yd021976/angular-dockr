import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userLoginRouterModule } from './routes/user.routes.module';
import * as user_login_containers from './containers';
import * as user_login_components from './components';
import * as user_login_store from './store';
import * as user_login_guards from './guards';
import * as user_login_services from './services';
import { sandboxUserLogin } from './sandbox-user-login';
/**
 * Depedencies :
 * 
 * "feathersServiceToken"
 *    A feather service that implements "service" interface that must be provided by top level module(s)
 *    If no feather service is provided, this module provide by default a mock service
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule,
    userLoginRouterModule,
    StoreModule.forFeature('user', user_login_store.store.reducers.reducer),
    EffectsModule.forFeature([user_login_store.store.effects.effects]),
  ],

  declarations: [
    user_login_containers.LoginComponent,
    user_login_containers.LogoutComponent,
    user_login_components.AuthDialogComponent
  ],

  entryComponents: [
    user_login_components.AuthDialogComponent
  ],

  exports: [
    user_login_containers.LoginComponent,
    user_login_containers.LogoutComponent],

  providers:
    [
      user_login_guards.loginGuard,
      {
        provide: user_login_services.LoginServiceToken,
        useFactory: user_login_services.loginServiceFactory,
        deps: [Injector]
      },
      {
        provide: 'sandbox-user-login',
        useClass: sandboxUserLogin
      }
    ]
})
export class UserLoginModule {
}
