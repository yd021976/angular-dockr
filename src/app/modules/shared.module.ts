import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from './userLogin/user.module';
import { TemplatesModule } from './templates/templates.module';
import { FilesModule } from './files/files.module';
import { TestsModule } from './tests/tests.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    TemplatesModule,
    FilesModule,
    TestsModule,
    AdminModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule {
}
