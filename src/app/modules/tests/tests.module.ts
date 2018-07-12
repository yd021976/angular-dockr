import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { testsRouterModule } from './routes/templates.routes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    testsRouterModule
  ],
  declarations: [MatSelectComponent],
  exports: [MatSelectComponent]
})
export class TestsModule { }
