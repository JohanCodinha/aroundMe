// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import VueResource from 'vue-resource';
import App from './App';

/* eslint-disable no-new */

Vue.use(VueMaterial);
Vue.use(VueResource);


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
