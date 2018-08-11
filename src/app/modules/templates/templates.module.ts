import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiComponentsModule } from '../../shared/ui-components/ui-components.module';

import { template_module } from './';
import { templatesRouterModule } from './routes/templates.routes.module';
import { templatesSandBox } from './sandbox-templates';
import { TemplateEditorComponent } from './components/template-editor/template-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule,
    FlexLayoutModule,
    templatesRouterModule,
    UiComponentsModule,
    StoreModule.forFeature('templates', template_module.store.reducers.reducer, { initialState: template_module.store.state.initialState() }),
    EffectsModule.forFeature([template_module.store.effects.templatesEffects]),
  ],
  declarations: [
    template_module.components.TemplateFormComponent,
    template_module.containers.TemplatesContainer,
    template_module.components.TemplateZonesComponent,
    TemplateEditorComponent
  ],
  providers: [
    // {
    //   provide: template_module.services.backendServiceToken,
    //   useValue: null
    // },
    {
      provide: template_module.services.templateServiceToken,
      useFactory: template_module.services.templateServiceFactory,
      deps: [template_module.services.backendServiceToken]
    },
    {
      provide: 'sandbox',
      useClass: templatesSandBox
    }
  ],
  exports: [
    template_module.containers.TemplatesContainer
  ]
})
export class TemplatesModule { }
