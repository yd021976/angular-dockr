import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../store/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users: IUser[];
  @Output() selectUser = new EventEmitter<IUser>();

  constructor() {
  }

  ngOnInit() {
  }

}
