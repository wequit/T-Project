<script setup lang="ts">
import { computed } from 'vue'
import { FittingList } from '@rupoi/entities/fitting'
import { FittingKind } from '@rupoi/entities/fitting/constant'
import type { OrderRepairDTO } from '@rupoi/entities/order-repair'

interface Props {
  orderRepair: OrderRepairDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const fittingItems = computed(() => props.orderRepair?.fittingOrders ?? [])
const orderRepairId = computed(() => props.orderRepair?.id)
// Используем REPAIR kind для repair orders
const fittingKind = FittingKind.REPAIR
</script>

<template>
  <div v-if="orderRepairId" class="mb-3">
    <FittingList
      :items="fittingItems"
      :order-prosthesis-id="orderRepairId"
      :kind="fittingKind"
      :disabled="props.disabled"
    />
  </div>
</template>

