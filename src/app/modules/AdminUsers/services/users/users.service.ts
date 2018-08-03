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


  getAll(): Promise<IUser[] | Pagination<IUser>> {
    return this.service.find();
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