import { Component } from '@angular/core';

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

  constructor() { }
}
