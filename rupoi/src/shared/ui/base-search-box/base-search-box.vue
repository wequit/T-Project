<script setup lang="ts" generic="T extends string | number">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface SearchBoxOption<T> {
  value: T
  label: string
  subLabel?: string
  data?: any
}

interface Props {
  modelValue: T | null
  options: SearchBoxOption<T>[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  noResultsText?: string
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Поиск...',
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
const searchBoxRef = ref<HTMLDivElement | null>(null)

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
  if (!props.disabled && !isDropdownOpen.value) {
    isDropdownOpen.value = true
    emit('open')
    // При открытии отправляем текущий query для загрузки данных
    emit('search', searchQuery.value)
  }
}

function selectOption(option: SearchBoxOption<T>) {
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
  if (searchBoxRef.value && !searchBoxRef.value.contains(event.target as Node)) {
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
  <div ref="searchBoxRef" class="base-search-box">
    <div class="search-box-input-wrapper">
      <div class="search-box-icon">
        <i class="fas fa-search" />
      </div>
      
      <input
        v-model="searchQuery"
        type="text"
        class="form-control search-box-input"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @input="handleInput"
        @focus="handleFocus"
      />
      
      <button
        v-if="props.modelValue && !props.disabled"
        type="button"
        class="search-box-clear"
        @click.stop="clearSelection"
      >
        <i class="fas fa-times" />
      </button>
      
      <div v-if="!props.disabled" class="search-box-indicator">
        <i v-if="isDropdownOpen" class="fas fa-chevron-up" />
        <i v-else class="fas fa-chevron-down" />
      </div>
    </div>
    
    <!-- Dropdown -->
    <div v-if="isDropdownOpen && !props.disabled" class="search-box-dropdown">
      <!-- Results -->
      <div v-if="!props.loading && props.options.length > 0" class="search-box-options">
        <div
          v-for="option in props.options"
          :key="option.value"
          class="search-box-option"
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
      <div v-else-if="props.loading" class="search-box-empty">
        <i class="fas fa-spinner fa-spin me-2" />
        <span>{{ props.loadingText }}</span>
      </div>
      
      <!-- No results -->
      <div v-else class="search-box-empty">
        <i class="fas fa-search me-2" />
        <span>{{ props.noResultsText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-search-box {
  position: relative;
  width: 100%;
}

.search-box-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box-icon {
  position: absolute;
  left: 0.75rem;
  display: flex;
  align-items: center;
  color: #8392ab;
  pointer-events: none;
  z-index: 1;
}

.search-box-input {
  padding-left: 2.5rem;
  padding-right: 4rem;
}

.search-box-input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.search-box-clear {
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
  z-index: 1;
}

.search-box-clear:hover {
  background: #f8f9fa;
  color: #344767;
}

.search-box-indicator {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  color: #8392ab;
  pointer-events: none;
}

.search-box-dropdown {
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

.search-box-options {
  padding: 0.25rem 0;
}

.search-box-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-box-option:hover {
  background-color: #f8f9fa;
}

.search-box-option.selected {
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

.search-box-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: #8392ab;
  font-size: 0.875rem;
}

/* Scrollbar styling */
.search-box-dropdown::-webkit-scrollbar {
  width: 6px;
}

.search-box-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.search-box-dropdown::-webkit-scrollbar-thumb {
  background: #d2d6da;
  border-radius: 3px;
}

.search-box-dropdown::-webkit-scrollbar-thumb:hover {
  background: #8392ab;
}
</style>

