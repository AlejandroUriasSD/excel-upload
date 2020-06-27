import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceso from '@/views/access.vue'
import cargaExcel from '@/views/uploadExcelView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'access',
    component: Acceso,
    meta: { title: 'login de acceso' }
  },
  {
    path: '/cargaDeExcel',
    name: 'cargaDeExcel',
    component: cargaExcel,
    meta: {
      title: 'carga de excel',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({

  base: process.env.BASE_URL,
  routes
})
const DEFAULT_TITLE = 'Salud Digna - excel-upload';
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('user-token')) {
      next({ name: "access"})
      return
    }
  }
  next();
})
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});
export default router
