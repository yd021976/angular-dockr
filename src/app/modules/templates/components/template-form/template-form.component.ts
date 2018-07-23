import { Component, OnInit, Input, Output, EventEmitter, ViewChild, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import * as template_model from '../../store/models/template.model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit, DoCheck {
  @Input() public template: template_model.ITemplate = null;
  @Output() public formIsDirty = new EventEmitter<boolean>()

  @ViewChild('tplForm') public tplForm: NgForm;

  private _oldFormDirtyStatus: boolean = false;
  constructor() { }

  ngOnInit() { }

  ngDoCheck() {
    if (this.tplForm.dirty == true && this._oldFormDirtyStatus != this.tplForm.dirty) {
      this.formIsDirty.emit(true);
      this._oldFormDirtyStatus = this.tplForm.dirty;
    }
  }
}
