import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
  // public templates$: Observable<template_model.ITemplate[]>;
  public templates$: Observable<any>;

  constructor(private store: Store<any>) {
    // this.templates$ = this.store.select(templates_selectors.templates.feature).select(templates_selectors.templates.getAllTemplates);
    this.templates$ = this.store.select(templates_selectors.templates.getAllTemplates);
  }

  ngOnInit() {
    // Ensure we load available templates
    this.store.dispatch(new template_actions.loadTemplates());
  }

}
