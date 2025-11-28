<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AInputDate, AInputNumber, ASelect, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { orderTypeOptions, orderPriorityOptions, serviceFeeTypeOptions } from '@rupoi/shared/constant'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { OrderReadyMadeDTO, OrderReadyMadeFormValues } from '@rupoi/entities/order-ready-made'
import { OrderReadyMadeFormValidationSchema } from '../../model'
import { orderReadyMadeMappers } from '../../lib'

interface Props {
  data?: OrderReadyMadeDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: OrderReadyMadeFormValues]
}>()

const formRef = ref<AFormInstance<OrderReadyMadeFormValues>>()

const model = ref<OrderReadyMadeFormValues>(
  props.data ? orderReadyMadeMappers.dtoToFormValues(props.data) : {
    productTypeId: null,
    diagnosisId: null,
    orderType: null,
    orderStatus: null,
    serviceType: null,
    orderCost: null,
    manufacturingDate: null,
    deliveryDate: null,
    notes: null,
    priority: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = orderReadyMadeMappers.dtoToFormValues(data)
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

const { data: productTypes } = useReferenceQueryAll(ref(ReferenceTypes.ProductTypes), ref(undefined))
const { data: diagnoses } = useReferenceQueryAll(ref(ReferenceTypes.Diagnoses), ref(undefined))
const productTypeOptions = computed(() => mapRefToOptions(productTypes?.value ?? []))
const diagnosisOptions = computed(() => mapRefToOptions(diagnoses?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="OrderReadyMadeFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Person Select Slot (for create mode) -->
      <slot name="person-select" />

      <!-- Вид изделия -->
      <div class="col-12 col-md-6 col-lg-4">
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
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Диагноз" :prop="keys.diagnosisId">
          <ASelect
            v-model="model.diagnosisId"
            :options="diagnosisOptions"
            :disabled="props.disabled"
            placeholder="Выберите диагноз"
          />
        </AFormItem>
      </div>

      <!-- Тип заказа -->
      <div class="col-12 col-md-6 col-lg-4">
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
      <div class="col-12 col-md-6 col-lg-4">
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
      <div class="col-12 col-md-6 col-lg-4">
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
      <div class="col-12 col-md-6 col-lg-4">
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
