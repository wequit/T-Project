<script setup lang="ts">
import { computed } from 'vue'
import type { OrderFileDTO, ID } from '@rupoi/shared/model'
import type { OrderStatus } from '@rupoi/shared/constant'
import { OrderFileCard } from '../order-file-card'

type Props = {
  files: OrderFileDTO[] | null | undefined
  orderStatus: OrderStatus
  orderId: ID
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  removable: false,
})

const emit = defineEmits<{
  removeFile: [fileId: ID, orderId: ID]
}>()

const filesList = computed(() => props.files ?? [])

function handleRemoveFile(fileId: ID) {
  emit('removeFile', fileId, props.orderId)
}
</script>

<template>
  <div>
    <h5 class="mb-3">
      <i class="fas fa-paperclip me-2"></i>
      Прикрепленные файлы
    </h5>

    <div v-if="filesList.length === 0" class="card">
      <div class="card-body text-center text-muted py-4">
        <i class="fas fa-inbox fa-2x mb-2"></i>
        <p class="mb-0">Нет прикрепленных файлов</p>
      </div>
    </div>

    <div v-else class="row g-3">
      <div
        v-for="file in filesList"
        :key="file.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <OrderFileCard
          :order-file="file"
          :order-status="orderStatus"
          :removable="props.removable"
          @remove="handleRemoveFile"
        />
      </div>
    </div>
  </div>
</template>

