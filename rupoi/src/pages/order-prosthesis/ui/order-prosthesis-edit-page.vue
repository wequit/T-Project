<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { OrderProsthesisSave } from '@rupoi/features/order-prosthesis-save'
import type { ID } from '@rupoi/shared/model'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()
const route = useRoute()

const orderProsthesisId = computed(() => Number(route.params.id) as ID)

function handleCancel() {
  router.push({ name: RouteConfig.Order.prosthesis.list.name })
}

function handleSuccess() {
  router.push({ name: RouteConfig.Order.prosthesis.view.name, params: { id: orderProsthesisId.value } })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Редактирование заказа — Протез</h5>
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
            <OrderProsthesisSave :order-prosthesis-id="orderProsthesisId" @success="handleSuccess" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
