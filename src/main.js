import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import VueQRCodeComponent from 'vue-qrcode-component'
import App from './App.vue'
import Router from 'vue-router'
import Routes from './Routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('qr-code', VueQRCodeComponent);

const router = new Router({
  routes: Routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('user')) {
      return next();
    } else {
      return router.push({name: 'Login', query: {path: to.fullPath}});
    }
  } else {
    next()
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.breadCrumbs) {
    for (const breadcrumb of to.meta.breadCrumbs) {
      if (breadcrumb.to) {
        breadcrumb.to.params = to.params;
      }
    }

    let activeBreadcrumb = to.meta.breadCrumbs[to.meta.breadCrumbs.length - 1];
    document.title = activeBreadcrumb.text;
  }

  next();
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
