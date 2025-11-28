<script setup lang="ts">
import { ref, watch } from 'vue'
import { AInputDate, AButton, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import type { FittingDTO, FittingFormValues } from '../../model/types'
import { FittingFormValidationSchema } from '../../model'
import { fittingMappers } from '../../lib'

interface Props {
  data?: FittingDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: FittingFormValues]
  cancel: []
}>()

const formRef = ref<AFormInstance<FittingFormValues>>()

const model = ref<FittingFormValues>(
  props.data ? fittingMappers.dtoToFormValues(props.data) : {
    callDate: null,
    appearanceDate: null,
    comment: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = fittingMappers.dtoToFormValues(data)
    }
  }
)

async function handleSubmit(): Promise<void> {
  if (!formRef.value) return
  
  const result = await formRef.value.validate()
  if (result.success) {
    emit('submit', result.data)
  }
}

const keys = $utils.keys(model.value)
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="FittingFormValidationSchema"
  >
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <AFormItem label="Дата вызова" :prop="keys.callDate">
          <AInputDate
            v-model="model.callDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Дата явки" :prop="keys.appearanceDate">
          <AInputDate
            v-model="model.appearanceDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12">
        <AFormItem label="Комментарий" :prop="keys.comment">
          <textarea
            v-model="model.comment"
            class="form-control"
            rows="3"
            :disabled="props.disabled"
            placeholder="Введите комментарий"
          />
        </AFormItem>
      </div>
    </div>

    <div class="d-flex gap-2 mt-3">
      <AButton type="button" color="success" :disabled="props.disabled" @click="handleSubmit">
        {{ submitText }}
      </AButton>
      <slot />
    </div>
  </AForm>
</template>
