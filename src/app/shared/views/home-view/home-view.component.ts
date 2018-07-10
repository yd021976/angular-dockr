import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home-view',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  host: {
    'class': 'home-view'
  }
})
export class HomeViewComponent {
  // @HostBinding('style.border') border = '3px solid red';
  constructor() { }
}
