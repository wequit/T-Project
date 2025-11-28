<script setup lang="ts">
import { computed } from 'vue'
import type { OrderOttobockDTO } from '@rupoi/entities/order-ottobock'
import { 
  OrderOttobockCommonInfoCard,
  OrderOttobockFittingsCard,
  OrderOttobockMaterialsCard
} from '@rupoi/entities/order-ottobock'
import { BaseSectionTitle } from '@rupoi/shared/ui'

interface Props {
  orderOttobock: OrderOttobockDTO | null | undefined
}

const props = defineProps<Props>()

const hasOrder = computed(() => !!props.orderOttobock)
</script>

<template>
  <div v-if="hasOrder" class="order-details-section">
    <BaseSectionTitle 
      title="Детали заказа" 
      icon="fas fa-info-circle" 
      variant="info" 
    />

    <!-- Основная информация о заказе -->
    <OrderOttobockCommonInfoCard :data="orderOttobock!" />

    <!-- Примерки -->
    <OrderOttobockFittingsCard 
      v-if="orderOttobock!.fittingOrders && orderOttobock!.fittingOrders.length > 0"
      :data="orderOttobock!" 
    />

    <!-- Материалы -->
    <OrderOttobockMaterialsCard 
      v-if="orderOttobock!.materials && orderOttobock!.materials.length > 0"
      :data="orderOttobock!" 
    />
  </div>
</template>

<style scoped>
.order-details-section {
  margin-bottom: 2rem;
}
</style>


