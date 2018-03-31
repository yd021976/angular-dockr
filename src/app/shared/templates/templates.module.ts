import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { template_module } from './';
import { templatesRouterModule } from './routes/templates.routes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule,
    FlexLayoutModule,
    templatesRouterModule,
    StoreModule.forFeature('templates', template_module.store.reducers.reducer),
    EffectsModule.forFeature([template_module.store.effects.templatesEffects]),
  ],
  declarations: [template_module.components.TemplateFormComponent, template_module.components.TemplatesComponent, template_module.components.TemplateZonesComponent],
  providers: [
    {
    provide: template_module.services.templateServiceToken,
    useFactory: template_module.services.templateServiceFactory,
    deps: [Injector]
    }
  ],
  exports: [template_module.components.TemplatesComponent]
})
export class TemplatesModule { }
