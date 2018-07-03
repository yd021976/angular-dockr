import * as files_actions from '../actions/files.actions';
import * as files_model from '../models/files.model';
import * as files_state from '../state/files.state';

type Actions = files_actions.All;
let defaultState = files_state.initialState();

export const reducer = function (state: files_model.IFiles = defaultState, action: Actions) {
  switch (action.type) {
    case files_actions.FILES_GET_LIST:
      return state;

    case files_actions.FILES_GET_LIST_SUCCESS:
      return { ...state, files: action.payload.files, status: { isLoading: false, isError: false } }

    case files_actions.FILES_GET_LIST_ERROR:
      return {
        ...state, files: [], status: {
          isLoading: false, isError: true, error: action.payload
        }
      }

    default:
      return state;
  }
}