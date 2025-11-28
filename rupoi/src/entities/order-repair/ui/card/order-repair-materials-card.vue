<script setup lang="ts">
import type { OrderRepairDTO } from '@rupoi/entities/order-repair'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: OrderRepairDTO
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-cubes text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Материалы</h6>
      </div>

      <div v-if="!props.data.materials || props.data.materials.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        Материалы не добавлены
      </div>

      <div v-else class="materials-list">
        <div
          v-for="(material, index) in props.data.materials"
          :key="index"
          class="material-item"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <BaseInfoField label="Артикул" icon="fas fa-barcode">
                <span class="fw-semibold">{{ material.articleNumber || '—' }}</span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Название материала" icon="fas fa-tag">
                {{ material.materialName || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Единица измерения" icon="fas fa-ruler">
                {{ material.measurementUnit || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Количество" icon="fas fa-sort-numeric-up">
                {{ material.quantity }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Стоимость" icon="fas fa-dollar-sign">
                {{ material.amount || '—' }}
              </BaseInfoField>
            </div>

            <div v-if="material.note" class="col-12">
              <BaseInfoField label="Примечание" icon="fas fa-comment">
                {{ material.note }}
              </BaseInfoField>
            </div>
          </div>

          <!-- Разделитель между материалами -->
          <hr v-if="index < props.data.materials.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-item {
  padding: 1rem 0;
}

.material-item:first-child {
  padding-top: 0;
}

.material-item:last-child {
  padding-bottom: 0;
}
</style>

