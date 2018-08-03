import * as users_actions from '../actions';
import * as users_model from '../models';
import * as users_state from '../state';
import { ActionReducerMap } from '@ngrx/store';
import { normalized } from 'ngrx-normalizr';

type Actions = users_actions.loadingClasses | users_actions.selectClasses;

const loading = (state: boolean = false, action: Actions) => {
  switch (action.type) {

    case users_actions.loadingTypes.LOAD_USERS:
      return true;

    case users_actions.loadingTypes.LOAD_USERS_SUCCESS:
    case users_actions.loadingTypes.LOAD_USERS_ERROR:
      return false;

    default:
      return state;
  }
}

const error = (state: users_state.error = { hasError: false, error: '' }, action: Actions) => {
  switch (action.type) {
    case users_actions.loadingTypes.LOAD_USERS_ERROR:
      return { ...state, hasError: true, error: action.payload }
    default:
      return state;
  }
}

const selectUser = (state: string = '', action: Actions) => {
  switch (action.type) {
    case users_actions.selectTypes.SELECT_USERS:
      return action.payload._id;
    default:
      return state;
  }
}

export const reducer: ActionReducerMap<users_state.IUsers> = {
  normalized: normalized,
  error: error,
  selectedUser: selectUser,
  isLoading: loading
};