<script setup lang="ts">
import { ref } from 'vue'
import type { PersonDTO } from '@rupoi/entities/person'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { ReferenceTypes } from '@rupoi/shared/constant'
import { medicalInfoFormatters } from '@rupoi/entities/medical-info/lib'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: PersonDTO
}

const props = defineProps<Props>()

// References
const { data: refDisabilityCategories } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityCategories), ref(undefined))
const { data: refDisabilityGroups } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityGroups), ref(undefined))
const { data: refDisabilityReasons } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityReasons), ref(undefined))

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
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-heartbeat text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Медицинская информация</h6>
      </div>

      <div v-if="!props.data.medicalInfoList || props.data.medicalInfoList.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        Медицинская информация отсутствует
      </div>

      <div v-else class="medical-info-items">
        <div
          v-for="(item, index) in props.data.medicalInfoList"
          :key="item.id"
          class="medical-info-item"
        >
          <div class="row g-3">
            <div class="col-12 col-md-4">
              <BaseInfoField label="Категория инвалидности" icon="fas fa-certificate">
                <span class="fw-semibold">{{ getCategoryName(item.disabilityCategory) }}</span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-4">
              <BaseInfoField label="Группа инвалидности" icon="fas fa-layer-group">
                <span class="fw-semibold">{{ getGroupName(item.disabilityGroup) }}</span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-4">
              <BaseInfoField label="Причина инвалидности" icon="fas fa-notes-medical">
                <span class="fw-semibold">{{ getReasonName(item.disabilityReason) }}</span>
              </BaseInfoField>
            </div>

            <div v-if="item.operationLocationAndDate" class="col-12">
              <BaseInfoField label="Где и когда оперирован" icon="fas fa-procedures">
                {{ item.operationLocationAndDate }}
              </BaseInfoField>
            </div>

            <div v-if="item.additionalInfo" class="col-12">
              <BaseInfoField label="Дополнительная информация" icon="fas fa-comment-medical">
                {{ item.additionalInfo }}
              </BaseInfoField>
            </div>
          </div>

          <!-- Разделитель между записями -->
          <hr v-if="index < props.data.medicalInfoList.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.medical-info-item {
  padding: 1rem 0;
}

.medical-info-item:first-child {
  padding-top: 0;
}

.medical-info-item:last-child {
  padding-bottom: 0;
}
</style>

