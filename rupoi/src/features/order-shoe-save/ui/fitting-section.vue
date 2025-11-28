<script setup lang="ts">
import { computed } from 'vue'
import { FittingList } from '@rupoi/entities/fitting'
import { FittingKind } from '@rupoi/entities/fitting/constant'
import type { OrderShoeDTO } from '@rupoi/entities/order-shoe'

interface Props {
  orderShoe: OrderShoeDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const fittingItems = computed(() => props.orderShoe?.fittingOrders ?? [])
const orderShoeId = computed(() => props.orderShoe?.id)
// Используем SHOE kind для shoe orders
const fittingKind = FittingKind.SHOE
</script>

<template>
  <div v-if="orderShoeId" class="mb-3">
    <FittingList
      :items="fittingItems"
      :order-prosthesis-id="orderShoeId"
      :kind="fittingKind"
      :disabled="props.disabled"
    />
  </div>
</template>

