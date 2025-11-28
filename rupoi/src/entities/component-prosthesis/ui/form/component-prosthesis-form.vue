<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AInputNumber, ASelect, AButton, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { ComponentProsthesisDTO, ComponentProsthesisFormValues } from '../../model/types'
import { ComponentProsthesisFormValidationSchema } from '../../model'
import { componentProsthesisMappers } from '../../lib'

interface Props {
  data?: ComponentProsthesisDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: ComponentProsthesisFormValues]
  cancel: []
}>()

const formRef = ref<AFormInstance<ComponentProsthesisFormValues>>()

const model = ref<ComponentProsthesisFormValues>(
  props.data ? componentProsthesisMappers.dtoToFormValues(props.data) : {
    semiFinishedProductId: null,
    semiFinishedProductCode: null,
    size: null,
    quantityLeft: null,
    quantityRight: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = componentProsthesisMappers.dtoToFormValues(data)
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

const { data: componentNamesAll } = useReferenceQueryAll(ref(ReferenceTypes.ComponentNames), ref(undefined))
const semiFinishedOptions = computed(() => mapRefToOptions(componentNamesAll?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="ComponentProsthesisFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Наименование п/фабрикатов -->
      <div class="col-12 col-md-6">
        <AFormItem label="Наименование п/фабрикатов" :prop="keys.semiFinishedProductId">
          <ASelect
            v-model="model.semiFinishedProductId"
            :options="semiFinishedOptions"
            :disabled="props.disabled"
            placeholder="Выберите значение"
          />
        </AFormItem>
      </div>

      <!-- Шифр полуфабрикатов -->
      <div class="col-12 col-md-6">
        <AFormItem label="Шифр полуфабрикатов" :prop="keys.semiFinishedProductCode">
          <input
            v-model="model.semiFinishedProductCode"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите шифр"
          />
        </AFormItem>
      </div>

      <!-- Размер -->
      <div class="col-12 col-md-6">
        <AFormItem label="Размер" :prop="keys.size">
          <input
            v-model="model.size"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите размер"
          />
        </AFormItem>
      </div>

      <!-- Количество левый -->
      <div class="col-12 col-md-6">
        <AFormItem label="Количество левый" :prop="keys.quantityLeft">
          <AInputNumber
            v-model="model.quantityLeft"
            :disabled="props.disabled"
            :min="0"
          />
        </AFormItem>
      </div>

      <!-- Количество правый -->
      <div class="col-12 col-md-6">
        <AFormItem label="Количество правый" :prop="keys.quantityRight">
          <AInputNumber
            v-model="model.quantityRight"
            :disabled="props.disabled"
            :min="0"
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
