import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { ComponentProsthesisListParams } from './types'

export const componentProsthesisKeys = {
  key: () => ['component-prosthesis'] as const,

  list: (params?: Ref<ComponentProsthesisListParams | undefined>) => [...componentProsthesisKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...componentProsthesisKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...componentProsthesisKeys.key(), 'getOne', id] as const,
}
