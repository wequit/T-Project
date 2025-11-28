<script setup lang="ts">
import { computed } from 'vue'
import { FittingList } from '@rupoi/entities/fitting'
import { FittingKind } from '@rupoi/entities/fitting/constant'
import type { OrderReadyMadeDTO } from '@rupoi/entities/order-ready-made'

interface Props {
  orderReadyMade: OrderReadyMadeDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const fittingItems = computed(() => props.orderReadyMade?.fittingOrders ?? [])
const orderReadyMadeId = computed(() => props.orderReadyMade?.id)
// Используем READY_MADE kind для ready-made orders
const fittingKind = FittingKind.READY_MADE
</script>

<template>
  <div v-if="orderReadyMadeId" class="mb-3">
    <FittingList
      :items="fittingItems"
      :order-prosthesis-id="orderReadyMadeId"
      :kind="fittingKind"
      :disabled="props.disabled"
    />
  </div>
</template>

