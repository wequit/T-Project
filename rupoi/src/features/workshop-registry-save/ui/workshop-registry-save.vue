<script setup lang="ts">
import { toRef, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { WorkshopRegistryDTO, WorkshopRegistryFormValues } from '@rupoi/entities/workshop-registry'
import { WorkshopRegistryForm } from '@rupoi/entities/workshop-registry'
import { useWorkshopRegistrySave } from '../model/use-workshop-registry-save'
import type { ID } from '@rupoi/shared/model'
import { BaseLoader } from '@rupoi/shared/ui'

interface Props {
  workshopRegistryId?: ID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  workshopRegistryId: null,
})

const emit = defineEmits<{
  submit: [value: WorkshopRegistryDTO | null]
  success: [value: WorkshopRegistryDTO | null]
}>()

const router = useRouter()

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  workshopRegistry,
} = useWorkshopRegistrySave({
  workshopRegistryId: toRef(props, 'workshopRegistryId'),
  onSuccess: () => {
    router.push({
      name: 'workshop-registry-list'
    })
  }
})

// Form values
const formValues = ref<WorkshopRegistryFormValues>({
  nameKg: null,
  nameRu: null,
  representative: null,
  address: null,
  otherInfo: null,
})

// Watch for workshop registry data to populate form in edit mode
watch(
  () => workshopRegistry.value,
  (newWorkshop) => {
    if (newWorkshop && isEditMode.value) {
      formValues.value = {
        nameKg: newWorkshop.nameKg,
        nameRu: newWorkshop.nameRu,
        representative: newWorkshop.representative,
        address: newWorkshop.address,
        otherInfo: newWorkshop.otherInfo,
      }
    }
  },
  { immediate: true }
)

async function onSubmit(data: WorkshopRegistryFormValues): Promise<void> {
  const result = await handleSubmit(data)
  emit('submit', result)
  emit('success', result)
}
</script>

<template>
  <div class="workshop-registry-save-wrapper">
    <!-- Loader overlay -->
    <BaseLoader :loading="isLoading" text="Загрузка..." />

    <!-- Form -->
    <div v-if="!isLoading">
      <WorkshopRegistryForm
        v-model="formValues"
        :submit-text="submitText"
        :disabled="disabled || isLoading"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.workshop-registry-save-wrapper {
  position: relative;
}
</style>

