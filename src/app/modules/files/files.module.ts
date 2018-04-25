import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {  filesRouterModule} from './routes/files.routes.module';
import { user_module } from './index';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';
/**
 * Depedencies :
 * 
 * "feathersServiceToken"
 *    A feather service that implements "service" interface that must be provided by top level module(s)
 *    If no feather service is provided, this module provide by default a mock service
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule,
    filesRouterModule,
    StoreModule.forFeature('files', user_module.store.reducers.reducer),
    EffectsModule.forFeature([]),
  ],
  declarations: [FileChooserComponent],
  entryComponents: [],
  exports: [],
  providers:
    [
     
    ]
})
export class FilesModule { }
