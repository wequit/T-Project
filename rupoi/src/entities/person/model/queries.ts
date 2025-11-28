import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import {personService} from '../api/person.service'
import type {
  PersonListDTO,
  PersonDTO,
  PersonListParams,
} from './types'
import { personKeys } from './keys'
import type {UUID} from "@rupoi/shared/model";

// === Person Queries ===
export function usePersonList(params?: Ref<PersonListParams | undefined>) {
  return useQuery<PersonListDTO>({
    queryKey: personKeys.list(params),
    queryFn: () => personService.getList(params?.value),
  })
}

export function usePersonOne(id: Ref<UUID>) {
  const enabled = computed(() => !!id.value)

  return useQuery<PersonDTO>({
    queryKey: personKeys.getOneRefId(id as Ref<string>),
    queryFn: () => personService.getById(id.value),
    enabled,
  })
}