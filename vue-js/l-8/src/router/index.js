import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/add/payment/:categorySelected',
      name: 'addpayment',
      component: () => import('../views/Payments.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Payments.vue'),
    },
  ],
});

export default router;
