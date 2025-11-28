<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { WorkshopRegistrySave } from '@rupoi/features/workshop-registry-save'

const router = useRouter()

function handleCancel() {
  router.push({ name: 'workshop-registry-list' })
}
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Создание мастерской</h5>
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
            <WorkshopRegistrySave submit-text="Создать" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

