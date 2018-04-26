import { Action } from '@ngrx/store';

export const FILES_GET_LIST = "[FILES] GET LIST";
export const FILES_GET_LIST_SUCCESS = "[FILES] GET LIST SUCCESS";
export const FILES_GET_LIST_ERROR = "[FILES] GET LIST SUCCESS";

export class filesGetList implements Action {
  readonly type = FILES_GET_LIST;
  constructor(public payload?: string) { }
}
export class filesGetListSuccess implements Action {
  readonly type = FILES_GET_LIST_SUCCESS;
  constructor(public payload?: string) { }
}
export class filesGetListError implements Action {
  readonly type = FILES_GET_LIST_ERROR;
  constructor(public payload?: string) { }
}

export type All =
  filesGetList |
  filesGetListSuccess |
  filesGetListError;