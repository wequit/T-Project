<script setup lang="ts">
import { toRef } from 'vue'
import OrderChangeStatus from './order-change-status.vue'
import { useOrderChangeStatusControl } from '../model/use-order-change-status-control'
import type { OrderChangeStatusControlProps } from '../model/types'
import { BaseAlert } from '@rupoi/shared/ui'
import type { OrderStatus } from '@rupoi/shared/constant'

const props = withDefaults(defineProps<OrderChangeStatusControlProps>(), {
  disabled: false,
  iconOnly: false,
})

const emit = defineEmits<{
  (event: 'success', payload: { newStatus: OrderStatus }): void
}>()

// Логика контроля доступных статусов - передаем реактивную ссылку
const control = useOrderChangeStatusControl(toRef(props, 'currentStatus'))
</script>

<template>
  <div :class="['order-change-status-control', { 'order-change-status-control--icon-only': props.iconOnly }]">
    <div v-if="control.hasAvailableStatuses.value" class="status-buttons">
      <h6 v-if="!props.iconOnly" class="text-muted tw-uppercase mb-2">
        Действия
      </h6>
      <div class="d-flex gap-2 flex-wrap">
        <OrderChangeStatus
          v-for="buttonConfig in control.availableStatusButtons.value"
          :key="buttonConfig.status"
          :order-id="props.orderId"
          :order-kind="props.orderKind"
          :target-status="buttonConfig.status"
          :disabled="props.disabled"
          :icon-only="props.iconOnly"
          @success="payload => emit('success', payload)"
        />
      </div>
    </div>

    <BaseAlert
      v-else-if="!props.iconOnly"
      type="info"
      icon="info-circle"
      title="Внимание"
    >
      У вас нет прав для изменения статуса этого заказа
    </BaseAlert>
  </div>
</template>

<style scoped>
.order-change-status-control {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
}

.order-change-status-control--icon-only {
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
}

.status-buttons__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #344767;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0;
}

.alert {
  font-size: 0.875rem;
}
</style>
