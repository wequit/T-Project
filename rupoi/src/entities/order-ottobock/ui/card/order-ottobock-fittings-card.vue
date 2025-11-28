<script setup lang="ts">
import type { OrderOttobockDTO } from '@rupoi/entities/order-ottobock'
import { BaseInfoField } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'

interface Props {
  data: OrderOttobockDTO
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-tools text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Примерки</h6>
      </div>

      <div v-if="!props.data.fittingOrders || props.data.fittingOrders.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        Примерки не добавлены
      </div>

      <div v-else class="fittings-list">
        <div
          v-for="(fitting, index) in props.data.fittingOrders"
          :key="fitting.id"
          class="fitting-item"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <BaseInfoField label="Дата вызова" icon="fas fa-phone">
                <span class="fw-semibold">
                  {{ formatDate(fitting.callDate) }}
                </span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Дата явки" icon="fas fa-calendar-check">
                <span class="fw-semibold">
                  {{ formatDate(fitting.appearanceDate) }}
                </span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Дата создания" icon="fas fa-calendar-plus">
                {{ formatDate(fitting.createdAt) }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Дата обновления" icon="fas fa-calendar-alt">
                {{ formatDate(fitting.updatedAt) }}
              </BaseInfoField>
            </div>

            <div v-if="fitting.comment" class="col-12">
              <BaseInfoField label="Комментарий" icon="fas fa-comment">
                {{ fitting.comment }}
              </BaseInfoField>
            </div>
          </div>

          <!-- Разделитель между примерками -->
          <hr v-if="index < props.data.fittingOrders.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fitting-item {
  padding: 1rem 0;
}

.fitting-item:first-child {
  padding-top: 0;
}

.fitting-item:last-child {
  padding-bottom: 0;
}
</style>

