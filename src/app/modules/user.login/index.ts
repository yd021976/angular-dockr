import * as userLogin_components from './components';
import * as userLogin_guards from './guards';
import * as userLogin_services from './services';
import * as userLogin_store from './store';
import * as userLogin_container from './containers';

export const user_login_module = {
  components: userLogin_components,
  containers: userLogin_container,
  guards: userLogin_guards,
  services: userLogin_services,
  store: userLogin_store.store
}