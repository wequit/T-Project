import { nextTick } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalizedGeneric } from 'vue-router'

import { commonGuard } from '@common/app/common-guard'
import { canUserAccess } from '@common/app/guard'
import { authModel } from '@common/entities/auth'
import { CommonRouteConfig } from '@common/shared/config'

import { userModel } from '@rupoi/entities/user'

/**
 * Router guard для RUPOI с особой обработкой Home роута
 * 
 * Home роут используется для редиректа на первую доступную страницу,
 * поэтому мы пропускаем на него без проверки конкретных ролей.
 * Логика редиректа выполняется в beforeEnter guard самого Home роута.
 */
export const rupoiGuard = async (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext
) => {
  const commonAuthUserStore = userModel.commonAuthUserStore()
  const authStore = authModel.useStore()

  // Для Home и Forbidden пропускаем если авторизован (без проверки ролей)
  const isSpecialRoute = to.name === CommonRouteConfig.Home.name || to.name === CommonRouteConfig.Forbidden.name
  
  if (isSpecialRoute && to.name !== CommonRouteConfig.Login.name) {
    const isAuthenticated = canUserAccess(to)
    
    if (!isAuthenticated) {
      // Если не авторизован, пробуем refresh
      const result = await authStore.refresh()
      if (result) {
        // Даем Vue время обновить computed значения
        await nextTick()
        return next(to)
      } else {
        authStore.logout()
        return next({ name: CommonRouteConfig.Login.name })
      }
    }
    
    // Авторизован - пропускаем на Home/Forbidden без проверки ролей
    return next()
  }

  // Для всех остальных роутов используем стандартный commonGuard
  return commonGuard(commonAuthUserStore)(to, from, next)
}

