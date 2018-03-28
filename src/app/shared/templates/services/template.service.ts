import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { Service, Pagination, Application, Params, NullableId } from 'feathers/client';
import * as templates_model from '../store/models/template.model';

export interface templateServiceBase {
  loadAll(): Observable<templates_model.ITemplate[] | Pagination<any>>
  create(payload: templates_model.ITemplate): Observable<templates_model.ITemplate>
  update(payload: templates_model.ITemplate): Observable<templates_model.ITemplate[]>
  delete(payload: templates_model.ITemplate): Observable<templates_model.ITemplate[]>
}

class mockTemplateService implements templateServiceBase {
  loadAll() {
    return Observable.of(Array({ _id: 'toto', name: 'toto', zones: [] }));
  }
  create(payload: templates_model.ITemplate) {
    return Observable.of(<templates_model.ITemplate>payload);
  }
  update(payload: templates_model.ITemplate) {
    return Observable.of(new Array<templates_model.ITemplate>(payload));
  }
  delete(payload: templates_model.ITemplate) {
    return Observable.of(new Array<templates_model.ITemplate>(payload));
  }
}


export class templateService implements templateServiceBase {
  private service: Service<any>;
  constructor(private feathers: Application, templateServiceName: string) {
    this.service = feathers.service(templateServiceName);
  }
  public loadAll() {
    this.service.find().then((result) => {
      let a = 0;
    }).catch((error) => {
      let a = 0;
    })
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

export const feathersToken = new InjectionToken<any>('FeathersService');
export const templateServiceNameToken = new InjectionToken<string>('TemplateServiceName');
export const templateServiceToken = new InjectionToken<templateServiceBase>('TemplateService');

export const templateServiceFactory = (injector: Injector) => {
  var feathers: any;
  var service: string;
  var template_service: templateServiceBase;

  try {
    feathers = injector.get(feathersToken, null);
    service = injector.get(templateServiceNameToken, 'templates');
  }
  catch{
  }
  if (feathers) {
    template_service = new templateService(feathers, service);
  } else {
    template_service = new mockTemplateService();
  }
  return template_service;
}
