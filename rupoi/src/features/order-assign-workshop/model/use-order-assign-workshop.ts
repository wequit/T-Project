import { computed, ref } from 'vue'
import { OrderStatus } from '@rupoi/shared/constant'
import type { ID } from '@rupoi/shared/model'
import { OrderKind } from '@rupoi/features/order-change-status'
import type { AssignWorkshopFormData } from './types'

// Import mutations для назначения мастерской
import { useAssignWorkshopOrderProsthesis } from '@rupoi/entities/order-prosthesis'
import { useAssignWorkshopOrderShoe } from '@rupoi/entities/order-shoe'
import { useAssignWorkshopOrderOttobock } from '@rupoi/entities/order-ottobock'
import { useAssignWorkshopOrderRepair } from '@rupoi/entities/order-repair'
import { useAssignWorkshopOrderReadyMade } from '@rupoi/entities/order-ready-made'

// Import mutations для смены статуса
import { usePatchOrderProsthesisStatus } from '@rupoi/entities/order-prosthesis'
import { usePatchOrderShoeStatus } from '@rupoi/entities/order-shoe'
import { usePatchOrderOttobockStatus } from '@rupoi/entities/order-ottobock'
import { usePatchOrderRepairStatus } from '@rupoi/entities/order-repair'
import { usePatchOrderReadyMadeStatus } from '@rupoi/entities/order-ready-made'

export interface UseOrderAssignWorkshopProps {
  orderId: ID
  orderKind: OrderKind
}

/**
 * Composable для назначения мастерской заказу с переводом в статус "В производстве"
 */
export function useOrderAssignWorkshop(props: UseOrderAssignWorkshopProps) {
  // Состояние формы
  const formData = ref<AssignWorkshopFormData>({
    workshopId: null,
    deadline: null,
  })

  // === Мутации для назначения мастерской ===
  const assignProsthesisMutation = useAssignWorkshopOrderProsthesis()
  const assignShoeMutation = useAssignWorkshopOrderShoe()
  const assignOttobockMutation = useAssignWorkshopOrderOttobock()
  const assignRepairMutation = useAssignWorkshopOrderRepair()
  const assignReadyMadeMutation = useAssignWorkshopOrderReadyMade()

  // === Мутации для смены статуса ===
  const statusProsthesisMutation = usePatchOrderProsthesisStatus()
  const statusShoeMutation = usePatchOrderShoeStatus()
  const statusOttobockMutation = usePatchOrderOttobockStatus()
  const statusRepairMutation = usePatchOrderRepairStatus()
  const statusReadyMadeMutation = usePatchOrderReadyMadeStatus()

  /**
   * Получает мутацию для назначения мастерской в зависимости от типа заказа
   */
  const currentAssignMutation = computed(() => {
    switch (props.orderKind) {
      case OrderKind.PROSTHESIS:
        return assignProsthesisMutation
      case OrderKind.SHOE:
        return assignShoeMutation
      case OrderKind.OTTOBOCK:
        return assignOttobockMutation
      case OrderKind.REPAIR:
        return assignRepairMutation
      case OrderKind.READY_MADE:
        return assignReadyMadeMutation
      default:
        throw new Error(`Unknown order kind: ${props.orderKind}`)
    }
  })

  /**
   * Получает мутацию для смены статуса в зависимости от типа заказа
   */
  const currentStatusMutation = computed(() => {
    switch (props.orderKind) {
      case OrderKind.PROSTHESIS:
        return statusProsthesisMutation
      case OrderKind.SHOE:
        return statusShoeMutation
      case OrderKind.OTTOBOCK:
        return statusOttobockMutation
      case OrderKind.REPAIR:
        return statusRepairMutation
      case OrderKind.READY_MADE:
        return statusReadyMadeMutation
      default:
        throw new Error(`Unknown order kind: ${props.orderKind}`)
    }
  })

  /**
   * Проверяет, идет ли процесс назначения мастерской
   */
  const isLoading = computed(() => {
    return currentAssignMutation.value.isPending.value || currentStatusMutation.value.isPending.value
  })

  /**
   * Валидация формы
   */
  const isFormValid = computed(() => {
    return formData.value.workshopId !== null && formData.value.deadline !== null
  })

  /**
   * Назначает мастерскую и переводит заказ в статус "В производстве"
   */
  async function assignWorkshopAndChangeStatus(): Promise<boolean> {
    if (!isFormValid.value) {
      return false
    }

    try {
      // Шаг 1: Назначаем мастерскую
      await currentAssignMutation.value.mutateAsync({
        id: props.orderId,
        data: {
          workshopId: formData.value.workshopId!,
          deadline: formData.value.deadline!,
        },
      })

      // Шаг 2: Меняем статус на IN_PRODUCTION
      await currentStatusMutation.value.mutateAsync({
        id: props.orderId,
        data: {
          newStatus: OrderStatus.IN_PRODUCTION,
          comment: 'Заказ отправлен в производство',
        },
      })

      // Очищаем форму после успеха
      resetForm()

      return true
    } catch (error) {
      console.error('Failed to assign workshop and change status:', error)
      return false
    }
  }

  /**
   * Сбрасывает форму
   */
  function resetForm() {
    formData.value = {
      workshopId: null,
      deadline: null,
    }
  }

  return {
    // State
    formData,

    // Computed
    isLoading,
    isFormValid,

    // Actions
    assignWorkshopAndChangeStatus,
    resetForm,
  }
}

