import * as files_actions from '../actions/files.actions';
import * as files_model from '../models/files.model';
import * as files_state from '../state/files.state';
import { NormalizedState, normalized, createSchemaSelectors, RemoveData } from 'ngrx-normalizr';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

type Actions = files_actions.All;
export function reducer (state: string, action: Actions){
  switch (action.type) {

    default:
      return state;
  }
}