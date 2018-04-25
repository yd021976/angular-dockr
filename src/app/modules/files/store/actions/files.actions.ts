import { Action } from '@ngrx/store';
import * as files_model from '../models';


export const FILES_LOAD = "[FILES] LOAD";
export const FILES_LOAD_SUCCESS = "[FILES] LOAD SUCCESS";
export const FILES_LOAD_ERROR = "[FILES] FILES LOAD ERROR";

export const FILE_SELECT = "[FILE] SELECT";

export class loadFiles implements Action {
  readonly type = FILES_LOAD;
  constructor() { }
}
export class loadFilesSuccess implements Action {
  readonly type = FILES_LOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class loadFilesError implements Action {
  readonly type = FILES_LOAD_ERROR;
  constructor(public payload: string) { }
}

export class selectFile implements Action {
  readonly type = FILE_SELECT;
  constructor(public payload: files_model.IFile) { }
}


export type All =
  loadFiles |
  loadFilesSuccess |
  loadFilesError |
  selectFile
  ;