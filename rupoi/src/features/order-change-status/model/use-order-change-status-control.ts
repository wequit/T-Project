import { computed, type Ref, unref } from 'vue'
import type { OrderStatus, UserRole } from '@rupoi/shared/constant'
import type { StatusButtonConfig } from './types'
import { getAvailableStatuses } from '../lib'
import { statusButtonConfigs } from '../config'
import { userModel } from '@rupoi/entities/user'
/**
 * Composable для контейнера OrderChangeStatusControl
 * Отвечает за логику отображения доступных статусов
 */
export function useOrderChangeStatusControl(currentStatus: Ref<OrderStatus> | OrderStatus) {
  const authUserStore = userModel.useStore()
  const userRoles = computed<UserRole[]>(() => authUserStore.roles ?? [])

  /**
   * Получает список доступных статусов для текущих ролей пользователя
   */
  const availableStatuses = computed(() => {
    return getAvailableStatuses(unref(currentStatus), userRoles.value)
  })

  /**
   * Получает конфигурации кнопок для доступных статусов
   */
  const availableStatusButtons = computed<StatusButtonConfig[]>(() => {
    return availableStatuses.value
      .map((status) => statusButtonConfigs[status])
      .sort((a, b) => a.order - b.order)
  })

  /**
   * Проверяет, есть ли доступные статусы для изменения
   */
  const hasAvailableStatuses = computed(() => {
    return availableStatuses.value.length > 0
  })

  return {
    // State
    userRoles,

    // Computed
    availableStatuses,
    availableStatusButtons,
    hasAvailableStatuses,
  }
}

