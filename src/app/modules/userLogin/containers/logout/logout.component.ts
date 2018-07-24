import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as user_model from '../../store/models/user.model';
import * as user_actions from '../../store/actions/user.actions';
import user_selectors from '../../store/selectors/user.selectors';


@Component({
  selector: 'user-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  
  public isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<user_model.IUser>) {
    this.isAuthenticated$ = this.store.select(user_selectors.isAuthenticated);
  }

  ngOnInit() { }

  onLogout() {
    this.store.dispatch(new user_actions.userLogout());
  }
}
