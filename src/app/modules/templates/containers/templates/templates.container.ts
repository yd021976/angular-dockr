import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BackdropComponent } from '../../../../shared/ui-components/backdrop/backdrop.component';
import { ITemplate } from '../../store/models/template.model';
import { ISandBox } from '../../sandbox-templates';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.container.html',
  styleUrls: ['./templates.container.scss']
})
export class TemplatesContainer implements OnInit {
  public selectedTemplate: ITemplate = null; // Container template "select" binding
  public selectedTemplate$: Observable<ITemplate> = null; // Source data stream that select a template object
  public templates$: Observable<ITemplate[]>;

  private subscribes: Subscription[] = [];

  constructor(@Inject('sandbox') private sandbox: ISandBox) {
    this.templates$ = this.sandbox.templates$;
    this.selectedTemplate$ = this.sandbox.selectedTemplate$;
    this.subscribes.push(this.selectedTemplate$.subscribe((template: ITemplate) => {
      this.selectedTemplate = template;
    }));
  }


  ngOnInit() {
    // Ensure we load available templates
    console.log("[templatesComponent] ngOnit : dispatch load templates -- " + new Date(Date.now()));
    this.sandbox.loadTemplates();
  }
  ngOnDestroy() {
    this.subscribes.forEach(subscribe => {
      subscribe.unsubscribe();
    })
  }

  /**
   * Needed for HTML select to match object selection as new templates array is provided and references are lost
   */
  compareTemplateObjects(option1, option2) {
    if (!option1 || !option2) return false;

    return option1._id === option2._id;
  }

  onTemplateChange(event) {
    this.sandbox.selectTemplate(<ITemplate>event.value);
  }

  addTemplate() {
    this.sandbox.addTemplate({
      name: "New template", zones: []
    });
  }

  deleteTemplate() {
    this.sandbox.removeTemplate(this.selectedTemplate);
  }
}
