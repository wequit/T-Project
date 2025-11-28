<script setup lang="ts">
import { computed } from 'vue'
import type { OrderReadyMadeDTO } from '@rupoi/entities/order-ready-made'
import { 
  OrderReadyMadeCommonInfoCard,
  OrderReadyMadeMaterialsCard,
  OrderReadyMadeFittingsCard
} from '@rupoi/entities/order-ready-made'
import { BaseSectionTitle } from '@rupoi/shared/ui'

interface Props {
  orderReadyMade: OrderReadyMadeDTO | null | undefined
}

const props = defineProps<Props>()

const hasOrder = computed(() => !!props.orderReadyMade)
</script>

<template>
  <div v-if="hasOrder" class="order-details-section">
    <BaseSectionTitle 
      title="Детали заказа" 
      icon="fas fa-info-circle" 
      variant="info" 
    />

    <!-- Основная информация о заказе -->
    <OrderReadyMadeCommonInfoCard :data="orderReadyMade!" />

    <!-- Материалы -->
    <OrderReadyMadeMaterialsCard 
      v-if="orderReadyMade!.materials && orderReadyMade!.materials.length > 0"
      :data="orderReadyMade!" 
    />

    <!-- Примерки -->
    <OrderReadyMadeFittingsCard 
      v-if="orderReadyMade!.fittingOrders && orderReadyMade!.fittingOrders.length > 0"
      :data="orderReadyMade!" 
    />
  </div>
</template>

<style scoped>
.order-details-section {
  margin-bottom: 2rem;
}
</style>

