import { IAdminUsersService } from './users.interface.service';
import { IUser } from '../../store/models';
import { Service, Application, Pagination } from 'feathers/client';

export class mockAdminUsersService implements IAdminUsersService {
  private static user: IUser = { _id: 'MOCK USER', mail: 'mail MOCK USER', role: ["1"] };

  getAll(): Promise<IUser[] | Pagination<IUser>> {
    return new Promise<IUser[]>((resolve, reject) => {
      resolve([mockAdminUsersService.user]);
    })
  }
  getUser(user): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve(mockAdminUsersService.user);
    })
  }
  updateUser(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve(mockAdminUsersService.user);
    })
  }
  findUser(filters): Promise<IUser[] | Pagination<IUser>> {
    return new Promise<IUser[]>((resolve, reject) => {
      resolve([mockAdminUsersService.user]);
    })
  }
  removeUser(user): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      resolve(mockAdminUsersService.user);
    })
  }
}