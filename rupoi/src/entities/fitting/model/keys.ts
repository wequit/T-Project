import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { FittingKind } from '../constant'

export const fittingKeys = {
  key: (kind: FittingKind) => [`fitting-${kind}`] as const,

  list: (kind: FittingKind) => [...fittingKeys.key(kind), 'list'] as const,
  getOneRefId: (kind: FittingKind, id: Ref<ID>) => [...fittingKeys.key(kind), 'getOne', id] as const,
  getOneId: (kind: FittingKind, id: ID) => [...fittingKeys.key(kind), 'getOne', id] as const,
}
