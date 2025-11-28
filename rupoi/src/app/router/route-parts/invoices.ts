import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const invoiceRoutes: RouteRecordRaw[] = [
  // Prosthesis
  {
    path: RouteConfig.Invoice.prosthesis.list.path,
    name: RouteConfig.Invoice.prosthesis.list.name,
    component: () => import('@rupoi/pages/invoice-prosthesis/ui/invoice-prosthesis-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Накладные — Протезы',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.prosthesis.view.path,
    name: RouteConfig.Invoice.prosthesis.view.name,
    component: () => import('@rupoi/pages/invoice-prosthesis/ui/invoice-prosthesis-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр накладной — Протезы',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.prosthesis.create.path,
    name: RouteConfig.Invoice.prosthesis.create.name,
    component: () => import('@rupoi/pages/invoice-prosthesis/ui/invoice-prosthesis-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание накладной — Протез',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.prosthesis.edit.path,
    name: RouteConfig.Invoice.prosthesis.edit.name,
    component: () => import('@rupoi/pages/invoice-prosthesis/ui/invoice-prosthesis-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование накладной — Протез',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },

  // Shoes
  {
    path: RouteConfig.Invoice.shoe.list.path,
    name: RouteConfig.Invoice.shoe.list.name,
    component: () => import('@rupoi/pages/invoice-shoe/ui/invoice-shoe-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Накладные — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.shoe.view.path,
    name: RouteConfig.Invoice.shoe.view.name,
    component: () => import('@rupoi/pages/invoice-shoe/ui/invoice-shoe-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр накладной — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.shoe.create.path,
    name: RouteConfig.Invoice.shoe.create.name,
    component: () => import('@rupoi/pages/invoice-shoe/ui/invoice-shoe-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание накладной — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.shoe.edit.path,
    name: RouteConfig.Invoice.shoe.edit.name,
    component: () => import('@rupoi/pages/invoice-shoe/ui/invoice-shoe-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование накладной — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },

  // Ottobock
  {
    path: RouteConfig.Invoice.ottobock.list.path,
    name: RouteConfig.Invoice.ottobock.list.name,
    component: () => import('@rupoi/pages/invoice-ottobock/ui/invoice-ottobock-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Накладные — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.ottobock.view.path,
    name: RouteConfig.Invoice.ottobock.view.name,
    component: () => import('@rupoi/pages/invoice-ottobock/ui/invoice-ottobock-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр накладной — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.ottobock.create.path,
    name: RouteConfig.Invoice.ottobock.create.name,
    component: () => import('@rupoi/pages/invoice-ottobock/ui/invoice-ottobock-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание накладной — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.ottobock.edit.path,
    name: RouteConfig.Invoice.ottobock.edit.name,
    component: () => import('@rupoi/pages/invoice-ottobock/ui/invoice-ottobock-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование накладной — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },

  // Repair
  {
    path: RouteConfig.Invoice.repair.list.path,
    name: RouteConfig.Invoice.repair.list.name,
    component: () => import('@rupoi/pages/invoice-repair/ui/invoice-repair-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Накладные — Ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.repair.view.path,
    name: RouteConfig.Invoice.repair.view.name,
    component: () => import('@rupoi/pages/invoice-repair/ui/invoice-repair-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр накладной — Ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.repair.create.path,
    name: RouteConfig.Invoice.repair.create.name,
    component: () => import('@rupoi/pages/invoice-repair/ui/invoice-repair-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание накладной — Ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.repair.edit.path,
    name: RouteConfig.Invoice.repair.edit.name,
    component: () => import('@rupoi/pages/invoice-repair/ui/invoice-repair-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование накладной — Ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },

  // Ready-made
  {
    path: RouteConfig.Invoice.readyMade.list.path,
    name: RouteConfig.Invoice.readyMade.list.name,
    component: () => import('@rupoi/pages/invoice-ready-made/ui/invoice-ready-made-list-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Накладные — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.readyMade.view.path,
    name: RouteConfig.Invoice.readyMade.view.name,
    component: () => import('@rupoi/pages/invoice-ready-made/ui/invoice-ready-made-view-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Просмотр накладной — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.readyMade.create.path,
    name: RouteConfig.Invoice.readyMade.create.name,
    component: () => import('@rupoi/pages/invoice-ready-made/ui/invoice-ready-made-create-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Создание накладной — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Invoice.readyMade.edit.path,
    name: RouteConfig.Invoice.readyMade.edit.name,
    component: () => import('@rupoi/pages/invoice-ready-made/ui/invoice-ready-made-edit-page.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Редактирование накладной — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.WORKSHOP,
      ]
    }
  },
]
