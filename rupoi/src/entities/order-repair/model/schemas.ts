import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema, IDSchema, ReferenceDTOSchema, OrderFileDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, OrderStatus, OrderPriority, ServiceFeeType } from '@rupoi/shared/constant'
import { getFittingDTOSchema } from '@rupoi/entities/fitting/model/schemas'
import { getMaterialDTOSchema } from '@rupoi/entities/material/model/schemas'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts";
import { FittingKind } from '@rupoi/entities/fitting'
import { MaterialKind } from '@rupoi/entities/material'
import { PersonDTOSchema } from '@rupoi/entities/person'
import { WorkshopRegistryDTOSchema } from '@rupoi/entities/workshop-registry'

// === Base Schema ===
const BaseOrderRepairSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.INVALID_NUMBER),
  serviceType: z.enum(ServiceFeeType),
  orderCost: z.number(ZodErrorMessages.INVALID_NUMBER),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING),
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  priority: z.enum(OrderPriority),
})

const BaseOrderRepairWithPersonSchema = BaseOrderRepairSchema.extend({
  personId: UUIDSchema,
})

// === DTO Schema ===
export const OrderRepairDTOSchema = z.object({
  id: IDSchema,
  productTypeRef: ReferenceDTOSchema.nullable(),
  repairCost: z.number(ZodErrorMessages.INVALID_NUMBER),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  productTypeId: z.number(ZodErrorMessages.INVALID_NUMBER),
  priority: z.enum(OrderPriority),
  serviceType: z.enum(ServiceFeeType),
  orderStatus: z.enum(OrderStatus),
  person: PersonDTOSchema,
  orderNumber: z.string(ZodErrorMessages.INVALID_STRING).nullable().optional(),
  createdAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
  updatedAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
  fittingOrders: z.array(getFittingDTOSchema(FittingKind.REPAIR)).nullable(),
  materials: z.array(getMaterialDTOSchema(MaterialKind.REPAIR)).nullable(),
  workshop: WorkshopRegistryDTOSchema.nullable(),
  deadline: z.string(ZodErrorMessages.INVALID_STRING).nullable(), // date (YYYY-MM-DD)
  files: z.array(OrderFileDTOSchema).nullable(),
})

// === List Schemas ===
export const OrderRepairListDTOSchema = createPaginatedListSchema(OrderRepairDTOSchema)

// === Create/Update Schemas ===
export const OrderRepairCreateDTOSchema = BaseOrderRepairWithPersonSchema
export const OrderRepairUpdateDTOSchema = BaseOrderRepairWithPersonSchema

// === Params Schemas ===
export const OrderRepairListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
  status: z.array(z.enum(OrderStatus)).optional(),
  priority: z.enum(OrderPriority).optional(),
  query: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const OrderRepairStatusPatchDTOSchema = z.object({
  newStatus: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const OrderRepairFormValuesSchema = z.object({
  productTypeId: z.number().nullable(),
  priority: z.enum(OrderPriority).nullable(),
  serviceType: z.enum(ServiceFeeType).nullable(),
  orderCost: z.number().nullable(),
  manufacturingDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  notes: z.string().nullable(),
})

// Order Repair Filter Form Schema
export const OrderRepairFilterFormValuesSchema = z.object({
  query: z.string().nullable(),
  status: z.array(z.enum(OrderStatus)),
  priority: z.string().nullable(),
})

export const OrderRepairFormValidationSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.REQUIRED),
  priority: z.enum(OrderPriority, ZodErrorMessages.REQUIRED),
  serviceType: z.enum(ServiceFeeType, ZodErrorMessages.REQUIRED),
  orderCost: z.number(ZodErrorMessages.REQUIRED),
  manufacturingDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  deliveryDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})

// === Assign Workshop Schema ===
export const OrderRepairAssignWorkshopDTOSchema = z.object({
  workshopId: IDSchema,
  deadline: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
})

