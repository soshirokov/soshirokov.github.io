import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import contextMenu from './plugins/ContextMenu'
import vuetify from './plugins/vuetify';
import TrendChart from "vue-trend-chart";

Vue.config.productionTip = false;
Vue.use(contextMenu);
Vue.use(TrendChart);

new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router
}).$mount('#app');
