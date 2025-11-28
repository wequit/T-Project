import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import {medicalInfoService} from '../api/service'
import type { MedicalInfoListDTO, MedicalInfoDTO, MedicalInfoListParams } from './types'
import { medicalInfoKeys } from './keys'

// === Medical Info Queries ===
export function useMedicalInfoList(params?: Ref<MedicalInfoListParams | undefined>) {
  return useQuery<MedicalInfoListDTO>({
    queryKey: medicalInfoKeys.list(params),
    queryFn: () => medicalInfoService.getList(params?.value),
  })
}

export function useMedicalInfoOne(id: Ref<number>) {
  const enabled = computed(() => !!id.value)

  return useQuery<MedicalInfoDTO>({
    queryKey: medicalInfoKeys.getOneRefId(id),
    queryFn: () => medicalInfoService.getById(id.value),
    enabled,
  })
}

