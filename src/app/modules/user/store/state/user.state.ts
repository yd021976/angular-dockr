import * as user_model from '../models/user.model';

export const initialState = function (): user_model.IUser {
  return {
    id: '',
    email: '',
    token: '',
    role:'',
    authenticated: false,
    error: ''
  }
}