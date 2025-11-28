import type { Ref } from 'vue'
import type {PersonListParams} from "@rupoi/entities/person";
import type {UUID} from "@rupoi/shared/model";

export const personKeys = {
  key: () => ['person'] as const,

  list: (params?: Ref<PersonListParams | undefined>) => [...personKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<UUID>) => [...personKeys.key(), 'getOne', id] as const,
  getOneId: (id: UUID) => [...personKeys.key(), 'getOne', id] as const,
  search: (paramsKey: string) => [...personKeys.key(), 'search', paramsKey] as const,

  address: {
    key: () => [...personKeys.key(), 'address'] as const,
    getOneRefId: (id: Ref<UUID>) => [...personKeys.address.key(), 'getOne', id] as const,
    getOneId: (id:UUID) => [...personKeys.address.key(), 'getOne', id] as const,
  },

  contact: {
    key: () => [...personKeys.key(), 'contact'] as const,
    getOneRefId: (id: Ref<UUID>) => [...personKeys.contact.key(), 'getOne', id] as const,
    getOneId: (id:UUID) => [...personKeys.contact.key(), 'getOne', id] as const,
  },

  document: {
    key: () => [...personKeys.key(), 'document'] as const,
    getOneRefId: (id: Ref<UUID>) => [...personKeys.document.key(), 'getOne', id] as const,
    getOneId: (id:UUID) => [...personKeys.document.key(), 'getOne', id] as const,
  },

  medicalInfo: {
    key: () => [...personKeys.key(), 'medicalInfo'] as const,
    getOneRefId: (id: Ref<number>) => [...personKeys.medicalInfo.key(), 'getOne', id] as const,
    getOneId: (id: number) => [...personKeys.medicalInfo.key(), 'getOne', id] as const,
  },
}
