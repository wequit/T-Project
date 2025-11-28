<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import type { InvoiceProsthesisDTO, InvoiceProsthesisFormValues } from '@rupoi/entities/invoice-prosthesis'
import { InvoiceProsthesisForm } from '@rupoi/entities/invoice-prosthesis'
import { useInvoiceProsthesisSave } from '../model/use-invoice-prosthesis-save'
import type { ID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader, BaseSectionTitle } from '@rupoi/shared/ui'
import { OrderProsthesisSelect } from '@rupoi/entities/order-prosthesis'
import { OrderStatus } from '@rupoi/shared/constant'
import OrderDetailsSection from './order-details-section.vue'

interface Props {
  invoiceProsthesisId?: ID | null
  orderProsthesisId?: ID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Создать накладную',
  disabled: false,
  invoiceProsthesisId: null,
  orderProsthesisId: null,
})

const emit = defineEmits<{
  submit: [value: InvoiceProsthesisDTO | null]
  success: [value: InvoiceProsthesisDTO | null]
}>()

// Order select для режима создания
const selectedOrderId = ref<ID | null>(props.orderProsthesisId)
const dynamicOrderId = ref<ID | null>(props.orderProsthesisId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  invoiceProsthesis,
  orderProsthesis,
} = useInvoiceProsthesisSave({
  invoiceProsthesisId: toRef(props, 'invoiceProsthesisId'),
  orderProsthesisId: dynamicOrderId,
  onSuccess: (invoiceProsthesisId) => {
    // TODO: добавить роут для редактирования накладной когда будет создан
    console.log('Invoice created with ID:', invoiceProsthesisId)
  }
})

// Обновляем dynamicOrderId при изменении selectedOrderId или загрузке накладной
watch([selectedOrderId, invoiceProsthesis], ([newSelectedId, newInvoice]) => {
  // В режиме редактирования берем orderId из загруженной накладной
  if (props.invoiceProsthesisId && newInvoice?.order?.id) {
    dynamicOrderId.value = newInvoice.order.id
  }
  // В режиме создания используем selectedOrderId
  else {
    dynamicOrderId.value = newSelectedId
  }
}, { immediate: true })

// Реактивный displayOrderId для режима создания
const displayOrderId = ref<ID | null>(props.orderProsthesisId)

// Следим за изменением selectedOrderId в режиме создания
watch(selectedOrderId, (newValue) => {
  if (!isEditMode.value) {
    displayOrderId.value = newValue
  }
})

// Информация о заказе для отображения в режиме редактирования
const orderInfo = computed(() => {
  if (!invoiceProsthesis.value?.order) return ''
  const order = invoiceProsthesis.value.order
  const orderNumber = order.orderNumber || `ID: ${order.id}`
  const person = order.person
  const personName = person 
    ? `${person.lastName} ${person.firstName} ${person.patronymic}`
    : 'Не указан'
  return `${orderNumber} • ${personName}`
})

async function onSubmit(formValues: InvoiceProsthesisFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

// Показывать форму только если выбран заказ (в режиме создания) или это режим редактирования
const shouldShowForm = computed(() => isEditMode.value || !!selectedOrderId.value)

// Показывать детали заказа - в режиме создания зависит от selectedOrderId, в режиме редактирования от orderProsthesis
const shouldShowOrderDetails = computed(() => {
  if (isEditMode.value) {
    return !!orderProsthesis.value
  }
  return !!selectedOrderId.value
})
</script>

<template>
  <div class="invoice-prosthesis-save-wrapper">
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
        <OrderProsthesisSelect
          v-else
          :model-value="displayOrderId"
          :disabled="props.disabled || isLoading"
          :status="OrderStatus.FOR_FITTING"
          @update:model-value="(value) => selectedOrderId = value"
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
      :order-prosthesis="orderProsthesis"
    />

    <!-- Форма накладной (показывается только если выбран заказ) -->
    <div v-if="shouldShowForm" class="invoice-form-section">
      <BaseSectionTitle 
        title="Информация о накладной" 
        icon="fas fa-file-invoice" 
        variant="success" 
      />

      <InvoiceProsthesisForm
        :data="invoiceProsthesis"
        :disabled="props.disabled || isLoading"
        :submit-text="props.submitText"
        @submit="onSubmit"
      >
        <template #default>
          <slot />
        </template>
      </InvoiceProsthesisForm>
    </div>
  </div>
</template>

<style scoped>
.invoice-prosthesis-save-wrapper {
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

