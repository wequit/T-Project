import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig, UserRole } from '@rupoi/shared/constant'

export const orderRoutes: RouteRecordRaw[] = [
  // Prosthesis
  {
    path: RouteConfig.Order.prosthesis.list.path,
    name: RouteConfig.Order.prosthesis.list.name,
    component: () => import('../../../pages/order-prosthesis/ui/order-prosthesis-list-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Заказы — Протезы',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.prosthesis.view.path,
    name: RouteConfig.Order.prosthesis.view.name,
    component: () => import('../../../pages/order-prosthesis/ui/order-prosthesis-view-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Просмотр заказа — Протезы',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.prosthesis.create.path,
    name: RouteConfig.Order.prosthesis.create.name,
    component: () => import('../../../pages/order-prosthesis/ui/order-prosthesis-create-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Создание заказа — Протез',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Order.prosthesis.edit.path,
    name: RouteConfig.Order.prosthesis.edit.name,
    component: () => import('../../../pages/order-prosthesis/ui/order-prosthesis-edit-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Редактирование заказа — Протез',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },

  // Shoes
  {
    path: RouteConfig.Order.shoe.list.path,
    name: RouteConfig.Order.shoe.list.name,
    component: () => import('../../../pages/order-shoe/ui/order-shoe-list-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Заказы — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.shoe.view.path,
    name: RouteConfig.Order.shoe.view.name,
    component: () => import('../../../pages/order-shoe/ui/order-shoe-view-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Просмотр заказа — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.shoe.create.path,
    name: RouteConfig.Order.shoe.create.name,
    component: () => import('../../../pages/order-shoe/ui/order-shoe-create-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Создание заказа — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Order.shoe.edit.path,
    name: RouteConfig.Order.shoe.edit.name,
    component: () => import('../../../pages/order-shoe/ui/order-shoe-edit-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Редактирование заказа — Обувь',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },

  // Ottobock
  {
    path: RouteConfig.Order.ottobock.list.path,
    name: RouteConfig.Order.ottobock.list.name,
    component: () => import('../../../pages/order-ottobock/ui/order-ottobock-list-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Заказы — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.ottobock.view.path,
    name: RouteConfig.Order.ottobock.view.name,
    component: () => import('../../../pages/order-ottobock/ui/order-ottobock-view-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Просмотр заказа — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.ottobock.create.path,
    name: RouteConfig.Order.ottobock.create.name,
    component: () => import('../../../pages/order-ottobock/ui/order-ottobock-create-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Создание заказа — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Order.ottobock.edit.path,
    name: RouteConfig.Order.ottobock.edit.name,
    component: () => import('../../../pages/order-ottobock/ui/order-ottobock-edit-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Редактирование заказа — Оттобок',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },

  // Repair
  {
    path: RouteConfig.Order.repair.list.path,
    name: RouteConfig.Order.repair.list.name,
    component: () => import('../../../pages/order-repair/ui/order-repair-list-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Наряды на ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.repair.view.path,
    name: RouteConfig.Order.repair.view.name,
    component: () => import('../../../pages/order-repair/ui/order-repair-view-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Просмотр наряда на ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.repair.create.path,
    name: RouteConfig.Order.repair.create.name,
    component: () => import('../../../pages/order-repair/ui/order-repair-create-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Создание наряда на ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Order.repair.edit.path,
    name: RouteConfig.Order.repair.edit.name,
    component: () => import('../../../pages/order-repair/ui/order-repair-edit-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Редактирование наряда на ремонт',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },

  // Ready-made
  {
    path: RouteConfig.Order.readyMade.list.path,
    name: RouteConfig.Order.readyMade.list.name,
    component: () => import('../../../pages/order-ready-made/ui/order-ready-made-list-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Заказы — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.readyMade.view.path,
    name: RouteConfig.Order.readyMade.view.name,
    component: () => import('../../../pages/order-ready-made/ui/order-ready-made-view-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Просмотр заказа — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ]
    }
  },
  {
    path: RouteConfig.Order.readyMade.create.path,
    name: RouteConfig.Order.readyMade.create.name,
    component: () => import('../../../pages/order-ready-made/ui/order-ready-made-create-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Создание заказа — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
  {
    path: RouteConfig.Order.readyMade.edit.path,
    name: RouteConfig.Order.readyMade.edit.name,
    component: () => import('../../../pages/order-ready-made/ui/order-ready-made-edit-page.vue'),
    meta: { 
      requiresAuth: true, 
      layout: 'default', 
      title: 'Редактирование заказа — Готовые ПОИ',
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
      ]
    }
  },
]
