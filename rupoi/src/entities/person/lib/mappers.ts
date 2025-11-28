import type {
  PersonDTO,
  PersonCreateDTO,
  PersonUpdateDTO,
  PersonFormValues,
  PersonAddressCreateDTO,
  PersonAddressUpdateDTO,
  PersonContactCreateDTO,
  PersonContactUpdateDTO,
  PersonDocumentCreateDTO,
  PersonDocumentUpdateDTO,
} from '../model/types'
import type { UUID } from '@rupoi/shared/model'

function dtoToFormValues(dto: PersonDTO): PersonFormValues {
  return {
    pin: dto.pin,
    firstName: dto.firstName,
    lastName: dto.lastName,
    patronymic: dto.patronymic,
    sex: dto.sex,
    birthday: dto.birthday,
    docType: dto.personDocument?.docType ?? null,
    series: dto.personDocument?.series ?? null,
    documentNumber: dto.personDocument?.documentNumber ?? null,
    issuedOrgan: dto.personDocument?.issuedOrgan ?? null,
    issuedDate: dto.personDocument?.issuedDate ?? null,
    pensionCertificateNumber: dto.personDocument?.pensionCertificateNumber ?? null,
    pensionCertificateIssueDate: dto.personDocument?.pensionCertificateIssueDate ?? null,
    pensionCertificateIssuingAuthority: dto.personDocument?.pensionCertificateIssuingAuthority ?? null,
    registrationAddress: dto.personAddress?.registrationAddress ?? null,
    actualAddress: dto.personAddress?.actualAddress ?? null,
    phoneNumber: dto.personContact?.phoneNumber ?? null,
    additionalNumber: dto.personContact?.additionalNumber ?? null,
    workPlace: dto.personContact?.workPlace ?? null,
  }
}

function formValuesToCreateDTO(formValues: PersonFormValues): PersonCreateDTO {
  return {
    pin: formValues.pin!,
    firstName: formValues.firstName!,
    lastName: formValues.lastName!,
    patronymic: formValues.patronymic ?? '',
    sex: formValues.sex!,
    birthday: formValues.birthday!,
  }
}

function formValuesToUpdateDTO(formValues: PersonFormValues): PersonUpdateDTO {
  return {
    pin: formValues.pin!,
    firstName: formValues.firstName!,
    lastName: formValues.lastName!,
    patronymic: formValues.patronymic ?? '',
    sex: formValues.sex!,
    birthday: formValues.birthday!,
  }
}

function formValuesToAddressCreateDTO(formValues: PersonFormValues, personId: UUID): PersonAddressCreateDTO {
  return {
    personId,
    registrationAddress: formValues.registrationAddress ?? '',
    actualAddress: formValues.actualAddress ?? '',
  }
}

function formValuesToAddressUpdateDTO(formValues: PersonFormValues, personId: UUID): PersonAddressUpdateDTO {
  return {
    personId,
    registrationAddress: formValues.registrationAddress ?? '',
    actualAddress: formValues.actualAddress ?? '',
  }
}

function formValuesToContactCreateDTO(formValues: PersonFormValues, personId: UUID): PersonContactCreateDTO {
  return {
    personId,
    phoneNumber: formValues.phoneNumber ?? '',
    additionalNumber: formValues.additionalNumber ?? '',
    workPlace: formValues.workPlace ?? '',
  }
}

function formValuesToContactUpdateDTO(formValues: PersonFormValues, personId: UUID): PersonContactUpdateDTO {
  return {
    personId,
    phoneNumber: formValues.phoneNumber ?? '',
    additionalNumber: formValues.additionalNumber ?? '',
    workPlace: formValues.workPlace ?? '',
  }
}

function formValuesToDocumentCreateDTO(formValues: PersonFormValues, personId: UUID): PersonDocumentCreateDTO {
  return {
    personId,
    series: formValues.series as string,
    docType: formValues.docType as string,
    documentNumber: formValues.documentNumber ?? '',
    issuedOrgan: formValues.issuedOrgan ?? '',
    issuedDate: formValues.issuedDate ?? '',
    pensionCertificateNumber: formValues.pensionCertificateNumber ?? null,
    pensionCertificateIssueDate: formValues.pensionCertificateIssueDate ?? null,
    pensionCertificateIssuingAuthority: formValues.pensionCertificateIssuingAuthority ?? null,
  }
}

function formValuesToDocumentUpdateDTO(formValues: PersonFormValues, personId: UUID): PersonDocumentUpdateDTO {
  return {
    personId,
    series: formValues.series as string,
    docType: formValues.docType as string,
    documentNumber: formValues.documentNumber ?? '',
    issuedOrgan: formValues.issuedOrgan ?? '',
    issuedDate: formValues.issuedDate ?? '',
    pensionCertificateNumber: formValues.pensionCertificateNumber ?? null,
    pensionCertificateIssueDate: formValues.pensionCertificateIssueDate ?? null,
    pensionCertificateIssuingAuthority: formValues.pensionCertificateIssuingAuthority ?? null,
  }
}

export const personMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
  formValuesToAddressCreateDTO,
  formValuesToAddressUpdateDTO,
  formValuesToContactCreateDTO,
  formValuesToContactUpdateDTO,
  formValuesToDocumentCreateDTO,
  formValuesToDocumentUpdateDTO,
}