<script setup lang="ts" generic="T extends { id: ID; files: OrderFileDTO[] | null | undefined; orderStatus: OrderStatus }">
import { BaseFileUpload } from '../base-file-upload'
import { OrderFilesList } from '../order-files-list'
import type { FileDto } from '@common/shared/api'
import type { ID, OrderFileDTO } from '@rupoi/shared/model'
import type { OrderStatus } from '@rupoi/shared/constant'

interface Props {
  order: T | null | undefined
  disabled?: boolean
  removable?: boolean
  onAddFile: (orderId: ID, fileData: FileDto) => void
  onRemoveFile: (fileId: ID, orderId: ID) => void
}

const props = withDefaults(defineProps<Props>(), {
  removable: true,
})

function handleFileUploadSuccess(fileData: FileDto) {
  if (!props.order?.id) return
  props.onAddFile(props.order.id, fileData)
}

function handleFileUploadError() {
  console.error('File upload failed')
}

function handleRemoveFile(fileId: ID, orderId: ID) {
  props.onRemoveFile(fileId, orderId)
}
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6 class="mb-0">
        <i class="fas fa-paperclip me-2"></i>
        Файлы
      </h6>
    </div>
    <div class="card-body">
      <!-- File Upload -->
      <div class="mb-4">
        <label class="form-control-label d-block mb-2">Загрузить файл</label>
        <BaseFileUpload
          :disabled="props.disabled"
          @success="handleFileUploadSuccess"
          @error="handleFileUploadError"
        />
      </div>

      <!-- Files List -->
      <OrderFilesList
        v-if="order"
        :files="order.files"
        :order-status="order.orderStatus"
        :order-id="order.id"
        :removable="props.removable"
        @remove-file="handleRemoveFile"
      />
    </div>
  </div>
</template>

