import { Injectable, InjectionToken, Injector } from "@angular/core";
import { mockAdminUsersService} from "./users.mock.service";
import { IAdminUsersService} from './users.interface.service';

/**
 * 
 */
@Injectable()
export class adminUsersService implements IAdminUsersService {
  constructor(private feathers: IAdminUsersService) { }
  getAll() { }
  updateUser() { }
  findUser() { }
  removeUser(){}
}