<script setup lang="ts">
  import CommonApp from '@common/app/CommonApp.vue'
  import { registerCoreInstance } from '@common/shared/config'

  import { baseInstance, rupoiInstance, commonInstance, fileStorageInstance } from '@rupoi/shared/api'
  import { RouteConfig, UserRole } from '@rupoi/shared/constant'
  import { useFilteredSidenav, type SidenavListItemWithRoles } from '@rupoi/app/composables/use-filtered-sidenav'

  import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

  // Global styles
  import '../styles/global.scss'

  const items: SidenavListItemWithRoles[] = [
    {
      collapseRef: 'personal-files',
      iconClass: 'ni ni-single-copy-04 text-success text-sm opacity-10',
      text: 'Картотека',
      routeName: RouteConfig.Person.list.name,
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.REGISTRATION,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
      ],
      list: [
        {
          routeName: RouteConfig.Person.list.name,
          text: 'Личные дела',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.REGISTRATION,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
          ]
        },
      ],
    },
    {
      collapseRef: 'orders',
      iconClass: 'ni ni-bullet-list-67 text-success text-sm opacity-10',
      text: 'Заказы и наряды',
      routeName: RouteConfig.Order.shoe.list.name,
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.DISPATCHER,
        UserRole.WORKSHOP,
      ],
      list: [
        {
          routeName: RouteConfig.Order.prosthesis.list.name,
          text: 'Заказы на изготовление протеза',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Order.shoe.list.name,
          text: 'Заказы на изготовление обуви',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Order.ottobock.list.name,
          text: 'Заказы на изготовление Оттобок',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Order.repair.list.name,
          text: 'Наряды на ремонт',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Order.readyMade.list.name,
          text: 'Заказы на готовые ПОИ',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.DISPATCHER,
            UserRole.WORKSHOP,
          ]
        },
      ],
    },
    {
      collapseRef: 'invoices',
      iconClass: 'ni ni-collection text-success text-sm opacity-10',
      text: 'Накладные',
      routeName: RouteConfig.Invoice.shoe.list.name,
      roles: [
        UserRole.ADMINISTRATOR,
        UserRole.MEDICAL_DEPARTMENT,
        UserRole.CHIEF_DOCTOR,
        UserRole.WAREHOUSE,
        UserRole.WORKSHOP,
      ],
      list: [
        {
          routeName: RouteConfig.Invoice.prosthesis.list.name,
          text: 'Накладные на изготовление протеза',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.WAREHOUSE,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Invoice.shoe.list.name,
          text: 'Накладные на изготовление обуви',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.WAREHOUSE,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Invoice.ottobock.list.name,
          text: 'Накладные на изготовление Оттобок',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.WAREHOUSE,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Invoice.repair.list.name,
          text: 'Накладные на наряды на ремонт',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.WAREHOUSE,
            UserRole.WORKSHOP,
          ]
        },
        {
          routeName: RouteConfig.Invoice.readyMade.list.name,
          text: 'Накладные на готовые ПОИ',
          roles: [
            UserRole.ADMINISTRATOR,
            UserRole.MEDICAL_DEPARTMENT,
            UserRole.CHIEF_DOCTOR,
            UserRole.WAREHOUSE,
            UserRole.WORKSHOP,
          ]
        },
      ],
    },
    {
      collapseRef: 'warehouse',
      iconClass: 'ni ni-box-2 text-success text-sm opacity-10',
      text: 'Склад',
      routeName: RouteConfig.Warehouse.index.name,
      roles: [UserRole.ADMINISTRATOR, UserRole.WAREHOUSE],
      list: [
        { routeName: RouteConfig.Warehouse.index.name, text: 'Склад', roles: [UserRole.ADMINISTRATOR, UserRole.WAREHOUSE] },
      ],
    },
    {
      collapseRef: 'dispatcher',
      iconClass: 'ni ni-laptop text-success text-sm opacity-10',
      text: 'Диспетчер',
      routeName: RouteConfig.Dispatcher.index.name,
      roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER],
      list: [
        { routeName: RouteConfig.Dispatcher.index.name, text: 'Диспетчер', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] },
        { routeName: RouteConfig.Workshop.index.name, text: 'Цех', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] },
      ],
    },
    {
      collapseRef: 'chief-doctor',
      iconClass: 'ni ni-badge text-success text-sm opacity-10',
      text: 'Главный врач',
      routeName: RouteConfig.ChiefDoctor.index.name,
      roles: [UserRole.ADMINISTRATOR, UserRole.CHIEF_DOCTOR],
      list: [
        { routeName: RouteConfig.ChiefDoctor.index.name, text: 'Главный врач', roles: [UserRole.ADMINISTRATOR, UserRole.CHIEF_DOCTOR] },
      ],
    },
    {
      collapseRef: 'registry',
      iconClass: 'ni ni-building text-success text-sm opacity-10',
      text: 'Реестры',
      routeName: RouteConfig.WorkshopRegistry.list.name,
      roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER],
      list: [
        { routeName: RouteConfig.WorkshopRegistry.list.name, text: 'Цеха', roles: [UserRole.ADMINISTRATOR, UserRole.DISPATCHER] },
      ],
    },
    // {
    //   collapseRef: 'reports',
    //   iconClass: 'ni ni-chart-bar-32 text-success text-sm opacity-10',
    //   text: 'Отчеты',
    //   routeName: RouteConfig.Reports.index.name,
    //   roles: [
    //     UserRole.ADMINISTRATOR,
    //     UserRole.REGISTRATION,
    //     UserRole.MEDICAL_DEPARTMENT,
    //     UserRole.CHIEF_DOCTOR,
    //     UserRole.DISPATCHER,
    //     UserRole.WORKSHOP,
    //     UserRole.WAREHOUSE,
    //   ],
    //   list: [
    //     {
    //       routeName: RouteConfig.Reports.index.name,
    //       text: 'Отчеты',
    //       roles: [
    //         UserRole.ADMINISTRATOR,
    //         UserRole.REGISTRATION,
    //         UserRole.MEDICAL_DEPARTMENT,
    //         UserRole.CHIEF_DOCTOR,
    //         UserRole.DISPATCHER,
    //         UserRole.WORKSHOP,
    //         UserRole.WAREHOUSE,
    //       ]
    //     },
    //   ],
    // },
    // {
    //   collapseRef: 'settings',
    //   iconClass: 'ni ni-settings-gear-65 text-success text-sm opacity-10',
    //   text: 'Настройки',
    //   routeName: RouteConfig.Settings.index.name,
    //   list: [
    //     { routeName: RouteConfig.Settings.index.name, text: 'Настройки' },
    //   ],
    // },
  ]

  registerCoreInstance('owner', rupoiInstance)
  registerCoreInstance('base', baseInstance)
  registerCoreInstance('common', commonInstance)
  registerCoreInstance('file-storage', fileStorageInstance)

  const { filteredItems } = useFilteredSidenav(items)
</script>

<template>
  <CommonApp site-name="rupoi" site-title="РУПОИ" :items="filteredItems" />
  <VueQueryDevtools />
</template>
