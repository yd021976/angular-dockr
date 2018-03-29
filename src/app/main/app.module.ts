import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { MatSidenavModule, MatToolbarModule, MatExpansionModule, MatListModule, MatButtonModule } from '@angular/material';

import { RoutingModule } from '../routing/routing.module';
import { AppComponent } from './app.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ViewsModule } from '../views/views.module';
import { SharedModule} from '../shared/shared.module';
import { AppServicesModule } from '../services/app-services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,

    // Provided Services
    AppServicesModule,

    // App modules
    RoutingModule,
    UiComponentsModule,
    ViewsModule,
    SharedModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
