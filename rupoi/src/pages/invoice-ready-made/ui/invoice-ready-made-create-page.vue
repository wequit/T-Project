<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { InvoiceReadyMadeSave } from '@rupoi/features/invoice-ready-made-save'
import { RouteConfig } from '@rupoi/shared/constant'
import type { InvoiceReadyMadeDTO } from '@rupoi/entities/invoice-ready-made'

const router = useRouter()

function handleCancel() {
  router.push({ name: RouteConfig.Invoice.readyMade.list.name })
}

function handleSuccess(invoice: InvoiceReadyMadeDTO | null) {
  if (invoice?.id) {
    router.push({ 
      name: RouteConfig.Invoice.readyMade.edit.name, 
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
              <h5 class="mb-0">Создание накладной — Готовые ПОИ</h5>
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
            <InvoiceReadyMadeSave 
              submit-text="Создать накладную" 
              @success="handleSuccess"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
