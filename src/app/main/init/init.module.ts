import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { feathersServiceToken, FeathersService } from '../../shared/services/feathers/feathers.service';

function backendApiService(fService: FeathersService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fService) {
          fService.initService((event) => {
            if (event == 'connect') {
              console.log('[InitModule] Feather is ready ');
              resolve();
            }
          });
        }
      }, 1000);
    })
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: backendApiService,
      multi: true,
      deps: [feathersServiceToken]
    }
  ]
})
export class InitModule { }
