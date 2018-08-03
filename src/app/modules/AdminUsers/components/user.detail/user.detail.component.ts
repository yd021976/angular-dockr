import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../store/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  @Input() user: IUser[];
  // @Output() selectUser = new EventEmitter<IUser>();

  constructor() {
  }

  ngOnInit() {
  }

}
