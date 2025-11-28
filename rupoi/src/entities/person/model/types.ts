import { z } from 'zod'
import {
  PersonAddressDTOSchema,
  PersonAddressCreateDTOSchema,
  PersonAddressUpdateDTOSchema,
  PersonAddressListDTOSchema,
  PersonContactDTOSchema,
  PersonContactCreateDTOSchema,
  PersonContactUpdateDTOSchema,
  PersonContactListDTOSchema,
  PersonDocumentDTOSchema,
  PersonDocumentCreateDTOSchema,
  PersonDocumentUpdateDTOSchema,
  PersonDocumentListDTOSchema,
  PersonDTOSchema,
  PersonListDTOSchema,
  PersonCreateDTOSchema,
  PersonUpdateDTOSchema,
  PersonChangeStatusDTOSchema,
  PersonListParamsSchema,
  PersonDocumentListParamsSchema,
  PersonContactListParamsSchema,
  PersonAddressListParamsSchema,
  PersonFormValuesSchema,
  PersonFilterFormValuesSchema,
  PersonFormValidationUpdateSchema,
  PersonFormValidationCreateSchema,
} from './schemas'

// === DTO Types ===

export type PersonAddressDTO = z.infer<typeof PersonAddressDTOSchema>
export type PersonAddressListParams = z.infer<typeof PersonAddressListParamsSchema>
export type PersonAddressCreateDTO = z.infer<typeof PersonAddressCreateDTOSchema>
export type PersonAddressUpdateDTO = z.infer<typeof PersonAddressUpdateDTOSchema>
export type PersonAddressListDTO = z.infer<typeof PersonAddressListDTOSchema>

export type PersonContactDTO = z.infer<typeof PersonContactDTOSchema>
export type PersonContactListParams = z.infer<typeof PersonContactListParamsSchema>
export type PersonContactCreateDTO = z.infer<typeof PersonContactCreateDTOSchema>
export type PersonContactUpdateDTO = z.infer<typeof PersonContactUpdateDTOSchema>
export type PersonContactListDTO = z.infer<typeof PersonContactListDTOSchema>

export type PersonDocumentDTO = z.infer<typeof PersonDocumentDTOSchema>
export type PersonDocumentListParams = z.infer<typeof PersonDocumentListParamsSchema>
export type PersonDocumentCreateDTO = z.infer<typeof PersonDocumentCreateDTOSchema>
export type PersonDocumentUpdateDTO = z.infer<typeof PersonDocumentUpdateDTOSchema>
export type PersonDocumentListDTO = z.infer<typeof PersonDocumentListDTOSchema>

export type PersonDTO = z.infer<typeof PersonDTOSchema>
export type PersonListDTO = z.infer<typeof PersonListDTOSchema>
export type PersonCreateDTO = z.infer<typeof PersonCreateDTOSchema>
export type PersonUpdateDTO = z.infer<typeof PersonUpdateDTOSchema>
export type PersonChangeStatusDTO = z.infer<typeof PersonChangeStatusDTOSchema>
export type PersonListParams = z.infer<typeof PersonListParamsSchema>

// === Form Types ===

export type PersonFormValues = z.infer<typeof PersonFormValuesSchema>
export type PersonFilterFormValues = z.infer<typeof PersonFilterFormValuesSchema>
export type PersonFormValidationCreate = z.infer<typeof PersonFormValidationCreateSchema>
export type PersonFormValidationUpdate = z.infer<typeof PersonFormValidationUpdateSchema>   