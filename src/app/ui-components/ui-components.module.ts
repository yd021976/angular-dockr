import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuItemComponent } from './side-nav/menu-item/menu-item.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { OutletComponent } from './outlet/outlet.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    NavBarComponent,
    SideNavComponent,
    MenuItemComponent,
    BackdropComponent,
    OutletComponent
  ],
  entryComponents:[],
  exports: [
    NavBarComponent,
    SideNavComponent,
    BackdropComponent,
    OutletComponent
  ]
})
export class UiComponentsModule { }
