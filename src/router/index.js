import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import First from '@/views/First.vue'
import Second from '@/views/Second.vue'
import Third from '@/views/Third.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: { hideNav: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { hideNav: true }
  },
  {
    path: '/first',
    name: 'First',
    component: First
    // meta: { requiresAuth: true } // 需要授權的頁面
  },
  {
    path: '/second',
    name: 'Second',
    component: Second,
    // meta: { requiresAuth: true } // 需要授權的頁面
  },
  {
    path: '/third',
    name: 'Third',
    component: Third,
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
