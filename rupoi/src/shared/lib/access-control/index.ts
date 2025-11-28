/**
 * Модуль контроля доступа (Access Control)
 *
 * Содержит базовые утилиты для проверки прав доступа:
 * - hasAnyRole - проверка наличия хотя бы одной роли
 * - hasAllRoles - проверка наличия всех ролей
 * - canAccessRoute - проверка доступа к роуту
 */

export * from './has-role'
export * from './can-access-route'

