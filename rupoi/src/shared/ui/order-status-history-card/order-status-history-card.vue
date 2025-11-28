<script setup lang="ts">
import { computed } from 'vue'
import type { OrderStatusHistoryItem } from '@rupoi/shared/model'
import { BaseInfoField, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDateTime } from '@rupoi/shared/lib'

interface Props {
  data: OrderStatusHistoryItem[]
}

const props = defineProps<Props>()

const sortedHistory = computed(() => {
  return [...props.data].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-history text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">История изменения статусов</h6>
      </div>

      <div v-if="sortedHistory.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        История изменений отсутствует
      </div>

      <div v-else class="history-list position-relative">
        <div
          v-for="(item, index) in sortedHistory"
          :key="item.id"
          class="history-item position-relative"
        >
          <!-- Timeline marker -->
          <div class="timeline-marker position-absolute">
            <div
              class="marker-dot rounded-circle d-flex align-items-center justify-content-center bg-primary"
              :class="{
                'bg-success': index === 0
              }"
            >
              <i
                class="fas text-white"
                :class="{
                  'fa-arrow-up': index === 0,
                  'fa-circle': index !== 0
                }"
                style="font-size: 0.6rem;"
              ></i>
            </div>
            <!-- Timeline line -->
            <div
              v-if="index < sortedHistory.length - 1"
              class="timeline-line position-absolute bg-primary"
              style="opacity: 0.3;"
            ></div>
          </div>

          <!-- Content -->
          <div class="history-content ms-5">
            <!-- Badge только для последнего изменения -->
            <div v-if="index === 0" class="mb-2">
              <span class="badge bg-success-subtle text-success border border-success">
                <i class="fas fa-arrow-up me-1"></i>
                Последнее изменение
              </span>
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <BaseInfoField label="Статус" icon="fas fa-info-circle">
                  <BaseStatusTag :status="item.status" size="sm" />
                </BaseInfoField>
              </div>

              <div class="col-12 col-md-6">
                <BaseInfoField label="Дата изменения" icon="fas fa-clock">
                  <span class="fw-semibold">
                    {{ formatDateTime(item.createdAt) }}
                  </span>
                </BaseInfoField>
              </div>

              <div v-if="item.comment" class="col-12">
                <BaseInfoField label="Комментарий" icon="fas fa-comment">
                  {{ item.comment }}
                </BaseInfoField>
              </div>
            </div>
          </div>

          <!-- Разделитель между записями -->
          <hr v-if="index < sortedHistory.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-item {
  padding: 1rem 0;
}

.history-item:first-child {
  padding-top: 0;
}

.history-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  left: 0;
  top: 1rem;
}

.marker-dot {
  width: 32px;
  height: 32px;
  z-index: 2;
}

.timeline-line {
  left: 15px;
  top: 32px;
  width: 2px;
  height: calc(100% + 2rem);
  z-index: 1;
}
</style>

