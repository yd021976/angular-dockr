import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { feathersServiceToken, FeathersService } from '../../shared/services/feathers/feathers.service';


/**
 * Only purpose : Test angular APP_INITIALIZER token
 * @TODO: Remove init module if unecessary
 */
function backendApiService(fService: FeathersService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      console.group('[InitModule] Init service start')
      setTimeout(() => {
        resolve();
      }, 2000);
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
