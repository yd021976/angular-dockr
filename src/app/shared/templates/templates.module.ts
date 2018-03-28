import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule } from '@angular/material';

import * as templates_reducers from './store/reducers/template.reducer';
import * as templates_effects from './store/effects/templates.effects';
import * as templates_state from './store/state/template.state';
import * as template_services from './services/template.service';
import { TemplatesComponent } from './components/templates/templates.component';
import { templatesRouterModule } from './routes/templates.routes.module';
import { TemplateFormComponent } from './components/template-form/template-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatGridListModule,
    templatesRouterModule,
    StoreModule.forFeature('templates', templates_reducers.reducer),
    EffectsModule.forFeature([templates_effects.effects]),
  ],
  declarations: [TemplatesComponent, TemplateFormComponent],
  providers: [{
    provide: template_services.templateServiceToken,
    useFactory: template_services.templateServiceFactory,
    deps: [Injector]
  }],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
