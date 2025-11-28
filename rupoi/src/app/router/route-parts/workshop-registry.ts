import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const workshopRegistryRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.WorkshopRegistry.list.path,
    name: RouteConfig.WorkshopRegistry.list.name,
    component: () => import('@rupoi/pages/workshop-registry/ui/workshop-registry-list-page.vue'),
    meta: { requiresAuth: true, layout: 'default', title: 'Реестр мастерских', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] },
  },
  {
    path: RouteConfig.WorkshopRegistry.create.path,
    name: RouteConfig.WorkshopRegistry.create.name,
    component: () => import('@rupoi/pages/workshop-registry/ui/workshop-registry-create-page.vue'),
  meta: { requiresAuth: true, layout: 'default', title: 'Создание мастерской', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] }
  },
  {
    path: RouteConfig.WorkshopRegistry.edit.path,
    name: RouteConfig.WorkshopRegistry.edit.name,
    component: () => import('@rupoi/pages/workshop-registry/ui/workshop-registry-edit-page.vue'),
    meta: { requiresAuth: true, layout: 'default', title: 'Редактирование мастерской', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] }
  },
]

