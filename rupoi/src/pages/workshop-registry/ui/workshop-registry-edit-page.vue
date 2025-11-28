<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { WorkshopRegistrySave } from '@rupoi/features/workshop-registry-save'
import type { ID } from '@rupoi/shared/model'

const route = useRoute()
const router = useRouter()

const workshopRegistryId = computed<ID>(() => {
  const id = route.params.id
  if (Array.isArray(id)) {
    const firstId = id[0]
    if (firstId) {
      const numId = parseInt(firstId, 10)
      return isNaN(numId) ? firstId : numId
    }
    return 0
  }
  if (typeof id === 'string') {
    const numId = parseInt(id, 10)
    return isNaN(numId) ? id : numId
  }
  return 0
})

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
              <h5 class="mb-0">Редактирование мастерской</h5>
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
            <WorkshopRegistrySave 
              :workshop-registry-id="workshopRegistryId"
              submit-text="Сохранить" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

