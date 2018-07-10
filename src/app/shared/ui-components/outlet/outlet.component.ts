import { Component, OnInit, HostBinding } from '@angular/core';
import {
  AnimationEvent,
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';
import 'web-animations-js'; // WARNING: Needed in safari for web animations to work


@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
  animations: [
    trigger('fadeAnimation', [

      transition('* => *', [
        query(':enter',
          [
            style({ opacity: 0 })
          ],
          { optional: true }
        ),

        query(':leave',
          [
            style({ opacity: 1 }),
            animate('0.1s', style({ opacity: 0 }))
          ],
          { optional: true }
        ),

        query(':enter',
          [
            style({ opacity: 0 }),
            animate('0.1s', style({ opacity: 1 }))
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class OutletComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute.component.name : '';
  }
}
