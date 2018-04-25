import { Injectable, InjectionToken, Injector } from '@angular/core';
import { FileuploadsService, Fake_FileuploadsService } from './fileuploads.service';

export const FeathersService = new InjectionToken<any>('FeatherServiceForUploads');


/**
 * Service factory
 */
export const uploadServiceFactory = (injector: Injector, serviceName: string = 'file-uploads') => {
  var feathers = null;
  try {
    feathers = injector.get(uploadServiceFactory, null);
  } catch (error) { }

  if (feathers) {
    return new FileuploadsService(feathers.service(serviceName));
  } else {
    /** if no feathers service provided, create a FAKE */
    return new Fake_FileuploadsService();
  }
}