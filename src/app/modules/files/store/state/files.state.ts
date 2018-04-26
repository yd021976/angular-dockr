import * as files_model from '../models/files.model';

export const initialState = function (): files_model.IFile {
  return {
    _id: '',
    name: '',
    ext: '',
    url: ''
  }
}