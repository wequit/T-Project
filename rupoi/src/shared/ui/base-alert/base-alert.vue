<script setup lang="ts">
import { ref } from 'vue'
import type { BaseAlertProps } from './base-alert.props'

const props = withDefaults(defineProps<BaseAlertProps>(), {
  type: 'info',
  dismissible: false,
})

const isVisible = ref(true)

function dismiss() {
  isVisible.value = false
}
</script>

<template>
  <div 
    v-if="isVisible"
    class="alert" 
    :class="`alert-${props.type}`" 
    role="alert"
  >
    <div class="d-flex align-items-start">
      <i v-if="props.icon" :class="`fas fa-${props.icon}`" class="me-2 mt-1"></i>
      <div class="flex-grow-1">
        <strong v-if="props.title">{{ props.title }}:</strong>
        <slot />
      </div>
      <button 
        v-if="props.dismissible" 
        type="button" 
        class="btn-close" 
        aria-label="Close"
        @click="dismiss"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.alert {
  margin-bottom: 0;
}

.btn-close {
  padding: 0.5rem;
  margin-left: 1rem;
}
</style>

