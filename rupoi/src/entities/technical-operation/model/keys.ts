import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'

export const technicalOperationKeys = {
  key: () => ['technical-operation'] as const,

  list: () => [...technicalOperationKeys.key(), 'list'] as const,
  getOneRefId: (id: Ref<ID>) => [...technicalOperationKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...technicalOperationKeys.key(), 'getOne', id] as const,
}
