import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import templates_selectors from './store/selectors/template.selectors';
import * as template_model from './store/models/template.model';
import * as template_state from './store/state/template.state';
import * as template_actions from './store/actions/template.actions';
/**
 * Base interface for this module "sandboxes"
 */
export interface ISandBox {
  /**
   * Observables
   */
  templates$: Observable<any>;
  selectedTemplate$: Observable<any>;
  templateError$: Observable<template_state.error>;
  /**
   * Methods
   */
  loadTemplates();
  addTemplate(template: template_model.ITemplate);
  updateTemplate(template: template_model.ITemplate);
  removeTemplate(template: template_model.ITemplate);
  selectTemplate(template: template_model.ITemplate);
}

@Injectable()
export class templatesSandBox implements ISandBox {
  public templates$: Observable<any>;
  public templateError$: Observable<template_state.error>;
  public selectedTemplate$: Observable<any>;

  private selectedTemplate: template_model.ITemplate;

  constructor(private store: Store<template_state.ITemplates>) {
    this.templates$ = this.store.select(templates_selectors.templates.getAllTemplates);
    this.selectedTemplate$ = this.store.select(templates_selectors.templates.getSelectedTemplate);
    this.templateError$ = this.store.select(templates_selectors.templates.getError);

    this.selectedTemplate$.subscribe((data: template_model.ITemplate) => {
      this.selectedTemplate = data;
    })
  }

  /**
   * Load all templates
   */
  loadTemplates() {
    this.store.dispatch(new template_actions.loadTemplates());
  }
  addTemplate(template: template_model.ITemplate) {
    this.store.dispatch(new template_actions.addTemplate(template));
  }
  updateTemplate(template: template_model.ITemplate) {
    this.store.dispatch(new template_actions.updateTemplate(template));
  }
  removeTemplate(template: template_model.ITemplate) {
    this.store.dispatch(new template_actions.removeTemplate(template));
  }
  selectTemplate(template: template_model.ITemplate) {
    this.store.dispatch(new template_actions.selectTemplate(template));
  }
}