<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ASelect, AButton, AForm, AFormItem, type AFormInstance } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { useReferenceQueryAll } from '@rupoi/shared/lib/reference/use-reference-query'
import { mapRefToOptions } from '@rupoi/shared/lib/reference/mappers'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { MedicalInfoDTO, MedicalInfoFormValues } from '../../model/types'
import { MedicalInfoFormValidationSchema } from '../../model/schemas'
import { medicalInfoMappers } from '../../lib'

interface Props {
  data?: MedicalInfoDTO | null
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: MedicalInfoFormValues]
  cancel: []
}>()

const formRef = ref<AFormInstance<MedicalInfoFormValues>>()

const model = ref<MedicalInfoFormValues>(
  props.data ? medicalInfoMappers.dtoToFormValues(props.data) : {
    disabilityCategory: null,
    disabilityGroup: null,
    disabilityReason: null,
    operationLocationAndDate: null,
    additionalInfo: null,
  }
)

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = medicalInfoMappers.dtoToFormValues(data)
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

const { data: refDisabilityCategories } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityCategories), ref(undefined))
const { data: refDisabilityGroups } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityGroups), ref(undefined))
const { data: refDisabilityReasons } = useReferenceQueryAll(ref(ReferenceTypes.DisabilityReasons), ref(undefined))

const disabilityCategoryOptions = computed(() => mapRefToOptions(refDisabilityCategories?.value ?? []))
const disabilityGroupOptions = computed(() => mapRefToOptions(refDisabilityGroups?.value ?? []))
const disabilityReasonOptions = computed(() => mapRefToOptions(refDisabilityReasons?.value ?? []))
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="MedicalInfoFormValidationSchema"
  >
    <div class="row g-3">
      <div class="col-12 col-md-4">
        <AFormItem label="Категория инвалидности" :prop="keys.disabilityCategory" required>
          <ASelect
            v-model="model.disabilityCategory"
            :options="disabilityCategoryOptions"
            :disabled="props.disabled"
            placeholder="Выберите категорию"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-4">
        <AFormItem label="Группа инвалидности" :prop="keys.disabilityGroup" required>
          <ASelect
            v-model="model.disabilityGroup"
            :options="disabilityGroupOptions"
            :disabled="props.disabled"
            placeholder="Выберите группу"
          />
        </AFormItem>
      </div>

      <div class="col-12 col-md-4">
        <AFormItem label="Причина инвалидности" :prop="keys.disabilityReason" required>
          <ASelect
            v-model="model.disabilityReason"
            :options="disabilityReasonOptions"
            :disabled="props.disabled"
            placeholder="Выберите причину"
          />
        </AFormItem>
      </div>

      <div class="col-12">
        <AFormItem label="Где и когда оперирован" :prop="keys.operationLocationAndDate" required>
          <textarea
            v-model="model.operationLocationAndDate"
            class="form-control"
            rows="3"
            :disabled="props.disabled"
            placeholder="Введите информацию об операции"
          />
        </AFormItem>
      </div>

      <div class="col-12">
        <AFormItem label="Дополнения" :prop="keys.additionalInfo">
          <textarea
            v-model="model.additionalInfo"
            class="form-control"
            rows="3"
            :disabled="props.disabled"
            placeholder="Введите дополнительную информацию"
          />
        </AFormItem>
      </div>
    </div>

  </AForm>

  <div class="d-flex gap-2 mt-3">
    <AButton type="button" color="success" :disabled="props.disabled" @click="handleSubmit">
      {{ props.data ? 'Сохранить' : 'Добавить' }}
    </AButton>
    <AButton type="button" color="secondary" @click="emit('cancel')">
      Отмена
    </AButton>
  </div>
</template>

