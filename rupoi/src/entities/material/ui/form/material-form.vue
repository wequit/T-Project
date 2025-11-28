<script setup lang="ts">
import { ref, watch } from 'vue'
import { AInputNumber, ASelect, AButton, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { measurementUnitOptions } from '@rupoi/shared/constant'
import type { MaterialDTO, MaterialFormValues } from '../../model/types'
import { MaterialFormValidationSchema } from '../../model'
import { dtoToFormValues } from '../../lib'

interface Props {
  data?: MaterialDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: MaterialFormValues]
  cancel: []
}>()

const formRef = ref<AFormInstance<MaterialFormValues>>()

const model = ref<MaterialFormValues>(
  props.data ? dtoToFormValues(props.data) : {
    articleNumber: null,
    materialName: null,
    measurementUnit: null,
    quantity: null,
    amount: null,
    note: null,
    }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = dtoToFormValues(data)
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
    :rules="MaterialFormValidationSchema"
  >
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <AFormItem label="Артикул" :prop="keys.articleNumber">
          <input
            v-model="model.articleNumber"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите артикул"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Наименование материала" :prop="keys.materialName">
          <input
            v-model="model.materialName"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите наименование"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Ед. изм." :prop="keys.measurementUnit">
          <ASelect
            v-model="model.measurementUnit"
            :options="measurementUnitOptions"
            :disabled="props.disabled"
            placeholder="Выберите единицу"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Кол-во" :prop="keys.quantity">
          <AInputNumber
            v-model="model.quantity"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Сумма" :prop="keys.amount">
          <AInputNumber
            v-model="model.amount"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Примечание" :prop="keys.note">
          <input
            v-model="model.note"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Укажите примечание"
          />
        </AFormItem>
      </div>
    </div>

    <div class="d-flex gap-2 mt-3">
      <AButton type="button" color="success" :disabled="props.disabled" @click="handleSubmit">
        {{ props.submitText }}
      </AButton>
      <slot />
    </div>
  </AForm>
</template>
