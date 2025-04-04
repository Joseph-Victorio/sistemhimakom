import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import BendaharaDashboard from '@/views/bendahara/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/admin/login',
      name: 'login',
      component: Login
    },
    {
      path:'/bendahara/dashboard',
      name: 'dashboard_bendahara',
      component: BendaharaDashboard
    }
  ],
})

export default router
