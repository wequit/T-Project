<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { BaseModalProps, BaseModalEmits } from './base-modal.props'

const props = withDefaults(defineProps<BaseModalProps>(), {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
  showClose: true,
  persistent: false,
  centered: true,
  fullscreen: false,
})

const emit = defineEmits<BaseModalEmits>()

function close() {
  if (props.persistent) return
  
  emit('beforeClose')
  emit('update:modelValue', false)
  
  nextTick(() => {
    emit('afterClose')
  })
}

function handleBackdropClick() {
  if (props.closeOnBackdrop) {
    close()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      emit('beforeOpen')
      document.body.style.overflow = 'hidden'
      
      nextTick(() => {
        emit('afterOpen')
      })
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

defineExpose({
  close,
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="base-modal">
        <!-- Backdrop -->
        <div class="base-modal__backdrop" @click="handleBackdropClick"></div>

        <!-- Modal Dialog -->
        <div
          class="base-modal__dialog"
          :class="[
            `base-modal__dialog--${size}`,
            {
              'base-modal__dialog--centered': centered,
              'base-modal__dialog--fullscreen': fullscreen,
            },
          ]"
        >
          <div class="base-modal__content">
            <!-- Header -->
            <div v-if="$slots.header || title || showClose" class="base-modal__header">
              <slot name="header">
                <h5 v-if="title" class="base-modal__title">{{ title }}</h5>
              </slot>
              <button
                v-if="showClose && !persistent"
                type="button"
                class="base-modal__close"
                @click="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <!-- Body -->
            <div class="base-modal__body">
              <slot :close="close" />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="base-modal__footer">
              <slot name="footer" :close="close" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* Backdrop */
.base-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

/* Dialog */
.base-modal__dialog {
  position: relative;
  width: 100%;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  z-index: 1051;
  pointer-events: auto;
}

.base-modal__dialog--centered {
  margin: auto;
}

/* Sizes */
.base-modal__dialog--sm {
  max-width: 400px;
}

.base-modal__dialog--md {
  max-width: 600px;
}

.base-modal__dialog--lg {
  max-width: 800px;
}

.base-modal__dialog--xl {
  max-width: 1140px;
}

.base-modal__dialog--full {
  max-width: 95%;
}

.base-modal__dialog--fullscreen {
  max-width: 100%;
  max-height: 100vh;
  margin: 0;
  border-radius: 0;
}

.base-modal__dialog--fullscreen .base-modal__content {
  height: 100vh;
  border-radius: 0;
}

/* Content */
.base-modal__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* Header */
.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
}

.base-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  line-height: 1.5;
}

.base-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin-left: auto;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  font-size: 1.5rem;
  line-height: 1;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.base-modal__close:hover {
  opacity: 1;
  background-color: #f8f9fa;
  color: #212529;
}

.base-modal__close:active {
  background-color: #e9ecef;
}

.base-modal__close span {
  display: block;
}

/* Body */
.base-modal__body {
  flex: 1 1 auto;
  padding: 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Footer */
.base-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  flex-shrink: 0;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .base-modal__dialog,
.modal-leave-active .base-modal__dialog {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .base-modal__dialog,
.modal-leave-to .base-modal__dialog {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Scrollbar styling */
.base-modal__body::-webkit-scrollbar {
  width: 8px;
}

.base-modal__body::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 4px;
}

.base-modal__body::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 4px;
}

.base-modal__body::-webkit-scrollbar-thumb:hover {
  background: #ced4da;
}

/* Responsive */
@media (max-width: 768px) {
  .base-modal {
    padding: 0.5rem;
  }

  .base-modal__dialog {
    max-height: calc(100vh - 1rem);
  }

  .base-modal__dialog--sm,
  .base-modal__dialog--md,
  .base-modal__dialog--lg,
  .base-modal__dialog--xl {
    max-width: 100%;
  }

  .base-modal__header {
    padding: 1rem 1.25rem;
  }

  .base-modal__title {
    font-size: 1.125rem;
  }

  .base-modal__body {
    padding: 1.25rem;
  }

  .base-modal__footer {
    padding: 0.875rem 1.25rem;
  }
}

@media (max-width: 576px) {
  .base-modal {
    padding: 0;
  }

  .base-modal__dialog {
    max-height: 100vh;
    border-radius: 0;
  }

  .base-modal__content {
    border-radius: 0;
    height: 100vh;
  }
}
</style>

