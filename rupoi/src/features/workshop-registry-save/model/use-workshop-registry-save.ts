import { computed, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import {
  useWorkshopRegistry,
  type WorkshopRegistryFormValues,
  type WorkshopRegistryCreateDTO,
  type WorkshopRegistryUpdateDTO,
} from '@rupoi/entities/workshop-registry'

interface UseWorkshopRegistrySaveOptions {
  workshopRegistryId?: Ref<ID | null>
  onSuccess?: (workshopRegistryId: ID) => void
}

export function useWorkshopRegistrySave(options: UseWorkshopRegistrySaveOptions = {}) {
  const { workshopRegistryId, onSuccess } = options

  // Определяем режим редактирования
  const isEditMode = computed(() => {
    if (!workshopRegistryId?.value) return false
    const id = workshopRegistryId.value
    return typeof id === 'number' ? id > 0 : Boolean(id)
  })

  // Получаем данные мастерской для редактирования
  const {
    workshopRegistry,
    oneQuery,
    createWorkshopRegistryMutation,
    updateWorkshopRegistryMutation,
  } = useWorkshopRegistry({
    workshopId: workshopRegistryId,
  })

  const isLoading = computed(() => {
    return (
      oneQuery?.isLoading.value ||
      createWorkshopRegistryMutation.isPending.value ||
      updateWorkshopRegistryMutation.isPending.value
    )
  })

  // Подготовка данных для отправки
  function preparePayload(formValues: WorkshopRegistryFormValues): WorkshopRegistryCreateDTO | WorkshopRegistryUpdateDTO {
    return {
      nameKg: formValues.nameKg || '',
      nameRu: formValues.nameRu || '',
      representative: formValues.representative || '',
      address: formValues.address || '',
      otherInfo: formValues.otherInfo || '',
    }
  }

  // Отправка формы
  async function submit(formValues: WorkshopRegistryFormValues) {
    try {
      const payload = preparePayload(formValues)

      let result
      if (isEditMode.value && workshopRegistryId?.value) {
        result = await updateWorkshopRegistryMutation.mutateAsync({
          id: workshopRegistryId.value,
          data: payload as WorkshopRegistryUpdateDTO,
        })
      } else {
        result = await createWorkshopRegistryMutation.mutateAsync(payload as WorkshopRegistryCreateDTO)
      }

      if (onSuccess) {
        onSuccess(result.id)
      }

      return result
    } catch (error) {
      console.error('Error saving workshop registry:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading,
    workshopRegistry,
    submit,
  }
}

