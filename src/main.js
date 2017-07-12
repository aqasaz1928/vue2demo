// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(VueResource);
const router = new Router({
  routes: [
    {path: '/seller', component: seller},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/', redirect: '/goods'}
  ],
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-active'

});
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

