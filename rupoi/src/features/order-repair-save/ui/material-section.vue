<script setup lang="ts">
import { computed } from 'vue'
import { MaterialList } from '@rupoi/entities/material'
import { MaterialKind } from '@rupoi/entities/material/constant'
import type { OrderRepairDTO } from '@rupoi/entities/order-repair'

interface Props {
  orderRepair: OrderRepairDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const materialItems = computed(() => props.orderRepair?.materials ?? [])
const orderRepairId = computed(() => props.orderRepair?.id)
// Используем REPAIR kind для repair orders
const materialKind = MaterialKind.REPAIR
</script>

<template>
  <div v-if="orderRepairId" class="mb-3">
    <MaterialList
      :items="materialItems"
      :order-id="orderRepairId"
      :kind="materialKind"
      :disabled="props.disabled"
    />
  </div>
</template>

