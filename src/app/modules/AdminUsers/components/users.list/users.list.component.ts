import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../store/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: Array<IUser>;
  @Output() selectUser = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
