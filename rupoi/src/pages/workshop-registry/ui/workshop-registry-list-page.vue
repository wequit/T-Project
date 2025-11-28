<script setup lang="ts">
import { useRouter } from 'vue-router'
import { WorkshopRegistryList } from '@rupoi/widgets/workshop-registry-list'
import { AButton } from '@common/shared/ui'

const router = useRouter()

function handleCreate() {
  router.push({
    name: 'workshop-registry-create',
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
            Добавить мастерскую
          </AButton>
        </div>

        <WorkshopRegistryList />
      </div>
    </div>
  </div>
</template>

