import { z } from 'zod'
import { PageableDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, InvoiceStatus, OrderPriority } from '@rupoi/shared/constant'
import { OrderReadyMadeDTOSchema } from '@rupoi/entities/order-ready-made/model/schemas'
import { createPaginatedListSchema } from "@rupoi/shared/lib/schema-helpers.ts"

// === Base Schema ===
const BaseInvoiceReadyMadeSchema = z.object({
  number: z.string(ZodErrorMessages.INVALID_STRING),
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
})

// === DTO Schema ===
export const InvoiceReadyMadeDTOSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  number: z.string(ZodErrorMessages.INVALID_STRING),
  order: OrderReadyMadeDTOSchema,
  createdAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
  requiredCopy: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  qualityControlPassed: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  status: z.enum(InvoiceStatus),
})

// === List Schemas ===
export const InvoiceReadyMadeListDTOSchema = createPaginatedListSchema(InvoiceReadyMadeDTOSchema)

// === Create/Update Schemas ===
export const InvoiceReadyMadeCreateDTOSchema = BaseInvoiceReadyMadeSchema.extend({
  orderId: z.number(ZodErrorMessages.INVALID_NUMBER),
})

export const InvoiceReadyMadeUpdateDTOSchema = BaseInvoiceReadyMadeSchema

// === Params Schemas ===
export const InvoiceReadyMadeListParamsSchema = z.object({
  status: z.array(z.string()).optional(),
  priority: z.enum(OrderPriority).optional(),
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
  q: z.string().optional(),
  orderId: z.number().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const InvoiceReadyMadeStatusPatchDTOSchema = z.object({
  status: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const InvoiceReadyMadeFormValuesSchema = z.object({
  number: z.string().nullable(),
  requiredCopy: z.boolean().nullable(),
  qualityControlPassed: z.boolean().nullable(),
  notes: z.string().nullable(),
})

// Invoice Ready Made Filter Form Schema
export const InvoiceReadyMadeFilterFormValuesSchema = z.object({
  q: z.string().nullable(),
  status: z.array(z.string()),
  priority: z.string().nullable(),
  createdAtFrom: z.string().nullable(),
  createdAtTo: z.string().nullable(),
  orderId: z.number().nullable(),
})

export const InvoiceReadyMadeFormValidationSchema = z.object({
  number: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  requiredCopy: z.boolean(ZodErrorMessages.REQUIRED),
  qualityControlPassed: z.boolean(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})
