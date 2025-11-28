<script setup lang="ts" generic="T extends string | number">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface AutocompleteOption<T> {
  value: T
  label: string
  subLabel?: string
  data?: any
}

interface Props {
  modelValue: T | null
  options: AutocompleteOption<T>[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  noResultsText?: string
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите или найдите...',
  disabled: false,
  loading: false,
  noResultsText: 'Ничего не найдено',
  loadingText: 'Загрузка...',
})

const emit = defineEmits<{
  'update:modelValue': [value: T | null]
  'search': [query: string]
  'open': []
  'close': []
}>()

const searchQuery = ref('')
const isDropdownOpen = ref(false)
const autocompleteRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)
})

const displayValue = computed(() => {
  return selectedOption.value?.label || ''
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  emit('search', target.value)
}

function handleFocus() {
  if (!isDropdownOpen.value) {
    isDropdownOpen.value = true
    emit('open')
    // При открытии отправляем текущий query для загрузки данных
    emit('search', searchQuery.value)
  }
}

function selectOption(option: AutocompleteOption<T>) {
  emit('update:modelValue', option.value)
  searchQuery.value = option.label
  isDropdownOpen.value = false
  emit('close')
}

function clearSelection() {
  emit('update:modelValue', null)
  searchQuery.value = ''
  emit('search', '')
}

function handleClickOutside(event: MouseEvent) {
  if (autocompleteRef.value && !autocompleteRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
    emit('close')
    // Восстанавливаем label если был выбор
    if (selectedOption.value) {
      searchQuery.value = selectedOption.value.label
    } else {
      searchQuery.value = ''
    }
  }
}

// Sync searchQuery with selected value
function syncSearchQuery() {
  if (selectedOption.value) {
    searchQuery.value = selectedOption.value.label
  } else {
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  syncSearchQuery()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="autocompleteRef" class="base-autocomplete">
    <div class="autocomplete-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control autocomplete-input"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @input="handleInput"
        @focus="handleFocus"
      />
      
      <button
        v-if="props.modelValue && !props.disabled"
        type="button"
        class="autocomplete-clear"
        @click.stop="clearSelection"
      >
        <i class="fas fa-times" />
      </button>
      
      <div v-if="isDropdownOpen" class="autocomplete-indicator">
        <i class="fas fa-chevron-up" />
      </div>
      <div v-else class="autocomplete-indicator">
        <i class="fas fa-chevron-down" />
      </div>
    </div>
    
    <!-- Dropdown -->
    <div v-if="isDropdownOpen" class="autocomplete-dropdown">
      <!-- Results -->
      <div v-if="!props.loading && props.options.length > 0" class="autocomplete-options">
        <div
          v-for="option in props.options"
          :key="option.value"
          class="autocomplete-option"
          :class="{ 'selected': option.value === props.modelValue }"
          @click="selectOption(option)"
        >
          <div class="option-content">
            <div class="option-label">{{ option.label }}</div>
            <div v-if="option.subLabel" class="option-sublabel">{{ option.subLabel }}</div>
          </div>
          <i v-if="option.value === props.modelValue" class="fas fa-check option-check" />
        </div>
      </div>
      
      <!-- Loading -->
      <div v-else-if="props.loading" class="autocomplete-empty">
        <i class="fas fa-spinner fa-spin me-2" />
        <span>{{ props.loadingText }}</span>
      </div>
      
      <!-- No results -->
      <div v-else class="autocomplete-empty">
        <i class="fas fa-search me-2" />
        <span>{{ props.noResultsText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.autocomplete-input {
  padding-right: 4rem;
}

.autocomplete-clear {
  position: absolute;
  right: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  color: #8392ab;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.autocomplete-clear:hover {
  background: #f8f9fa;
  color: #344767;
}

.autocomplete-indicator {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  color: #8392ab;
  pointer-events: none;
}

.autocomplete-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 320px;
  overflow-y: auto;
  background: white;
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.autocomplete-options {
  padding: 0.25rem 0;
}

.autocomplete-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.autocomplete-option:hover {
  background-color: #f8f9fa;
}

.autocomplete-option.selected {
  background-color: rgba(203, 12, 159, 0.1);
}

.option-content {
  flex: 1;
  min-width: 0;
}

.option-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344767;
  margin-bottom: 0.125rem;
}

.option-sublabel {
  font-size: 0.75rem;
  color: #8392ab;
}

.option-check {
  color: #cb0c9f;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.autocomplete-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: #8392ab;
  font-size: 0.875rem;
}

/* Scrollbar styling */
.autocomplete-dropdown::-webkit-scrollbar {
  width: 6px;
}

.autocomplete-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #d2d6da;
  border-radius: 3px;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #8392ab;
}
</style>

