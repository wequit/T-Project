<script setup lang="ts">
import { computed } from 'vue'
import type { BaseStatusTagProps } from './base-status-tag.props'
import { 
  PersonStatus, 
  OrderStatus, 
  OrderPriority, 
  ActivityType, 
  OrderType, 
  ServiceFeeType, 
  ProsthesisSide,
  InvoiceStatus,
  InvoicePriority
} from '@rupoi/shared/constant'

const props = withDefaults(defineProps<BaseStatusTagProps>(), {
  size: 'md',
})

interface StatusConfig {
  label: string
  color: string
  icon?: string
}

const statusConfig = computed<StatusConfig>(() => {
  // Person Statuses
  if (props.status === PersonStatus.ACTIVE) {
    return { label: 'Активен', color: 'success', icon: 'check-circle' }
  }
  if (props.status === PersonStatus.INACTIVE) {
    return { label: 'Деактивирован', color: 'danger', icon: 'ban' }
  }
  if (props.status === PersonStatus.SENT_TO_MED) {
    return { label: 'Отправлен в мед. отдел', color: 'info', icon: 'hospital' }
  }
  
  // Order Statuses
  if (props.status === OrderStatus.NEW) {
    return { label: 'Новый', color: 'primary', icon: 'file' }
  }
  if (props.status === OrderStatus.UNDER_REVIEW) {
    return { label: 'На согласовании', color: 'warning', icon: 'clock' }
  }
  if (props.status === OrderStatus.APPROVED) {
    return { label: 'Одобрен', color: 'success', icon: 'check' }
  }
  if (props.status === OrderStatus.WITH_DISPATCHER) {
    return { label: 'У диспетчера', color: 'info', icon: 'user' }
  }
  if (props.status === OrderStatus.IN_PRODUCTION) {
    return { label: 'В производстве', color: 'warning', icon: 'cogs' }
  }
  if (props.status === OrderStatus.FOR_FITTING) {
    return { label: 'На примерке', color: 'info', icon: 'user-check' }
  }
  if (props.status === OrderStatus.READY) {
    return { label: 'Готов', color: 'success', icon: 'check-circle' }
  }
  if (props.status === OrderStatus.IN_WAREHOUSE) {
    return { label: 'На складе', color: 'secondary', icon: 'warehouse' }
  }
  if (props.status === OrderStatus.DELIVERED) {
    return { label: 'Выдан', color: 'success', icon: 'box-check' }
  }
  
  // Order Priority
  if (props.status === OrderPriority.URGENT) {
    return { label: 'Срочный', color: 'danger', icon: 'exclamation-triangle' }
  }
  if (props.status === OrderPriority.MEDIUM) {
    return { label: 'Средний', color: 'secondary', icon: 'minus-circle' }
  }
  
  // Activity Type
  if (props.status === ActivityType.LOW) {
    return { label: 'Низкий', color: 'info', icon: 'walking' }
  }
  if (props.status === ActivityType.MEDIUM) {
    return { label: 'Средний', color: 'warning', icon: 'running' }
  }
  if (props.status === ActivityType.HIGH) {
    return { label: 'Высокий', color: 'danger', icon: 'fire' }
  }
  
  // Order Type
  if (props.status === OrderType.PRIMARY) {
    return { label: 'Первичный', color: 'primary', icon: 'file-alt' }
  }
  if (props.status === OrderType.SECONDARY) {
    return { label: 'Вторичный', color: 'secondary', icon: 'file' }
  }
  
  // Service Fee Type
  if (props.status === ServiceFeeType.FREE) {
    return { label: 'Бесплатно', color: 'success', icon: 'gift' }
  }
  if (props.status === ServiceFeeType.PAID) {
    return { label: 'Платно', color: 'warning', icon: 'dollar-sign' }
  }
  
  // Prosthesis Side
  if (props.status === ProsthesisSide.LEFT) {
    return { label: 'Левый', color: 'info', icon: 'arrow-left' }
  }
  if (props.status === ProsthesisSide.RIGHT) {
    return { label: 'Правый', color: 'info', icon: 'arrow-right' }
  }
  
  // Invoice Status
  if (props.status === InvoiceStatus.ACTIVE) {
    return { label: 'Активная', color: 'success', icon: 'check-circle' }
  }
  
  // Invoice Priority
  if (props.status === InvoicePriority.NORMAL) {
    return { label: 'Обычный', color: 'secondary', icon: 'minus-circle' }
  }
  if (props.status === InvoicePriority.URGENT) {
    return { label: 'Срочный', color: 'danger', icon: 'exclamation-triangle' }
  }
  
  // Default
  return { label: props.status, color: 'secondary' }
})

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'badge-sm'
  if (props.size === 'lg') return 'badge-lg'
  return ''
})
</script>

<template>
  <span 
    class="badge badge-status" 
    :class="[`badge-${statusConfig.color}`, sizeClass]"
  >
    <i v-if="statusConfig.icon" :class="`fas fa-${statusConfig.icon}`" class="me-1"></i>
    {{ statusConfig.label }}
  </span>
</template>

<style scoped>
.badge-status {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  white-space: nowrap;
}

.badge-sm {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

.badge-lg {
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
}

.badge i {
  font-size: 0.85em;
}
</style>

