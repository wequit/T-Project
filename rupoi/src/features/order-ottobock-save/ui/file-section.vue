<script setup lang="ts">
import { OrderFileSection } from '@rupoi/shared/ui'
import { useOrderOttobock, type OrderOttobockDTO } from '@rupoi/entities/order-ottobock'
import type { FileDto } from '@common/shared/api'
import type { ID } from '@rupoi/shared/model'

interface Props {
  orderOttobock: OrderOttobockDTO | null | undefined
  disabled?: boolean
}

const props = defineProps<Props>()

const { addFileMutation, removeFileMutation } = useOrderOttobock({
  id: () => props.orderOttobock?.id ?? null
})

function handleAddFile(orderId: ID, fileData: FileDto) {
  addFileMutation.mutate({
    orderId,
    data: {
      fileId: fileData.id,
      filePath: fileData.objectKey,
      fileSize: fileData.sizeBytes,
      fileName: fileData.originalName,
    }
  })
}

function handleRemoveFile(fileId: ID, orderId: ID) {
  removeFileMutation.mutate({ fileId, orderId })
}
</script>

<template>
  <OrderFileSection
    :order="orderOttobock"
    :disabled="disabled"
    :on-add-file="handleAddFile"
    :on-remove-file="handleRemoveFile"
  />
</template>

