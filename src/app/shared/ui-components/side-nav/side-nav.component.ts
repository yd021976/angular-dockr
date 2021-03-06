import { Component, OnInit, Input } from '@angular/core';
import { Routes, Route } from '@angular/router';

// App Types
import { appRoute } from '../../../main/routing/routing.types';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  // Convert router config to simplified 2 levels array of route items (avoid multiple ng-container loop/if in template)
  @Input() routerConfig: appRoute[];

  constructor() { }
  ngOnInit() { }

}