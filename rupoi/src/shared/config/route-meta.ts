import type { UserRole } from '@rupoi/shared/constant'

export interface RouteMetaRupoi {
  /** Роли с доступом к роуту. Если пусто - доступ всем */
  roles?: UserRole[]
  title?: string
  requiresAuth?: boolean
}

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends RouteMetaRupoi {}
}

