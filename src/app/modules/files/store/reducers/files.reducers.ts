import * as files_actions from '../actions/files.actions';
import * as files_model from '../models/files.model';
import * as files_state from '../state/files.state';

type Actions = files_actions.All;
let defaultState = files_state.initialState();

export const reducer = function (state: files_model.IFile = defaultState, action: Actions) {
  switch (action.type) {
    case files_actions.FILES_GET_LIST:
      break;
    case files_actions.FILES_GET_LIST_SUCCESS:
      break;
    case files_actions.FILES_GET_LIST_ERROR:
      break;
    default:
      return state;
  }
}