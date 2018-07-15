import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersComponent } from './components/users/users.component';
import { usersRouterModule } from './routes/users.routes.module';
import * as users_reducers from './store/reducers';
import * as users_effects from './store/effects';
import { ListComponent } from './components/list/list.component';


@NgModule({
  imports: [
    CommonModule,
    usersRouterModule,
    StoreModule.forFeature('users', users_reducers.reducer),
    // EffectsModule.forFeature(users_effects)
  ],
  declarations: [UsersComponent, ListComponent]
})
export class UsersModule { }
