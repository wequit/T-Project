import type { Ref } from 'vue'
import { ReferenceTypes } from '@rupoi/shared/constant'
import type { ReferenceListAllParams, ReferenceListPagedParams } from '@rupoi/shared/model/reference/types.ts'

export const referenceKeys = {
  key: (type: Ref<ReferenceTypes> | ReferenceTypes) => ['references', typeof type === 'object' ? (type as Ref<ReferenceTypes>) : type] as const,

  all: (type: Ref<ReferenceTypes>, params: Ref<ReferenceListAllParams | undefined>) => [...referenceKeys.key(type), 'all', params] as const,
  paged: (type: Ref<ReferenceTypes>, params: Ref<ReferenceListPagedParams | undefined>) => [...referenceKeys.key(type), 'paged', params] as const,
  byId: (type: Ref<ReferenceTypes>, id: Ref<number>) => [...referenceKeys.key(type), 'byId', id] as const,
  byIdStatic: (type: ReferenceTypes, id: number) => [...referenceKeys.key(type), 'byId', id] as const,
}
