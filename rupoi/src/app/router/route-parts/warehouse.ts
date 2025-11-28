import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const warehouseRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Warehouse.index.path,
    name: RouteConfig.Warehouse.index.name,
    component: () => import('@rupoi/pages/warehouse/ui/warehouse-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Склад',
      roles: [UserRole.ADMINISTRATOR, UserRole.WAREHOUSE],
    },
  },
]
