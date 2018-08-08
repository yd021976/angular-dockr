import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { Service, Pagination, Application, Params, NullableId } from 'feathers/client';
import * as templates_model from '../store/models/template.model';

export interface ITemplateServiceBase {
  loadAll(): Observable<any[] | Pagination<any>>
  create(payload: templates_model.ITemplate): Observable<any>
  update(payload: templates_model.ITemplate): Observable<any>
  delete(payload: templates_model.ITemplate): Observable<any>
}

class mockTemplateService implements ITemplateServiceBase {
  loadAll() {
    return Observable.of(Array({ _id: 'toto', name: 'toto', zones: [] }));
  }
  create(payload: templates_model.ITemplate) {
    return Observable.of(<templates_model.ITemplate>payload);
  }
  update(payload: templates_model.ITemplate) {
    return Observable.of(<templates_model.ITemplate>payload);
  }
  delete(payload: templates_model.ITemplate) {
    return Observable.of(<templates_model.ITemplate>payload);
  }
}

export class templateService implements ITemplateServiceBase {
  private service: Service<templates_model.ITemplate>;

  constructor(backendService: Application, templateServiceName: string) {
    this.service = backendService.service(templateServiceName);
  }
  public loadAll() {
    return Observable.fromPromise(this.service.find());
  }
  public create(payload: templates_model.ITemplate) {
    return Observable.fromPromise(this.service.create(payload));
  }

  public update(payload: templates_model.ITemplate) {
    return Observable.fromPromise(this.service.patch(payload._id, payload));
  }

  public delete(payload: templates_model.ITemplate) {
    return Observable.fromPromise(this.service.remove(payload._id));
  }
}

export const backendServiceToken: InjectionToken<Application> = new InjectionToken<Application>('templates.backendservice');
export const templateServiceNameToken: InjectionToken<string> = new InjectionToken<string>('TemplateServiceName');
export const templateServiceToken: InjectionToken<ITemplateServiceBase> = new InjectionToken<ITemplateServiceBase>('TemplateService');

export const templateServiceFactory = (backendService, serviceName: string = 'templates') => {
  // var feathers: any;
  // var templateServiceName: string;
  // var template_service: ITemplateServiceBase;
  if (backendService) {
    console.log('[TEMPLATE SERVICE] Create service instance');
    return new templateService(backendService, serviceName);
  } else {
    console.warn('[TEMPLATE SERVICE] No feathers service provided => Will use mock service instead');
    return new mockTemplateService();
  }

  // try {
  //   feathers = injector.get(backendServiceToken, null);
  //   templateServiceName = injector.get(templateServiceNameToken, 'templates');
  // }
  // catch{
  //   console.warn('[templates] No feathers service provided => Will use mock service instead');
  // }
  // if (feathers) {
  //   template_service = new templateService(feathers, templateServiceName);
  // } else {
  //   template_service = new mockTemplateService();
  // }
  // return template_service;
}
