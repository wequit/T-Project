import { z } from 'zod'
import {
  PageableDTOSchema,
  IDSchema
} from '@rupoi/shared/model'
import { ZodErrorMessages } from '@rupoi/shared/constant'

const BaseComponentProsthesisSchema = z.object({
  semiFinishedProductId: IDSchema,
  semiFinishedProductCode: z.string(ZodErrorMessages.INVALID_STRING),
  size: z.string(ZodErrorMessages.INVALID_STRING),
  quantityLeft: z.number(ZodErrorMessages.INVALID_NUMBER),
  quantityRight: z.number(ZodErrorMessages.INVALID_NUMBER),
})

export const ComponentProsthesisDTOSchema = z.object({
  id: IDSchema,
  prosthesisOrderId: IDSchema.nullable(),
  componentNameId: IDSchema, // В ответе API другое имя
  componentCode: z.string(ZodErrorMessages.INVALID_STRING),
  size: z.string(ZodErrorMessages.INVALID_STRING),
  leftQuantity: z.number(ZodErrorMessages.INVALID_NUMBER),
  rightQuantity: z.number(ZodErrorMessages.INVALID_NUMBER),
})

export const ComponentProsthesisListDTOSchema = z.array(ComponentProsthesisDTOSchema)

export const ComponentProsthesisCreateDTOSchema = BaseComponentProsthesisSchema.extend({
  prosthesisOrderId: IDSchema,
})

export const ComponentProsthesisUpdateDTOSchema = BaseComponentProsthesisSchema.extend({
  prosthesisOrderId: IDSchema,
})

export const ComponentProsthesisListParamsSchema = z.object({
  pageable: PageableDTOSchema.optional(),
})

// === Form Schemas ===

// Component Prosthesis Form Schema
export const ComponentProsthesisFormValuesSchema = z.object({
  semiFinishedProductId: IDSchema.nullable(),
  semiFinishedProductCode: z.string().nullable(),
  size: z.string().nullable(),
  quantityLeft: z.number().nullable(),
  quantityRight: z.number().nullable(),
})

export const ComponentProsthesisFormValidationSchema = z.object({
  semiFinishedProductId: z.number(ZodErrorMessages.REQUIRED),
  semiFinishedProductCode: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  size: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  quantityLeft: z.number(ZodErrorMessages.REQUIRED).min(0, ZodErrorMessages.REQUIRED),
  quantityRight: z.number(ZodErrorMessages.REQUIRED).min(0, ZodErrorMessages.REQUIRED),
})