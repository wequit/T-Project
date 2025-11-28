<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AInputDate, ASelect, AButton, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import ACheckbox from '@common/shared/ui/form/a-checkbox/ACheckbox.vue'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { TechnicalOperationDTO, TechnicalOperationFormValues } from '../../model/types'
import { TechnicalOperationFormValidationSchema } from '../../model'
import { dtoToFormValues } from '../../lib'

interface Props {
  data?: TechnicalOperationDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: TechnicalOperationFormValues]
  cancel: []
}>()

const formRef = ref<AFormInstance<TechnicalOperationFormValues>>()

const model = ref<TechnicalOperationFormValues>(
  props.data ? dtoToFormValues(props.data) : {
    operationId: null,
    executorName: null,
    executionDate: null,
    qualityControlMark: false,
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

const { data: operationNames } = useReferenceQueryAll(ref(ReferenceTypes.OperationNames), ref(undefined))
const operationOptions = computed(() => mapRefToOptions(operationNames?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="TechnicalOperationFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Название операции -->
      <div class="col-12 col-md-6">
        <AFormItem label="Название операции" :prop="keys.operationId">
          <ASelect
            v-model="model.operationId"
            :options="operationOptions"
            :disabled="props.disabled"
            placeholder="Выберите операцию"
          />
        </AFormItem>
      </div>

      <!-- ФИО исполнителя -->
      <div class="col-12 col-md-6">
        <AFormItem label="ФИО исполнителя" :prop="keys.executorName">
          <input
            v-model="model.executorName"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите ФИО"
          />
        </AFormItem>
      </div>

      <!-- Дата исполнения -->
      <div class="col-12 col-md-6">
        <AFormItem label="Дата исполнения" :prop="keys.executionDate">
          <AInputDate
            v-model="model.executionDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Отметка ОТК -->
      <div class="col-12 col-md-6 d-flex align-items-end">
        <AFormItem label="Отметка ОТК" :prop="keys.qualityControlMark" hide-required-asterisk>
          <ACheckbox v-model="model.qualityControlMark" :disabled="props.disabled">
            Пройдена проверка ОТК
          </ACheckbox>
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
