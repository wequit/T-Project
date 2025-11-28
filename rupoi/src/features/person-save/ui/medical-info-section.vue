<script setup lang="ts">
import { computed } from 'vue'
import { MedicalInfoList } from '@rupoi/entities/medical-info'
import type { PersonDTO } from '@rupoi/entities/person'

interface Props {
  person: PersonDTO | null | undefined
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const medicalInfoItems = computed(() => props.person?.medicalInfoList ?? [])
const personId = computed(() => props.person?.id)
</script>

<template>
  <div v-if="personId" class="mb-3">
    <MedicalInfoList
      :items="medicalInfoItems"
      :person-id="personId"
      :disabled="props.disabled"
    />
  </div>
</template>

