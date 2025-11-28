<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import type { InvoiceOttobockDTO, InvoiceOttobockFormValues } from '@rupoi/entities/invoice-ottobock'
import { InvoiceOttobockForm } from '@rupoi/entities/invoice-ottobock'
import { useInvoiceOttobockSave } from '../model/use-invoice-ottobock-save'
import type { ID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader, BaseSectionTitle } from '@rupoi/shared/ui'
import { OrderOttobockSelect } from '@rupoi/entities/order-ottobock'
import { OrderStatus } from '@rupoi/shared/constant'
import OrderDetailsSection from './order-details-section.vue'

interface Props {
  invoiceOttobockId?: ID | null
  orderOttobockId?: ID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Создать накладную',
  disabled: false,
  invoiceOttobockId: null,
  orderOttobockId: null,
})

const emit = defineEmits<{
  submit: [value: InvoiceOttobockDTO | null]
  success: [value: InvoiceOttobockDTO | null]
}>()

const selectedOrderId = ref<ID | null>(props.orderOttobockId)
const dynamicOrderId = ref<ID | null>(props.orderOttobockId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  invoiceOttobock,
  orderOttobock,
} = useInvoiceOttobockSave({
  invoiceOttobockId: toRef(props, 'invoiceOttobockId'),
  orderOttobockId: dynamicOrderId,
  onSuccess: (invoiceOttobockId) => {
    console.log('Invoice created with ID:', invoiceOttobockId)
  }
})

// Обновляем dynamicOrderId при изменении selectedOrderId или загрузке накладной
watch([selectedOrderId, invoiceOttobock], ([newSelectedId, newInvoice]) => {
  // В режиме редактирования берем orderId из загруженной накладной
  if (props.invoiceOttobockId && newInvoice?.order?.id) {
    dynamicOrderId.value = newInvoice.order.id
  }
  // В режиме создания используем selectedOrderId
  else {
    dynamicOrderId.value = newSelectedId
  }
}, { immediate: true })

const displayOrderId = ref<ID | null>(props.orderOttobockId)

watch(selectedOrderId, (newValue) => {
  if (!isEditMode.value) {
    displayOrderId.value = newValue
  }
})

const orderInfo = computed(() => {
  if (!invoiceOttobock.value?.order) return ''
  const order = invoiceOttobock.value.order
  const orderNumber = order.orderNumber || `ID: ${order.id}`
  const person = order.person
  const personName = person 
    ? `${person.lastName} ${person.firstName} ${person.patronymic}`
    : 'Не указан'
  return `${orderNumber} • ${personName}`
})

async function onSubmit(formValues: InvoiceOttobockFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

const shouldShowForm = computed(() => isEditMode.value || !!selectedOrderId.value)

// Показывать детали заказа - в режиме создания зависит от selectedOrderId, в режиме редактирования от orderOttobock
const shouldShowOrderDetails = computed(() => {
  if (isEditMode.value) {
    return !!orderOttobock.value
  }
  return !!selectedOrderId.value
})
</script>

<template>
  <div class="invoice-ottobock-save-wrapper">
    <BaseLoader :loading="isLoading" text="Загрузка..." />
    
    <div class="mb-4">
      <div class="form-group">
        <label class="form-control-label">Заказ <span class="text-danger">*</span></label>
        
        <div v-if="isEditMode" class="order-info">
          <div class="order-info-content">
            <i class="fas fa-file-alt me-2 text-primary" />
            <span class="order-name">{{ orderInfo }}</span>
          </div>
        </div>
        
        <OrderOttobockSelect
          v-else
          :model-value="displayOrderId"
          :disabled="props.disabled || isLoading"
          :status="OrderStatus.FOR_FITTING"
          @update:model-value="(value) => selectedOrderId = value"
        />
      </div>
      
      <BaseAlert
        v-if="!isEditMode && !selectedOrderId"
        type="info"
        icon="info-circle"
        title="Внимание"
        class="mt-3"
      >
        Пожалуйста, выберите заказ из списка для продолжения создания накладной.
      </BaseAlert>
    </div>

    <OrderDetailsSection
      v-if="shouldShowOrderDetails"
      :order-ottobock="orderOttobock"
    />

    <div v-if="shouldShowForm" class="invoice-form-section">
      <BaseSectionTitle 
        title="Информация о накладной" 
        icon="fas fa-file-invoice" 
        variant="success" 
      />

      <InvoiceOttobockForm
        :data="invoiceOttobock"
        :disabled="props.disabled || isLoading"
        :submit-text="props.submitText"
        @submit="onSubmit"
      >
        <template #default>
          <slot />
        </template>
      </InvoiceOttobockForm>
    </div>
  </div>
</template>

<style scoped>
.invoice-ottobock-save-wrapper {
  position: relative;
}

.order-info {
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
}

.order-info-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.order-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344767;
}

.invoice-form-section {
  margin-top: 2rem;
}
</style>


