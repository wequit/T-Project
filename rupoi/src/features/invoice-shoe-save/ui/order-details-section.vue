<script setup lang="ts">
import { computed } from 'vue'
import type { OrderShoeDTO } from '@rupoi/entities/order-shoe'
import { 
  OrderShoeCommonInfoCard,
  OrderShoeFittingsCard,
  OrderShoeTechnicalOperationsCard
} from '@rupoi/entities/order-shoe'
import { BaseSectionTitle } from '@rupoi/shared/ui'

interface Props {
  orderShoe: OrderShoeDTO | null | undefined
}

const props = defineProps<Props>()

const hasOrder = computed(() => !!props.orderShoe)
</script>

<template>
  <div v-if="hasOrder" class="order-details-section">
    <BaseSectionTitle 
      title="Детали заказа" 
      icon="fas fa-info-circle" 
      variant="info" 
    />

    <!-- Основная информация о заказе -->
    <OrderShoeCommonInfoCard :data="orderShoe!" />

    <!-- Примерки -->
    <OrderShoeFittingsCard 
      v-if="orderShoe!.fittingOrders && orderShoe!.fittingOrders.length > 0"
      :data="orderShoe!" 
    />

    <!-- Технические операции -->
    <OrderShoeTechnicalOperationsCard 
      v-if="orderShoe!.technicalOperations && orderShoe!.technicalOperations.length > 0"
      :data="orderShoe!" 
    />
  </div>
</template>

<style scoped>
.order-details-section {
  margin-bottom: 2rem;
}
</style>

