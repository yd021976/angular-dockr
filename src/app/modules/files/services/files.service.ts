import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { Service, Pagination, Application, Params, NullableId } from 'feathers/client';
// import * as templates_model from '../store/models/template.model';

export interface fileServiceBase {
  // loadAll(): Observable<any[] | Pagination<any>>
  // create(payload: templates_model.ITemplate): Observable<any>
  // update(payload: templates_model.ITemplate): Observable<any>
  // delete(payload: templates_model.ITemplate): Observable<any>
}

class mockFileService implements fileServiceBase {
  // loadAll() {
  //   return Observable.of(Array({ _id: 'toto', name: 'toto', zones: [] }));
  // }
  // create(payload: templates_model.ITemplate) {
  //   return Observable.of(<templates_model.ITemplate>payload);
  // }
  // update(payload: templates_model.ITemplate) {
  //   return Observable.of(<templates_model.ITemplate>payload);
  // }
  // delete(payload: templates_model.ITemplate) {
  //   return Observable.of(<templates_model.ITemplate>payload);
  // }
}

export class fileService implements fileServiceBase {
  // private service: Service<any>;

  // constructor(private feathers: Application, templateServiceName: string) {
  //   this.service = feathers.service(templateServiceName);
  // }
  // public loadAll() {
  //   return Observable.fromPromise(this.service.find());
  // }
  // public create(payload: templates_model.ITemplate) {
  //   return Observable.fromPromise(this.service.create(payload));
  // }

  // public update(payload: templates_model.ITemplate) {
  //   return Observable.fromPromise(this.service.patch(payload._id, payload));
  // }

  // public delete(payload: templates_model.ITemplate) {
  //   return Observable.fromPromise(this.service.remove(payload._id));
  // }
}

export const feathersServiceToken = new InjectionToken<any>('FeatherServiceForFiles');
export const filesServiceNameToken = new InjectionToken<string>('FileServiceName');
export const filesServiceToken = new InjectionToken<fileServiceBase>('FilesService');

export const templateServiceFactory = (injector: Injector) => {
  var feathers: any;
  var filesServiceName: string;
  var filesService: fileServiceBase;

  try {
    feathers = injector.get(feathersServiceToken, null);
    filesServiceName = injector.get(filesServiceNameToken, 'file-uploads');
  }
  catch{
  }
  if (feathers) {
    filesService = new fileService();
  } else {
    filesService = new mockFileService();
  }
  return filesService;
}
