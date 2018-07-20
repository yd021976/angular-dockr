import * as users_actions_loading from './users.actions.loading';
import * as users_actions_selection from './users.actions.select';

export type All =
    users_actions_loading.All |
    users_actions_selection.All;

export const actions = {
    loading: users_actions_loading.actionTypes,
    selection: users_actions_selection.actionTypes
}