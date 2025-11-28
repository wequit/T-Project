<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BaseSearchBox, type SearchBoxOption } from '@rupoi/shared/ui'
import { usePersonList } from '../../model/queries'
import type { UUID } from '@rupoi/shared/model'
import type { PersonListParams } from '../../model/types'

interface Props {
  modelValue: UUID | null
  disabled?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: 'Найдите пациента по ФИО или ИИН...',
})

const emit = defineEmits<{
  'update:modelValue': [value: UUID | null]
}>()

const searchQuery = ref('')

// Query params for person list
const personListParams = ref<PersonListParams>({
  search: undefined,
  sex: null,
  pageable: {
    page: 0,
    size: 20,
  }
})

const personListQuery = usePersonList(personListParams)

// При изменении searchQuery обновляем параметры
watch(searchQuery, (newValue) => {
  personListParams.value = {
    search: newValue || undefined,
    sex: null,
    pageable: {
      page: 0,
      size: 20,
    }
  }
})

// Преобразуем данные в формат для search box
const options = computed<SearchBoxOption<UUID>[]>(() => {
  return (personListQuery.data.value?.content ?? []).map(person => ({
    value: person.id,
    label: `${person.lastName} ${person.firstName} ${person.patronymic}`,
    subLabel: `ИИН: ${person.pin} • Дело: ${person.caseNumber}`,
    data: person,
  }))
})

function handleSearch(query: string) {
  searchQuery.value = query
}

function handleOpen() {
  // При открытии подгружаем первую пачку данных
  if (!searchQuery.value) {
    personListParams.value = {
      search: undefined,
      sex: null,
      pageable: {
        page: 0,
        size: 20,
      }
    }
  }
}

function handleUpdateValue(value: UUID | null) {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseSearchBox
    :model-value="props.modelValue"
    :options="options"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :loading="personListQuery.isLoading.value"
    loading-text="Загрузка пациентов..."
    no-results-text="Пациенты не найдены"
    @update:model-value="handleUpdateValue"
    @search="handleSearch"
    @open="handleOpen"
  />
</template>
