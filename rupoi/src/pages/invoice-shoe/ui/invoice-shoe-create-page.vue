<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { InvoiceShoeSave } from '@rupoi/features/invoice-shoe-save'
import { RouteConfig } from '@rupoi/shared/constant'
import type { InvoiceShoeDTO } from '@rupoi/entities/invoice-shoe'

const router = useRouter()

function handleCancel() {
  router.push({ name: RouteConfig.Invoice.shoe.list.name })
}

function handleSuccess(invoice: InvoiceShoeDTO | null) {
  if (invoice?.id) {
    router.push({ 
      name: RouteConfig.Invoice.shoe.edit.name, 
      params: { id: invoice.id } 
    })
  }
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Создание накладной — Обувь</h5>
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
              submit-text="Создать накладную" 
              @success="handleSuccess"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

