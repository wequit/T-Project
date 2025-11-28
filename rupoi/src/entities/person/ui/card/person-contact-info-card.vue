<script setup lang="ts">
import type { PersonDTO } from '@rupoi/entities/person'
import { BaseInfoField } from '@rupoi/shared/ui'

interface Props {
  data: PersonDTO
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-address-book text-primary me-2" style="font-size: 1.25rem;"></i>
        <h6 class="card-title text-primary mb-0">Контактная информация</h6>
      </div>

      <div class="row g-3">
        <div class="col-12 col-md-6">
          <BaseInfoField label="Телефон" icon="fas fa-phone">
            {{ props.data.personContact?.phoneNumber || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12 col-md-6">
          <BaseInfoField label="Дополнительный телефон" icon="fas fa-mobile-alt">
            {{ props.data.personContact?.additionalNumber || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Адрес по прописке" icon="fas fa-map-marker-alt">
            {{ props.data.personAddress?.registrationAddress || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Адрес фактического проживания" icon="fas fa-home">
            {{ props.data.personAddress?.actualAddress || '—' }}
          </BaseInfoField>
        </div>

        <div class="col-12">
          <BaseInfoField label="Место работы" icon="fas fa-briefcase">
            {{ props.data.personContact?.workPlace || '—' }}
          </BaseInfoField>
        </div>
      </div>
    </div>
  </div>
</template>

