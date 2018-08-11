import { InjectionToken, Inject, Injectable } from '@angular/core';
import { testServiceToken } from './service';

export const sandboxToken = new InjectionToken<any>('sandbox');

@Injectable()
export class sandboxTest {
  constructor(@Inject(testServiceToken) private service) {
    let a = 0;
  }
}