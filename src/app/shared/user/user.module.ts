import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userRouterModule } from './routes/user.routes.module';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import * as user_reducer from './store/reducers/user.reducer';
import * as user_effects from './store/effects/user.effects';
import * as user_services from './services';

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
    MatFormFieldModule, MatInputModule, MatButtonModule,
    userRouterModule,
    StoreModule.forFeature('user', user_reducer.reducer),
    EffectsModule.forFeature([user_effects.effects]),
  ],
  declarations: [LoginComponent, LogoutComponent],
  exports: [LoginComponent, LogoutComponent],
  providers:
    [
      {
        provide: user_services.LoginServiceToken,
        useFactory: user_services.loginServiceFactory,
        deps: [Injector]
      }
    ]
})
export class UserModule { }
