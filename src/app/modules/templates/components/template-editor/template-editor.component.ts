import { Component, OnInit, Input } from '@angular/core';
import { ITemplate } from '../../store/models/template.model';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {
  @Input() template: ITemplate;
  
  constructor() { }

  ngOnInit() {
  }

}
