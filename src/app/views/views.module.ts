import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule } from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeViewComponent } from './home-view/home-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
  ],
  declarations: [HomeViewComponent, DashboardComponent],
  exports: [HomeViewComponent]
})
export class ViewsModule { }
