<script setup lang="ts">
import { ref, computed } from 'vue'
import { AButton } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import type { ComponentProsthesisDTO, ComponentProsthesisFormValues } from '../../model/types'
import { useComponentProsthesis } from '../../model/use-component-prosthesis'
import { componentProsthesisMappers } from '../../lib/mappers'
import { ComponentProsthesisForm } from '../form'
import type { ID } from '@rupoi/shared/model'

interface Props {
  items: ComponentProsthesisDTO[]
  orderProsthesisId: ID
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// Modal state
const isModalOpen = ref(false)
const editingItem = ref<ComponentProsthesisDTO | null>(null)

// Component Prosthesis composable
const componentProsthesis = useComponentProsthesis({ orderProsthesisId: () => props.orderProsthesisId })

const modalTitle = computed(() => 
  editingItem.value ? 'Редактировать компонент протеза' : 'Добавить компонент протеза'
)

function openCreateModal() {
  editingItem.value = null
  isModalOpen.value = true
}

function openEditModal(item: ComponentProsthesisDTO) {
  editingItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingItem.value = null
}

async function handleSubmit(formValues: ComponentProsthesisFormValues) {
  if (!props.orderProsthesisId) return
  
  try {
    if (editingItem.value && componentProsthesis.updateMutation) {
      const data = componentProsthesisMappers.formValuesToUpdateDTO(formValues, props.orderProsthesisId as number)
      await componentProsthesis.updateMutation.mutateAsync({ id: editingItem.value.id, data })
    } else if (componentProsthesis.createMutation) {
      const data = componentProsthesisMappers.formValuesToCreateDTO(formValues, props.orderProsthesisId as number)
      await componentProsthesis.createMutation.mutateAsync(data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving component prosthesis:', error)
  }
}

async function handleDelete(item: ComponentProsthesisDTO) {
  if (!confirm('Вы уверены, что хотите удалить этот компонент?')) return
  
  try {
    await componentProsthesis.deleteMutation.mutateAsync({ 
      id: item.id, 
      orderProsthesisId: props.orderProsthesisId 
    })
  } catch (error) {
    console.error('Error deleting component prosthesis:', error)
  }
}
</script>

<template>
  <div class="component-prosthesis-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-primary">Компоненты протеза</h6>
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
      Компоненты протеза отсутствуют
    </div>

    <div v-else class="component-prosthesis-items">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="card mb-2"
      >
        <div class="card-body p-3">
          <div class="row g-2">
            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Код компонента</small>
              <span class="fw-medium">{{ item.componentCode }}</span>
            </div>

            <div class="col-12 col-md-2">
              <small class="text-muted d-block">Размер</small>
              <span class="fw-medium">{{ item.size }}</span>
            </div>

            <div class="col-12 col-md-3">
              <small class="text-muted d-block">Количество (левое)</small>
              <span class="fw-medium">{{ item.leftQuantity }}</span>
            </div>

            <div class="col-12 col-md-3">
              <small class="text-muted d-block">Количество (правое)</small>
              <span class="fw-medium">{{ item.rightQuantity }}</span>
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
      :persistent="componentProsthesis.isLoading.value"
    >
      <ComponentProsthesisForm
        :data="editingItem"
        :disabled="componentProsthesis.isLoading.value"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.component-prosthesis-list {
  margin-bottom: 1rem;
}

.component-prosthesis-items {
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

