<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import type { InvoiceRepairDTO, InvoiceRepairFormValues } from '@rupoi/entities/invoice-repair'
import { InvoiceRepairForm } from '@rupoi/entities/invoice-repair'
import { useInvoiceRepairSave } from '../model/use-invoice-repair-save'
import type { ID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader, BaseSectionTitle } from '@rupoi/shared/ui'
import { OrderRepairSelect } from '@rupoi/entities/order-repair'
import { OrderStatus } from '@rupoi/shared/constant'
import OrderDetailsSection from './order-details-section.vue'

interface Props {
  invoiceRepairId?: ID | null
  orderRepairId?: ID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Создать накладную',
  disabled: false,
  invoiceRepairId: null,
  orderRepairId: null,
})

const emit = defineEmits<{
  submit: [value: InvoiceRepairDTO | null]
  success: [value: InvoiceRepairDTO | null]
}>()

// Order select для режима создания
const selectedOrderId = ref<ID | null>(props.orderRepairId)
const dynamicOrderId = ref<ID | null>(props.orderRepairId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  invoiceRepair,
  orderRepair,
} = useInvoiceRepairSave({
  invoiceRepairId: toRef(props, 'invoiceRepairId'),
  orderRepairId: dynamicOrderId,
  onSuccess: (invoiceRepairId) => {
    // TODO: добавить роут для редактирования накладной когда будет создан
    console.log('Invoice created with ID:', invoiceRepairId)
  }
})

// Обновляем dynamicOrderId при изменении selectedOrderId или загрузке накладной
watch([selectedOrderId, invoiceRepair], ([newSelectedId, newInvoice]) => {
  // В режиме редактирования берем orderId из загруженной накладной
  if (props.invoiceRepairId && newInvoice?.order?.id) {
    dynamicOrderId.value = newInvoice.order.id
  }
  // В режиме создания используем selectedOrderId
  else {
    dynamicOrderId.value = newSelectedId
  }
}, { immediate: true })

// Реактивный displayOrderId для режима создания
const displayOrderId = ref<ID | null>(props.orderRepairId)

// Следим за изменением selectedOrderId в режиме создания
watch(selectedOrderId, (newValue) => {
  if (!isEditMode.value) {
    displayOrderId.value = newValue
  }
})

// Информация о заказе для отображения в режиме редактирования
const orderInfo = computed(() => {
  if (!invoiceRepair.value?.order) return ''
  const order = invoiceRepair.value.order
  const orderNumber = order.orderNumber || `ID: ${order.id}`
  const person = order.person
  const personName = person 
    ? `${person.lastName} ${person.firstName} ${person.patronymic}`
    : 'Не указан'
  return `${orderNumber} • ${personName}`
})

async function onSubmit(formValues: InvoiceRepairFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

// Показывать форму только если выбран заказ (в режиме создания) или это режим редактирования
const shouldShowForm = computed(() => isEditMode.value || !!selectedOrderId.value)

// Показывать детали заказа - в режиме создания зависит от selectedOrderId, в режиме редактирования от orderRepair
const shouldShowOrderDetails = computed(() => {
  if (isEditMode.value) {
    return !!orderRepair.value
  }
  return !!selectedOrderId.value
})
</script>

<template>
  <div class="invoice-repair-save-wrapper">
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
        <OrderRepairSelect
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
      :order-repair="orderRepair"
    />

    <!-- Форма накладной (показывается только если выбран заказ) -->
    <div v-if="shouldShowForm" class="invoice-form-section">
      <BaseSectionTitle 
        title="Информация о накладной" 
        icon="fas fa-file-invoice" 
        variant="success" 
      />

      <InvoiceRepairForm
        :data="invoiceRepair"
        :disabled="props.disabled || isLoading"
        :submit-text="props.submitText"
        @submit="onSubmit"
      >
        <template #default>
          <slot />
        </template>
      </InvoiceRepairForm>
    </div>
  </div>
</template>

<style scoped>
.invoice-repair-save-wrapper {
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

