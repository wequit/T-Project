<script setup lang="ts">
import { computed } from 'vue'
import { FittingList } from '@rupoi/entities/fitting'
import { FittingKind } from '@rupoi/entities/fitting/constant'
import type { OrderProsthesisDTO } from '@rupoi/entities/order-prosthesis'

interface Props {
  orderProsthesis: OrderProsthesisDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const fittingItems = computed(() => props.orderProsthesis?.fittingOrders ?? [])
const orderProsthesisId = computed(() => props.orderProsthesis?.id)
// По умолчанию используем PROSTHESIS kind, так как это для prosthesis orders
const fittingKind = FittingKind.PROSTHESIS
</script>

<template>
  <div v-if="orderProsthesisId" class="mb-3">
    <FittingList
      :items="fittingItems"
      :order-prosthesis-id="orderProsthesisId"
      :kind="fittingKind"
      :disabled="props.disabled"
    />
  </div>
</template>

