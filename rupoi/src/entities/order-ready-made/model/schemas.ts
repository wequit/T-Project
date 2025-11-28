import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema, IDSchema, ReferenceDTOSchema, OrderFileDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, OrderStatus, OrderType, OrderPriority, ServiceFeeType } from '@rupoi/shared/constant'
import { getFittingDTOSchema } from '@rupoi/entities/fitting/model/schemas'
import { getMaterialDTOSchema } from '@rupoi/entities/material/model/schemas'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts";
import { FittingKind } from '@rupoi/entities/fitting'
import { MaterialKind } from '@rupoi/entities/material'
import { PersonDTOSchema } from '@rupoi/entities/person'
import { WorkshopRegistryDTOSchema } from '@rupoi/entities/workshop-registry'

// === Base Schema ===
const BaseOrderReadyMadeSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.INVALID_NUMBER),
  diagnosisId: z.number(ZodErrorMessages.INVALID_NUMBER),
  orderType: z.enum(OrderType),
  orderStatus: z.enum(OrderStatus),
  serviceType: z.enum(ServiceFeeType),
  orderCost: z.number(ZodErrorMessages.INVALID_NUMBER),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING),
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  priority: z.enum(OrderPriority),
})

const BaseOrderReadyMadeWithPersonSchema = BaseOrderReadyMadeSchema.extend({
  personId: UUIDSchema,
})

// === DTO Schema ===
export const OrderReadyMadeDTOSchema = z.object({
  id: IDSchema,
  productTypeRef: ReferenceDTOSchema.nullable(),
  diagnosisRef: ReferenceDTOSchema.nullable(),
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
  fittingOrders: z.array(getFittingDTOSchema(FittingKind.READY_MADE)).nullable(),
  materials: z.array(getMaterialDTOSchema(MaterialKind.READY_MADE)).nullable(),
  workshop: WorkshopRegistryDTOSchema.nullable(),
  deadline: z.string(ZodErrorMessages.INVALID_STRING).nullable(), // date (YYYY-MM-DD)
  files: z.array(OrderFileDTOSchema).nullable(),
})

// === List Schemas ===
export const OrderReadyMadeListDTOSchema = createPaginatedListSchema(OrderReadyMadeDTOSchema)

// === Create/Update Schemas ===
export const OrderReadyMadeCreateDTOSchema = BaseOrderReadyMadeWithPersonSchema
export const OrderReadyMadeUpdateDTOSchema = BaseOrderReadyMadeWithPersonSchema

// === Params Schemas ===
export const OrderReadyMadeListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
  status: z.array(z.enum(OrderStatus)).optional(),
  priority: z.enum(OrderPriority).optional(),
  query: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const OrderReadyMadeStatusPatchDTOSchema = z.object({
  newStatus: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const OrderReadyMadeFormValuesSchema = z.object({
  productTypeId: z.number().nullable(),
  diagnosisId: z.number().nullable(),
  orderCost: z.number().nullable(),
  manufacturingDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  notes: z.string().nullable(),
  orderType: z.enum(OrderType).nullable(),
  priority: z.enum(OrderPriority).nullable(),
  serviceType: z.enum(ServiceFeeType).nullable(),
  orderStatus: z.enum(OrderStatus).nullable(),
})

// Order Ready Made Filter Form Schema
export const OrderReadyMadeFilterFormValuesSchema = z.object({
  query: z.string().nullable(),
  status: z.array(z.enum(OrderStatus)),
  priority: z.string().nullable(),
})

export const OrderReadyMadeFormValidationSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.REQUIRED),
  diagnosisId: z.number(ZodErrorMessages.REQUIRED),
  orderType: z.enum(OrderType, ZodErrorMessages.REQUIRED),
  serviceType: z.enum(ServiceFeeType, ZodErrorMessages.REQUIRED),
  orderCost: z.number(ZodErrorMessages.REQUIRED),
  manufacturingDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  deliveryDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  priority: z.enum(OrderPriority, ZodErrorMessages.REQUIRED),
})

// === Assign Workshop Schema ===
export const OrderReadyMadeAssignWorkshopDTOSchema = z.object({
  workshopId: IDSchema,
  deadline: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
})

