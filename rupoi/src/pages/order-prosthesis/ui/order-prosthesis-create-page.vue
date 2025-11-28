<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { OrderProsthesisSave } from '@rupoi/features/order-prosthesis-save'
import { RouteConfig } from '@rupoi/shared/constant'

const router = useRouter()

function handleCancel() {
  router.push({ name: RouteConfig.Order.prosthesis.list.name })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Создание заказа — Протез</h5>
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
            <OrderProsthesisSave submit-text="Создать" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
