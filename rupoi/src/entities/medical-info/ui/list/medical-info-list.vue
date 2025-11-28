<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { AButton } from '@common/shared/ui'
import { BaseModal } from '@rupoi/shared/ui'
import type { MedicalInfoDTO, MedicalInfoFormValues } from '../../model/types'
import { useMedicalInfo } from '../../model/use-medical-info'
import { medicalInfoMappers, medicalInfoFormatters } from '../../lib'
import { MedicalInfoForm } from '../form'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { UUID } from '@rupoi/shared/model'

interface Props {
  items: MedicalInfoDTO[]
  personId: UUID
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// Modal state
const isModalOpen = ref(false)
const editingItem = ref<MedicalInfoDTO | null>(null)

// Medical Info composable
const medicalInfo = useMedicalInfo({ personId: () => props.personId })

// Overflow detection
const itemsContainerRef = ref<HTMLElement | null>(null)
const hasOverflow = ref(false)

function checkOverflow() {
  if (itemsContainerRef.value) {
    hasOverflow.value = itemsContainerRef.value.scrollHeight > itemsContainerRef.value.clientHeight
  }
}

watch(() => props.items.length, () => {
  nextTick(() => checkOverflow())
}, { immediate: true })

// References
const { data: refDisabilityCategories } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityCategories), ref(undefined))
const { data: refDisabilityGroups } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityGroups), ref(undefined))
const { data: refDisabilityReasons } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityReasons), ref(undefined))

const modalTitle = computed(() => editingItem.value ? 'Редактировать медицинскую информацию' : 'Добавить медицинскую информацию')

function openCreateModal() {
  editingItem.value = null
  isModalOpen.value = true
}

function openEditModal(item: MedicalInfoDTO) {
  editingItem.value = item
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingItem.value = null
}

async function handleSubmit(formValues: MedicalInfoFormValues) {
  if (!props.personId) return
  
  try {
    if (editingItem.value && medicalInfo.updateMutation) {
      const data = medicalInfoMappers.formValuesToUpdateDTO(formValues, props.personId)
      await medicalInfo.updateMutation.mutateAsync({ id: editingItem.value.id, data })
    } else if (medicalInfo.createMutation) {
      const data = medicalInfoMappers.formValuesToCreateDTO(formValues, props.personId)
      await medicalInfo.createMutation.mutateAsync(data)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving medical info:', error)
  }
}

async function handleDelete(item: MedicalInfoDTO) {
  if (!confirm('Вы уверены, что хотите удалить эту запись?')) return
  
  try {
    await medicalInfo.deleteMutation.mutateAsync({ id: item.id, personId: props.personId })
  } catch (error) {
    console.error('Error deleting medical info:', error)
  }
}

function getCategoryName(categoryId: number) {
  return medicalInfoFormatters.getDisabilityCategoryName(categoryId, refDisabilityCategories.value)
}

function getGroupName(groupId: number) {
  return medicalInfoFormatters.getDisabilityGroupName(groupId, refDisabilityGroups.value)
}

function getReasonName(reasonId: number) {
  return medicalInfoFormatters.getDisabilityReasonName(reasonId, refDisabilityReasons.value)
}
</script>

<template>
  <div class="medical-info-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0 text-primary">Медицинская информация</h6>
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
      Медицинская информация отсутствует
    </div>

    <div 
      v-else 
      ref="itemsContainerRef"
      class="medical-info-items"
      :class="{ 'has-overflow': hasOverflow }"
    >
      <div
        v-for="item in props.items"
        :key="item.id"
        class="card mb-2"
      >
        <div class="card-body p-3">
          <div class="row g-2">
            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Категория инвалидности</small>
              <span class="fw-medium">{{ getCategoryName(item.disabilityCategory) }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Группа инвалидности</small>
              <span class="fw-medium">{{ getGroupName(item.disabilityGroup) }}</span>
            </div>

            <div class="col-12 col-md-4">
              <small class="text-muted d-block">Причина инвалидности</small>
              <span class="fw-medium">{{ getReasonName(item.disabilityReason) }}</span>
            </div>

            <div v-if="item.operationLocationAndDate" class="col-12">
              <small class="text-muted d-block">Где и когда оперирован</small>
              <span>{{ item.operationLocationAndDate }}</span>
            </div>

            <div v-if="item.additionalInfo" class="col-12">
              <small class="text-muted d-block">Дополнительная информация</small>
              <span>{{ item.additionalInfo }}</span>
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
      :persistent="medicalInfo.isLoading.value"
    >
      <MedicalInfoForm
        :data="editingItem"
        :disabled="medicalInfo.isLoading.value"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<style scoped>
.medical-info-list {
  margin-bottom: 1rem;
}

.medical-info-items {
  max-height: 600px;
  overflow-y: auto;
  position: relative;
}

.medical-info-items.has-overflow::after {
  content: '';
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, rgba(84, 97, 129, 0.1), transparent);
  pointer-events: none;
  display: block;
  margin-top: -20px;
}

.card {
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

