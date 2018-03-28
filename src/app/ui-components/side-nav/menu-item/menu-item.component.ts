import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { appRoute } from '../../../routing/routing.types';
import { MatIconRegistry, MatExpansionPanel, MatAccordion } from '@angular/material';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() menuItem: appRoute = {};
  @Input() accordion: MatAccordion = null;
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

  constructor(private matIconRegistry: MatIconRegistry) { }

  ngOnInit() {

  }

  /*
  Init accordion property to the first expansion panel
  */
  ngAfterViewInit() {
    if (this.accordion) {
      if (this.panel) {
        this.panel.accordion = this.accordion;
      }
    }
  }
  ngAfterContentInit() {

  }

}
