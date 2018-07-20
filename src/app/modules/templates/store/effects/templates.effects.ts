import { Injectable, Inject } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { AddData, AddChildData, RemoveChildData, RemoveData, SetData } from 'ngrx-normalizr';

// import { FeathersTemplates } from "../../../feathers/documents/templates";
import * as template_service from '../../services/template.service';
import * as template_actions from '../actions/template.actions';
import * as template_model from '../models/template.model';

@Injectable()
export class templatesEffects {
  constructor(@Inject(template_service.templateServiceToken) private templateService: template_service.templateServiceBase, private actions$: Actions) { }
  /** Load all templates */
  @Effect()
  loadTemplates$ = this.actions$
    .ofType<template_actions.loadTemplates>(template_actions.TEMPLATE_LOAD)
    .switchMap(action => this.templateService.loadAll()
      .mergeMap(result => {
        var data = result['data'];
        return [
          new AddData<template_model.ITemplate>({ data: <template_model.ITemplate[]>data, schema: template_model.schemas }),
          new template_actions.loadTemplatesSuccess(<template_model.ITemplate[]>data)
        ]
      })
      .catch(error => {
        return [new template_actions.loadTemplatesError(error.message)]
      })
    )


  /** Add template action */
  @Effect()
  addTemplate$ = this.actions$
    .ofType<template_actions.addTemplate>(template_actions.TEMPLATE_ADD)
    .switchMap(action => this.templateService.create(action.payload)
      .mergeMap((result: template_model.ITemplate) => [
        new AddData<template_model.ITemplate>({ data: [result], schema: template_model.schemas }),
        new template_actions.addTemplateSuccess(result),
        new template_actions.selectTemplate(result)
      ])
      .catch(error => { return [new template_actions.addTemplateError(error.message)] }
      )
    )

  @Effect()
  removeTemplate$ = this.actions$
    .ofType<template_actions.removeTemplate>(template_actions.TEMPLATE_REMOVE)
    .switchMap(action => this.templateService.delete(action.payload)
      .mergeMap((result: template_model.ITemplate) => [
        new RemoveData({ id: result._id, removeChildren: { zones: 'zones' }, schema: template_model.schemas }),
        new template_actions.removeTemplateSuccess(result)
      ])
      .catch(error => [new template_actions.removeTemplateError(error.message)])
    )
  
  @Effect()
  updateTemplate$ = this.actions$
      .ofType<template_actions.updateTemplate>(template_actions.TEMPLATE_UPDATE)
      .switchMap(action => this.templateService.update(action.payload)
        .mergeMap((result: template_model.ITemplate) => [
          new AddData({ data: [result], schema: template_model.schemas }),
          new template_actions.updateTemplateSuccess(result),
          new template_actions.selectTemplate(result)
        ])
        .catch(error => [new template_actions.updateTemplateError(error.message)])
      )
}