import { Component, HostBinding, OnInit, Inject, OnDestroy, ElementRef, ViewChild, Type } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import * as rxjs from 'rxjs';
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

import { themeItem } from '../ui-components/nav-bar/nav-bar.component';
import { Store } from '@ngrx/store';
import { user_module } from '../shared/user';
import { BackdropComponent } from '../ui-components/backdrop/backdrop.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [

      transition('* => *', [
        query('#contents :enter',
          [
            style({ opacity: 0 })
          ],
          { optional: true }
        ),

        query('#contents :leave',
          [
            style({ opacity: 1 }),
            animate('0.3s', style({ opacity: 0 }))
          ],
          { optional: true }
        ),

        query('#contents :enter',
          [
            style({ opacity: 0 }),
            animate('0.5s', style({ opacity: 1 }))
          ],
          { optional: true }
        )
      ])
    ]),
    // trigger('backdropFade',
    //   [
    //     transition('* => *', [
    //       query('div', animateChild())
    //     ])
    //   ])
  ],

  host: {}
})


export class AppComponent implements OnInit, OnDestroy {
  themes: themeItem[] = [{ name: 'Default', class_name: 'default' }, { name: 'Grey/Orange', class_name: 'app-theme-2' }];
  public isAuthenticated$: rxjs.Observable<boolean>;
  public navState: string = "begin";
  public backdrop: boolean = false;

  @HostBinding('class') componentCssClass; // Binding for theme change



  constructor(public router: Router, public store: Store<any>) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.backdrop = true;
      }
      if (event instanceof NavigationEnd) {
        this.backdrop = false;
      }
    })

  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(user_module.store.selectors.isAuthenticated);
  }

  /** Theme selection change */
  themeChange(event) {
    this.componentCssClass = event;
  }

  ngOnDestroy() { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  onLogin() {
    this.store.dispatch(new user_module.store.actions.userLoginNavigate());
  }
  onLogout() {
    this.store.dispatch(new user_module.store.actions.userLogoutNavigate());
  }
}
