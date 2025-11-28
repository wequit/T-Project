import { type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import { ReferenceTypes } from '@rupoi/shared/constant'
import type {
  ReferenceDTO,
  ReferenceListAllDTO,
  ReferenceListAllParams,
  ReferenceListPagedDTO,
  ReferenceListPagedParams,
} from '@rupoi/shared/model/reference/types.ts'
import { referenceKeys } from './keys'
import {referenceService} from '@rupoi/shared/api'

export function useReferenceQueryAll(
  type: Ref<ReferenceTypes>,
  params: Ref<ReferenceListAllParams | undefined>,
) {
  return useQuery<ReferenceListAllDTO>({
    queryKey: referenceKeys.all(type, params),
    queryFn: () => referenceService.getAll(type.value, params.value),
  })
}

export function useReferenceQueryPaged(
  type: Ref<ReferenceTypes>,
  params: Ref<ReferenceListPagedParams | undefined>,
) {
  return useQuery<ReferenceListPagedDTO>({
    queryKey: referenceKeys.paged(type, params),
    queryFn: () => referenceService.getPaged(type.value, params.value),
  })
}

export function useReferenceQueryById(
  type: Ref<ReferenceTypes>,
  id: Ref<number>,
) {
  return useQuery<ReferenceDTO>({
    queryKey: referenceKeys.byId(type, id),
    queryFn: () => referenceService.getOne(type.value, id.value),
  })
}
