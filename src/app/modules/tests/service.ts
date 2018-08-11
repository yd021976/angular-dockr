import { Injectable, InjectionToken, Inject } from '@angular/core';
export const backendServiceToken = new InjectionToken<any>('backend-service');
export const testServiceToken = new InjectionToken<any>('test-service');

export const testServiceFactory = (backendService) => {
  if (backendService) {
    return new testService(backendService);
  } else {
    return new testServiceMock();
  }
}
export class testService {
  constructor(private backendService) {
    let a = 0;
  }
}

export class testServiceMock {
  constructor() {
    let a = 0;
  }
}