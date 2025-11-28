<script setup lang="ts">
import { ref, watch } from 'vue'
import { ASelect } from '@common/shared/ui'
import type { PersonFilterFormValues } from "@rupoi/entities/person"
import { AButton } from "@common/shared/ui"
import { sexOptions } from '@rupoi/shared/constant'

interface Props {
  data?: PersonFilterFormValues
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  data: undefined,
})

const emit = defineEmits<{
  search: [value: PersonFilterFormValues]
  reset: [value: PersonFilterFormValues]
}>()

// Локальное состояние формы
const formData = ref<PersonFilterFormValues>({
  search: props.data?.search ?? null,
  pin: props.data?.pin ?? null,
  caseNumber: props.data?.caseNumber ?? null,
  sex: props.data?.sex ?? null,
})

// Синхронизация с props.data при изменении
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      formData.value = {
        search: newData.search ?? null,
        pin: newData.pin ?? null,
        caseNumber: newData.caseNumber ?? null,
        sex: newData.sex ?? null,
      }
    }
  },
  { deep: true }
)

function handleSearch(): void {
  emit('search', formData.value)
}

function handleReset(): void {
  formData.value = {
    search: null,
    pin: null,
    caseNumber: null,
    sex: null,
  }
  emit('reset', formData.value)
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-3">
        <!-- Поиск -->
        <div class="col-12 col-md-6 col-lg-3">
          <label class="form-label">Поиск</label>
          <input
            v-model="formData.search"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="ФИО, ПИН..."
          />
        </div>

        <!-- ПИН -->
        <div class="col-12 col-md-6 col-lg-3">
          <label class="form-label">ПИН</label>
          <input
            v-model="formData.pin"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите ПИН"
          />
        </div>

        <!-- Номер дела -->
        <div class="col-12 col-md-6 col-lg-3">
          <label class="form-label">Номер дела</label>
          <input
            v-model="formData.caseNumber"
            class="form-control"
            type="text"
            :disabled="props.disabled"
            placeholder="Введите номер дела"
          />
        </div>

        <!-- Пол -->
        <div class="col-12 col-md-6 col-lg-3">
          <label class="form-label">Пол</label>
          <ASelect
            v-model="formData.sex"
            :options="sexOptions"
            :disabled="props.disabled"
            placeholder="Выберите пол"
            clearable
          />
        </div>

        <!-- Кнопки -->
        <div class="col-12">
          <div class="d-flex gap-2">
            <AButton
              type="button"
              color="success"
              :disabled="props.disabled"
              @click="handleSearch"
            >
              <i class="fas fa-search me-1"></i>
              Поиск
            </AButton>
            <AButton
              type="button"
              color="secondary"
              :disabled="props.disabled"
              @click="handleReset"
            >
              <i class="fas fa-redo me-1"></i>
              Сбросить
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
