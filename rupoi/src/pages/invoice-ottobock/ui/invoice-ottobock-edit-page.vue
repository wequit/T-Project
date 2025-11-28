<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { InvoiceOttobockSave } from '@rupoi/features/invoice-ottobock-save'
import type { ID } from '@rupoi/shared/model'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()
const route = useRoute()

const invoiceOttobockId = computed(() => Number(route.params.id) as ID)

function handleCancel() {
  router.push({ name: RouteConfig.Invoice.ottobock.list.name })
}

function handleSuccess() {
  router.push({ name: RouteConfig.Invoice.ottobock.view.name, params: { id: invoiceOttobockId.value } })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Редактирование накладной — Оттобок</h5>
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
            <InvoiceOttobockSave 
              :invoice-ottobock-id="invoiceOttobockId" 
              submit-text="Сохранить"
              @success="handleSuccess" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
