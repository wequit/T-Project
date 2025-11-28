<script setup lang="ts">
import { computed } from 'vue'

export interface BaseSectionTitleProps {
  title: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<BaseSectionTitleProps>(), {
  icon: 'fas fa-info-circle',
  variant: 'primary',
})

// Цвета для разных вариантов
const variantStyles = computed(() => {
  const styles = {
    primary: {
      gradient: 'linear-gradient(90deg, #e3f2fd 0%, #f5f9fc 100%)',
      borderColor: '#2196f3',
      iconColor: 'text-primary',
      titleColor: '#1565c0',
    },
    secondary: {
      gradient: 'linear-gradient(90deg, #f5f5f5 0%, #fafafa 100%)',
      borderColor: '#9e9e9e',
      iconColor: 'text-secondary',
      titleColor: '#616161',
    },
    success: {
      gradient: 'linear-gradient(90deg, #e8f5e9 0%, #f5f9f5 100%)',
      borderColor: '#4caf50',
      iconColor: 'text-success',
      titleColor: '#2e7d32',
    },
    info: {
      gradient: 'linear-gradient(90deg, #e0f7fa 0%, #f1f8f9 100%)',
      borderColor: '#00bcd4',
      iconColor: 'text-info',
      titleColor: '#00838f',
    },
    warning: {
      gradient: 'linear-gradient(90deg, #fff3e0 0%, #fef9f3 100%)',
      borderColor: '#ff9800',
      iconColor: 'text-warning',
      titleColor: '#e65100',
    },
    danger: {
      gradient: 'linear-gradient(90deg, #ffebee 0%, #fef5f5 100%)',
      borderColor: '#f44336',
      iconColor: 'text-danger',
      titleColor: '#c62828',
    },
  }
  
  return styles[props.variant]
})
</script>

<template>
  <div class="base-section-title" :style="{ background: variantStyles.gradient, borderLeftColor: variantStyles.borderColor }">
    <i v-if="icon" :class="[icon, variantStyles.iconColor, 'me-2']"></i>
    <h5 class="mb-0" :style="{ color: variantStyles.titleColor }">
      {{ title }}
    </h5>
  </div>
</template>

<style scoped>
.base-section-title {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-left: 4px solid;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.base-section-title h5 {
  font-weight: 600;
  font-size: 1rem;
}

.base-section-title i {
  font-size: 1.25rem;
}
</style>

