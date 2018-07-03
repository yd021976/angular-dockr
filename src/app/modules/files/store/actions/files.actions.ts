import { Action } from '@ngrx/store';
import * as files_models from '../models/files.model';

export const FILES_GET_LIST = "[FILES] GET LIST";
export const FILES_GET_LIST_SUCCESS = "[FILES] GET LIST SUCCESS";
export const FILES_GET_LIST_ERROR = "[FILES] GET LIST ERROR";

export const FILES_UPLOAD = "[FILES] UPLOAD";
export const FILES_UPLOAD_SUCCESS = "[FILES] UPLOAD SUCCESS";
export const FILES_UPLOAD_ERROR = "[FILES] UPLOAD ERROR";

export const FILES_REMOVE = "[FILES] REMOVE";
export const FILES_REMOVE_SUCCESS = "[FILES] REMOVE SUCCESS";
export const FILES_REMOVE_ERROR = "[FILES] REMOVE ERROR";


export class filesGetList implements Action {
  readonly type = FILES_GET_LIST;
  constructor(public payload?: string) { }
}
export class filesGetListSuccess implements Action {
  readonly type = FILES_GET_LIST_SUCCESS;
  constructor(public payload?: files_models.IFiles) { }
}
export class filesGetListError implements Action {
  readonly type = FILES_GET_LIST_ERROR;
  constructor(public payload?: string) { }
}
export class filesUpload implements Action {
  readonly type = FILES_UPLOAD;
  constructor(public payload?: string) { }
}
export class filesUploadSuccess implements Action {
  readonly type = FILES_UPLOAD_SUCCESS;
  constructor(public payload?: string) { }
}
export class filesUploadError implements Action {
  readonly type = FILES_UPLOAD_ERROR;
  constructor(public payload?: string) { }
}
export class filesRemove implements Action {
  readonly type = FILES_REMOVE;
  constructor(public payload?: string) { }
}
export class filesRemoveSuccess implements Action {
  readonly type = FILES_REMOVE_SUCCESS;
  constructor(public payload?: string) { }
}
export class filesRemoveError implements Action {
  readonly type = FILES_REMOVE_ERROR;
  constructor(public payload?: string) { }
}

export type All =
  filesGetList |
  filesGetListSuccess |
  filesGetListError |
  filesUpload |
  filesUploadSuccess |
  filesUploadError |
  filesRemove |
  filesRemoveSuccess |
  filesRemoveError;