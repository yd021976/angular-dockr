import * as users_actions from '../actions';
// import * as template_model from '../models/template.model';
// import * as template_state from '../state/template.state';
// import { NormalizedState, normalized, createSchemaSelectors, RemoveData } from 'ngrx-normalizr';
// import { ActionReducerMap, combineReducers } from '@ngrx/store';

type Actions = users_actions.All;
// const selectedTemplateReducer = (state: string, action: Actions) => {
//   switch (action.type) {

//     case template_actions.TEMPLATE_SELECT:
//       return state == action.payload._id ? "" : action.payload._id;

//     default:
//       return state;
//   }
// }

// export const reducer: ActionReducerMap<template_state.ITemplates> = {
//   normalized: normalized,
//   selectedTemplateId: selectedTemplateReducer,
//   selectedZoneId: selectedZoneReducer,
//   error: errorReducer
// }