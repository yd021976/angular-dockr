import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IUser } from '../../store/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<IUser[]>;
  constructor(private store: Store<any>) {

  }

  ngOnInit() {
  }

}
