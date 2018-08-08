import { Injectable, InjectionToken, Injector } from "@angular/core";
import { IAdminUsersService } from './users.interface.service';
import { Service, Application, Pagination } from 'feathers/client';
import { IUser } from "../../store/models";

/**
 * 
 */
@Injectable()
export class adminUsersService implements IAdminUsersService {
  private service: Service<IUser> = null;

  constructor(
    private feathers: Application, // Feathers application
    private feathersServiceName: string = "admin.users" // Feathers service name for admin users
  ) {
    this.service = this.feathers.service(this.feathersServiceName);
  }

  /**
   * Retrive all users except "anonymous"
   */
  getAll(): Promise<IUser[] | Pagination<IUser>> {
    return this.service.find().then((users) => {
      var data: Array<IUser> = users['data'] ? users['data'] : users;
      return data.filter(user => user['anonymous'] != true);
    })
  }


  findUser(filters): Promise<IUser[] | Pagination<IUser>> {
    return this.service.find(filters);
  }

  updateUser(user: IUser): Promise<IUser> {
    return this.service.patch(user._id, user);
  }


  getUser(id: string): Promise<IUser> {
    return this.service.get(id);
  }


  removeUser(user: IUser): Promise<IUser> {
    return this.service.remove(user._id);
  }
}