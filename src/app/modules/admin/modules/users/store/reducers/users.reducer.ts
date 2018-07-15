import * as users_actions from '../actions';
import * as users_model from '../models';
import * as users_state from '../state';
// import { NormalizedState, normalized, createSchemaSelectors, RemoveData } from 'ngrx-normalizr';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

type Actions = users_actions.All
const getUsers = (state: users_model.IUser = users_state.initialState(), action: Actions) => {
  switch (action.type) {

    case users_actions.actions.getAll.USERS_GET_LIST:
      return {};

    default:
      return state;
  }
}

export const reducer = { getUsers };