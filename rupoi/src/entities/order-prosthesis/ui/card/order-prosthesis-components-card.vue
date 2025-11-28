<script setup lang="ts">
import type { OrderProsthesisDTO } from '@rupoi/entities/order-prosthesis'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: OrderProsthesisDTO
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-cogs text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Компоненты протеза</h6>
      </div>

      <div v-if="!props.data.components || props.data.components.length === 0" class="text-muted text-center py-3">
        <i class="fas fa-info-circle me-2"></i>
        Компоненты не добавлены
      </div>

      <div v-else class="components-list">
        <div
          v-for="(component, index) in props.data.components"
          :key="component.id"
          class="component-item"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <BaseInfoField label="ID компонента" icon="fas fa-tag">
                <span class="fw-semibold">{{ component.componentNameId }}</span>
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Код компонента" icon="fas fa-barcode">
                {{ component.componentCode || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Размер" icon="fas fa-ruler">
                {{ component.size || '—' }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Количество (левый)" icon="fas fa-sort-numeric-up">
                {{ component.leftQuantity }}
              </BaseInfoField>
            </div>

            <div class="col-12 col-md-6">
              <BaseInfoField label="Количество (правый)" icon="fas fa-sort-numeric-up">
                {{ component.rightQuantity }}
              </BaseInfoField>
            </div>
          </div>

          <!-- Разделитель между компонентами -->
          <hr v-if="index < props.data.components.length - 1" class="my-4 border-primary" style="opacity: 0.2;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-item {
  padding: 1rem 0;
}

.component-item:first-child {
  padding-top: 0;
}

.component-item:last-child {
  padding-bottom: 0;
}
</style>

