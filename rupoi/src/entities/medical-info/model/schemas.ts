import { z } from 'zod'
import { UUIDSchema } from '@rupoi/shared/model'
import { ZodErrorMessages } from '@rupoi/shared/constant'

// === Base Schema ===
const BaseMedicalInfoSchema = z.object({
  disabilityCategory: z.number(ZodErrorMessages.INVALID_NUMBER),
  disabilityGroup: z.number(ZodErrorMessages.INVALID_NUMBER),
  disabilityReason: z.number(ZodErrorMessages.INVALID_NUMBER),
  operationLocationAndDate: z.string(ZodErrorMessages.INVALID_STRING),
  additionalInfo: z.string(ZodErrorMessages.INVALID_STRING),
})

// === DTO Schema ===
export const MedicalInfoDTOSchema = BaseMedicalInfoSchema.extend({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  personId: UUIDSchema.nullable(),
})

// === Create/Update Schemas ===
export const MedicalInfoCreateDTOSchema = BaseMedicalInfoSchema.extend({
  personId: UUIDSchema,
})

export const MedicalInfoUpdateDTOSchema = BaseMedicalInfoSchema.extend({
  personId: UUIDSchema,
})

// === List Schemas ===
export const MedicalInfoListDTOSchema = z.array(MedicalInfoDTOSchema)

// === Params Schemas ===
export const MedicalInfoListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
})

// === Form Schema ===
export const MedicalInfoFormValuesSchema = z.object({
  disabilityCategory: z.number().nullable(),
  disabilityGroup: z.number().nullable(),
  disabilityReason: z.number().nullable(),
  operationLocationAndDate: z.string().nullable(),
  additionalInfo: z.string().nullable(),
})

export const MedicalInfoFormValidationSchema = z.object({
  disabilityCategory: z.number(ZodErrorMessages.REQUIRED),
  disabilityGroup: z.number(ZodErrorMessages.REQUIRED),
  disabilityReason: z.number(ZodErrorMessages.REQUIRED),
  operationLocationAndDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  additionalInfo: z.string().nullable().optional(),
})
