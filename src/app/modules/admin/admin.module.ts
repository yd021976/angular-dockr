import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { adminRouterModule } from './routes/admin.routes.module';
import { AdminUsersModule} from '../AdminUsers/AdminUsers.module';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersModule,
    adminRouterModule,
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
