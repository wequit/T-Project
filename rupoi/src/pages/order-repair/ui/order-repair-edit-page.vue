<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { OrderRepairSave } from '@rupoi/features/order-repair-save'
import type { ID } from '@rupoi/shared/model'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()
const route = useRoute()

const orderRepairId = computed(() => Number(route.params.id) as ID)

function handleCancel() {
  router.push({ name: RouteConfig.Order.repair.list.name })
}

function handleSuccess() {
  router.push({ name: RouteConfig.Order.repair.view.name, params: { id: orderRepairId.value } })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Редактирование заказа — Ремонт</h5>
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
            <OrderRepairSave :order-repair-id="orderRepairId" @success="handleSuccess" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
