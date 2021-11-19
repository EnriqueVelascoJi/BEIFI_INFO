import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import InfoCuestionarios from '../components/InfoCuestionarios.vue'

//Importamos la tienda
import store from '../store'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'InfoCuestionarios',
    component: InfoCuestionarios,
    meta: {rutaProtegida: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {

  // console.log(to.meta.rutaProtegida);

  if(to.meta.rutaProtegida) {
    if(store.getters.usuarioAutenticado) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})
export default router
