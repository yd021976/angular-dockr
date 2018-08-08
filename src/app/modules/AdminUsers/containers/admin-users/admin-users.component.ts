import { Component, OnInit, Inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IUser } from '../../store/models';
import { ISandboxAdminUsers, sandboxServiceToken } from '../../sandbox-AdminUsers';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  
  constructor(@Inject(sandboxServiceToken) public sandbox: ISandboxAdminUsers) { }

  ngOnInit() { 
    this.sandbox.loadUsers();
  }

}
