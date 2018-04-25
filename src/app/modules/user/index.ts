import * as user_components from './components';
import * as user_guards from './guards';
import * as user_services from './services';
import * as user_store from './store';

export const user_module = {
  components: user_components,
  guards: user_guards,
  services: user_services,
  store: user_store.store
}