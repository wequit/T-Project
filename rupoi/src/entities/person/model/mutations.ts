import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { personService } from '../api/person.service'
import { personAddressService } from '../api/person-address.service'
import { personContactService } from '../api/person-contact.service'
import { personDocumentService } from '../api/person-document.service'
import type {
  PersonCreateDTO,
  PersonUpdateDTO,
  PersonChangeStatusDTO,
  PersonAddressCreateDTO,
  PersonAddressUpdateDTO,
  PersonContactCreateDTO,
  PersonContactUpdateDTO,
  PersonDocumentCreateDTO,
  PersonDocumentUpdateDTO,
  PersonAddressDTO,
  PersonContactDTO,
  PersonDocumentDTO,
} from './types'
import type {UUID} from "@rupoi/shared/model";
import { personKeys } from './keys'

// === Person Mutations ===
export function useCreatePerson() {
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: PersonCreateDTO) => personService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Человек успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdatePerson() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: PersonUpdateDTO }) =>
      personService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(result.id) })
      toast.add({
        title: 'Успешно',
        message: 'Данные успешно обновлены',
        type: 'primary',
      })
    }
  })
}

export function useDeletePerson() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (id: UUID) => personService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.list() })
      toast.add({
        title: 'Успешно',
        message: 'Человек успешно удален',
        type: 'primary',
      })
    }
  })
}

export function useChangePersonStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: PersonChangeStatusDTO }) =>
      personService.changeStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: personKeys.list() })
      toast.add({
        title: 'Успешно',
        message: 'Статус успешно изменен',
        type: 'primary',
      })
    }
  })
}

// === Address Mutations ===
export function useCreatePersonAddress(onSuccess?: (data: PersonAddressDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: PersonAddressCreateDTO) => personAddressService.create(data),
    onSuccess: (data: PersonAddressDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Адрес успешно создан',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useUpdatePersonAddress(onSuccess?: (data: PersonAddressDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PersonAddressUpdateDTO }) =>
      personAddressService.updateById(id, data),
    onSuccess: (data: PersonAddressDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Адрес успешно обновлен',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useDeletePersonAddress(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, personId }: { id: number; personId: UUID }) =>
      personAddressService.deleteById(id).then(() => personId),
    onSuccess: (personId: UUID) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(personId) })
      toast.add({
        title: 'Успешно',
        message: 'Адрес успешно удален',
        type: 'primary',
      })
      onSuccess?.();
    },
  })
}

// === Contact Mutations ===
export function useCreatePersonContact(onSuccess?: (data: PersonContactDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: PersonContactCreateDTO) => personContactService.create(data),
    onSuccess: (data: PersonContactDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Контакт успешно создан',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useUpdatePersonContact(onSuccess?: (data: PersonContactDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PersonContactUpdateDTO }) =>
      personContactService.updateById(id, data),
    onSuccess: (data: PersonContactDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Контакт успешно обновлен',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useDeletePersonContact(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, personId }: { id: number; personId: UUID }) =>
      personContactService.deleteById(id).then(() => personId),
    onSuccess: (personId: UUID) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(personId) })
      toast.add({
        title: 'Успешно',
        message: 'Контакт успешно удален',
        type: 'primary',
      })
      onSuccess?.();
    },
  })
}

// === Document Mutations ===
export function useCreatePersonDocument(onSuccess?: (data: PersonDocumentDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: PersonDocumentCreateDTO) => personDocumentService.create(data),
    onSuccess: (data: PersonDocumentDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Документ успешно создан',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useUpdatePersonDocument(onSuccess?: (data: PersonDocumentDTO) => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: UUID; data: PersonDocumentUpdateDTO }) =>
      personDocumentService.updateById(id, data),
    onSuccess: (data: PersonDocumentDTO) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(data.personId ?? '') })
      toast.add({
        title: 'Успешно',
        message: 'Документ успешно обновлен',
        type: 'primary',
      })
      onSuccess?.(data);
    },
  })
}

export function useDeletePersonDocument(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, personId }: { id: UUID; personId: UUID }) =>
      personDocumentService.deleteById(id).then(() => personId),
    onSuccess: (personId: UUID) => {
      queryClient.invalidateQueries({ queryKey: personKeys.getOneId(personId) })
      toast.add({
        title: 'Успешно',
        message: 'Документ успешно удален',
        type: 'primary',
      })
      onSuccess?.();
    },
  })
}
