import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { files_module } from './';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('files', files_module.store.reducers.reducer)
  ],
  declarations: [FileChooserComponent],
  providers: [
    {
      provide: files_module.services.filesServiceToken,
      useFactory: files_module.services.filesServiceFactory,
      deps: [Injector]
    }
  ]
})
export class FilesModule { }
