import type { Ref } from 'vue'
import type { MedicalInfoListParams } from './types'

export const medicalInfoKeys = {
  key: () => ['medical-info'] as const,

  list: (params?: Ref<MedicalInfoListParams | undefined>) => [...medicalInfoKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<number>) => [...medicalInfoKeys.key(), 'getOne', id] as const,
  getOneId: (id: number) => [...medicalInfoKeys.key(), 'getOne', id] as const,
}

