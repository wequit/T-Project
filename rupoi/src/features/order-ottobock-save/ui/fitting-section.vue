<script setup lang="ts">
import { computed } from 'vue'
import { FittingList } from '@rupoi/entities/fitting'
import { FittingKind } from '@rupoi/entities/fitting/constant'
import type { OrderOttobockDTO } from '@rupoi/entities/order-ottobock'

interface Props {
  orderOttobock: OrderOttobockDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const fittingItems = computed(() => props.orderOttobock?.fittingOrders ?? [])
const orderOttobockId = computed(() => props.orderOttobock?.id)
// Используем OTTOBOCK kind для ottobock orders
const fittingKind = FittingKind.OTTOBOCK
</script>

<template>
  <div v-if="orderOttobockId" class="mb-3">
    <FittingList
      :items="fittingItems"
      :order-prosthesis-id="orderOttobockId"
      :kind="fittingKind"
      :disabled="props.disabled"
    />
  </div>
</template>

