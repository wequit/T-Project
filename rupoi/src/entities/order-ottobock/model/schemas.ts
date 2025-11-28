import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema, IDSchema, ReferenceDTOSchema, OrderFileDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, OrderStatus, ProsthesisSide, OrderType, OrderPriority, ServiceFeeType } from '@rupoi/shared/constant'
import { getFittingDTOSchema } from '@rupoi/entities/fitting/model/schemas'
import { getMaterialDTOSchema } from '@rupoi/entities/material/model/schemas'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts";
import { FittingKind } from '@rupoi/entities/fitting'
import { MaterialKind } from '@rupoi/entities/material'
import { PersonDTOSchema } from '@rupoi/entities/person'
import { WorkshopRegistryDTOSchema } from '@rupoi/entities/workshop-registry'

// === Base Schema ===
const BaseOrderOttobockSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.INVALID_NUMBER),
  diagnosisId: z.number(ZodErrorMessages.INVALID_NUMBER),
  prosthesisSide: z.enum(ProsthesisSide),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
  orderStatus: z.enum(OrderStatus),
  serviceType: z.enum(ServiceFeeType),
  orderCost: z.number(ZodErrorMessages.INVALID_NUMBER),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING),
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  priority: z.enum(OrderPriority),
})

const BaseOrderOttobockWithPersonSchema = BaseOrderOttobockSchema.extend({
  personId: UUIDSchema,
})

// === DTO Schema ===
export const OrderOttobockDTOSchema = z.object({
  id: IDSchema,
  productTypeRef: ReferenceDTOSchema.nullable(),
  diagnosisRef: ReferenceDTOSchema.nullable(),
  prosthesisSide: z.enum(ProsthesisSide),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
  orderCost: z.number(ZodErrorMessages.INVALID_NUMBER),
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
  fittingOrders: z.array(getFittingDTOSchema(FittingKind.OTTOBOCK)).nullable(),
  materials: z.array(getMaterialDTOSchema(MaterialKind.OTTOBOCK)).nullable(),
  workshop: WorkshopRegistryDTOSchema.nullable(),
  deadline: z.string(ZodErrorMessages.INVALID_STRING).nullable(), // date (YYYY-MM-DD)
  files: z.array(OrderFileDTOSchema).nullable(),
})

// === List Schemas ===
export const OrderOttobockListDTOSchema = createPaginatedListSchema(OrderOttobockDTOSchema)

// === Create/Update Schemas ===
export const OrderOttobockCreateDTOSchema = BaseOrderOttobockWithPersonSchema.omit({
  orderStatus: true,
})
export const OrderOttobockUpdateDTOSchema = BaseOrderOttobockWithPersonSchema.omit({
  orderStatus: true,
})

// === Params Schemas ===
export const OrderOttobockListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
  status: z.array(z.enum(OrderStatus)).optional(),
  priority: z.enum(OrderPriority).optional(),
  query: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const OrderOttobockStatusPatchDTOSchema = z.object({
  newStatus: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const OrderOttobockFormValuesSchema = z.object({
  productTypeId: z.number().nullable(),
  diagnosisId: z.number().nullable(),
  prosthesisSide: z.enum(ProsthesisSide).nullable(),
  hospitalized: z.boolean().nullable(),
  orderCost: z.number().nullable(),
  manufacturingDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  notes: z.string().nullable(),
  priority: z.enum(OrderPriority).nullable(),
  serviceType: z.enum(ServiceFeeType).nullable(),
  orderType: z.enum(OrderType).nullable(),
})

// Order Ottobock Filter Form Schema
export const OrderOttobockFilterFormValuesSchema = z.object({
  query: z.string().nullable(),
  status: z.array(z.enum(OrderStatus)),
  priority: z.string().nullable(),
})

export const OrderOttobockFormValidationSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.REQUIRED),
  diagnosisId: z.number(ZodErrorMessages.REQUIRED),
  prosthesisSide: z.enum(ProsthesisSide, ZodErrorMessages.REQUIRED),
  hospitalized: z.boolean(ZodErrorMessages.REQUIRED),
  orderType: z.enum(OrderType, ZodErrorMessages.REQUIRED),
  priority: z.enum(OrderPriority, ZodErrorMessages.REQUIRED),
  serviceType: z.enum(ServiceFeeType, ZodErrorMessages.REQUIRED),
  orderCost: z.number(ZodErrorMessages.REQUIRED),
  manufacturingDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  deliveryDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})

// === Assign Workshop Schema ===
export const OrderOttobockAssignWorkshopDTOSchema = z.object({
  workshopId: IDSchema,
  deadline: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
})

