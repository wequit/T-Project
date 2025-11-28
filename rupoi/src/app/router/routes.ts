import type { RouteRecordRaw } from 'vue-router'
import { personRoutes } from '@rupoi/app/router/route-parts/person.ts'
import { dispatcherRoutes } from '@rupoi/app/router/route-parts/dispatcher'
import { settingsRoutes } from '@rupoi/app/router/route-parts/settings'
import { orderRoutes } from '@rupoi/app/router/route-parts/orders'
import { invoiceRoutes } from '@rupoi/app/router/route-parts/invoices'
import { warehouseRoutes } from '@rupoi/app/router/route-parts/warehouse'
import { workshopRoutes } from '@rupoi/app/router/route-parts/workshop'
import { chiefDoctorRoutes } from '@rupoi/app/router/route-parts/chief-doctor'
import { reportRoutes } from '@rupoi/app/router/route-parts/reports'
import { authRoutes } from '@rupoi/app/router/route-parts/auth'
import { workshopRegistryRoutes } from '@rupoi/app/router/route-parts/workshop-registry'
import { errorPageRoutes } from '@rupoi/app/router/route-parts/error-pages'
import { userModel } from '@rupoi/entities/user'
import { getFirstAccessibleRoute } from '@rupoi/app/lib'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    // Редирект на первую доступную страницу на основе ролей пользователя
    beforeEnter: (to, from, next) => {
      const userStore = userModel.useStore()
      const firstRoute = getFirstAccessibleRoute(userStore.roles)
      next(firstRoute)
    },
    // Компонент не нужен, т.к. beforeEnter всегда делает редирект
    component: { template: '<div></div>' },
    meta: {
      requiresAuth: true,
      title: 'Главная'
    },
  },
  ...personRoutes,
  ...dispatcherRoutes,
  ...workshopRoutes,
  ...chiefDoctorRoutes,
  ...settingsRoutes,
  ...orderRoutes,
  ...invoiceRoutes,
  ...warehouseRoutes,
  ...reportRoutes,
  ...authRoutes,
  ...workshopRegistryRoutes,
  // Error pages должны быть последними (catch-all роут)
  ...errorPageRoutes,
]
