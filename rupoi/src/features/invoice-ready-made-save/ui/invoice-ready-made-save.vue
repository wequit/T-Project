<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import type { InvoiceReadyMadeDTO, InvoiceReadyMadeFormValues } from '@rupoi/entities/invoice-ready-made'
import { InvoiceReadyMadeForm } from '@rupoi/entities/invoice-ready-made'
import { useInvoiceReadyMadeSave } from '../model/use-invoice-ready-made-save'
import type { ID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader, BaseSectionTitle } from '@rupoi/shared/ui'
import { OrderReadyMadeSelect } from '@rupoi/entities/order-ready-made'
import { OrderStatus } from '@rupoi/shared/constant'
import OrderDetailsSection from './order-details-section.vue'

interface Props {
  invoiceReadyMadeId?: ID | null
  orderReadyMadeId?: ID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Создать накладную',
  disabled: false,
  invoiceReadyMadeId: null,
  orderReadyMadeId: null,
})

const emit = defineEmits<{
  submit: [value: InvoiceReadyMadeDTO | null]
  success: [value: InvoiceReadyMadeDTO | null]
}>()

// Order select для режима создания
const selectedOrderId = ref<ID | null>(props.orderReadyMadeId)
const dynamicOrderId = ref<ID | null>(props.orderReadyMadeId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  invoiceReadyMade,
  orderReadyMade,
} = useInvoiceReadyMadeSave({
  invoiceReadyMadeId: toRef(props, 'invoiceReadyMadeId'),
  orderReadyMadeId: dynamicOrderId,
  onSuccess: (invoiceReadyMadeId) => {
    // TODO: добавить роут для редактирования накладной когда будет создан
    console.log('Invoice created with ID:', invoiceReadyMadeId)
  }
})

// Обновляем dynamicOrderId при изменении selectedOrderId или загрузке накладной
watch([selectedOrderId, invoiceReadyMade], ([newSelectedId, newInvoice]) => {
  // В режиме редактирования берем orderId из загруженной накладной
  if (props.invoiceReadyMadeId && newInvoice?.order?.id) {
    dynamicOrderId.value = newInvoice.order.id
  }
  // В режиме создания используем selectedOrderId
  else {
    dynamicOrderId.value = newSelectedId
  }
}, { immediate: true })

// Реактивный displayOrderId для режима создания
const displayOrderId = ref<ID | null>(props.orderReadyMadeId)

// Следим за изменением selectedOrderId в режиме создания
watch(selectedOrderId, (newValue) => {
  if (!isEditMode.value) {
    displayOrderId.value = newValue
  }
})

// Информация о заказе для отображения в режиме редактирования
const orderInfo = computed(() => {
  if (!invoiceReadyMade.value?.order) return ''
  const order = invoiceReadyMade.value.order
  const orderNumber = order.orderNumber || `ID: ${order.id}`
  const person = order.person
  const personName = person 
    ? `${person.lastName} ${person.firstName} ${person.patronymic}`
    : 'Не указан'
  return `${orderNumber} • ${personName}`
})

async function onSubmit(formValues: InvoiceReadyMadeFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

// Показывать форму только если выбран заказ (в режиме создания) или это режим редактирования
const shouldShowForm = computed(() => isEditMode.value || !!selectedOrderId.value)

// Показывать детали заказа - в режиме создания зависит от selectedOrderId, в режиме редактирования от orderReadyMade
const shouldShowOrderDetails = computed(() => {
  if (isEditMode.value) {
    return !!orderReadyMade.value
  }
  return !!selectedOrderId.value
})
</script>

<template>
  <div class="invoice-ready-made-save-wrapper">
    <!-- Loader overlay - при любой загрузке -->
    <BaseLoader :loading="isLoading" text="Загрузка..." />
    
    <!-- Order info/select -->
    <div class="mb-4">
      <div class="form-group">
        <label class="form-control-label">Заказ <span class="text-danger">*</span></label>
        
        <!-- Режим редактирования - просто информация о заказе -->
        <div v-if="isEditMode" class="order-info">
          <div class="order-info-content">
            <i class="fas fa-file-alt me-2 text-primary" />
            <span class="order-name">{{ orderInfo }}</span>
          </div>
        </div>
        
        <!-- Режим создания - поиск заказа -->
        <OrderReadyMadeSelect
          v-else
          :model-value="displayOrderId"
          :disabled="props.disabled || isLoading"
          :status="OrderStatus.FOR_FITTING"
          @update:model-value="(value: ID | null) => selectedOrderId = value"
        />
      </div>
      
      <!-- Уведомление о необходимости выбора заказа (только в режиме создания) -->
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

    <!-- Детали выбранного заказа -->
    <OrderDetailsSection
      v-if="shouldShowOrderDetails"
      :order-ready-made="orderReadyMade"
    />

    <!-- Форма накладной (показывается только если выбран заказ) -->
    <div v-if="shouldShowForm" class="invoice-form-section">
      <BaseSectionTitle 
        title="Информация о накладной" 
        icon="fas fa-file-invoice" 
        variant="success" 
      />

      <InvoiceReadyMadeForm
        :data="invoiceReadyMade"
        :disabled="props.disabled || isLoading"
        :submit-text="props.submitText"
        @submit="onSubmit"
      >
        <template #default>
          <slot />
        </template>
      </InvoiceReadyMadeForm>
    </div>
  </div>
</template>

<style scoped>
.invoice-ready-made-save-wrapper {
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

