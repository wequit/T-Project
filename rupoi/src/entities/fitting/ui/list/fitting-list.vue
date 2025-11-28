<script setup lang="ts">
import { ref, computed } from 'vue'
import { AButton } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import type { FittingDTO, FittingFormValues, FittingCreateDTO, FittingUpdateDTO } from '../../model/types'
import { useFitting } from '../../model/use-fitting'
import { FittingForm } from '../form'
import { FittingKind } from '../../constant'
import type { ID } from '@rupoi/shared/model'
import { formatDate } from '@rupoi/shared/lib'

interface Props {
  items: FittingDTO[]
  orderProsthesisId: ID
  kind: FittingKind
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// Modal state
const isModalOpen = ref(false)
const editingItem = ref<FittingDTO | null>(null)

// Fitting composable
const fitting = useFitting({ 
  kind: () => props.kind,
  orderProsthesisId: () => props.orderProsthesisId 
})

const modalTitle = computed(() => 
  editingItem.value ? 'Редактировать примерку' : 'Добавить примерку'
)

// Helper function to get the appropriate mapper based on kind
function getCreateDTO(formValues: FittingFormValues, orderId: ID | null): FittingCreateDTO {
  const mappers = {
    [FittingKind.PROSTHESIS]: () => ({
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      prosthesisOrderId: orderId,
    }),
    [FittingKind.OTTOBOCK]: () => ({
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      ottobockOrderId: orderId,
    }),
    [FittingKind.READY_MADE]: () => ({
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      readyPoiOrderId: orderId,
    }),
    [FittingKind.SHOE]: () => ({
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      shoeOrderId: orderId,
    }),
    [FittingKind.REPAIR]: () => ({
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      repairOrderId: orderId,
    }),
  }
  
  return mappers[props.kind]() as FittingCreateDTO
}

function getUpdateDTO(formValues: FittingFormValues, id: ID, orderId: ID | null): FittingUpdateDTO {
  const mappers = {
    [FittingKind.PROSTHESIS]: () => ({
      id,
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      prosthesisOrderId: orderId,
    }),
    [FittingKind.OTTOBOCK]: () => ({
      id,
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      ottobockOrderId: orderId,
    }),
    [FittingKind.READY_MADE]: () => ({
      id,
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      readyPoiOrderId: orderId,
    }),
    [FittingKind.SHOE]: () => ({
      id,
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      shoeOrderId: orderId,
    }),
    [FittingKind.REPAIR]: () => ({
      id,
      callDate: formValues.callDate!,
      appearanceDate: formValues.appearanceDate!,
      comment: formValues.comment ?? '',
      repairOrderId: orderId,
    }),
  }
  
  return mappers[props.kind]() as FittingUpdateDTO
}

function openCreateModal() {
  editingItem.value = null
  isModalOpen.value = true
}

function openEditModal(item: FittingDTO) {
  editingItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingItem.value = null
}

async function handleSubmit(formValues: FittingFormValues) {
  if (!props.orderProsthesisId) return
  
  try {
    if (editingItem.value && fitting.updateMutation) {
      const data = getUpdateDTO(formValues, editingItem.value.id, props.orderProsthesisId)
      await fitting.updateMutation.mutateAsync({ id: editingItem.value.id, data })
    } else if (fitting.createMutation) {
      const data = getCreateDTO(formValues, props.orderProsthesisId)
      await fitting.createMutation.mutateAsync(data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving fitting:', error)
  }
}

async function handleDelete(item: FittingDTO) {
  if (!confirm('Вы уверены, что хотите удалить эту примерку?')) return
  
  try {
    await fitting.deleteMutation.mutateAsync({ 
      id: item.id, 
      orderId: props.orderProsthesisId 
    })
  } catch (error) {
    console.error('Error deleting fitting:', error)
  }
}
</script>

<template>
  <div class="fitting-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-primary">Примерки</h6>
      <AButton 
        type="button" 
        color="success" 
        size="sm"
        :disabled="props.disabled"
        @click="openCreateModal"
      >
        <i class="fas fa-plus me-2"></i>
        Добавить
      </AButton>
    </div>

    <div v-if="props.items.length === 0" class="text-muted mb-3">
      Примерки отсутствуют
    </div>

    <div v-else class="fitting-items">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="card mb-2"
      >
        <div class="card-body p-3">
          <div class="row g-2">
            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Дата вызова</small>
              <span class="fw-medium">{{ formatDate(item.callDate) }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Дата явки</small>
              <span class="fw-medium">{{ formatDate(item.appearanceDate) }}</span>
            </div>

            <div v-if="item.comment" class="col-12">
              <small class="text-muted d-block">Комментарий</small>
              <span>{{ item.comment }}</span>
            </div>

            <div class="col-12">
              <div class="d-flex gap-2 mt-2">
                <AButton
                  type="button"
                  color="warning"
                  size="sm"
                  :disabled="props.disabled"
                  @click="openEditModal(item)"
                >
                  Редактировать
                </AButton>
                <AButton
                  type="button"
                  color="danger"
                  size="sm"
                  :disabled="props.disabled"
                  @click="handleDelete(item)"
                >
                  Удалить
                </AButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Create/Edit -->
    <BaseModal
      v-model="isModalOpen"
      :title="modalTitle"
      size="lg"
      :persistent="fitting.isLoading.value"
    >
      <FittingForm
        :data="editingItem"
        :disabled="fitting.isLoading.value"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.fitting-list {
  margin-bottom: 1rem;
}

.fitting-items {
  max-height: 600px;
  overflow-y: auto;
  position: relative;
}

.card {
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

