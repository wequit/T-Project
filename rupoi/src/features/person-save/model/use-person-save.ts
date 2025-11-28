import { computed, type MaybeRefOrGetter } from 'vue'
import type { PersonDTO, PersonFormValues } from '@rupoi/entities/person'
import { personMappers, usePerson } from '@rupoi/entities/person'
import type { UUID } from '@rupoi/shared/model'

export type UsePersonSaveProps = {
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (personId: UUID) => void
}

export function usePersonSave(props: UsePersonSaveProps) {
  const person = usePerson({ id: props.personId })
  const isEditMode = computed(() => !!person.personId.value)

  async function submit(formValues: PersonFormValues): Promise<PersonDTO | null> {
    try {
      let savedPersonId: UUID

      // CreateMode: создаем только Person
      if (!isEditMode.value) {
        const personData = personMappers.formValuesToCreateDTO(formValues)
        const createdPerson = await person.createPersonMutation.mutateAsync(personData)
        savedPersonId = createdPerson.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedPersonId)
        return createdPerson
      }

      // EditMode: обновляем Person и все связанные сущности
      savedPersonId = person.currentPersonId.value!
      const personData = personMappers.formValuesToUpdateDTO(formValues)
      const updatedPerson = await person.updatePersonMutation.mutateAsync({ 
        id: savedPersonId, 
        data: personData 
      })

      // Address
      if (formValues.registrationAddress || formValues.actualAddress) {
        if (person.addressId.value) {
          const addressData = personMappers.formValuesToAddressUpdateDTO(formValues, savedPersonId)
          await person.updateAddressMutation.mutateAsync({ id: person.addressId.value, data: addressData })
        } else {
          const addressData = personMappers.formValuesToAddressCreateDTO(formValues, savedPersonId)
          await person.createAddressMutation.mutateAsync(addressData)
        }
      } else {
        if (person.addressId.value) {
          await person.deleteAddressMutation.mutateAsync({ id: person.addressId.value, personId: savedPersonId })
        }
      }

      // Contact
      if (formValues.phoneNumber || formValues.additionalNumber || formValues.workPlace) {
        if (person.contactId.value) {
          const contactData = personMappers.formValuesToContactUpdateDTO(formValues, savedPersonId)
          await person.updateContactMutation.mutateAsync({ id: person.contactId.value, data: contactData })
        } else {
          const contactData = personMappers.formValuesToContactCreateDTO(formValues, savedPersonId)
          await person.createContactMutation.mutateAsync(contactData)
        }
      } else {
        if (person.contactId.value) {
          await person.deleteContactMutation.mutateAsync({ id: person.contactId.value, personId: savedPersonId })
        }
      }

      // Document
      if (
        formValues.docType ||
        formValues.series ||
        formValues.documentNumber ||
        formValues.issuedOrgan ||
        formValues.issuedDate ||
        formValues.pensionCertificateNumber ||
        formValues.pensionCertificateIssueDate ||
        formValues.pensionCertificateIssuingAuthority
      ) {
        if (person.documentId.value) {
          const documentData = personMappers.formValuesToDocumentUpdateDTO(formValues, savedPersonId)
          await person.updateDocumentMutation.mutateAsync({ id: person.documentId.value, data: documentData })
        } else {
          const documentData = personMappers.formValuesToDocumentCreateDTO(formValues, savedPersonId)
          await person.createDocumentMutation.mutateAsync(documentData)
        }
      } else {
        if (person.documentId.value) {
          await person.deleteDocumentMutation.mutateAsync({ id: person.documentId.value, personId: savedPersonId })
        }
      }

      return updatedPerson
    } catch (error) {
      console.error('Error saving person:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: person.isLoading,
    person: person.person,
    submit,
  }
}
