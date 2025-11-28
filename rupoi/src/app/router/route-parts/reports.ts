import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const reportRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Reports.index.path,
    name: RouteConfig.Reports.index.name,
    component: () => import('@rupoi/pages/reports/ui/reports-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Отчеты',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
        UserRole.WAREHOUSE,
      ]
    },
  },
]
