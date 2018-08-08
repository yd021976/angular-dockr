import { InjectionToken, Injector } from '@angular/core';
import { Application } from 'feathers/client';
import { IAdminUsersService } from './users.interface.service';
import { mockAdminUsersService } from './users.mock.service';
import { adminUsersService } from './users.service';

// Declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
export const feathersServiceToken: InjectionToken<Application> = new InjectionToken<Application>('AdminUsers-FeatherService');

// Declare service token that this module provides
export const adminUsersServiceToken: InjectionToken<IAdminUsersService> = new InjectionToken<IAdminUsersService>('AdminUsers-Service');

// Declare service token that this module provides
export const adminUsersServiceNameToken: InjectionToken<string> = new InjectionToken<string>('AdminUsers-ServiceName');

// Service factory
export const AdminUsersServiceFactory = (injector: Injector) => {
  var feathers: Application = null;
  var service: IAdminUsersService = null;
  var serviceName: string = "";

  try {
    feathers = injector.get(feathersServiceToken);
    serviceName = injector.get(adminUsersServiceNameToken, 'users');
  }
  catch{
    console.warn('[admin.users] No feathers service provided => Will use mock service instead');
  }

  // Create service instance and return instance
  service = feathers == null ? new mockAdminUsersService() : new adminUsersService(feathers, serviceName);
  return service;

}