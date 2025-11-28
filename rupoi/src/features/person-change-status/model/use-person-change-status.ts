import { computed } from 'vue'
import { usePerson, PersonStatus } from '@rupoi/entities/person'
import type { UUID } from '@rupoi/shared/model'

export type UsePersonChangeStatusProps = {
  personId?: UUID | null
}

export function usePersonChangeStatus(props: UsePersonChangeStatusProps) {
  const person = usePerson({ id: () => props.personId ?? null })
  
  const currentStatus = computed(() => person.person.value?.status ?? null)
  
  // Доступные действия в зависимости от статуса
  const canDeactivate = computed(() => currentStatus.value === PersonStatus.ACTIVE)
  const canActivate = computed(() => currentStatus.value === PersonStatus.INACTIVE)
  
  async function deactivate() {
    if (!props.personId) return
    
    try {
      await person.changeStatusMutation.mutateAsync({ 
        id: props.personId, 
        data: { status: PersonStatus.INACTIVE } 
      })
    } catch (error) {
      console.error('Error deactivating person:', error)
      throw error
    }
  }
  
  async function activate() {
    if (!props.personId) return
    
    try {
      await person.changeStatusMutation.mutateAsync({ 
        id: props.personId, 
        data: { status: PersonStatus.ACTIVE } 
      })
    } catch (error) {
      console.error('Error activating person:', error)
      throw error
    }
  }
  
  const isLoading = computed(() => person.changeStatusMutation.isPending.value)
  
  return {
    currentStatus,
    canDeactivate,
    canActivate,
    deactivate,
    activate,
    isLoading,
  }
}

