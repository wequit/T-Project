<script setup lang="ts">
import { ref, watch } from 'vue'
import { ASelect, AInputNumber, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import type { InvoiceProsthesisDTO, InvoiceProsthesisFormValues } from '@rupoi/entities/invoice-prosthesis'
import { InvoiceProsthesisFormValidationSchema } from '../../model'
import { invoiceProsthesisMappers } from '../../lib'
import type { SelectOption } from '@rupoi/shared/model'

interface Props {
  data?: InvoiceProsthesisDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: InvoiceProsthesisFormValues]
}>()

const formRef = ref<AFormInstance<InvoiceProsthesisFormValues>>()

const model = ref<InvoiceProsthesisFormValues>(
  props.data ? invoiceProsthesisMappers.dtoToFormValues(props.data) : {
    number: null,
    requiredCopy: null,
    qualityControlPassed: null,
    notes: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = invoiceProsthesisMappers.dtoToFormValues(data)
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

const booleanSelectOptions: SelectOption[] = [
  { label: 'Да', value: true },
  { label: 'Нет', value: false },
]
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="InvoiceProsthesisFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Номер накладной -->
      <div class="col-12 col-md-6">
        <AFormItem label="Номер накладной" :prop="keys.number">
          <input
            v-model="model.number"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите номер накладной"
          />
        </AFormItem>
      </div>

      <!-- Требуется копия -->
      <div class="col-12 col-md-6">
        <AFormItem label="Требуется копия" :prop="keys.requiredCopy">
          <ASelect
            v-model="model.requiredCopy"
            :options="booleanSelectOptions"
            :disabled="props.disabled"
            placeholder="Выберите"
          />
        </AFormItem>
      </div>

      <!-- Прошел контроль качества -->
      <div class="col-12 col-md-6">
        <AFormItem label="Прошел контроль качества" :prop="keys.qualityControlPassed">
          <ASelect
            v-model="model.qualityControlPassed"
            :options="booleanSelectOptions"
            :disabled="props.disabled"
            placeholder="Выберите"
          />
        </AFormItem>
      </div>

      <!-- Примечания -->
      <div class="col-12">
        <AFormItem label="Примечания" :prop="keys.notes">
          <textarea
            v-model="model.notes"
            class="form-control"
            rows="3"
            :disabled="props.disabled"
            placeholder="Введите примечания"
          />
        </AFormItem>
      </div>
    </div>

    <!-- Дополнительный слот для расширения формы -->
    <div class="mt-3">
      <slot name="additional" />
    </div>

    <!-- Кнопки -->
    <div class="d-flex gap-2 mt-3">
      <button type="button" class="btn btn-primary" :disabled="props.disabled" @click="handleSubmit">
        <i class="fas fa-save me-1"></i>
        {{ submitText }}
      </button>
      <slot />
    </div>
  </AForm>
</template>

