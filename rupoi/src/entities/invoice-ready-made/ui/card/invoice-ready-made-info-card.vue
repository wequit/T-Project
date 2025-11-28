<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceReadyMadeDTO } from '@rupoi/entities/invoice-ready-made'
import { BaseInfoField, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'
import { personFormatters } from '@rupoi/entities/person/lib/formatters'

interface Props {
  data: InvoiceReadyMadeDTO
}

const props = defineProps<Props>()

const clientName = computed(() => {
  if (!props.data.order?.person) return '—'
  return personFormatters.formatPersonFullName(props.data.order.person)
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-file-invoice text-success me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-success mb-0">Информация о накладной</h6>
      </div>

      <div class="row g-3">
        <div class="col-12 col-md-6">
          <BaseInfoField label="Номер накладной" icon="fas fa-hashtag">
            <span class="fw-semibold">{{ props.data.number }}</span>
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Дата создания" icon="fas fa-calendar">
            {{ formatDate(props.data.createdAt) }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Клиент" icon="fas fa-user">
            <span class="fw-semibold">{{ clientName }}</span>
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Изделие" icon="fas fa-box">
            {{ props.data.order?.productTypeRef?.nameRu || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Статус" icon="fas fa-flag">
            <BaseStatusTag :status="props.data.status" />
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Требуется копия" icon="fas fa-copy">
            {{ props.data.requiredCopy ? 'Да' : 'Нет' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Прошел контроль качества" icon="fas fa-check-circle">
            {{ props.data.qualityControlPassed ? 'Да' : 'Нет' }}
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

