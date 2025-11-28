import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { UUID } from '@rupoi/shared/model'
import { personKeys } from './keys'
import type { PersonListParams } from './types'
import {
  useCreatePerson,
  useUpdatePerson,
  useDeletePerson,
  useChangePersonStatus,
  useCreatePersonAddress,
  useUpdatePersonAddress,
  useDeletePersonAddress,
  useCreatePersonContact,
  useUpdatePersonContact,
  useDeletePersonContact,
  useCreatePersonDocument,
  useUpdatePersonDocument,
  useDeletePersonDocument,
} from './mutations'
import { usePersonOne, usePersonList } from './queries'

export type UsePersonProps = {
  id?: MaybeRefOrGetter<UUID | null>
  listParams?: Ref<PersonListParams | undefined>
}

export function usePerson(props: UsePersonProps = {}) {
  const personId = computed<UUID | null>(() => toValue(props.id) ?? null)
  const personIdRef = ref(personId.value ?? '' as UUID) as Ref<UUID>
  
  watch(personId, (newId) => {
    if (newId) personIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const personQuery = usePersonOne(personIdRef)
  
  // Query для списка (опционально)
  const personListQuery = props.listParams ? usePersonList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentPersonId = computed(() => personQuery.data.value?.id ?? personId.value ?? null)
  const addressId = computed(() => personQuery.data.value?.personAddress?.id ?? null)
  const contactId = computed(() => personQuery.data.value?.personContact?.id ?? null)
  const documentId = computed(() => personQuery.data.value?.personDocument?.id ?? null)
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createPersonMutation = useCreatePerson()
  const updatePersonMutation = useUpdatePerson()
  const deletePersonMutation = useDeletePerson()
  const changeStatusMutation = useChangePersonStatus()
  
  const createAddressMutation = useCreatePersonAddress()
  const updateAddressMutation = useUpdatePersonAddress()
  const deleteAddressMutation = useDeletePersonAddress()
  
  const createContactMutation = useCreatePersonContact()
  const updateContactMutation = useUpdatePersonContact()
  const deleteContactMutation = useDeletePersonContact()
  
  const createDocumentMutation = useCreatePersonDocument()
  const updateDocumentMutation = useUpdatePersonDocument()
  const deleteDocumentMutation = useDeletePersonDocument()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    personQuery.isFetching.value ||
    (personListQuery?.isFetching.value ?? false) ||
    createPersonMutation.isPending.value ||
    updatePersonMutation.isPending.value ||
    deletePersonMutation.isPending.value ||
    changeStatusMutation.isPending.value ||
    createAddressMutation.isPending.value ||
    updateAddressMutation.isPending.value ||
    deleteAddressMutation.isPending.value ||
    createContactMutation.isPending.value ||
    updateContactMutation.isPending.value ||
    deleteContactMutation.isPending.value ||
    createDocumentMutation.isPending.value ||
    updateDocumentMutation.isPending.value ||
    deleteDocumentMutation.isPending.value
  )

  return {
    // Keys
    keys: personKeys,
    
    // Query для одной сущности
    query: personQuery,
    person: personQuery.data,
    
    // Query для списка
    listQuery: personListQuery,
    personList: personListQuery?.data,
    
    // Computed IDs
    personId,
    currentPersonId,
    addressId,
    contactId,
    documentId,
    
    // Mutations для Person
    createPersonMutation,
    updatePersonMutation,
    deletePersonMutation,
    changeStatusMutation,
    
    // Mutations для Address
    createAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    
    // Mutations для Contact
    createContactMutation,
    updateContactMutation,
    deleteContactMutation,
    
    // Mutations для Document
    createDocumentMutation,
    updateDocumentMutation,
    deleteDocumentMutation,
    
    // Состояния
    isLoading,
  }
}
