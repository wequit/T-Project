<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { InvoiceShoeSave } from '@rupoi/features/invoice-shoe-save'
import type { ID } from '@rupoi/shared/model'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()
const route = useRoute()

const invoiceShoeId = computed(() => Number(route.params.id) as ID)

function handleCancel() {
  router.push({ name: RouteConfig.Invoice.shoe.list.name })
}

function handleSuccess() {
  router.push({ name: RouteConfig.Invoice.shoe.view.name, params: { id: invoiceShoeId.value } })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Редактирование накладной — Обувь</h5>
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
            <InvoiceShoeSave 
              :invoice-shoe-id="invoiceShoeId" 
              submit-text="Сохранить"
              @success="handleSuccess" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

