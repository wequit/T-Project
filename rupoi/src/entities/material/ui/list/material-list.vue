<script setup lang="ts">
import { ref, computed } from 'vue'
import { AButton } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import type { MaterialDTO, MaterialFormValues, MaterialCreateDTO, MaterialUpdateDTO } from '../../model/types'
import { useMaterial } from '../../model/use-material'
import { MaterialForm } from '../form'
import { MaterialKind } from '../../constant'
import type { ID } from '@rupoi/shared/model'
import type { OttobockMaterialDTO, ReadyMadeMaterialDTO, RepairMaterialDTO } from '../../model/types'

interface Props {
  items: (OttobockMaterialDTO | ReadyMadeMaterialDTO | RepairMaterialDTO)[]
  orderId: ID
  kind: MaterialKind
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// Modal state
const isModalOpen = ref(false)
const editingItem = ref<MaterialDTO | null>(null)

// Material composable
const material = useMaterial({ 
  kind: () => props.kind,
  orderId: () => props.orderId 
})

const modalTitle = computed(() => 
  editingItem.value ? 'Редактировать материал' : 'Добавить материал'
)

// Helper function to get the appropriate mapper based on kind
function getCreateDTO(formValues: MaterialFormValues, orderId: ID): MaterialCreateDTO {
  const mappers = {
    [MaterialKind.OTTOBOCK]: () => ({
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      ottobockOrderId: orderId,
    }),
    [MaterialKind.READY_MADE]: () => ({
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      readyPoiOrderId: orderId,
    }),
    [MaterialKind.REPAIR]: () => ({
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      repairOrderId: orderId,
    }),
  }
  
  return mappers[props.kind]() as MaterialCreateDTO
}

function getUpdateDTO(formValues: MaterialFormValues, id: ID, orderId: ID): MaterialUpdateDTO {
  const mappers = {
    [MaterialKind.OTTOBOCK]: () => ({
      id,
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      ottobockOrderId: orderId,
    }),
    [MaterialKind.READY_MADE]: () => ({
      id,
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      readyPoiOrderId: orderId,
    }),
    [MaterialKind.REPAIR]: () => ({
      id,
      articleNumber: formValues.articleNumber!,
      materialName: formValues.materialName!,
      measurementUnit: formValues.measurementUnit!,
      quantity: formValues.quantity!,
      amount: formValues.amount!,
      note: formValues.note ?? '',
      repairOrderId: orderId,
    }),
  }
  
  return mappers[props.kind]() as MaterialUpdateDTO
}

function openCreateModal() {
  editingItem.value = null
  isModalOpen.value = true
}

function openEditModal(item: MaterialDTO) {
  editingItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingItem.value = null
}

async function handleSubmit(formValues: MaterialFormValues) {
  if (!props.orderId) return
  
  try {
    if (editingItem.value && editingItem.value.id !== null) {
      const data = getUpdateDTO(formValues, editingItem.value.id, props.orderId)
      await material.updateMutation.mutateAsync({ id: editingItem.value.id, data })
    } else {
      const data = getCreateDTO(formValues, props.orderId)
      await material.createMutation.mutateAsync(data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving material:', error)
  }
}

async function handleDelete(item: MaterialDTO) {
  if (!confirm('Вы уверены, что хотите удалить этот материал?')) return
  if (item.id === null || !props.orderId) return
  
  try {
    await material.deleteMutation.mutateAsync({ id: item.id, orderId: props.orderId })
  } catch (error) {
    console.error('Error deleting material:', error)
  }
}
</script>

<template>
  <div class="material-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-primary">Материалы</h6>
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
      Материалы отсутствуют
    </div>

    <div v-else class="material-items">
      <div
        v-for="item in props.items"
        :key="item.id ?? `temp-${Math.random()}`"
        class="card mb-2"
      >
        <div class="card-body p-3">
          <div class="row g-2">
            <div class="col-12 col-md-6">
              <small class="text-muted d-block">Артикул</small>
              <span class="fw-medium">{{ item.articleNumber }}</span>
            </div>

            <div class="col-12 col-md-6">
              <small class="text-muted d-block">Наименование</small>
              <span class="fw-medium">{{ item.materialName }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Ед. изм.</small>
              <span>{{ item.measurementUnit }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Количество</small>
              <span>{{ item.quantity }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Сумма</small>
              <span>{{ item.amount }}</span>
            </div>

            <div v-if="item.note" class="col-12">
              <small class="text-muted d-block">Примечание</small>
              <span>{{ item.note }}</span>
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
      :persistent="material.isLoading.value"
    >
      <MaterialForm
        :data="editingItem"
        :disabled="material.isLoading.value"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.material-list {
  margin-bottom: 1rem;
}

.material-items {
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

