import * as user_model from '../models/user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/** Helper functions */
const getUserFeature = createFeatureSelector('user');
const authenticated = (state: user_model.IUser): boolean => state.authenticated;
const isAuthenticated = createSelector(getUserFeature, authenticated);

const error = (state: user_model.IUser): string => state.error;
const getError = createSelector(getUserFeature, error);

const selectors =  {
    isAuthenticated: isAuthenticated,
    getError : getError
}

export default selectors; 
