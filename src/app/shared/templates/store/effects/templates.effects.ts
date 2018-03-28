import { Injectable, Inject } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { AddData, AddChildData, RemoveChildData, RemoveData } from 'ngrx-normalizr';

// import { FeathersTemplates } from "../../../feathers/documents/templates";
import * as template_service from '../../services/template.service';
import * as template_actions from '../actions/template.actions';
import * as template_model from '../models/template.model';

@Injectable()
export class effects {
  constructor(@Inject(template_service.templateServiceToken) private templateService: template_service.templateServiceBase, private actions$: Actions) { }
  /** Load all templates */
  @Effect()
  loadTemplates$ = this.actions$
    .ofType<template_actions.loadTemplates>(template_actions.TEMPLATE_LOAD)
    .switchMap(action => this.templateService.loadAll())
    .mergeMap(results => {
      return [
        new AddData<template_model.ITemplate>({ data: <template_model.ITemplate[]>results, schema: template_model.schemas }),
        new template_actions.loadTemplatesSuccess(<template_model.ITemplate[]>results)
      ]
    })
    .catch(error => Observable.of(new template_actions.loadTemplatesError(error.message)))


  /** Add template action */
  @Effect()
  addTemplate$ = this.actions$
    .ofType<template_actions.addTemplate>(template_actions.TEMPLATE_ADD)
    .switchMap(action => this.templateService.create(action.payload))
    .mergeMap((result: template_model.ITemplate) => [
      new AddData<template_model.ITemplate>({ data: [result], schema: template_model.schemas }),
      new template_actions.addTemplateSuccess(result)
    ])
    .catch(error => Observable.of(new template_actions.addTemplateError(error.message))
    )
}