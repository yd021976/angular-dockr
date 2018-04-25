import * as files_models from '../models';
import { IFile } from '../models';

export const initialState = function (): files_models.IFiles {
  return {
    files: [],
    error: '',
    isError: false
  }
}