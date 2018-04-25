import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** services and tokens */
import { FeathersService } from './feathers/feathers.service';
import * as user_service from '../../modules/user/services/login.service';
import * as templates_service  from '../../modules/templates/services/template.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  declarations: [],
  providers: [
    /** feathers service for TEMPLATE module */
    {
      provide: templates_service.feathersServiceToken,
      useClass: FeathersService
    },
    {
      provide: templates_service.templateServiceNameToken,
      useValue: 'templates'
    },
    /** Feathers service for USER module */
    {
      provide: user_service.feathersServiceToken,
      useExisting: templates_service.feathersServiceToken
    }
  ]
})
export class AppServicesModule { }