import * as user_actions from './actions/user.actions';
import * as user_effects from './effects/user.effects';
import * as user_models from './models/user.model';
import * as user_reducers from './reducers/user.reducer';
import * as user_selectors from './selectors/user.selectors';
import * as user_state from './state/user.state';

export const store = {
  actions : user_actions,
  effects : user_effects,
  models : user_models,
  reducers : user_reducers,
  selectors : user_selectors.default,
  state : user_state
}