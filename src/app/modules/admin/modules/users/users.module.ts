import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { usersRouterModule } from './routes/users.routes.module';

@NgModule({
  imports: [
    CommonModule,
    usersRouterModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
