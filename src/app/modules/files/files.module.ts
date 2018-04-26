import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as files_reducers from './store/reducers/files.reducers';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('files',files_reducers.reducer)
  ],
  declarations: [FileChooserComponent]
})
export class FilesModule { }
