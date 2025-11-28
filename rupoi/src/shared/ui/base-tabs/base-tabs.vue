<script setup lang="ts">
import type { BaseTabsProps } from './base-tabs.props'

withDefaults(defineProps<BaseTabsProps>(), {
  variant: 'underline',
  size: 'md',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectTab(tabKey: string, disabled?: boolean) {
  if (disabled) return
  emit('update:modelValue', tabKey)
}
</script>

<template>
  <div class="base-tabs" :class="[`base-tabs--${variant}`, `base-tabs--${size}`]">
    <!-- Навигация табов в карточке -->
    <div class="base-tabs__nav-wrapper">
      <div class="base-tabs__nav" :class="{ 'base-tabs__nav--full': fullWidth }">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="base-tabs__tab"
          :class="{
            'base-tabs__tab--active': modelValue === tab.key,
            'base-tabs__tab--disabled': tab.disabled
          }"
          :disabled="tab.disabled"
          @click="selectTab(tab.key, tab.disabled)"
        >
          <i v-if="tab.icon" :class="tab.icon" class="base-tabs__icon"></i>
          <span class="base-tabs__label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Контент табов -->
    <div class="base-tabs__content">
      <slot :active-tab="modelValue" />
    </div>
  </div>
</template>

<style scoped>
.base-tabs {
  width: 100%;
}

/* Navigation wrapper (card) */
.base-tabs__nav-wrapper {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Navigation container */
.base-tabs__nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.base-tabs__nav--full {
  display: grid;
}

.base-tabs__nav--full .base-tabs__tab {
  flex: 1;
}

/* Tab button base styles */
.base-tabs__tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #6c757d;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 0.375rem;
}

.base-tabs__tab:hover:not(.base-tabs__tab--disabled) {
  color: #495057;
  background-color: #f8f9fa;
}

.base-tabs__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-tabs__icon {
  font-size: 1em;
}

.base-tabs__label {
  font-size: 1em;
}

/* Content */
.base-tabs__content {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== VARIANT: DEFAULT ========== */
.base-tabs--default .base-tabs__nav {
  border-bottom: 2px solid #dee2e6;
  gap: 0;
}

.base-tabs--default .base-tabs__tab {
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  border-radius: 0;
}

.base-tabs--default .base-tabs__tab:hover:not(.base-tabs__tab--disabled) {
  background-color: transparent;
  border-bottom-color: #dee2e6;
}

.base-tabs--default .base-tabs__tab--active {
  color: var(--bs-primary, #0d6efd);
  border-bottom-color: var(--bs-primary, #0d6efd);
  background-color: transparent;
}

/* ========== VARIANT: UNDERLINE ========== */
.base-tabs--underline .base-tabs__nav {
  border-bottom: 2px solid #dee2e6;
}

.base-tabs--underline .base-tabs__tab {
  border-bottom: 3px solid transparent;
  padding: 0.875rem 1.5rem;
  border-radius: 0.375rem 0.375rem 0 0;
  margin-bottom: -2px;
}

.base-tabs--underline .base-tabs__tab:hover:not(.base-tabs__tab--disabled) {
  background-color: rgba(13, 110, 253, 0.08);
  color: var(--bs-primary, #0d6efd);
}

.base-tabs--underline .base-tabs__tab--active {
  color: var(--bs-primary, #0d6efd);
  border-bottom-color: var(--bs-primary, #0d6efd);
  background-color: rgba(13, 110, 253, 0.1);
  font-weight: 600;
}

/* ========== VARIANT: PILLS ========== */
.base-tabs--pills .base-tabs__nav {
  border-bottom: none;
}

.base-tabs--pills .base-tabs__tab {
  border-radius: 0.5rem;
  background-color: #e9ecef;
}

.base-tabs--pills .base-tabs__tab:hover:not(.base-tabs__tab--disabled) {
  background-color: #dee2e6;
  color: #212529;
}

.base-tabs--pills .base-tabs__tab--active {
  background-color: var(--bs-primary, #0d6efd);
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
}

.base-tabs--pills .base-tabs__tab--active:hover {
  background-color: var(--bs-primary-dark, #0b5ed7);
}

/* ========== SIZE: SM ========== */
.base-tabs--sm .base-tabs__tab {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.base-tabs--sm .base-tabs__icon {
  font-size: 0.875rem;
}

/* ========== SIZE: MD ========== */
.base-tabs--md .base-tabs__tab {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
}

/* ========== SIZE: LG ========== */
.base-tabs--lg .base-tabs__tab {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.base-tabs--lg .base-tabs__icon {
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
  .base-tabs__nav-wrapper {
    padding: 0.75rem;
  }

  .base-tabs__nav {
    gap: 0.25rem;
  }

  .base-tabs__tab {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  .base-tabs--underline .base-tabs__tab,
  .base-tabs--default .base-tabs__tab {
    flex: 1;
    min-width: auto;
  }
}
</style>

