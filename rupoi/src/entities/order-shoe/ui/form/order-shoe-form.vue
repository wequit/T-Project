<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ASelect, AInputNumber, AInputDate, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { orderTypeOptions, orderPriorityOptions, serviceFeeTypeOptions } from '@rupoi/shared/constant'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { OrderShoeDTO, OrderShoeFormValues } from '@rupoi/entities/order-shoe'
import { OrderShoeFormValidationSchema } from '../../model'
import { orderShoeMappers } from '../../lib'
import type { SelectOption } from '@rupoi/shared/model'

interface Props {
  data?: OrderShoeDTO | null
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: OrderShoeFormValues]
}>()

const formRef = ref<AFormInstance<OrderShoeFormValues>>()

const model = ref<OrderShoeFormValues>(
  props.data ? orderShoeMappers.dtoToFormValues(props.data) : {
    diagnosisId: null,
    modelId: null,
    shoeColorId: null,
    materialId: null,
    heelHeight: null,
    heelMaterialId: null,
    hospitalized: null,
    orderType: null,
    priority: null,
    serviceType: null,
    manufacturingDate: null,
    deliveryDate: null,
    notes: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = orderShoeMappers.dtoToFormValues(data)
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

const hospitalizedOptions: SelectOption[] = [
  { label: 'Да', value: true },
  { label: 'Нет', value: false },
]

const { data: diagnoses } = useReferenceQueryAll(ref(ReferenceTypes.Diagnoses), ref(undefined))
const { data: models } = useReferenceQueryAll(ref(ReferenceTypes.ShoeModels), ref(undefined))
const { data: shoeColors } = useReferenceQueryAll(ref(ReferenceTypes.ShoeColors), ref(undefined))
const { data: materials } = useReferenceQueryAll(ref(ReferenceTypes.Materials), ref(undefined))
const { data: heelMaterials } = useReferenceQueryAll(ref(ReferenceTypes.HeelMaterials), ref(undefined))

const diagnosisOptions = computed(() => mapRefToOptions(diagnoses?.value ?? []))
const modelOptions = computed(() => mapRefToOptions(models?.value ?? []))
const shoeColorOptions = computed(() => mapRefToOptions(shoeColors?.value ?? []))
const materialOptions = computed(() => mapRefToOptions(materials?.value ?? []))
const heelMaterialOptions = computed(() => mapRefToOptions(heelMaterials?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="OrderShoeFormValidationSchema"
  >
    <div class="row g-3">
      <!-- Person Select Slot (for create mode) -->
      <slot name="person-select" />

      <!-- Диагноз -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Диагноз" :prop="keys.diagnosisId">
          <ASelect
            v-model="model.diagnosisId"
            :options="diagnosisOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Модель -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Модель" :prop="keys.modelId">
          <ASelect
            v-model="model.modelId"
            :options="modelOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Цвет обуви -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Цвет обуви" :prop="keys.shoeColorId">
          <ASelect
            v-model="model.shoeColorId"
            :options="shoeColorOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Материал -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Материал" :prop="keys.materialId">
          <ASelect
            v-model="model.materialId"
            :options="materialOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Высота каблука (см) -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Высота каблука (см)" :prop="keys.heelHeight">
          <AInputNumber
            v-model="model.heelHeight"
            :min="0"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Материал каблука -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Материал каблука" :prop="keys.heelMaterialId">
          <ASelect
            v-model="model.heelMaterialId"
            :options="heelMaterialOptions"
            :disabled="props.disabled"
          />
        </AFormItem>
      </div>

      <!-- Госпитализирован -->
      <div class="col-12 col-md-6 col-lg-4">
        <AFormItem label="Госпитализирован" :prop="keys.hospitalized">
          <ASelect
            v-model="model.hospitalized"
            :options="hospitalizedOptions"
            :disabled="props.disabled"
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
    </div>

    <!-- Slots for nested components -->
    <div class="mt-3">
      <slot name="technical-operations" />
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
