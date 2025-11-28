<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { AInputDate, AInputNumber, ASelect, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { prosthesisSideOptions, orderTypeOptions, orderPriorityOptions, serviceFeeTypeOptions } from '@rupoi/shared/constant'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { OrderOttobockDTO, OrderOttobockFormValues } from '@rupoi/entities/order-ottobock'
import { OrderOttobockFormValidationSchema } from '../../model'
import { orderOttobockMappers } from '../../lib'
import type { SelectOption } from '@rupoi/shared/model'

interface Props {
  data?: OrderOttobockDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: OrderOttobockFormValues]
}>()

const formRef = ref<AFormInstance<OrderOttobockFormValues>>()

const model = ref<OrderOttobockFormValues>(
  props.data ? orderOttobockMappers.dtoToFormValues(props.data) : {
    productTypeId: null,
    diagnosisId: null,
    prosthesisSide: null,
    hospitalized: null,
    orderType: null,
    priority: null,
    serviceType: null,
    orderCost: null,
    manufacturingDate: null,
    deliveryDate: null,
    notes: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = orderOttobockMappers.dtoToFormValues(data)
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

const yesNoOptions: SelectOption[] = [
  { label: 'Да', value: true },
  { label: 'Нет', value: false },
]

const { data: productTypes } = useReferenceQueryAll(ref(ReferenceTypes.ProductTypes), ref(undefined))
const { data: diagnoses } = useReferenceQueryAll(ref(ReferenceTypes.Diagnoses), ref(undefined))
const productTypeOptions = computed(() => mapRefToOptions(productTypes?.value ?? []))
const diagnosisOptions = computed(() => mapRefToOptions(diagnoses?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="OrderOttobockFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Person Select Slot (for create mode) -->
      <slot name="person-select" />

      <!-- Вид изделия -->
      <div class="col-12 col-md-6">
        <AFormItem label="Вид изделия" :prop="keys.productTypeId">
          <ASelect
            v-model="model.productTypeId"
            :options="productTypeOptions"
            :disabled="props.disabled"
            placeholder="Выберите вид изделия"
          />
        </AFormItem>
      </div>

      <!-- Диагноз -->
      <div class="col-12 col-md-6">
        <AFormItem label="Диагноз" :prop="keys.diagnosisId">
          <ASelect
            v-model="model.diagnosisId"
            :options="diagnosisOptions"
            :disabled="props.disabled"
            placeholder="Выберите диагноз"
          />
        </AFormItem>
      </div>

      <!-- Сторона протеза -->
      <div class="col-12 col-md-6">
        <AFormItem label="Сторона протеза" :prop="keys.prosthesisSide">
          <ASelect
            v-model="model.prosthesisSide"
            :options="prosthesisSideOptions"
            :disabled="props.disabled"
            placeholder="Выберите сторону"
          />
        </AFormItem>
      </div>

      <!-- Госпитализирован -->
      <div class="col-12 col-md-6">
        <AFormItem label="Госпитализирован" :prop="keys.hospitalized">
          <ASelect
            v-model="model.hospitalized"
            :options="yesNoOptions"
            :disabled="props.disabled"
            placeholder="Выберите значение"
          />
        </AFormItem>
      </div>

      <!-- Тип заказа -->
      <div class="col-12 col-md-6">
        <AFormItem label="Тип заказа" :prop="keys.orderType">
          <ASelect
            v-model="model.orderType"
            :options="orderTypeOptions"
            :disabled="props.disabled"
            placeholder="Выберите тип"
          />
        </AFormItem>
      </div>

      <!-- Статус заказа (приоритет) -->
      <div class="col-12 col-md-6">
        <AFormItem label="Статус заказа" :prop="keys.priority">
          <ASelect
            v-model="model.priority"
            :options="orderPriorityOptions"
            :disabled="props.disabled"
            placeholder="Выберите статус"
          />
        </AFormItem>
      </div>

      <!-- Услуга -->
      <div class="col-12 col-md-6">
        <AFormItem label="Услуга" :prop="keys.serviceType">
          <ASelect
            v-model="model.serviceType"
            :options="serviceFeeTypeOptions"
            :disabled="props.disabled"
            placeholder="Выберите тип услуги"
          />
        </AFormItem>
      </div>

      <!-- Стоимость заказа -->
      <div class="col-12 col-md-6">
        <AFormItem label="Стоимость заказа" :prop="keys.orderCost">
          <AInputNumber
            v-model="model.orderCost"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Вставные блоки -->
      <div class="col-12">
        <slot name="materials" />
      </div>
      <div class="col-12">
        <slot name="fittings" />
      </div>
      <div class="col-12">
        <slot name="files" />
      </div>

      <!-- Дата изготовления -->
      <div class="col-12 col-md-6">
        <AFormItem label="Дата изготовления" :prop="keys.manufacturingDate">
          <AInputDate
            v-model="model.manufacturingDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Дата выдачи -->
      <div class="col-12 col-md-6">
        <AFormItem label="Дата выдачи" :prop="keys.deliveryDate">
          <AInputDate
            v-model="model.deliveryDate"
            :disabled="props.disabled"
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
            placeholder="Введите примечание"
          />
        </AFormItem>
      </div>

      <div class="col-12 d-flex gap-2 mt-2">
        <button type="button" class="btn btn-primary" :disabled="props.disabled" @click="handleSubmit">
          {{ props.submitText }}
        </button>
        <slot />
      </div>
    </div>
  </AForm>
</template>
