// import * as template_actions from '../actions/template.actions';
// import * as template_model from '../models/template.model';
// import * as template_state from '../state/template.state';
// import { NormalizedState, normalized, createSchemaSelectors, RemoveData } from 'ngrx-normalizr';
// import { ActionReducerMap, combineReducers } from '@ngrx/store';

// type Actions = template_actions.All;
// const selectedTemplateReducer = (state: string, action: Actions) => {
//   switch (action.type) {

//     case template_actions.TEMPLATE_SELECT:
//       return state == action.payload._id ? "" : action.payload._id;

//     default:
//       return state;
//   }
// }

// const selectedZoneReducer = (state: string, action: Actions) => {
//   switch (action.type) {
//     case template_actions.TEMPLATE_SELECT_ZONE: {
//       return state == action.payload._id ? "" : action.payload._id;
//     }
//     default:
//       return state;
//   }
// }

// const errorReducer = (state: template_state.error = { hasError: false, error: '' }, action: Actions) => {
//   switch (action.type) {
//     case template_actions.TEMPLATE_LOAD_ERROR: {
//       return { ...state, hasError: true, error: action.payload }
//     }

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