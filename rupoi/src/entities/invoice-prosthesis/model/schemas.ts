import { z } from 'zod'
import { PageableDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, InvoiceStatus, OrderPriority } from '@rupoi/shared/constant'
import { OrderProsthesisDTOSchema } from '@rupoi/entities/order-prosthesis/model/schemas'
import { createPaginatedListSchema } from "@rupoi/shared/lib/schema-helpers.ts"

// === Base Schema ===
const BaseInvoiceProsthesisSchema = z.object({
  number: z.string(ZodErrorMessages.INVALID_STRING),
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
})

// === DTO Schema ===
export const InvoiceProsthesisDTOSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  number: z.string(ZodErrorMessages.INVALID_STRING),
  order: OrderProsthesisDTOSchema,
  createdAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  status: z.enum(InvoiceStatus),
})

// === List Schemas ===
export const InvoiceProsthesisListDTOSchema = createPaginatedListSchema(InvoiceProsthesisDTOSchema)

// === Create/Update Schemas ===
export const InvoiceProsthesisCreateDTOSchema = BaseInvoiceProsthesisSchema.extend({
  orderId: z.number(ZodErrorMessages.INVALID_NUMBER),
})

export const InvoiceProsthesisUpdateDTOSchema = BaseInvoiceProsthesisSchema

// === Params Schemas ===
export const InvoiceProsthesisListParamsSchema = z.object({
  status: z.array(z.string()).optional(),
  priority: z.enum(OrderPriority).optional(),
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
  q: z.string().optional(),
  orderId: z.number().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const InvoiceProsthesisStatusPatchDTOSchema = z.object({
  status: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const InvoiceProsthesisFormValuesSchema = z.object({
  number: z.string().nullable(),
  requiredCopy: z.boolean().nullable(),
  qualityControlPassed: z.boolean().nullable(),
  notes: z.string().nullable(),
})

// Invoice Prosthesis Filter Form Schema
export const InvoiceProsthesisFilterFormValuesSchema = z.object({
  q: z.string().nullable(),
  status: z.array(z.string()),
  priority: z.string().nullable(),
  createdAtFrom: z.string().nullable(),
  createdAtTo: z.string().nullable(),
  orderId: z.number().nullable(),
})

export const InvoiceProsthesisFormValidationSchema = z.object({
  number: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  requiredCopy: z.boolean(ZodErrorMessages.REQUIRED),
  qualityControlPassed: z.boolean(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})
