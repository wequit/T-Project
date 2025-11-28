<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { essoApi, type FileDto } from '@common/shared/api'
import { MediaTypes } from '@common/shared/config'
import { siteNameSymbol } from '@common/shared/lib'
import { $utils } from '@common/shared/lib'

interface Props {
  disabled?: boolean
  sizeInMb?: number
  mediaTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  sizeInMb: 10,
  mediaTypes: () => [MediaTypes.pdf, MediaTypes.jpg, MediaTypes.png, MediaTypes.docx],
})

const emit = defineEmits<{
  success: [file: FileDto]
  error: []
}>()

const siteName = inject<string>(siteNameSymbol, 'rupoi')
const fileInputRef = ref<HTMLInputElement>()
const fileInputId = `file-upload-${$utils.getRandom()}`
const selectedFileName = ref<string>('')

const accept = computed(() => props.mediaTypes.join(', '))

const { mutate: uploadFile, isPending } = useMutation({
  mutationFn: (file: File) => essoApi.fileStorageService.upload(siteName, file),
  onSuccess: (data) => {
    emit('success', data)
    // Очищаем input и имя файла после успешной загрузки
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
    selectedFileName.value = ''
  },
  onError: (error) => {
    console.error('File upload failed:', error)
    emit('error')
    // Также очищаем input при ошибке
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
    selectedFileName.value = ''
  },
})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    selectedFileName.value = file.name
    uploadFile(file)
  }
}

const isDisabled = computed(() => props.disabled || isPending.value)
</script>

<template>
  <div class="base-file-upload">
    <input
      :id="fileInputId"
      ref="fileInputRef"
      type="file"
      class="file-input"
      :accept="accept"
      :disabled="isDisabled"
      @change="handleFileChange"
    />

    <label
      :for="fileInputId"
      class="file-upload-button"
      :class="{ 'disabled': isDisabled }"
    >
      <i class="fas fa-plus me-2"></i>
      <span v-if="!isPending">Добавить файл</span>
      <span v-else>
        <i class="fas fa-spinner fa-spin me-2"></i>
        Загрузка...
      </span>
    </label>

    <span v-if="selectedFileName && !isPending" class="ms-2 text-muted small">
      {{ selectedFileName }}
    </span>
  </div>
</template>

<style scoped>
.base-file-upload {
  width: 100%;
}

.file-input {
  display: none;
}

.file-upload-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  background-color: #5e72e4;
  border: 1px solid #5e72e4;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  user-select: none;
}

.file-upload-button:hover:not(.disabled) {
  background-color: #4c63d2;
  border-color: #4c63d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.file-upload-button:active:not(.disabled) {
  background-color: #4c63d2;
  border-color: #4c63d2;
  transform: translateY(0);
}

.file-upload-button.disabled {
  opacity: 0.65;
  cursor: not-allowed;
  background-color: #8898aa;
  border-color: #8898aa;
}
</style>

