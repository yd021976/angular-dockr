import * as user_actions from '../actions/user.actions';
import * as user_model from '../models/user.model';
import * as user_state from '../state/user.state';

export type Actions = user_actions.All;

const defaultUserState: user_model.IUser = user_state.initialState();

export function reducer(state: user_model.IUser = defaultUserState, action: Actions) {

  switch (action.type) {
    case user_actions.USER_LOGIN: {
      return {
        ...state, isLogging: true
      }
    }
    case user_actions.USER_LOGIN_SUCCESS: {
      return {
        ...state, isLogging: false, error: '', authenticated: true, login: action.payload
      }
    }
    case user_actions.USER_LOGIN_ERROR: {
      return {
        ...state, isLogging: false, authenticated: false, login: '', error: action.payload
      }
    }
    case user_actions.USER_LOGOUT: {
      return {
        ...state, isLogging: true, error: ''
      }
    }
    case user_actions.USER_LOGOUT_SUCCESS: {
      return {
        ...state, isLogging: false, authenticated: false, login: '', error: ''
      }
    }

    case user_actions.USER_LOGOUT_ERROR: {
      return {
        ...state, isLogging: false, authenticated: false, login: '', error: action.payload
      }
    }

    default: {
      return { ...state }
    }
  }
}