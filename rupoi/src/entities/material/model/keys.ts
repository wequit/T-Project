import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { MaterialKind } from '../constant'

export const materialKeys = {
  key: (kind: MaterialKind) => [`material-${kind}`] as const,

  list: (kind: MaterialKind) => [...materialKeys.key(kind), 'list'] as const,
  getOneRefId: (kind: MaterialKind, id: Ref<ID>) => [...materialKeys.key(kind), 'getOne', id] as const,
  getOneId: (kind: MaterialKind, id: ID) => [...materialKeys.key(kind), 'getOne', id] as const,
}
