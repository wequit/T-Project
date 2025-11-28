import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { materialService } from '../api/service'
import type { MaterialListDTO, MaterialDTO } from './types'
import { materialKeys } from './keys'
import type { MaterialKind } from '../constant'
import type { ID } from '@rupoi/shared/model'

// === Material Queries ===
export function useMaterialList(kind: MaterialKind) {
  return useQuery<MaterialListDTO>({
    queryKey: materialKeys.list(kind),
    queryFn: () => materialService.getList(kind),
  })
}

export function useMaterialOne(kind: MaterialKind, id: Ref<ID>) {
  const enabled = computed(() => !!id.value)

  return useQuery<MaterialDTO>({
    queryKey: materialKeys.getOneRefId(kind, id),
    queryFn: () => materialService.getById(kind, id.value),
    enabled,
  })
}
