<script setup lang="ts">
import { toRef, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { OrderProsthesisDTO, OrderProsthesisFormValues } from '@rupoi/entities/order-prosthesis'
import { OrderProsthesisForm } from '@rupoi/entities/order-prosthesis'
import { useOrderProsthesisSave } from '../model/use-order-prosthesis-save'
import { RouteConfig } from '@rupoi/shared/constant'
import type { ID, UUID } from '@rupoi/shared/model'
import { BaseAlert, BaseLoader } from '@rupoi/shared/ui'
import { PersonSelect } from '@rupoi/entities/person'
import ComponentProsthesisSection from './component-prosthesis-section.vue'
import FittingSection from './fitting-section.vue'
import FileSection from './file-section.vue'

interface Props {
  orderProsthesisId?: ID | null
  personId?: UUID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  orderProsthesisId: null,
  personId: null,
})

const emit = defineEmits<{
  submit: [value: OrderProsthesisDTO | null]
  success: [value: OrderProsthesisDTO | null]
}>()

const router = useRouter()

// Person select для режима создания
const selectedPersonId = ref<UUID | null>(props.personId)

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  orderProsthesis,
} = useOrderProsthesisSave({
  orderProsthesisId: toRef(props, 'orderProsthesisId'),
  personId: computed(() => selectedPersonId.value ?? props.personId ?? null),
  onSuccess: (orderProsthesisId) => {
    router.push({
      name: RouteConfig.Order.prosthesis.edit.name,
      params: { id: orderProsthesisId }
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
  if (!orderProsthesis.value?.person) return ''
  const { lastName, firstName, patronymic } = orderProsthesis.value.person
  return `${lastName} ${firstName} ${patronymic}`
})

async function onSubmit(formValues: OrderProsthesisFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}

// Показывать форму только если выбрана персона (в режиме создания) или это режим редактирования
const shouldShowForm = computed(() => isEditMode.value || !!selectedPersonId.value)
</script>

<template>
  <div class="order-prosthesis-save-wrapper">
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
    <OrderProsthesisForm
      v-if="shouldShowForm"
      :data="orderProsthesis"
      :disabled="props.disabled || isLoading"
      :submit-text="props.submitText"
      @submit="onSubmit"
    >
      <template #components>
        <ComponentProsthesisSection
          v-if="isEditMode"
          :order-prosthesis="orderProsthesis"
          :disabled="props.disabled || isLoading"
        />
      </template>

      <template #fittings>
        <FittingSection
          v-if="isEditMode"
          :order-prosthesis="orderProsthesis"
          :disabled="props.disabled || isLoading"
        />
      </template>

      <template #files>
        <FileSection
          v-if="isEditMode"
          :order-prosthesis="orderProsthesis"
          :disabled="props.disabled || isLoading"
        />
      </template>

      <template #default>
        <slot />
      </template>
    </OrderProsthesisForm>
  </div>
</template>

<style scoped>
.order-prosthesis-save-wrapper {
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

