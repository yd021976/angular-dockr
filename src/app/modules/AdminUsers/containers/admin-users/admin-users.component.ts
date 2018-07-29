import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../../store/models';
import { ISandboxAdminUsers } from '../../sandbox-AdminUsers';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public sandbox: ISandboxAdminUsers;

  constructor(@Inject('sandbox-admin-users') sandbox: ISandboxAdminUsers) { }

  ngOnInit() { }

}
