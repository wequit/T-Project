<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OrderShoeList } from '@rupoi/widgets/order-shoe-list'
import { AButton } from '@common/shared/ui'
import { RouteConfig } from '@rupoi/shared/constant'
import type { UUID } from '@rupoi/shared/model'

const route = useRoute()
const router = useRouter()

const personId = computed(() => route.query.personId as UUID | undefined)

function handleCreate() {
  router.push({
    name: RouteConfig.Order.shoe.create.name,
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
            Создать заказ
          </AButton>
        </div>
        
        <OrderShoeList :person-id="personId" />
      </div>
    </div>
  </div>
</template>

