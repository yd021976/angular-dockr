import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** services and tokens */
import { FeathersService, feathersServiceToken } from './feathers/feathers.service';
import * as user_service from '../../modules/user.login/services/login.service';
import * as templates_service from '../../modules/templates/services/template.service';
import * as admin_users_service from '../../modules/AdminUsers/services/users';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  declarations: [],
  providers: [
    /**
     * Feathers service : The one and only one for the app
     */
    {
      provide: feathersServiceToken,
      useClass: FeathersService
    },
    /** Service for TEMPLATE module */
    {
      provide: templates_service.backendServiceToken,
      useExisting: feathersServiceToken
    },
    {
      provide: templates_service.templateServiceNameToken,
      useValue: 'templates'
    },
    /** Feathers service for USER LOGIN module */
    {
      provide: user_service.backendServiceToken,
      useExisting: feathersServiceToken
    },
    // /**
    //  * Feathers service for ADMIN USERS module 
    //  */
    // {
    //   provide: admin_users_service.feathersServiceToken,
    //   useExisting: feathersServiceToken
    // }
  ]
})
export class AppServicesModule { }
