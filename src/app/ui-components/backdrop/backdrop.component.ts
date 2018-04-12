import { Component, OnInit, Input } from '@angular/core';
import 'web-animations-js'; // WARNING: Needed in safari for web animations to work
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
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  animations: [
    trigger('backdropFade', [
      transition(':enter', [
        style({ backgroundColor: '#FFFFFF' }),
        animate('500ms ease-in'),
        query('mat-spinner',animateChild()),
      ]),
      transition(':leave', [
        query('mat-spinner',animateChild()),
        animate(500, style({ backgroundColor: '#FFFFFF' })),
      ])
    ]),
    trigger('fadeSpinner', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in',style({opacity:1}))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in',style({opacity:0}))
      ])
    ])
  ],
  host: {}
})
export class BackdropComponent implements OnInit {
  @Input() navigating: boolean;
  constructor() { }

  ngOnInit() {
  }

}
