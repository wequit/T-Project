<script setup lang="ts">
import { computed } from 'vue'
import { MaterialList } from '@rupoi/entities/material'
import { MaterialKind } from '@rupoi/entities/material/constant'
import type { OrderOttobockDTO } from '@rupoi/entities/order-ottobock'

interface Props {
  orderOttobock: OrderOttobockDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const materialItems = computed(() => props.orderOttobock?.materials ?? [])
const orderOttobockId = computed(() => props.orderOttobock?.id)
// Используем OTTOBOCK kind для ottobock orders
const materialKind = MaterialKind.OTTOBOCK
</script>

<template>
  <div v-if="orderOttobockId" class="mb-3">
    <MaterialList
      :items="materialItems"
      :order-id="orderOttobockId"
      :kind="materialKind"
      :disabled="props.disabled"
    />
  </div>
</template>

