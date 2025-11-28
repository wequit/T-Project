import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const personRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Person.list.path,
    name: RouteConfig.Person.list.name,
    component: () => import('@rupoi/pages/person/ui/person-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Картотека',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
      ]
    },
  },
  {
    path: RouteConfig.Person.create.path,
    name: RouteConfig.Person.create.name,
    component: () => import('@rupoi/pages/person/ui/person-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание личного дела',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
      ]
    }
  },
  {
    path: RouteConfig.Person.edit.path,
    name: RouteConfig.Person.edit.name,
    component: () => import('@rupoi/pages/person/ui/person-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование личного дела',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Person.view.path,
    name: RouteConfig.Person.view.name,
    component: () => import('@rupoi/pages/person/ui/person-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр личного дела',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
      ]
    },
  },
]
