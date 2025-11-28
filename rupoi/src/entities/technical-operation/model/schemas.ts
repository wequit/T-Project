import { z } from 'zod'
import { IDSchema } from '@rupoi/shared/model'
import { ZodErrorMessages } from '@rupoi/shared/constant'

const BaseTechnicalOperationSchema = z.object({
  operationId: IDSchema,
  executorName: z.string(ZodErrorMessages.INVALID_STRING).nullable(),
  executionDate: z.string(ZodErrorMessages.INVALID_STRING).nullable(),
  qualityControlMark: z.boolean({ message: 'Invalid boolean' }),
})

export const TechnicalOperationDTOSchema = z.object({
  id: IDSchema,
  operationNameId: IDSchema.nullable(),
  executorName: z.string(ZodErrorMessages.INVALID_STRING),
  executionDate: z.string(ZodErrorMessages.INVALID_STRING),
  qualityControlMark: z.boolean({ message: 'Invalid boolean' }),
  shoeOrderId: IDSchema.nullable(),
})

export const TechnicalOperationCreateDTOSchema = BaseTechnicalOperationSchema.extend({
  shoeOrderId: IDSchema.nullable(),
})

export const TechnicalOperationUpdateDTOSchema = BaseTechnicalOperationSchema.extend({
  id: IDSchema,
  shoeOrderId: IDSchema.nullable(),
})

// === List Schemas ===

export const TechnicalOperationListDTOSchema = z.array(TechnicalOperationDTOSchema)

// === Form Schemas ===

// Technical Operation Form Schema
export const TechnicalOperationFormValuesSchema = z.object({
  operationId: z.union([z.number(ZodErrorMessages.INVALID_NUMBER), z.string(ZodErrorMessages.INVALID_UUID)]).nullable(),
  executorName: z.string().nullable(),
  executionDate: z.string().nullable(),
  qualityControlMark: z.boolean(),
})

export const TechnicalOperationFormValidationSchema = z.object({
  operationId: z.union([z.number(ZodErrorMessages.REQUIRED), z.string(ZodErrorMessages.REQUIRED)], ZodErrorMessages.REQUIRED),
  executorName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  executionDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  qualityControlMark: z.boolean(),
})