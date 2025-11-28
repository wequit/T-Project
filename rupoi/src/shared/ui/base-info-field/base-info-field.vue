<script setup lang="ts">
import type { BaseInfoFieldProps } from './base-info-field.props'

interface Props extends BaseInfoFieldProps {}

withDefaults(defineProps<Props>(), {
  icon: undefined,
})
</script>

<template>
  <div class="base-info-field">
    <small class="text-muted d-block mb-1">
      <i v-if="icon" :class="icon" class="me-1"></i>
      {{ label }}
    </small>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<style scoped>
.base-info-field {
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.base-info-field:hover {
  background-color: #e9ecef;
}
</style>

