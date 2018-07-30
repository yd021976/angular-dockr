import { InjectionToken, Injector } from '@angular/core';
import { IUsersService } from './users.interface.service';
import { mockUsersService } from './users.mock.service';
import { usersService } from './users.service';

/**
 * declare the feather service depedency token ==> Must be provided by parent module (appModule or any top level module)
 */
export const feathersServiceToken: InjectionToken<IUsersService> = new InjectionToken<IUsersService>('AdminUsers-FeatherService');

/**
 * Declare service token that this module provides
 */
export const LoginServiceToken: InjectionToken<IUsersService> = new InjectionToken<IUsersService>('AdminUsers-Service');

export const AdminUsersServiceFactory = (injector: Injector) => {
  var feathers = null;
  try {
    feathers = injector.get(feathersServiceToken);
    return new usersService(feathers);
  }
  catch{
    feathers = new mockUsersService();
  }
  return feathers;

}