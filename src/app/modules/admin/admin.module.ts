import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { UsersModule } from './modules/users/users.module';
import { adminRouterModule } from './routes/admin.routes.module';

@NgModule({
  imports: [
    CommonModule,
    adminRouterModule,
    UsersModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
