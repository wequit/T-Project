import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const chiefDoctorRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.ChiefDoctor.index.path,
    name: RouteConfig.ChiefDoctor.index.name,
    component: () => import('@rupoi/pages/chief-doctor/ui/chief-doctor-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Главный врач',
      roles: [UserRole.ADMINISTRATOR, UserRole.CHIEF_DOCTOR],
    },
  },
]


