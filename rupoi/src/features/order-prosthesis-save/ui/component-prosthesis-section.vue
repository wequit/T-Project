<script setup lang="ts">
import { computed } from 'vue'
import { ComponentProsthesisList } from '@rupoi/entities/component-prosthesis'
import type { OrderProsthesisDTO } from '@rupoi/entities/order-prosthesis'

interface Props {
  orderProsthesis: OrderProsthesisDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const componentProsthesisItems = computed(() => props.orderProsthesis?.components ?? [])
const orderProsthesisId = computed(() => props.orderProsthesis?.id)
</script>

<template>
  <div v-if="orderProsthesisId" class="mb-3">
    <ComponentProsthesisList
      :items="componentProsthesisItems"
      :order-prosthesis-id="orderProsthesisId"
      :disabled="props.disabled"
    />
  </div>
</template>

