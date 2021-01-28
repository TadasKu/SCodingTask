import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
var possiblePaths = ['/', '/issues/open', '/issues/done', '/issues/trashed']
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/issues/:status',
    name: 'Issues',
    component: () => import('../views/Issues.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!possiblePaths.includes(to.path)) {
    next('/')
  }
  next()
})

export default router
