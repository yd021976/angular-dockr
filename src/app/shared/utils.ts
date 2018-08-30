import {
  APP_BOOTSTRAP_LISTENER,
  InjectionToken,
  Inject,
  Type
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectsModule, EffectSources } from '@ngrx/effects';

export const BOOTSTRAP_EFFECTS = new InjectionToken('Bootstrap Effects');

export function bootstrapEffects(effects: Type<any>[], sources: EffectSources) {
  return () => {
    effects.forEach((effectGroup) => {
      var len = effectGroup.length;
      if (len != 0) {
        for (var i = 0; i < len; i++) {
          var effect = effectGroup[i];
          sources.addEffects(effect);
        }
      } else {
        sources.addEffects(effectGroup);
      }
    });
    console.log('[bootstrapEffects] Effects loaded done');
  };
}

export function createInstances(...instances: any[]) {
  return instances;
}

export function provideBootstrapEffects(effects: Type<any>[]) {
  return [
    effects,
    {
      provide: BOOTSTRAP_EFFECTS,
      deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources],
      useFactory: createInstances,
      multi: true
    },
    // {
    //   provide: APP_BOOTSTRAP_LISTENER,
    //   multi: true,
    //   useFactory: bootstrapEffects,
    //   deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources]
    // }
  ];
}