import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema } from '@rupoi/shared/model'
import {DocumentSeries, DocumentType, PersonStatus, ZodErrorMessages} from '@rupoi/shared/constant'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts"
import { 
  MedicalInfoDTOSchema, 
} from '@rupoi/entities/medical-info/model/schemas'

// === Base Schemas ===
const BasePersonSchema = z.object({
  pin: z.string(ZodErrorMessages.INVALID_STRING),
  firstName: z.string(ZodErrorMessages.INVALID_STRING),
  lastName: z.string(ZodErrorMessages.INVALID_STRING),
  patronymic: z.string(ZodErrorMessages.INVALID_STRING),
  sex: z.number(ZodErrorMessages.INVALID_NUMBER),
  birthday: z.string(ZodErrorMessages.INVALID_STRING),
  caseNumber: z.string(ZodErrorMessages.INVALID_STRING),
  status: z.enum(PersonStatus)
})

const BasePersonAddressSchema = z.object({
  registrationAddress: z.string(ZodErrorMessages.INVALID_STRING),
  actualAddress: z.string(ZodErrorMessages.INVALID_STRING),
})

const BasePersonContactSchema = z.object({
  phoneNumber: z.string(ZodErrorMessages.INVALID_STRING),
  additionalNumber: z.string(ZodErrorMessages.INVALID_STRING),
  workPlace: z.string(ZodErrorMessages.INVALID_STRING),
})

const BasePersonDocumentSchema = z.object({
  series: z.string(ZodErrorMessages.INVALID_STRING),
  docType: z.string(ZodErrorMessages.INVALID_STRING),
  documentNumber: z.string(ZodErrorMessages.INVALID_STRING),
  issuedOrgan: z.string(ZodErrorMessages.INVALID_STRING),
  issuedDate: z.string(ZodErrorMessages.INVALID_STRING),
  pensionCertificateNumber: z.string(ZodErrorMessages.INVALID_STRING).nullable().optional(),
  pensionCertificateIssueDate: z.string(ZodErrorMessages.INVALID_STRING).nullable().optional(),
  pensionCertificateIssuingAuthority: z.string(ZodErrorMessages.INVALID_STRING).nullable().optional(),
})

// === DTO Schemas (with IDs) ===
export const PersonAddressDTOSchema = BasePersonAddressSchema.extend({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  personId: UUIDSchema.nullable(),
})

export const PersonContactDTOSchema = BasePersonContactSchema.extend({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  personId: UUIDSchema.nullable(),
})

export const PersonDocumentDTOSchema = BasePersonDocumentSchema.extend({
  id: UUIDSchema,
  personId: UUIDSchema.nullable(),
  series: z.enum(DocumentSeries),
  docType: z.enum(DocumentType),
  documentNumber: z.string(ZodErrorMessages.INVALID_STRING).nullable(),
})

export const PersonDTOSchema = BasePersonSchema.extend({
  id: UUIDSchema,
  personDocument: PersonDocumentDTOSchema.nullable(),
  personAddress: PersonAddressDTOSchema.nullable(),
  personContact: PersonContactDTOSchema.nullable(),
  medicalInfoList: z.array(MedicalInfoDTOSchema).nullable(),
})

// === Create/Update Schemas ===
export const PersonCreateDTOSchema = BasePersonSchema.omit({caseNumber: true, status: true})
export const PersonUpdateDTOSchema = BasePersonSchema.omit({caseNumber: true, status: true})

// === Change Status Schema ===
export const PersonChangeStatusDTOSchema = z.object({
  status: z.enum(PersonStatus)
})

export const PersonAddressCreateDTOSchema = BasePersonAddressSchema.extend({
  personId: UUIDSchema,
})
export const PersonAddressUpdateDTOSchema = BasePersonAddressSchema.extend({
  personId: UUIDSchema,
})
export const PersonContactCreateDTOSchema = BasePersonContactSchema.extend({
  personId: UUIDSchema,
})
export const PersonContactUpdateDTOSchema = BasePersonContactSchema.extend({
  personId: UUIDSchema,
})

export const PersonDocumentCreateDTOSchema = BasePersonDocumentSchema.extend({
  personId: UUIDSchema,
})
export const PersonDocumentUpdateDTOSchema = BasePersonDocumentSchema.extend({
  personId: UUIDSchema,
})

// === List Schemas ===

export const PersonListDTOSchema = createPaginatedListSchema(PersonDTOSchema)
export const PersonAddressListDTOSchema = z.array(PersonAddressDTOSchema)
export const PersonContactListDTOSchema = z.array(PersonContactDTOSchema)
export const PersonDocumentListDTOSchema = z.array(PersonDocumentDTOSchema)

// === Params Schemas ===
export const PersonListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  pin: z.string().nullable().optional(),
  caseNumber: z.string().nullable().optional(),
  sex: z.union([z.number(), z.string()]).nullable(),
  pageable: PageableDTOSchema.optional(),
})

export const PersonAddressListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
})

export const PersonContactListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
})

export const PersonDocumentListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
})

// === Form Schemas ===

// Person Form Schema (объединяет все поля для формы)
export const PersonFormValuesSchema = z.object({
  // Person fields
  pin: z.string().nullable(),
  lastName: z.string().nullable(),
  firstName: z.string().nullable(),
  patronymic: z.string().nullable(),
  sex: z.number().nullable(),
  birthday: z.string().nullable(),
  // Document fields
  docType: z.union([z.string(), z.number()]).nullable(),
  series: z.union([z.string(), z.number()]).nullable(),
  documentNumber: z.string().nullable(),
  issuedOrgan: z.string().nullable(),
  issuedDate: z.string().nullable(),
  pensionCertificateNumber: z.string().nullable(),
  pensionCertificateIssueDate: z.string().nullable(),
  pensionCertificateIssuingAuthority: z.string().nullable(),
  // Address fields
  registrationAddress: z.string().nullable(),
  actualAddress: z.string().nullable(),
  // Contact fields
  phoneNumber: z.string().nullable(),
  additionalNumber: z.string().nullable(),
  workPlace: z.string().nullable(),
})

// Person Filter Form Schema
export const PersonFilterFormValuesSchema = z.object({
  search: z.string().nullable(),
  pin: z.string().nullable(),
  caseNumber: z.string().nullable(),
  sex: z.union([z.number(), z.string()]).nullable(),
})

export const PersonFormValidationCreateSchema = z.object({
  // Person fields
  pin: z.string(ZodErrorMessages.REQUIRED).regex(new RegExp('^[0-9]{14}$'), 'ПИН должен содержать 14 цифр'),
  lastName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  firstName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  patronymic: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  sex: z.union([z.number(ZodErrorMessages.REQUIRED), z.string(ZodErrorMessages.REQUIRED)], ZodErrorMessages.REQUIRED),
  birthday: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})

// Person Form Validation Schema (для валидации формы)
export const PersonFormValidationUpdateSchema = z.object({
  // Person fields
  pin: z.string(ZodErrorMessages.REQUIRED).regex(new RegExp('^[0-9]{14}$'), 'ПИН должен содержать 14 цифр'),
  lastName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  firstName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  patronymic: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  sex: z.union([z.number(ZodErrorMessages.REQUIRED), z.string(ZodErrorMessages.REQUIRED)], ZodErrorMessages.REQUIRED),
  birthday: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  // Document fields
  docType: z.union([z.string(ZodErrorMessages.REQUIRED), z.number(ZodErrorMessages.REQUIRED)], ZodErrorMessages.REQUIRED),
  series: z.union([z.string(ZodErrorMessages.REQUIRED), z.number(ZodErrorMessages.REQUIRED)], ZodErrorMessages.REQUIRED),
  documentNumber: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  issuedOrgan: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  issuedDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  pensionCertificateNumber: z.string().nullable(),
  pensionCertificateIssueDate: z.string().nullable(),
  pensionCertificateIssuingAuthority: z.string().nullable(),
  // Address fields
  registrationAddress: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  actualAddress: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  // Contact fields
  phoneNumber: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  additionalNumber: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  workPlace: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})