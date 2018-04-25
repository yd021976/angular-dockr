import { InjectionToken } from '@angular/core';

export interface feathersConfig {
  apiEndPoint: string;
}

export const FEATHERS_CONFIG = new InjectionToken<feathersConfig>('feathers_config');

