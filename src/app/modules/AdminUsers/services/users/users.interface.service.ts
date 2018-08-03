import { IUser } from "../../store/models";
import { Service, Application, Pagination } from 'feathers/client';

/**
 * 
 */
export interface IAdminUsersService {
  getAll(): Promise<IUser[] | Pagination<IUser>>;
  findUser(filters): Promise<IUser[] | Pagination<IUser>>;
  updateUser(user:IUser):Promise<IUser>;
  getUser(id:string):Promise<IUser>;
  removeUser(user:IUser):Promise<IUser>;
}