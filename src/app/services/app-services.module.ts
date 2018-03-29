import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** services and tokens */
import { FeathersService } from './feathers/feathers.service';
import { feathersServiceToken } from '../shared/user/services/login.service';
import { feathersToken, templateServiceNameToken } from '../shared/templates/services/template.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  declarations: [],
  providers: [
    {
      provide: feathersServiceToken,
      useClass: FeathersService
    },
    {
      provide: templateServiceNameToken,
      useValue: 'templates'
    },
    {
      provide: feathersToken,
      useExisting: feathersServiceToken
    }
  ]
})
export class AppServicesModule { }
