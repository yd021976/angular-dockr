import * as files_model from '../models/files.model';

export const initialState = function (): files_model.IFiles {
  return {
    files: [],
    status: {
      isLoading: false,
      isError: false,
      error: ''
    }
  }
}