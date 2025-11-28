import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const workshopRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Workshop.index.path,
    name: RouteConfig.Workshop.index.name,
    component: () => import('@rupoi/pages/workshop/ui/workshop-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Цех',
      roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER],
    },
  },
]


