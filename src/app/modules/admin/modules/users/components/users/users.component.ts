import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IUser } from '../../store/models';
import * as users_selectors from '../../store/selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users$: Observable<IUser[]>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

}
