<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { essoApi } from '@common/shared/api'
import { AButton, FaIcon } from '@common/shared/ui'
import type { OrderFileDTO, ID } from '@rupoi/shared/model'
import { OrderStatus } from '@rupoi/shared/constant'

type Props = {
  orderFile: OrderFileDTO
  orderStatus: OrderStatus
  removable?: boolean
  onRemove?: (fileId: ID) => void
}

const props = withDefaults(defineProps<Props>(), {
  removable: false,
  onRemove: undefined,
})

const emit = defineEmits<{
  remove: [fileId: ID]
}>()

// Fetch file details from file storage
const { data: fileData, isLoading } = useQuery({
  queryKey: ['file-storage', props.orderFile.fileId],
  queryFn: () => essoApi.fileStorageService.getOne(props.orderFile.fileId),
  enabled: computed(() => !!props.orderFile.fileId),
})

const canDelete = computed(() => props.removable && props.orderStatus === OrderStatus.NEW)

function bytesToMb(n: number) {
  return (n / 1_000_000).toFixed(2)
}

function handleDownload() {
  if (fileData.value?.id) {
    essoApi.fileStorageService.download(fileData.value.id, fileData.value.originalName)
  }
}

function handleRemove() {
  emit('remove', props.orderFile.id)
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div v-if="isLoading" class="text-center py-3">
        <i class="fas fa-spinner fa-spin text-primary"></i>
      </div>
      <div v-else-if="fileData">
        <div class="d-flex align-items-start justify-content-between mb-2">
          <h6 class="mb-0">
            <i class="fas fa-file me-2 text-primary"></i>
            {{ fileData.originalName }}
          </h6>
        </div>

        <div class="text-sm text-muted mb-3">
          <p class="mb-1">
            <strong>Размер:</strong> {{ bytesToMb(fileData.sizeBytes) }} МБ
          </p>
          <p class="mb-1">
            <strong>Тип:</strong> {{ fileData.contentType }}
          </p>
        </div>

        <div class="d-flex gap-2">
          <AButton
            color="primary"
            size="sm"
            variant="outline"
            @click="handleDownload"
          >
            <FaIcon icon="download" class="me-1" />
            Скачать
          </AButton>

          <AButton
            v-if="canDelete"
            color="danger"
            size="sm"
            variant="outline"
            @click="handleRemove"
          >
            <FaIcon icon="trash" class="me-1" />
            Удалить
          </AButton>
        </div>
      </div>
      <div v-else class="text-center text-muted py-3">
        <i class="fas fa-exclamation-circle me-2"></i>
        Файл не найден
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-sm {
  font-size: 0.875rem;
}
</style>

