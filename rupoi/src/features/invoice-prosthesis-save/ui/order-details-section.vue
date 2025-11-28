<script setup lang="ts">
import { computed } from 'vue'
import type { OrderProsthesisDTO } from '@rupoi/entities/order-prosthesis'
import { 
  OrderProsthesisCommonInfoCard,
  OrderProsthesisComponentsCard,
  OrderProsthesisFittingsCard
} from '@rupoi/entities/order-prosthesis'
import { BaseSectionTitle } from '@rupoi/shared/ui'

interface Props {
  orderProsthesis: OrderProsthesisDTO | null | undefined
}

const props = defineProps<Props>()

const hasOrder = computed(() => !!props.orderProsthesis)
</script>

<template>
  <div v-if="hasOrder" class="order-details-section">
    <BaseSectionTitle 
      title="Детали заказа" 
      icon="fas fa-info-circle" 
      variant="info" 
    />

    <!-- Основная информация о заказе -->
    <OrderProsthesisCommonInfoCard :data="orderProsthesis!" />

    <!-- Компоненты протеза -->
    <OrderProsthesisComponentsCard 
      v-if="orderProsthesis!.components && orderProsthesis!.components.length > 0"
      :data="orderProsthesis!" 
    />

    <!-- Примерки -->
    <OrderProsthesisFittingsCard 
      v-if="orderProsthesis!.fittingOrders && orderProsthesis!.fittingOrders.length > 0"
      :data="orderProsthesis!" 
    />
  </div>
</template>

<style scoped>
.order-details-section {
  margin-bottom: 2rem;
}
</style>

