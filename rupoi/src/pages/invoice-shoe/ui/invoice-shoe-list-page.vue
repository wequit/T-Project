<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InvoiceShoeList } from '@rupoi/widgets/invoice-shoe-list'
import { AButton } from '@common/shared/ui'
import { RouteConfig } from '@rupoi/shared/constant'
import type { ID } from '@rupoi/shared/model'

const route = useRoute()
const router = useRouter()

const orderId = computed(() => route.query.orderId as ID | undefined)

function handleCreate() {
  router.push({
    name: RouteConfig.Invoice.shoe.create.name,
  })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-end align-items-center mb-4">
          <AButton color="success" @click="handleCreate">
            <i class="fas fa-plus me-2"></i>
            Создать накладную
          </AButton>
        </div>
        
        <InvoiceShoeList :order-id="orderId" />
      </div>
    </div>
  </div>
</template>

