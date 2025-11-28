<script setup lang="ts">
import { computed, ref } from 'vue'
import { AButton, APopover } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import { statusButtonConfigs } from '../config'
import { useOrderChangeStatus } from '../model/use-order-change-status'
import type { OrderChangeStatusProps } from '../model/types'
import { OrderStatus } from '@rupoi/shared/constant'
import { OrderAssignWorkshopModal } from '@rupoi/features/order-assign-workshop'

const props = withDefaults(defineProps<OrderChangeStatusProps>(), {
  disabled: false,
  iconOnly: false,
})

const emit = defineEmits<{
  (event: 'success', payload: { newStatus: OrderStatus }): void
}>()

const { isModalOpen, comment, isLoading, changeStatus } = useOrderChangeStatus(props)

const buttonConfig = computed(() => statusButtonConfigs[props.targetStatus])

// Модалка для назначения мастерской (только для статуса IN_PRODUCTION)
const isAssignWorkshopModalOpen = ref(false)

// Проверяем, нужно ли открывать модалку назначения мастерской
const requiresWorkshopAssignment = computed(() => props.targetStatus === OrderStatus.IN_PRODUCTION)

// Обработчик клика по кнопке
function handleButtonClick() {
  if (requiresWorkshopAssignment.value) {
    isAssignWorkshopModalOpen.value = true
  } else {
    isModalOpen.value = true
  }
}

async function handleConfirm() {
  const isSuccess = await changeStatus(props.targetStatus)
  if (isSuccess) {
    emit('success', { newStatus: props.targetStatus })
  }
}

function handleCancel() {
  isModalOpen.value = false
}

// Обработчик успешного назначения мастерской
function handleWorkshopAssignSuccess() {
  // Модалка закроется автоматически через emit('update:isOpen', false)
  emit('success', { newStatus: OrderStatus.IN_PRODUCTION })
}
</script>

<template>
  <APopover
    v-if="props.iconOnly"
    :title="buttonConfig.label"
    trigger="hover"
  >
    <AButton
      type="button"
      :color="buttonConfig.color"
      size="sm"
      :icon="props.iconOnly"
      :disabled="props.disabled || isLoading"
      @click="handleButtonClick"
    >
      <i :class="`ni ${buttonConfig.icon}`"></i>
    </AButton>
  </APopover>

  <AButton
    v-else
    type="button"
    :color="buttonConfig.color"
    size="sm"
    :disabled="props.disabled || isLoading"
    @click="handleButtonClick"
  >
    <i :class="`ni ${buttonConfig.icon} me-2`"></i>
    <span>{{ buttonConfig.label }}</span>
  </AButton>

  <!-- Стандартная модалка изменения статуса (для всех статусов кроме IN_PRODUCTION) -->
  <BaseModal
    v-model="isModalOpen"
    :title="`Изменить статус на &quot;${buttonConfig.label}&quot;`"
    size="md"
    :persistent="isLoading"
    @before-close="handleCancel"
  >
    <div class="form-group">
      <label for="status-comment" class="form-label">
        Комментарий
        <span class="text-muted">(необязательно)</span>
      </label>
      <textarea
        id="status-comment"
        v-model="comment"
        class="form-control"
        rows="4"
        maxlength="500"
        placeholder="Введите комментарий к изменению статуса..."
        :disabled="isLoading"
      ></textarea>
      <small class="text-muted">
        {{ comment.length }} / 500 символов
      </small>
    </div>

    <template #footer="{ close }">
      <AButton
        type="button"
        color="secondary"
        :disabled="isLoading"
        @click="close"
      >
        Отмена
      </AButton>
      <AButton
        type="button"
        color="primary"
        :disabled="isLoading"
        @click="handleConfirm"
      >
        <span v-if="isLoading">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Изменение...
        </span>
        <span v-else>
          Подтвердить
        </span>
      </AButton>
    </template>
  </BaseModal>

  <!-- Модалка назначения мастерской (только для статуса IN_PRODUCTION) -->
  <OrderAssignWorkshopModal
    v-model:is-open="isAssignWorkshopModalOpen"
    :order-id="props.orderId"
    :order-kind="props.orderKind"
    @success="handleWorkshopAssignSuccess"
  />
</template>

