import type { RouteRecordRaw } from 'vue-router'
import { RouteConfig } from '@rupoi/shared/constant'

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: RouteConfig.Settings.index.path,
    name: RouteConfig.Settings.index.name,
    component: () => import('@rupoi/pages/settings/ui/settings-page.vue'),
    meta: { requiresAuth: true, layout: 'default', title: 'Настройки' },
  },
]
