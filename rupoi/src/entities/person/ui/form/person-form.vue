<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { AInputDate, ASelect, AButton, AForm, AFormItem, type AFormInstance, useAToast } from '@common/shared/ui'
import { $utils } from '@common/shared/lib'
import { documentTypeOptions as docTypeOptions, documentSeriesOptions as docSeriesOptions, sexOptions} from '@rupoi/shared/constant'
import {
  type PersonDTO,
  type PersonFormValues,
} from "@rupoi/entities/person"
import { PersonFormValidationCreateSchema, PersonFormValidationUpdateSchema } from '../../model/schemas'
import { personMappers } from '../../lib/mappers'
import { pinService } from '@rupoi/shared/api'

interface Props {
  data?: PersonDTO | null
  isEditMode?: boolean
  submitText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Сохранить',
  disabled: false,
  isEditMode: false,
  data: null,
})

const emit = defineEmits<{
  submit: [value: PersonFormValues]
}>()

const formRef = ref<AFormInstance<PersonFormValues>>()

const model = ref<PersonFormValues>(
  props.data ? personMappers.dtoToFormValues(props.data) : {
    pin: null,
    lastName: null,
    firstName: null,
    patronymic: null,
    sex: null,
    birthday: null,
    docType: null,
    series: null,
    documentNumber: null,
    issuedOrgan: null,
    issuedDate: null,
    pensionCertificateNumber: null,
    pensionCertificateIssueDate: null,
    pensionCertificateIssuingAuthority: null,
    registrationAddress: null,
    actualAddress: null,
    phoneNumber: null,
    additionalNumber: null,
    workPlace: null,
  }
)

const isSameAddress = ref(false)
const isLoadingPinData = ref(false)
const toast = useAToast()

watch(
  () => props.data,
  (data) => {
    if (data) {
      model.value = personMappers.dtoToFormValues(data)
    }
  }
)

// Watch for isSameAddress checkbox
watch(
  () => [model.value.registrationAddress, isSameAddress.value] as const,
  ([regAddress, same]) => {
    if (same && regAddress !== null) {
      model.value.actualAddress = regAddress
    }
  }
)

const isDisabled = computed(() => props.disabled)

async function handleSubmit(): Promise<void> {
  if (!formRef.value) return

  const result = await formRef.value.validate()
  if (result.success) {
    const data = {
      ...result.data,
      actualAddress: isSameAddress.value ? (result.data.registrationAddress ?? null) : result.data.actualAddress,
    }
    emit('submit', data)
  }
}

const keys = $utils.keys(model.value)
const documentTypeOptions = computed(() => [...docTypeOptions])
const documentSeriesOptions = computed(() => [...docSeriesOptions])

// Проверка валидности PIN (14 цифр)
const isPinValid = computed(() => {
  const pin = model.value.pin
  return pin !== null && pin !== '' && /^\d{14}$/.test(pin)
})

// Маппер для пола: "М" -> 1, "Ж" -> 2
function mapGenderToSex(gender: string | null): number | null {
  if (!gender) return null
  const normalized = gender.trim().toUpperCase()
  if (normalized === 'М' || normalized === 'M' || normalized === 'MALE' || normalized === 'МУЖСКОЙ') return 1
  if (normalized === 'Ж' || normalized === 'F' || normalized === 'FEMALE' || normalized === 'ЖЕНСКИЙ') return 2
  return null
}

// Функция заполнения данных по ПИН
async function fillDataByPin(): Promise<void> {
  if (!isPinValid.value || !model.value.pin) return

  isLoadingPinData.value = true
  try {
    const data = await pinService.getDataByPin({ pin: model.value.pin })

    // Проверка на ошибки от API
    if (data.faultcode || data.faultstring) {
      toast.add({
        title: 'Ошибка получения данных',
        message: data.faultstring || 'Не удалось получить данные по указанному ПИН',
        type: 'danger',
      })
      return
    }

    // Заполняем только непустые поля
    if (data.surname) model.value.lastName = data.surname
    if (data.name) model.value.firstName = data.name
    if (data.patronymic) model.value.patronymic = data.patronymic
    if (data.gender) {
      const sex = mapGenderToSex(data.gender)
      if (sex !== null) model.value.sex = sex
    }
    if (data.dateOfBirth) model.value.birthday = data.dateOfBirth

    toast.add({
      title: 'Успешно',
      message: 'Данные по ПИН успешно заполнены. Проверьте корректность и при необходимости отредактируйте поля',
      type: 'primary',
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Не удалось получить данные по ПИН'
    toast.add({
      title: 'Ошибка',
      message: errorMessage,
      type: 'danger',
    })
  } finally {
    isLoadingPinData.value = false
  }
}
</script>

<template>
  <AForm
    ref="formRef"
    :model="model"
    :rules="isEditMode ? PersonFormValidationUpdateSchema : PersonFormValidationCreateSchema"
  >
    <!-- Личные данные -->
    <div class="mb-3">
      <h6 class="mb-2 text-primary">Личные данные</h6>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <AFormItem label="ПИН" :prop="keys.pin">
            <input
              v-model="model.pin"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите ПИН"
            />
          </AFormItem>
          <AButton
            type="button"
            color="primary"
            size="sm"
            class="mt-2"
            :disabled="!isPinValid || isDisabled || isLoadingPinData"
            :loading="isLoadingPinData"
            @click="fillDataByPin"
          >
            Заполнить по ПИН
          </AButton>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Фамилия" :prop="keys.lastName">
            <input
              v-model="model.lastName"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите фамилию"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Имя" :prop="keys.firstName">
            <input
              v-model="model.firstName"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите имя"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Отчество" :prop="keys.patronymic">
            <input
              v-model="model.patronymic"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите отчество"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Пол" :prop="keys.sex">
            <ASelect
              v-model="model.sex"
              :options="sexOptions"
              placeholder="Выберите пол"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Год рождения" :prop="keys.birthday">
            <AInputDate
              v-model="model.birthday"
              :disabled="isDisabled"
              placeholder="Выберите дату рождения"
            />
          </AFormItem>
        </div>
      </div>
    </div>

    <!-- Документы -->
    <div v-if="props.isEditMode" class="mb-3">
      <h6 class="mb-2 text-primary">Документы</h6>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <AFormItem label="Документ" :prop="keys.docType">
            <ASelect
              v-model="model.docType"
              :options="documentTypeOptions"
              placeholder="Выберите тип документа"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Серия" :prop="keys.series">
            <ASelect
              v-model="model.series"
              :options="documentSeriesOptions"
              placeholder="Выберите серию"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="№ Документа" :prop="keys.documentNumber">
            <input
              v-model="model.documentNumber"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите номер документа"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-6">
          <AFormItem label="Орган выдачи" :prop="keys.issuedOrgan">
            <input
              v-model="model.issuedOrgan"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите орган выдачи"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-6">
          <AFormItem label="Дата выдачи" :prop="keys.issuedDate">
            <AInputDate
              v-model="model.issuedDate"
              :disabled="isDisabled"
              placeholder="Выберите дату выдачи"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="№ Пенсионного удостоверения" :prop="keys.pensionCertificateNumber">
            <input
              v-model="model.pensionCertificateNumber"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите номер пенсионного"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Дата выдачи пенсионного" :prop="keys.pensionCertificateIssueDate">
            <AInputDate
              v-model="model.pensionCertificateIssueDate"
              :disabled="isDisabled"
              placeholder="Выберите дату выдачи"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Орган выдачи пенсионного" :prop="keys.pensionCertificateIssuingAuthority">
            <input
              v-model="model.pensionCertificateIssuingAuthority"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите орган выдачи"
            />
          </AFormItem>
        </div>
      </div>
    </div>

    <!-- Адреса -->
    <div v-if="props.isEditMode" class="mb-3">
      <h6 class="mb-2 text-primary">Адреса</h6>
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <AFormItem label="Адрес (по прописке)" :prop="keys.registrationAddress">
            <textarea
              v-model="model.registrationAddress"
              class="form-control"
              rows="3"
              :disabled="isDisabled"
              placeholder="Введите адрес по прописке"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-6">
          <AFormItem label="Адрес (фактический)" :prop="keys.actualAddress">
            <textarea
              v-model="model.actualAddress"
              class="form-control"
              rows="3"
              :disabled="isDisabled || isSameAddress"
              placeholder="Введите фактический адрес"
            />
          </AFormItem>
          <div class="form-check mt-2">
            <input
              id="same-reg"
              v-model="isSameAddress"
              class="form-check-input"
              type="checkbox"
              :disabled="isDisabled"
            />
            <label class="form-check-label" for="same-reg">Совпадает с пропиской</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Контакты -->
    <div v-if="props.isEditMode" class="mb-3">
      <h6 class="mb-2 text-primary">Контакты</h6>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <AFormItem label="Номер телефона" :prop="keys.phoneNumber">
            <input
              v-model="model.phoneNumber"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите номер телефона"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Дополнительный номер" :prop="keys.additionalNumber">
            <input
              v-model="model.additionalNumber"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите дополнительный номер"
            />
          </AFormItem>
        </div>

        <div class="col-12 col-md-4">
          <AFormItem label="Место работы" :prop="keys.workPlace">
            <input
              v-model="model.workPlace"
              class="form-control"
              type="text"
              :disabled="isDisabled"
              placeholder="Введите место работы"
            />
          </AFormItem>
        </div>
      </div>
    </div>

    <!-- Медицинская информация -->
    <slot name="medical-info" />

    <div class="d-flex tw-justify-end gap-2 mt-3">
      <AButton type="button" color="success" :disabled="isDisabled" @click="handleSubmit">
        {{ props.submitText }}
      </AButton>
      <slot />
    </div>
  </AForm>
</template>
