import { Route } from '@angular/router';

export interface appRouteData {
  isMenu: boolean,
  title?: string,
  icon?: string,
  link?: string,
  isAuthRequired? : boolean,
}
export interface appRoute extends Route {
  data?: appRouteData
}