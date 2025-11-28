<script setup lang="ts">
import { ref } from 'vue'
import { AForm, AFormItem, AButton, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import type { WorkshopRegistryFormValues } from '@rupoi/entities/workshop-registry/model/types'
import { WorkshopRegistryFormValidationSchema } from '../../model/schemas'

interface Props {
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
})

const emit = defineEmits<{
  submit: [value: WorkshopRegistryFormValues]
}>()

const formRef = ref<AFormInstance<WorkshopRegistryFormValues>>()

const model = defineModel<WorkshopRegistryFormValues>({ required: true })

const keys = $utils.keys(model.value)

async function handleSubmit(): Promise<void> {
  if (!formRef.value) return

  const result = await formRef.value.validate()
  if (result.success) {
    emit('submit', result.data)
  }
}
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="WorkshopRegistryFormValidationSchema"
  >
    <div class="row">
      <div class="col-md-6 mb-3">
        <AFormItem label="Название (RU)" :prop="keys.nameRu">
          <input
            v-model="model.nameRu"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите название на русском"
          />
        </AFormItem>
      </div>
      <div class="col-md-6 mb-3">
        <AFormItem label="Название (KG)" :prop="keys.nameKg">
          <input
            v-model="model.nameKg"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите название на кыргызском"
          />
        </AFormItem>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <AFormItem label="Представитель" :prop="keys.representative">
          <input
            v-model="model.representative"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите имя представителя"
          />
        </AFormItem>
      </div>
      <div class="col-md-6 mb-3">
        <AFormItem label="Адрес" :prop="keys.address">
          <input
            v-model="model.address"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите адрес"
          />
        </AFormItem>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-3">
        <AFormItem label="Дополнительная информация" :prop="keys.otherInfo">
          <textarea
            v-model="model.otherInfo"
            class="form-control"
            rows="4"
            :disabled="props.disabled"
            placeholder="Введите дополнительную информацию"
          />
        </AFormItem>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <AButton
        type="button"
        color="primary"
        :disabled="props.disabled"
        @click="handleSubmit"
      >
        <i class="fas fa-save me-2" />
        {{ props.submitText }}
      </AButton>
    </div>
  </AForm>
</template>

