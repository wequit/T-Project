<script setup lang="ts">
import { computed } from 'vue'
import type { PersonDTO } from '@rupoi/entities/person'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: PersonDTO
}

const props = defineProps<Props>()

const sexLabel = computed(() => {
  if (props.data.sex === 1) return 'Мужской'
  if (props.data.sex === 2) return 'Женский'
  return '—'
})

const fullName = computed(() => {
  const parts = [
    props.data.lastName,
    props.data.firstName,
    props.data.patronymic,``
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : '—'
})

const docTypeLabel = computed(() => {
  const docType = props.data.personDocument?.docType
  if (!docType) return '—'

  // Можно расширить в зависимости от типов документов
  if (docType === 'PASSPORT') return 'Паспорт'
  if (docType === 'BIRTH_CERTIFICATE') return 'Свидетельство о рождении'
  return docType
})

const documentInfo = computed(() => {
  const doc = props.data.personDocument
  if (!doc) return '—'

  const parts: string[] = []
  if (doc.series) parts.push(`Серия: ${doc.series}`)
  if (doc.documentNumber) parts.push(`№ ${doc.documentNumber}`)

  return parts.length > 0 ? parts.join(', ') : '—'
})

const issuedInfo = computed(() => {
  const doc = props.data.personDocument
  if (!doc) return null

  const parts: string[] = []
  if (doc.issuedOrgan) parts.push(doc.issuedOrgan)
  if (doc.issuedDate) parts.push(doc.issuedDate)

  return parts.length > 0 ? parts.join(', ') : null
})

const pensionInfo = computed(() => {
  const doc = props.data.personDocument
  if (!doc || !doc.pensionCertificateNumber) return null

  const parts: string[] = []
  parts.push(`№ ${doc.pensionCertificateNumber}`)
  if (doc.pensionCertificateIssueDate) {
    parts.push(`от ${doc.pensionCertificateIssueDate}`)
  }

  return parts.join(' ')
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-user-circle text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Основная информация</h6>
      </div>

      <div class="row g-3">
        <div class="col-12">
          <BaseInfoField label="ФИО">
            <span class="fw-semibold">{{ fullName }}</span>
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="ПИН">
            {{ props.data.pin || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Год рождения">
            {{ props.data.birthday || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Пол">
            {{ sexLabel }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Тип документа">
            {{ docTypeLabel }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Серия и номер паспорта">
            {{ documentInfo }}
          </BaseInfoField>
        </div>

        <div v-if="issuedInfo" class="col-12">
          <BaseInfoField label="Кем и когда выдан">
            {{ issuedInfo }}
          </BaseInfoField>
        </div>

        <div v-if="pensionInfo" class="col-12 col-md-6">
          <BaseInfoField label="Пенсионное удостоверение">
            {{ pensionInfo }}
          </BaseInfoField>
        </div>

        <div v-if="props.data.personDocument?.pensionCertificateIssuingAuthority" class="col-12 col-md-6">
          <BaseInfoField label="Орган выдачи пенсионного удостоверения">
            {{ props.data.personDocument.pensionCertificateIssuingAuthority }}
          </BaseInfoField>
        </div>
      </div>
    </div>
  </div>
</template>

