import { Component, OnInit, Input } from '@angular/core';
import * as template_model from '../../store/models/template.model';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  @Input() public template: template_model.ITemplate = null;


  constructor() { }

  ngOnInit() { }
}
