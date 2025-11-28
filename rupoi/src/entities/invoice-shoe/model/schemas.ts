import { z } from 'zod'
import { PageableDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, InvoiceStatus, OrderPriority } from '@rupoi/shared/constant'
import { OrderShoeDTOSchema } from '@rupoi/entities/order-shoe/model/schemas'
import { createPaginatedListSchema } from "@rupoi/shared/lib/schema-helpers.ts"

// === Base Schema ===
const BaseInvoiceShoeSchema = z.object({
  number: z.string(ZodErrorMessages.INVALID_STRING),
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
})

// === DTO Schema ===
export const InvoiceShoeDTOSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  number: z.string(ZodErrorMessages.INVALID_STRING),
  order: OrderShoeDTOSchema,
  createdAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  status: z.enum(InvoiceStatus),
})

// === List Schemas ===
export const InvoiceShoeListDTOSchema = createPaginatedListSchema(InvoiceShoeDTOSchema)

// === Create/Update Schemas ===
export const InvoiceShoeCreateDTOSchema = BaseInvoiceShoeSchema.extend({
  orderId: z.number(ZodErrorMessages.INVALID_NUMBER),
})

export const InvoiceShoeUpdateDTOSchema = BaseInvoiceShoeSchema

// === Params Schemas ===
export const InvoiceShoeListParamsSchema = z.object({
  status: z.array(z.string()).optional(),
  priority: z.enum(OrderPriority).optional(),
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
  q: z.string().optional(),
  orderId: z.number().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const InvoiceShoeStatusPatchDTOSchema = z.object({
  status: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const InvoiceShoeFormValuesSchema = z.object({
  number: z.string().nullable(),
  requiredCopy: z.boolean().nullable(),
  qualityControlPassed: z.boolean().nullable(),
  notes: z.string().nullable(),
})

// Invoice Shoe Filter Form Schema
export const InvoiceShoeFilterFormValuesSchema = z.object({
  q: z.string().nullable(),
  status: z.array(z.string()),
  priority: z.string().nullable(),
  createdAtFrom: z.string().nullable(),
  createdAtTo: z.string().nullable(),
  orderId: z.number().nullable(),
})

export const InvoiceShoeFormValidationSchema = z.object({
  number: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  requiredCopy: z.boolean(ZodErrorMessages.REQUIRED),
  qualityControlPassed: z.boolean(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})
