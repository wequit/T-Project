<script setup lang="ts">
import { ref, watch } from 'vue'
import { ASelect, AButton, AInputDate } from '@common/shared/ui'
import type { InvoiceShoeFilterFormValues } from "@rupoi/entities/invoice-shoe"
import { invoicePriorityOptions, invoiceStatusOptions } from '@rupoi/shared/constant'

interface Props {
  data?: InvoiceShoeFilterFormValues
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  data: undefined,
})

const emit = defineEmits<{
  search: [value: InvoiceShoeFilterFormValues]
  reset: [value: InvoiceShoeFilterFormValues]
}>()

const formData = ref<InvoiceShoeFilterFormValues>({
  q: props.data?.q ?? null,
  status: props.data?.status ?? [],
  priority: props.data?.priority ?? null,
  createdAtFrom: props.data?.createdAtFrom ?? null,
  createdAtTo: props.data?.createdAtTo ?? null,
  orderId: props.data?.orderId ?? null,
})

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      formData.value = {
        q: newData.q ?? null,
        status: newData.status ?? null,
        priority: newData.priority ?? null,
        createdAtFrom: newData.createdAtFrom ?? null,
        createdAtTo: newData.createdAtTo ?? null,
        orderId: newData.orderId ?? null,
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
    q: null,
    status: [],
    priority: null,
    createdAtFrom: null,
    createdAtTo: null,
    orderId: null,
  }
  emit('reset', formData.value)
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-3">
        <!-- Поиск -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Поиск</label>
          <input
            v-model="formData.q"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Поиск по накладным..."
          />
        </div>

        <!-- Статус накладной -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Статус</label>
          <ASelect
            v-model="formData.status"
            :options="invoiceStatusOptions"
            :disabled="props.disabled"
            placeholder="Выберите статус"
            multiple
            clearable
          />
        </div>

        <!-- Приоритет -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Приоритет</label>
          <ASelect
            v-model="formData.priority"
            :options="invoicePriorityOptions"
            :disabled="props.disabled"
            placeholder="Выберите приоритет"
            clearable
          />
        </div>

        <!-- Дата с -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Дата с</label>
          <AInputDate
            v-model="formData.createdAtFrom"
            :disabled="props.disabled"
            placeholder="Выберите дату"
          />
        </div>

        <!-- Дата по -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">Дата по</label>
          <AInputDate
            v-model="formData.createdAtTo"
            :disabled="props.disabled"
            placeholder="Выберите дату"
          />
        </div>

        <!-- ID заказа -->
        <div class="col-12 col-md-6 col-lg-4">
          <label class="form-label">ID заказа</label>
          <input
            v-model.number="formData.orderId"
            class="form-control"
            type="number"
            :disabled="props.disabled"
            placeholder="Введите ID заказа"
          />
        </div>

        <!-- Кнопки -->
        <div class="col-12">
          <div class="d-flex gap-2">
            <AButton
              type="button"
              color="success"
              :disabled="props.disabled"
              @click="handleSearch"
            >
              <i class="fas fa-search me-1"></i>
              Поиск
            </AButton>
            <AButton
              type="button"
              color="secondary"
              :disabled="props.disabled"
              @click="handleReset"
            >
              <i class="fas fa-redo me-1"></i>
              Сбросить
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

