<script setup lang="ts">
interface Props {
  loading?: boolean
  text?: string
  overlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  text: 'Загрузка...',
  overlay: true,
})
</script>

<template>
  <div v-if="props.loading" class="base-loader" :class="{ 'overlay': props.overlay }">
    <div class="loader-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-if="props.text" class="loader-text">{{ props.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.base-loader.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  z-index: 10;
  border-radius: 0.5rem;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.loader-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344767;
}
</style>

