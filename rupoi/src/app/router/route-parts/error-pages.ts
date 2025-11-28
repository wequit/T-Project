import type { RouteRecordRaw } from 'vue-router'

export const errorPageRoutes: RouteRecordRaw[] = [
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('@rupoi/pages/forbidden/ui/forbidden-page.vue'),
    meta: {
      requiresAuth: false,
      title: 'Доступ запрещён'
    },
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@rupoi/pages/not-found/ui/not-found-page.vue'),
    meta: {
      requiresAuth: true,
      title: 'Страница не найдена'
    },
  },
  // Catch-all route для 404 - должен быть последним
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  },
]

