import * as users_actions_get_all from './users.actions.get.list';
import * as users_actions_add from './users.actions.add.user';
import * as users_actions_remove from './users.actions.remove.user';
import * as users_actions_update from './users.actions.update.user';

export type All =
    users_actions_get_all.All |
    users_actions_add.All |
    users_actions_remove.All |
    users_actions_update.All;

export const actions = {
    getAll: users_actions_get_all,
    add: users_actions_add,
    remove: users_actions_remove,
    update: users_actions_update
}