import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@rupoi/pages/login/ui/login-page.vue'),
    meta: { requiresAuth: false, layout: 'auth', title: 'Вход' },
  },
  // Backward-compatible redirect from old path/name
  {
    path: '/sign-in',
    redirect: { name: 'Login' },
    meta: { requiresAuth: false },
  },
]
