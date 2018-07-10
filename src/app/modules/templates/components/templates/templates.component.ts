import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BackdropComponent } from '../../../../shared/ui-components/backdrop/backdrop.component';
import templates_selectors from '../../store/selectors/template.selectors';
import * as template_model from '../../store/models/template.model';
import * as template_state from '../../store/state/template.state';
import * as template_actions from '../../store/actions/template.actions';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  public selectedTemplate: template_model.ITemplate = null;

  public selectedTemplate$: Observable<any>;
  public templates$: Observable<any>;
  public templateError$: Observable<template_state.error>;

  constructor(private store: Store<any>) {
    this.templates$ = this.store.select(templates_selectors.templates.getAllTemplates);
    this.selectedTemplate$ = this.store.select(templates_selectors.templates.getSelectedTemplate);
    this.templateError$ = this.store.select(templates_selectors.templates.getError);

    // for debug ONLY
    this.selectedTemplate$.subscribe((data) => {
      let a = 0;
    })
  }

  ngOnInit() {
    // Ensure we load available templates
    console.log("[templatesComponent] ngOnit : dispatch load templates -- " + new Date(Date.now()));
    this.store.dispatch(new template_actions.loadTemplates());

  }
  loadTemplates() {
    this.store.dispatch(new template_actions.loadTemplates());
  }
  addTemplate() {
    this.store.dispatch(new template_actions.addTemplate({
      name: "New template", zones: []
    }));
  }

  deleteTemplate() {
    this.store.dispatch(new template_actions.removeTemplate(this.selectedTemplate));
  }
}
