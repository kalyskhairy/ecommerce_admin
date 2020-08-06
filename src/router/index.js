import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import WhistList from '@/views/whistlist.vue'
import TopUp from '@/views/topup.vue'
import Category from '@/views/Category.vue'
import History from '@/views/history.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/whistlist',
    name: 'Whistlist',
    component: WhistList
  },
  {
    path: '/Topup',
    name: 'Topup',
    component: TopUp
  },
  {
    path: '/History',
    name: 'History',
    component: History
  },
  {
    path: '/:type',
    name: 'type',
    component: Category
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
