import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import store from './store'
import Store from 'electron-store'
import { i18n } from './lang/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faFolderOpen, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VuePageTransition from 'vue-page-transition'

library.add(faTrash, faFolderOpen, faBars, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.prototype.electronStore = new Store()
Vue.prototype.eventBus = new Vue();
Vue.use(VuePageTransition)
Vue.use(VueI18n)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
