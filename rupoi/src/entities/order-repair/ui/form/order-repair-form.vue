<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ASelect, AInputNumber, AInputDate, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { orderPriorityOptions, serviceFeeTypeOptions } from '@rupoi/shared/constant'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { OrderRepairDTO, OrderRepairFormValues } from '@rupoi/entities/order-repair'
import { OrderRepairFormValidationSchema } from '../../model'
import { orderRepairMappers } from '../../lib'

interface Props {
  data?: OrderRepairDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: OrderRepairFormValues]
}>()

const formRef = ref<AFormInstance<OrderRepairFormValues>>()

const model = ref<OrderRepairFormValues>(
  props.data ? orderRepairMappers.dtoToFormValues(props.data) : {
    productTypeId: null,
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
      model.value = orderRepairMappers.dtoToFormValues(data)
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
const productTypeOptions = computed(() => mapRefToOptions(productTypes?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="OrderRepairFormValidationSchema"
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
          />
        </AFormItem>
      </div>

      <!-- Статус наряда (приоритет) -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Статус наряда" :prop="keys.priority">
          <ASelect
            v-model="model.priority"
            :options="orderPriorityOptions"
            :disabled="props.disabled"
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
    </div>

    <!-- Slots for nested components/forms -->
    <div class="mt-3">
      <slot name="materials" />
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
