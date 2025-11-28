<script setup lang="ts">
import { computed } from 'vue'
import type { OrderRepairDTO } from '@rupoi/entities/order-repair'
import { 
  OrderRepairCommonInfoCard,
  OrderRepairMaterialsCard,
  OrderRepairFittingsCard
} from '@rupoi/entities/order-repair'
import { BaseSectionTitle } from '@rupoi/shared/ui'

interface Props {
  orderRepair: OrderRepairDTO | null | undefined
}

const props = defineProps<Props>()

const hasOrder = computed(() => !!props.orderRepair)
</script>

<template>
  <div v-if="hasOrder" class="order-details-section">
    <BaseSectionTitle 
      title="Детали заказа" 
      icon="fas fa-info-circle" 
      variant="info" 
    />

    <!-- Основная информация о заказе -->
    <OrderRepairCommonInfoCard :data="orderRepair!" />

    <!-- Материалы -->
    <OrderRepairMaterialsCard 
      v-if="orderRepair!.materials && orderRepair!.materials.length > 0"
      :data="orderRepair!" 
    />

    <!-- Примерки -->
    <OrderRepairFittingsCard 
      v-if="orderRepair!.fittingOrders && orderRepair!.fittingOrders.length > 0"
      :data="orderRepair!" 
    />
  </div>
</template>

<style scoped>
.order-details-section {
  margin-bottom: 2rem;
}
</style>

