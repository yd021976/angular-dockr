import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userRouterModule } from './routes/user.routes.module';
import * as user_components from './components';
import { user_module } from './index';
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
    userRouterModule,
    StoreModule.forFeature('user', user_module.store.reducers.reducer),
    EffectsModule.forFeature([user_module.store.effects.effects]),
  ],
  declarations: [user_module.components.LoginComponent, user_module.components.LogoutComponent, user_module.components.AuthDialogComponent],
  entryComponents: [user_components.AuthDialogComponent],
  exports: [user_module.components.LoginComponent, user_module.components.LogoutComponent],
  providers:
    [
      user_module.guards.loginGuard,
      {
        provide: user_module.services.LoginServiceToken,
        useFactory: user_module.services.loginServiceFactory,
        deps: [Injector]
      }
    ]
})
export class UserModule { }
