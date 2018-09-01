import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userLoginRouterModule } from './routes/user.routes.module';
import * as user_login_containers from './containers';
import * as user_login_components from './components';
import * as user_login_store from './store';
import * as user_login_guards from './guards';
import * as user_login_services from './services';
import { sandboxUserLogin, sandboxUserLoginToken } from './sandbox-user-login';
import { provideBootstrapEffects } from '../../shared/utils';
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
    // EffectsModule.forFeature([user_login_store.store.effects.effects])
    EffectsModule.forFeature([])
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
    user_login_containers.LogoutComponent
  ],
})
export class UserLoginModule {
  static forRoot(): ModuleWithProviders {
    console.log('[UserLoginModule] forRoot called');
    return {
      ngModule: UserLoginModule,
      providers:
        [
          user_login_guards.loginGuard,
          user_login_store.store.effects.effects,
          {
            provide: user_login_services.LoginServiceToken,
            useFactory: user_login_services.loginServiceFactory,
            deps: [user_login_services.backendServiceToken]
          },
          {
            provide: sandboxUserLoginToken,
            useClass: sandboxUserLogin,
            deps: [Store, user_login_services.LoginServiceToken]
          }
          // provideBootstrapEffects([user_login_store.store.effects.effects])
        ]
    };
  }
}
