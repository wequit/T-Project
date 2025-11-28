import { z } from 'zod'
import { IDSchema, PageableDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages } from '@rupoi/shared/constant'
import { createPaginatedListSchema } from '@rupoi/shared/lib/schema-helpers'

// === Base Schema ===
const BaseWorkshopRegistrySchema = z.object({
  nameKg: z.string(ZodErrorMessages.INVALID_STRING),
  nameRu: z.string(ZodErrorMessages.INVALID_STRING),
  representative: z.string(ZodErrorMessages.INVALID_STRING),
  address: z.string(ZodErrorMessages.INVALID_STRING),
  otherInfo: z.string(ZodErrorMessages.INVALID_STRING),
})

// === DTO Schema ===
export const WorkshopRegistryDTOSchema = BaseWorkshopRegistrySchema.extend({
  id: IDSchema,
})

// === List Schemas ===
export const WorkshopRegistryListDTOSchema = createPaginatedListSchema(WorkshopRegistryDTOSchema)

// === Create/Update Schemas ===
export const WorkshopRegistryCreateDTOSchema = BaseWorkshopRegistrySchema
export const WorkshopRegistryUpdateDTOSchema = BaseWorkshopRegistrySchema

// === Params Schemas ===
export const WorkshopRegistryListParamsSchema = z.object({
  search: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Form Schemas ===
export const WorkshopRegistryFormValuesSchema = z.object({
  nameKg: z.string().nullable(),
  nameRu: z.string().nullable(),
  representative: z.string().nullable(),
  address: z.string().nullable(),
  otherInfo: z.string().nullable(),
})

export const WorkshopRegistryFormValidationSchema = z.object({
  nameKg: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  nameRu: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  representative: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  address: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  otherInfo: z.string().nullable(),
})

