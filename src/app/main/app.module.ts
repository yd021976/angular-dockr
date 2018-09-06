import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, APP_INITIALIZER } from '@angular/core';


import { MatSidenavModule, MatToolbarModule, MatExpansionModule, MatListModule, MatButtonModule } from '@angular/material';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { UiComponentsModule } from '../shared/ui-components/ui-components.module';
import { ViewsModule } from '../shared/views/views.module';
import { SharedModule } from '../modules/shared.module';
import { AppServicesModule } from '../shared/services/app-services.module';
import { sandboxAppToken, sandboxApp, mockSandboxApp } from './sandbox-app';
import { InitModule } from './init/init.module';
import { FeathersService, feathersServiceToken } from '../shared/services/feathers/feathers.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TemplatesModule } from '../modules/templates/templates.module';
import { TestsModule } from '../modules/tests/tests.module';
import { backendServiceToken } from '../modules/tests/service';

import { settings } from './init/settings';
import { UserLoginModule } from '../modules/user.login/user.login.module';
import * as user_login_service from '../modules/user.login/services';
import { InitServiceErrorComponent } from './init-service-error/init-service-error.component';

@NgModule({
  declarations: [
    AppComponent,
    InitServiceErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,

    // Init module
    InitModule,
    
    // Provided Services
    // AppServicesModule,
    
    // App modules
    RoutingModule,
    UiComponentsModule,
    ViewsModule,
    
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    // SharedModule
    UserLoginModule.forRoot(),
    TestsModule.forRoot(settings)
  ],
  exports: [],
  providers: [
    // {
    //   provide: APP_BOOTSTRAP_LISTENER,
    //   multi: true,
    //   useFactory: bootstrapEffects,
    //   deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources]
    // },
    {
      provide: user_login_service.backendServiceToken,
      useExisting: feathersServiceToken,
      deps: [feathersServiceToken]
    },
    {
      provide: backendServiceToken,
      useExisting: feathersServiceToken,
      deps: [feathersServiceToken]
    },
    {
      provide: feathersServiceToken,
      useClass: FeathersService
    },

    {
      provide: sandboxAppToken,
      useClass: sandboxApp
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('[AppModule] constructor called');

  }
}


