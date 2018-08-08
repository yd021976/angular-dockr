// import { NormalizedState, normalized, createSchemaSelectors, EntityMap } from 'ngrx-normalizr';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createSchemaSelectors } from 'ngrx-normalizr';
import * as users_model from '../models';
import * as users_state from '../state';

const usersFeatureSelector = createFeatureSelector<users_state.IUsers>('users');

/**
 * Get error state
 */
const getErrorMessage = createSelector(usersFeatureSelector, state => state.error.error);

/**
 * Get loading state
 */
const isLoading = createSelector(usersFeatureSelector, state => state.isLoading);
/**
 * Users list
 */
const usersSchema = createSchemaSelectors<users_model.IUser>(users_model.schemas);
const usersEntities = createSelector(usersFeatureSelector, usersSchema.getNormalizedEntities);
const getUsersList = createSelector(usersEntities, usersSchema.entitiesProjector);

const selectors = {
  isLoading : isLoading,
  getUsersList: getUsersList,
  getErrorMessage : getErrorMessage
}

export default selectors;