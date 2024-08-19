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
    component: First,
    meta: { requiresAuth: true, title: 'Vue 直播班 | 第一週作業' }
  },
  {
    path: '/second',
    name: 'Second',
    component: Second,
    meta: { requiresAuth: true, title: 'Vue 直播班 | 第二週作業' }
  },
  {
    path: '/third',
    name: 'Third',
    component: Third,
    meta: { requiresAuth: true, title: 'Vue 直播班 | 第三週作業' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, form, next) => {
  const isAuthenticated = sessionStorage.getItem('token');

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
