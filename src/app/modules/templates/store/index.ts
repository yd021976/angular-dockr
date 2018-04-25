import * as actions from './actions';
import * as effects from './effects';
import * as models from './models';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as state from './state';

export default {
  actions: actions,
  effects: effects,
  models: models.default,
  reducers: reducers,
  selectors: selectors,
  state: state
}