<script setup lang="ts">
import { AButton } from '@common/shared/ui'
import { usePersonChangeStatus } from '../model/use-person-change-status'
import type { UUID } from '@rupoi/shared/model'

interface Props {
  personId: UUID
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const personStatus = usePersonChangeStatus({ personId: props.personId })

async function handleDeactivate() {
  if (!confirm('Деактивировать персону?')) return
  await personStatus.deactivate()
}

async function handleActivate() {
  if (!confirm('Активировать персону?')) return
  await personStatus.activate()
}
</script>

<template>
  <div class="person-change-status">
    <div class="d-flex gap-2 flex-wrap">
      <AButton
        v-if="personStatus.canDeactivate.value"
        type="button"
        color="danger"
        size="sm"
        :disabled="props.disabled || personStatus.isLoading.value"
        @click="handleDeactivate"
      >
        <i class="fas fa-ban me-2"></i>
        Деактивировать
      </AButton>

      <AButton
        v-if="personStatus.canActivate.value"
        type="button"
        color="success"
        size="sm"
        :disabled="props.disabled || personStatus.isLoading.value"
        @click="handleActivate"
      >
        <i class="fas fa-check-circle me-2"></i>
        Активировать
      </AButton>
    </div>
  </div>
</template>

<style scoped>
.person-change-status {
  margin: 1rem 0;
}
</style>

