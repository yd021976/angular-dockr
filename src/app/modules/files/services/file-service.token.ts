import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Fake_FileUploadsService, FileUploadsService } from './file-service.service';
import {FileServiceBase } from './file-service.service';

export const FeathersService = new InjectionToken<any>('FeatherServiceForFiles');

/**
 * declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
 */
export const filesServiceToken: InjectionToken<FileServiceBase> = new InjectionToken<FileServiceBase>('filesService');
/**
 * Service factory
 */
export const filesServiceFactory = (injector: Injector, serviceName: string = 'file-upload') => {
  var feathers = null;
  try {
    feathers = injector.get(FeathersService, null);
  } catch (error) { }

  if (feathers) {
    return new FileUploadsService(feathers.service(serviceName));
  } else {
    /** if no feathers service provided, create a FAKE */
    return new Fake_FileUploadsService();
  }
}