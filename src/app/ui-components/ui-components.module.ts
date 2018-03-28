import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatExpansionModule } from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuItemComponent } from './side-nav/menu-item/menu-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
  ],
  declarations: [
    NavBarComponent,
    SideNavComponent,
    MenuItemComponent
  ],
  exports: [
    NavBarComponent,
    SideNavComponent,
    
  ]
})
export class UiComponentsModule { }
