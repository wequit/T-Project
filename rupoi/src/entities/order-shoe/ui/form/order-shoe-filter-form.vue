<script setup lang="ts">
import { ref, watch } from 'vue'
import { ASelect, AButton } from '@common/shared/ui'
import type { OrderShoeFilterFormValues } from "@rupoi/entities/order-shoe"
import { orderStatusOptions, orderPriorityOptions } from '@rupoi/shared/constant'

interface Props {
  data?: OrderShoeFilterFormValues
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  data: undefined,
})

const emit = defineEmits<{
  search: [value: OrderShoeFilterFormValues]
  reset: [value: OrderShoeFilterFormValues]
}>()

const formData = ref<OrderShoeFilterFormValues>({
  query: props.data?.query ?? null,
  status: props.data?.status ?? [],
  priority: props.data?.priority ?? null,
})

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      formData.value = {
        query: newData.query ?? null,
        status: newData.status ?? [],
        priority: newData.priority ?? null,
      }
    }
  },
  { deep: true }
)

function handleSearch(): void {
  emit('search', formData.value)
}

function handleReset(): void {
  formData.value = {
    query: null,
    status: [],
    priority: null,
  }
  emit('reset', formData.value)
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Поиск</label>
          <input
            v-model="formData.query"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Поиск по заказам..."
          />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Статус заказа</label>
          <ASelect
            v-model="formData.status"
            :options="orderStatusOptions"
            :disabled="props.disabled"
            placeholder="Выберите статус"
            multiple
            clearable
          />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Приоритет</label>
          <ASelect
            v-model="formData.priority"
            :options="orderPriorityOptions"
            :disabled="props.disabled"
            placeholder="Выберите приоритет"
            clearable
          />
        </div>
        <div class="col-12">
          <div class="d-flex gap-2">
            <AButton type="button" color="success" :disabled="props.disabled" @click="handleSearch">
              <i class="fas fa-search me-1"></i> Поиск
            </AButton>
            <AButton type="button" color="secondary" :disabled="props.disabled" @click="handleReset">
              <i class="fas fa-redo me-1"></i> Сбросить
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

