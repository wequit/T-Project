import type { UserRole } from '@rupoi/shared/constant'

/**
 * Проверяет, есть ли у пользователя хотя бы одна из требуемых ролей
 *
 * @param userRoles - роли пользователя
 * @param requiredRoles - требуемые роли (если не указаны - доступ разрешен)
 * @returns true если есть хотя бы одна роль или роли не требуются
 *
 * @example
 * ```ts
 * hasAnyRole(userRoles, [UserRole.ADMIN, UserRole.MANAGER])
 * ```
 */
export function hasAnyRole(userRoles: UserRole[], requiredRoles?: UserRole[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true
  return requiredRoles.some(role => userRoles.includes(role))
}

/**
 * Проверяет, есть ли у пользователя все требуемые роли
 *
 * @param userRoles - роли пользователя
 * @param requiredRoles - требуемые роли (если не указаны - доступ разрешен)
 * @returns true если есть все роли или роли не требуются
 *
 * @example
 * ```ts
 * hasAllRoles(userRoles, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
 * ```
 */
export function hasAllRoles(userRoles: UserRole[], requiredRoles?: UserRole[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true
  return requiredRoles.every(role => userRoles.includes(role))
}

