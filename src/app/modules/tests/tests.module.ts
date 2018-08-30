import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { testsRouterModule } from './routes/templates.routes.module';

import { backendServiceToken, testServiceToken, testServiceFactory } from './service';
import { sandboxToken, sandboxTest } from './sandbox';
import { EffectsModule } from '@ngrx/effects';
import { provideBootstrapEffects } from '../../shared/utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    testsRouterModule,
    EffectsModule.forFeature([])
  ],
  declarations: [MatSelectComponent],
  exports: [MatSelectComponent]
})

export class TestsModule {
  constructor() {
    console.log('[TestsModule] constructor called');

  }
  static forRoot(backendService: any): ModuleWithProviders {
    console.group('[TestsModule] forRoot');
    console.log(backendService);
    console.groupEnd();

    return {
      ngModule: TestsModule,
      providers: [
        // provideBootstrapEffects([]),
        {
          provide: testServiceToken,
          useFactory: testServiceFactory,
          deps: [backendServiceToken]
        },
        {
          provide: sandboxToken,
          useClass: sandboxTest,
          deps: [testServiceToken]
        }
      ]
    }
  }
}
