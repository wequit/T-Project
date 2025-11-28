import type { RouteLocationNormalized } from 'vue-router'
import type { UserRole } from '@rupoi/shared/constant'
import { hasAnyRole } from './has-role'

/**
 * Проверяет, может ли пользователь получить доступ к роуту
 *
 * @param route - объект роута Vue Router
 * @param userRoles - роли пользователя
 * @returns true если доступ разрешен
 *
 * @example
 * ```ts
 * if (canAccessRoute(to, userStore.roles)) {
 *   // Пользователь может перейти на страницу
 * }
 * ```
 */
export function canAccessRoute(route: RouteLocationNormalized, userRoles: UserRole[]): boolean {
  return hasAnyRole(userRoles, route.meta.roles as UserRole[])
}

