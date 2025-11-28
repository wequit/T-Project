<script setup lang="ts">
import { toRef } from 'vue'
import { useRouter } from 'vue-router'
import type { PersonDTO, PersonFormValues } from '@rupoi/entities/person'
import { PersonForm } from '@rupoi/entities/person'
import { usePersonSave } from '../model/use-person-save'
import { RouteConfig } from '@rupoi/shared/constant'
import type { UUID } from '@rupoi/shared/model'
import { BaseLoader } from '@rupoi/shared/ui'
import MedicalInfoSection from './medical-info-section.vue'

interface Props {
  personId?: UUID | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  personId: null,
})

const emit = defineEmits<{
  submit: [value: PersonDTO | null]
  success: [value: PersonDTO | null]
}>()

const router = useRouter()

const {
  isEditMode,
  isLoading,
  submit: handleSubmit,
  person,
} = usePersonSave({
  personId: toRef(props, 'personId'),
  onSuccess: (personId) => {
    router.push({
      name: RouteConfig.Person.edit.name,
      params: { id: personId }
    })
  }
})

async function onSubmit(formValues: PersonFormValues): Promise<void> {
  const result = await handleSubmit(formValues)
  emit('submit', result)
  emit('success', result)
}
</script>

<template>
  <div class="person-save-wrapper">
    <!-- Loader overlay - при любой загрузке -->
    <BaseLoader :loading="isLoading" text="Загрузка..." />
    
    <PersonForm
      :data="person"
      :is-edit-mode="isEditMode"
      :disabled="props.disabled"
      :submit-text="props.submitText"
      @submit="onSubmit"
    >
      <template #medical-info>
        <MedicalInfoSection
          v-if="isEditMode"
          :person="person"
          :disabled="props.disabled"
        />
      </template>
    </PersonForm>
  </div>
</template>

<style scoped>
.person-save-wrapper {
  position: relative;
}
</style>
