<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { InvoiceProsthesisSave } from '@rupoi/features/invoice-prosthesis-save'
import type { ID } from '@rupoi/shared/model'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()
const route = useRoute()

const invoiceProsthesisId = computed(() => Number(route.params.id) as ID)

function handleCancel() {
  router.push({ name: RouteConfig.Invoice.prosthesis.list.name })
}

function handleSuccess() {
  router.push({ name: RouteConfig.Invoice.prosthesis.view.name, params: { id: invoiceProsthesisId.value } })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Редактирование накладной — Протез</h5>
              <AButton
                type="button"
                color="secondary"
                size="sm"
                variant="outline"
                @click="handleCancel"
              >
                <i class="fas fa-arrow-left me-1" />
                Назад
              </AButton>
            </div>
          </div>
          <div class="card-body">
            <InvoiceProsthesisSave 
              :invoice-prosthesis-id="invoiceProsthesisId" 
              submit-text="Сохранить"
              @success="handleSuccess" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
