import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/AppHome.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    // meta: { requiresAuth: true } // 需要授權的頁面
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守衛
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('authToken') // 檢查用戶是否已登入
//   if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     next({ name: 'Login' }) // 如果未登入，重定向到登入頁
//   } else {
//     next() // 否則繼續導航
//   }
// })

export default router
