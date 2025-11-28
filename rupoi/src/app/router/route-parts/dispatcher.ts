import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const dispatcherRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Dispatcher.index.path,
    name: RouteConfig.Dispatcher.index.name,
    component: () => import('@rupoi/pages/dispatcher/ui/dispatcer-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Диспетчер',
      roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER],
    },
  },
]
