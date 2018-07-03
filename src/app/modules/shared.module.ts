import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from './user/user.module';
import { TemplatesModule } from './templates/templates.module';
import { FilesModule } from './files/files.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    TemplatesModule,
    FilesModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule {
}
