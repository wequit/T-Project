<script setup lang="ts">
import { watch, computed } from 'vue'
import { AButton, AFormItem, ASelect, AInputDate } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import { useOrderAssignWorkshop } from '../model/use-order-assign-workshop'
import type { OrderAssignWorkshopModalProps, OrderAssignWorkshopModalEmits } from '../model/types'
import { useWorkshopRegistryList } from '@rupoi/entities/workshop-registry'

const props = defineProps<OrderAssignWorkshopModalProps>()

const emit = defineEmits<OrderAssignWorkshopModalEmits>()

const {
  formData,
  isLoading,
  isFormValid,
  assignWorkshopAndChangeStatus,
  resetForm,
} = useOrderAssignWorkshop({
  orderId: props.orderId,
  orderKind: props.orderKind,
})

// Загружаем список мастерских используя entity composable
const workshopsQuery = useWorkshopRegistryList()

const workshopOptions = computed(() => {
  if (!workshopsQuery.data.value?.content) return []

  return workshopsQuery.data.value.content.map((workshop) => ({
    label: workshop.nameRu || workshop.nameKg,
    value: workshop.id,
  }))
})

async function handleConfirm() {
  const isSuccess = await assignWorkshopAndChangeStatus()
  if (isSuccess) {
    emit('success')
    emit('update:isOpen', false)
  }
}

function handleCancel() {
  resetForm()
  emit('cancel')
  emit('update:isOpen', false)
}

// Сбрасываем форму при закрытии модалки
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  }
)
</script>

<template>
  <BaseModal
    :model-value="props.isOpen"
    title="Назначить мастерскую"
    size="md"
    @update:model-value="emit('update:isOpen', $event)"
  >
    <div class="assign-workshop-form">
      <p class="text-muted mb-4">
        Для отправки заказа в производство необходимо назначить мастерскую и указать срок выполнения.
      </p>

      <div class="form-wrapper">
        <AFormItem
          label="Мастерская"
          required
        >
          <ASelect
            v-model="formData.workshopId"
            :options="workshopOptions"
            placeholder="Выберите мастерскую"
            :disabled="isLoading || workshopsQuery.isLoading.value"
            :loading="workshopsQuery.isLoading.value"
          />
          <template v-if="workshopsQuery.isError.value" #help>
            <span class="text-danger">Ошибка загрузки списка мастерских</span>
          </template>
        </AFormItem>

        <AFormItem
          label="Срок выполнения"
          required
        >
          <AInputDate
            v-model="formData.deadline"
            placeholder="Выберите дату"
            :disabled="isLoading"
            :min="new Date().toISOString().split('T')[0]"
          />
        </AFormItem>
      </div>
    </div>

    <template #footer>
      <div class="d-flex justify-content-end gap-2">
        <AButton
          color="secondary"
          variant="outline"
          :disabled="isLoading"
          @click="handleCancel"
        >
          Отмена
        </AButton>
        <AButton
          color="warning"
          :disabled="!isFormValid || isLoading"
          :loading="isLoading"
          @click="handleConfirm"
        >
          <i class="ni ni-settings me-2"></i>
          Отправить в производство
        </AButton>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
.assign-workshop-form {
  padding: 0.5rem 0;
}
</style>

