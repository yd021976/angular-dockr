import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from './user/user.module';
import { TemplatesModule } from './templates/templates.module';


@NgModule({
  imports: [
    CommonModule,
    UserModule,
    TemplatesModule,
  ],
  declarations: [],
  providers: []
})
export class SharedModule { }