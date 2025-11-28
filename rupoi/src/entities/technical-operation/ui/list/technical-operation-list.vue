<script setup lang="ts">
import { ref, computed } from 'vue'
import { AButton } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import type { TechnicalOperationDTO, TechnicalOperationFormValues } from '../../model/types'
import { useTechnicalOperation } from '../../model/use-technical-operation'
import { technicalOperationMappers } from '../../lib/mappers'
import { TechnicalOperationForm } from '../form'
import type { ID } from '@rupoi/shared/model'

interface Props {
  items: TechnicalOperationDTO[]
  orderShoeId: ID
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// Modal state
const isModalOpen = ref(false)
const editingItem = ref<TechnicalOperationDTO | null>(null)

// Technical Operation composable
const technicalOperation = useTechnicalOperation({ orderShoeId: () => props.orderShoeId })

const modalTitle = computed(() => 
  editingItem.value ? 'Редактировать техническую операцию' : 'Добавить техническую операцию'
)

function openCreateModal() {
  editingItem.value = null
  isModalOpen.value = true
}

function openEditModal(item: TechnicalOperationDTO) {
  editingItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingItem.value = null
}

async function handleSubmit(formValues: TechnicalOperationFormValues) {
  if (!props.orderShoeId) return
  
  try {
    if (editingItem.value && technicalOperation.updateMutation) {
      const data = technicalOperationMappers.formValuesToUpdateDTO(formValues, editingItem.value.id, props.orderShoeId as number)
      await technicalOperation.updateMutation.mutateAsync({ id: editingItem.value.id, data })
    } else if (technicalOperation.createMutation) {
      const data = technicalOperationMappers.formValuesToCreateDTO(formValues, props.orderShoeId as number)
      await technicalOperation.createMutation.mutateAsync(data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving technical operation:', error)
  }
}

async function handleDelete(item: TechnicalOperationDTO) {
  if (!confirm('Вы уверены, что хотите удалить эту техническую операцию?')) return
  
  try {
    await technicalOperation.deleteMutation.mutateAsync({ 
      id: item.id, 
      orderShoeId: props.orderShoeId 
    })
  } catch (error) {
    console.error('Error deleting technical operation:', error)
  }
}
</script>

<template>
  <div class="technical-operation-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-primary">Технические операции</h6>
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
      Технические операции отсутствуют
    </div>

    <div v-else class="technical-operation-items">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="card mb-2"
      >
        <div class="card-body p-3">
          <div class="row g-2">
            <div class="col-12 col-md-3">
              <small class="text-muted d-block">ID операции</small>
              <span class="fw-medium">{{ item.operationNameId || '—' }}</span>
            </div>

            <div class="col-12 col-md-3">
              <small class="text-muted d-block">Исполнитель</small>
              <span class="fw-medium">{{ item.executorName || '—' }}</span>
            </div>

            <div class="col-12 col-md-3">
              <small class="text-muted d-block">Дата выполнения</small>
              <span class="fw-medium">{{ item.executionDate || '—' }}</span>
            </div>

            <div class="col-12 col-md-3">
              <small class="text-muted d-block">Отметка ОТК</small>
              <span class="fw-medium">{{ item.qualityControlMark ? 'Да' : 'Нет' }}</span>
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
      :persistent="technicalOperation.isLoading.value"
    >
      <TechnicalOperationForm
        :data="editingItem"
        :disabled="technicalOperation.isLoading.value"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.technical-operation-list {
  margin-bottom: 1rem;
}

.technical-operation-items {
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

