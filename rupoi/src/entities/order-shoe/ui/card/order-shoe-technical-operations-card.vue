<script setup lang="ts">
import type { OrderShoeDTO } from '@rupoi/entities/order-shoe'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: OrderShoeDTO
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-wrench text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Технические операции</h6>
      </div>

      <div v-if="!props.data.technicalOperations || props.data.technicalOperations.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        Технические операции не добавлены
      </div>

      <div v-else class="technical-operations-list">
        <div
          v-for="(operation, index) in props.data.technicalOperations"
          :key="operation.id"
          class="technical-operation-item"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <BaseInfoField label="ID операции" icon="fas fa-tag">
                <span class="fw-semibold">{{ operation.operationNameId ?? '—' }}</span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Исполнитель" icon="fas fa-user">
                {{ operation.executorName || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Дата выполнения" icon="fas fa-calendar-check">
                {{ operation.executionDate || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Отметка ОТК" icon="fas fa-check-circle">
                {{ operation.qualityControlMark ? 'Да' : 'Нет' }}
              </BaseInfoField>
            </div>
          </div>

          <!-- Разделитель между операциями -->
          <hr v-if="index < props.data.technicalOperations.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.technical-operation-item {
  padding: 1rem 0;
}

.technical-operation-item:first-child {
  padding-top: 0;
}

.technical-operation-item:last-child {
  padding-bottom: 0;
}
</style>

