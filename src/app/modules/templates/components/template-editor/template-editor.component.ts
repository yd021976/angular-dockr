import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITemplate } from '../../store/models/template.model';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {
  @Input() template: ITemplate;
  @Input() dirty: boolean = false;
  @Output() save = new EventEmitter<ITemplate>();
  constructor() { }

  ngOnInit() {
  }

  setDirtyForm(dirtyStatus:boolean) {
    this.dirty = dirtyStatus;
  }

  saveTemplate() {
    this.save.emit(this.template);
  }

}
