import * as users_actions_loading from './users.actions.loading';

export type All =
    users_actions_loading.All;

export const actions = {
    loading: users_actions_loading.actionTypes,
}