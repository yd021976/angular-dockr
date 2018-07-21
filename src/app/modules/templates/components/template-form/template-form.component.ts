import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as template_model from '../../store/models/template.model';
import { NgForm } from '../../../../../../node_modules/@angular/forms';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  @Input() public template: template_model.ITemplate = null;
  @Output() public templateNameUpdate = new EventEmitter<string>()

  public templateForm: NgForm;

  constructor() { }

  ngOnInit() { }

  templateNameChange(templateName, form) {
    if (form.isDirty) this.templateNameUpdate.emit(templateName);
  }
}
