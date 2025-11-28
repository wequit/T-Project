<script setup lang="ts">
import { computed } from 'vue'
import { TechnicalOperationList } from '@rupoi/entities/technical-operation'
import type { OrderShoeDTO } from '@rupoi/entities/order-shoe'

interface Props {
  orderShoe: OrderShoeDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const technicalOperationItems = computed(() => props.orderShoe?.technicalOperations ?? [])
const orderShoeId = computed(() => props.orderShoe?.id)
</script>

<template>
  <div v-if="orderShoeId" class="mb-3">
    <TechnicalOperationList
      :items="technicalOperationItems"
      :order-shoe-id="orderShoeId"
      :disabled="props.disabled"
    />
  </div>
</template>

