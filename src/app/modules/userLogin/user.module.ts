import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userLoginRouterModule } from './routes/user.routes.module';
import { userLogin_module } from './index';
import { sandboxUserLogin } from './sandbox-userLogin';
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
    StoreModule.forFeature('user', userLogin_module.store.reducers.reducer),
    EffectsModule.forFeature([userLogin_module.store.effects.effects]),
  ],
  declarations: [userLogin_module.containers.LoginComponent, userLogin_module.containers.LogoutComponent, userLogin_module.components.AuthDialogComponent],
  entryComponents: [userLogin_module.components.AuthDialogComponent],
  exports: [userLogin_module.containers.LoginComponent, userLogin_module.containers.LogoutComponent],
  providers:
    [
      userLogin_module.guards.loginGuard,
      {
        provide: userLogin_module.services.LoginServiceToken,
        useFactory: userLogin_module.services.loginServiceFactory,
        deps: [Injector]
      },
      {
        provide: 'sandbox-user-login',
        useClass: sandboxUserLogin
      }
    ]
})
export class UserModule { 
}
