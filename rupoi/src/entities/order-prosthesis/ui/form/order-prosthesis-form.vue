<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ASelect, AInputNumber, AInputDate, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { prosthesisSideOptions, orderTypeOptions, orderPriorityOptions, serviceFeeTypeOptions, activityTypeOptions } from '@rupoi/shared/constant'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { OrderProsthesisDTO, OrderProsthesisFormValues } from '@rupoi/entities/order-prosthesis'
import { OrderProsthesisFormValidationSchema } from '../../model'
import { orderProsthesisMappers } from '../../lib'
import type { SelectOption } from '@rupoi/shared/model'

interface Props {
  data?: OrderProsthesisDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: OrderProsthesisFormValues]
}>()

const formRef = ref<AFormInstance<OrderProsthesisFormValues>>()

const model = ref<OrderProsthesisFormValues>(
  props.data ? orderProsthesisMappers.dtoToFormValues(props.data) : {
    productTypeId: null,
    diagnosisId: null,
    prosthesisSide: null,
    hospitalized: null,
    orderType: null,
    priority: null,
    serviceType: null,
    weightKg: null,
    height: null,
    activityLevel: null,
    manufacturingDate: null,
    deliveryDate: null,
    notes: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = orderProsthesisMappers.dtoToFormValues(data)
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

const hospitalizedSelectOptions: SelectOption[] = [
  { label: 'Да', value: true },
  { label: 'Нет', value: false },
]

const { data: productTypes } = useReferenceQueryAll(ref(ReferenceTypes.ProductTypes), ref(undefined))
const { data: diagnoses } = useReferenceQueryAll(ref(ReferenceTypes.Diagnoses), ref(undefined))
const productTypeSelectOptions = computed(() => mapRefToOptions(productTypes?.value ?? []))
const diagnosisSelectOptions = computed(() => mapRefToOptions(diagnoses?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="OrderProsthesisFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Top block -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Вид изделия" :prop="keys.productTypeId">
          <ASelect
            v-model="model.productTypeId"
            :options="productTypeSelectOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Диагноз" :prop="keys.diagnosisId">
          <ASelect
            v-model="model.diagnosisId"
            :options="diagnosisSelectOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Сторона протеза" :prop="keys.prosthesisSide">
          <ASelect
            v-model="model.prosthesisSide"
            :options="prosthesisSideOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Госпитализирован" :prop="keys.hospitalized">
          <ASelect
            v-model="model.hospitalized"
            :options="hospitalizedSelectOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Тип заказа" :prop="keys.orderType">
          <ASelect
            v-model="model.orderType"
            :options="orderTypeOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Статус заказа" :prop="keys.priority">
          <ASelect
            v-model="model.priority"
            :options="orderPriorityOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Услуга" :prop="keys.serviceType">
          <ASelect
            v-model="model.serviceType"
            :options="serviceFeeTypeOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Вес (кг)" :prop="keys.weightKg">
          <AInputNumber
            v-model="model.weightKg"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Рост (см)" :prop="keys.height">
          <AInputNumber
            v-model="model.height"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Степень активности" :prop="keys.activityLevel">
          <ASelect
            v-model="model.activityLevel"
            :options="activityTypeOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>
    </div>

    <!-- Slots for nested components/forms -->
    <div class="mt-3">
      <slot name="components" />
    </div>
    <div class="mt-3">
      <slot name="fittings" />
    </div>
    <div class="mt-3">
      <slot name="files" />
    </div>

    <!-- Bottom block with dates and notes -->
    <div class="row g-3 mt-1">
      <div class="col-12 col-md-6">
        <AFormItem label="Дата изготовления" :prop="keys.manufacturingDate">
          <AInputDate
            v-model="model.manufacturingDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-6">
        <AFormItem label="Дата выдачи" :prop="keys.deliveryDate">
          <AInputDate
            v-model="model.deliveryDate"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <div class="col-12">
        <AFormItem label="Примечания" :prop="keys.notes">
          <textarea
            v-model="model.notes"
            class="form-control"
            rows="3"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>
    </div>

    <div class="d-flex gap-2 mt-3">
      <button type="button" class="btn btn-primary" :disabled="props.disabled" @click="handleSubmit">
        {{ submitText }}
      </button>
      <slot />
    </div>
  </AForm>
</template>
