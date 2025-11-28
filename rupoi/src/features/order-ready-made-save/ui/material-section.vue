<script setup lang="ts">
import { computed } from 'vue'
import { MaterialList } from '@rupoi/entities/material'
import { MaterialKind } from '@rupoi/entities/material/constant'
import type { OrderReadyMadeDTO } from '@rupoi/entities/order-ready-made'

interface Props {
  orderReadyMade: OrderReadyMadeDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const materialItems = computed(() => props.orderReadyMade?.materials ?? [])
const orderReadyMadeId = computed(() => props.orderReadyMade?.id)
// Используем READY_MADE kind для ready-made orders
const materialKind = MaterialKind.READY_MADE
</script>

<template>
  <div v-if="orderReadyMadeId" class="mb-3">
    <MaterialList
      :items="materialItems"
      :order-id="orderReadyMadeId"
      :kind="materialKind"
      :disabled="props.disabled"
    />
  </div>
</template>

