// import { NormalizedState, normalized, createSchemaSelectors, EntityMap } from 'ngrx-normalizr';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as users_model from '../models';

const usersFeatureSelector = createFeatureSelector<users_model.IUser>('users');
// /** 
//  * Get all templates
// */
// const templateSchemaSelector = createSchemaSelectors<template_model.ITemplate>(template_model.schemas);
// const templateEntities = createSelector(templateFeatureSelector, templateSchemaSelector.getNormalizedEntities);
// const getAllTemplates = createSelector(templateEntities, templateSchemaSelector.entitiesProjector);


// const templateError = (state: template_state.ITemplates) => state.error;
// const getError = createSelector(templateFeatureSelector, templateError);

// /**
//  * Selected template
//  */
// const templateId = createSelector(templateFeatureSelector, state => state.selectedTemplateId);
// const entities = createSelector(
//   templateFeatureSelector,
//   templateSchemaSelector.getNormalizedEntities
// );
// const selectedTemplate = createSelector(entities,templateId,templateSchemaSelector.entityProjector);

// /**
//  * Selected Zone
//  */
// // const allZones = createSchemaSelectors<zone_model.IZone>(zone_model.schemas);
// // const selectedZone = (state: template_state.ITemplates) => { return state.selectedZoneId }
// // const getSelectedZone = createSelector(allZones.getNormalizedEntities, selectedZone, allZones.entityProjector);

const selectors = {
  
}

export default selectors;