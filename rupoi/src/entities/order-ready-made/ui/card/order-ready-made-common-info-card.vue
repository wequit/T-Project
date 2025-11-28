<script setup lang="ts">
import { computed } from 'vue'
import type { OrderReadyMadeDTO } from '@rupoi/entities/order-ready-made'
import { BaseInfoField, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'

interface Props {
  data: OrderReadyMadeDTO
}

const props = defineProps<Props>()

const patientFullName = computed(() => {
  if (!props.data.person) return '—'
  const parts = [
    props.data.person.lastName,
    props.data.person.firstName,
    props.data.person.patronymic,
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : '—'
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-file-medical text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Основная информация</h6>
      </div>

      <div class="row g-3">
        <div class="col-12 col-md-6">
          <BaseInfoField label="Номер заказа" icon="fas fa-hashtag">
            <span class="fw-semibold">{{ props.data.orderNumber || '—' }}</span>
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Дата создания" icon="fas fa-calendar">
            {{ formatDate(props.data.createdAt) }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Пациент" icon="fas fa-user">
            <span class="fw-semibold">{{ patientFullName }}</span>
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Статус заказа" icon="fas fa-info-circle">
            <BaseStatusTag :status="props.data.orderStatus" />
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Приоритет" icon="fas fa-flag">
            <BaseStatusTag :status="props.data.priority" />
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Тип заказа" icon="fas fa-clipboard-list">
            <BaseStatusTag :status="props.data.orderType" />
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Тип услуги" icon="fas fa-concierge-bell">
            <BaseStatusTag :status="props.data.serviceType" />
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Вид изделия" icon="fas fa-box">
            {{ props.data.productTypeRef?.nameRu || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Диагноз" icon="fas fa-stethoscope">
            {{ props.data.diagnosisRef?.nameRu || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Стоимость заказа" icon="fas fa-dollar-sign">
            {{ props.data.orderCost || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Дата изготовления" icon="fas fa-calendar-check">
            {{ formatDate(props.data.manufacturingDate) }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Дата выдачи" icon="fas fa-calendar-day">
            {{ formatDate(props.data.deliveryDate) }}
          </BaseInfoField>
        </div>

        <div v-if="props.data.workshop" class="col-12 col-md-6">
          <BaseInfoField label="Мастерская" icon="fas fa-industry">
            <span class="fw-semibold">{{ props.data.workshop.nameRu || props.data.workshop.nameKg || '—' }}</span>
          </BaseInfoField>
        </div>

        <div v-if="props.data.deadline" class="col-12 col-md-6">
          <BaseInfoField label="Срок выполнения" icon="fas fa-clock">
            <span class="text-warning fw-semibold">{{ formatDate(props.data.deadline) }}</span>
          </BaseInfoField>
        </div>

        <div v-if="props.data.notes" class="col-12">
          <BaseInfoField label="Примечания" icon="fas fa-comment">
            {{ props.data.notes }}
          </BaseInfoField>
        </div>
      </div>
    </div>
  </div>
</template>

