<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BaseSearchBox, type SearchBoxOption } from '@rupoi/shared/ui'
import { useOrderProsthesisList } from '../../model/queries'
import type { ID } from '@rupoi/shared/model'
import type { OrderProsthesisListParams } from '../../model/types'
import { personFormatters } from '@rupoi/entities/person/lib/formatters'
import { OrderStatus } from '@rupoi/shared/constant'

interface Props {
  modelValue: ID | null
  disabled?: boolean
  placeholder?: string
  status?: OrderStatus
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: 'Найдите заказ по номеру или клиенту...',
  status: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: ID | null]
}>()

const searchQuery = ref('')

// Query params for order prosthesis list
const orderListParams = ref<OrderProsthesisListParams>({
  query: undefined,
  status: props.status ? [props.status] : [],
  priority: undefined,
  pageable: {
    page: 0,
    size: 20,
  }
})

const orderListQuery = useOrderProsthesisList(orderListParams)

// При изменении searchQuery обновляем параметры
watch(searchQuery, (newValue) => {
  orderListParams.value = {
    query: newValue || undefined,
    status: props.status ? [props.status] : [],
    priority: undefined,
    pageable: {
      page: 0,
      size: 20,
    }
  }
})

// Преобразуем данные в формат для search box
const options = computed<SearchBoxOption<ID>[]>(() => {
  return (orderListQuery.data.value?.content ?? []).map(order => {
    const personName = order.person
      ? personFormatters.formatPersonFullName(order.person)
      : 'Не указан'

    const orderNumber = order.orderNumber || `ID: ${order.id}`
    const productType = order.productTypeRef?.nameRu || 'Не указано'

    return {
      value: order.id,
      label: `${orderNumber} • ${personName}`,
      subLabel: `Изделие: ${productType}`,
      data: order,
    }
  })
})

function handleSearch(query: string) {
  searchQuery.value = query
}

function handleOpen() {
  // При открытии подгружаем первую пачку данных
  if (!searchQuery.value) {
    orderListParams.value = {
      query: undefined,
      status: props.status ? [props.status] : [],
      priority: undefined,
      pageable: {
        page: 0,
        size: 20,
      }
    }
  }
}

function handleUpdateValue(value: ID | null) {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseSearchBox
    :model-value="props.modelValue"
    :options="options"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :loading="orderListQuery.isLoading.value"
    loading-text="Загрузка заказов..."
    no-results-text="Заказы не найдены"
    @update:model-value="handleUpdateValue"
    @search="handleSearch"
    @open="handleOpen"
  />
</template>

