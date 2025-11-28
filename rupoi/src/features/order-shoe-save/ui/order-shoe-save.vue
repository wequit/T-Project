<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { OrderShoeDTO, OrderShoeFormValues } from '@rupoi/entities/order-shoe'
import { OrderShoeForm } from '@rupoi/entities/order-shoe'
import { useOrderShoeSave } from '../model/use-order-shoe-save'
import { RouteConfig } from '@rupoi/shared/constant'
import type { ID, UUID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader } from '@rupoi/shared/ui'
import { PersonSelect } from '@rupoi/entities/person'
import TechnicalOperationSection from './technical-operation-section.vue'
import FittingSection from './fitting-section.vue'
import FileSection from './file-section.vue'

interface Props {
  orderShoeId?: ID | null
  personId?: UUID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  orderShoeId: null,
  personId: null,
})

const emit = defineEmits<{
  submit: [value: OrderShoeDTO | null]
  success: [value: OrderShoeDTO | null]
}>()

const router = useRouter()

// Person select для режима создания
const selectedPersonId = ref<UUID | null>(props.personId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  orderShoe,
} = useOrderShoeSave({
  orderShoeId: toRef(props, 'orderShoeId'),
  personId: computed(() => selectedPersonId.value ?? props.personId ?? null),
  onSuccess: (orderShoeId) => {
    router.push({
      name: RouteConfig.Order.shoe.edit.name,
      params: { id: orderShoeId }
    })
  }
})

// Реактивный displayPersonId для режима создания
const displayPersonId = ref<UUID | null>(props.personId)

// Следим за изменением selectedPersonId в режиме создания
watch(selectedPersonId, (newValue) => {
  if (!isEditMode.value) {
    displayPersonId.value = newValue
  }
})

// ФИО пациента для отображения в режиме редактирования
const personFullName = computed(() => {
  if (!orderShoe.value?.person) return ''
  const { lastName, firstName, patronymic } = orderShoe.value.person
  return `${lastName} ${firstName} ${patronymic}`
})

async function onSubmit(formValues: OrderShoeFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

// Показывать форму только если выбрана персона (в режиме создания) или это режим редактирования
const shouldShowForm = computed(() => isEditMode.value || !!selectedPersonId.value)
</script>

<template>
  <div class="order-shoe-save-wrapper">
    <!-- Loader overlay - при любой загрузке -->
    <BaseLoader :loading="isLoading" text="Загрузка..." />
    
    <!-- Person info/select -->
    <div class="mb-4">
      <div class="form-group">
        <label class="form-control-label">Пациент <span class="text-danger">*</span></label>
        
        <!-- Режим редактирования - просто ФИО -->
        <div v-if="isEditMode" class="person-info">
          <div class="person-info-content">
            <i class="fas fa-user me-2 text-primary" />
            <span class="person-name">{{ personFullName }}</span>
          </div>
        </div>
        
        <!-- Режим создания - поиск пациента -->
        <PersonSelect
          v-else
          :model-value="displayPersonId"
          :disabled="props.disabled || isLoading"
          @update:model-value="(value) => selectedPersonId = value"
        />
      </div>
      
      <!-- Уведомление о необходимости выбора пациента (только в режиме создания) -->
      <BaseAlert
        v-if="!isEditMode && !selectedPersonId"
        type="info"
        icon="info-circle"
        title="Внимание"
        class="mt-3"
      >
        Пожалуйста, выберите пациента из списка для продолжения создания заказа.
      </BaseAlert>
    </div>

    <!-- Форма заказа (показывается только если выбран пациент) -->
    <OrderShoeForm
      v-if="shouldShowForm"
      :data="orderShoe"
      :disabled="props.disabled || isLoading"
      :submit-text="props.submitText"
      @submit="onSubmit"
    >
      <template #technical-operations>
        <TechnicalOperationSection
          v-if="isEditMode"
          :order-shoe="orderShoe"
          :disabled="props.disabled || isLoading"
        />
      </template>
      
      <template #fittings>
        <FittingSection
          v-if="isEditMode"
          :order-shoe="orderShoe"
          :disabled="props.disabled || isLoading"
        />
      </template>

      <template #files>
        <FileSection
          v-if="isEditMode"
          :order-shoe="orderShoe"
          :disabled="props.disabled || isLoading"
        />
      </template>
      
      <template #default>
        <slot />
      </template>
    </OrderShoeForm>
  </div>
</template>

<style scoped>
.order-shoe-save-wrapper {
  position: relative;
}

.person-info {
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
}

.person-info-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.person-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344767;
}
</style>

