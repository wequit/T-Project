import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema, ReferenceDTOSchema, IDSchema, OrderFileDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, OrderStatus, ProsthesisSide, OrderType, ActivityType, OrderPriority, ServiceFeeType } from '@rupoi/shared/constant'
import { ComponentProsthesisDTOSchema } from '@rupoi/entities/component-prosthesis/model/schemas'
import { getFittingDTOSchema } from '@rupoi/entities/fitting/model/schemas'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts";
import { FittingKind } from '@rupoi/entities/fitting'
import { PersonDTOSchema } from '@rupoi/entities/person'
import { WorkshopRegistryDTOSchema } from '@rupoi/entities/workshop-registry'

// === Base Schema ===
const BaseOrderProsthesisSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.INVALID_NUMBER),
  diagnosisId: z.number(ZodErrorMessages.INVALID_NUMBER),
  prosthesisSide: z.enum(ProsthesisSide),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
  priority: z.enum(OrderPriority),
  serviceType: z.enum(ServiceFeeType),
  weightKg: z.number(ZodErrorMessages.INVALID_NUMBER),
  height: z.number(ZodErrorMessages.INVALID_NUMBER),
  activityLevel: z.enum(ActivityType),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING),
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
})

const BaseOrderProsthesisWithPersonSchema = BaseOrderProsthesisSchema.extend({
  personId: UUIDSchema,
})

// === DTO Schema ===
export const OrderProsthesisDTOSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  productTypeRef: ReferenceDTOSchema.nullable(),
  diagnosisRef: ReferenceDTOSchema.nullable(),
  prosthesisSide: z.enum(ProsthesisSide),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
  weightKg: z.number(ZodErrorMessages.INVALID_NUMBER),
  height: z.number(ZodErrorMessages.INVALID_NUMBER),
  activityLevel: z.enum(ActivityType),
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
  components: z.array(ComponentProsthesisDTOSchema).nullable(),
  fittingOrders: z.array(getFittingDTOSchema(FittingKind.PROSTHESIS)).nullable(),
  workshop: WorkshopRegistryDTOSchema.nullable(),
  deadline: z.string(ZodErrorMessages.INVALID_STRING).nullable(), // date (YYYY-MM-DD)
  files: z.array(OrderFileDTOSchema).nullable(),
})

// === List Schemas ===
export const OrderProsthesisListDTOSchema = createPaginatedListSchema(OrderProsthesisDTOSchema)

// === Create/Update Schemas ===
export const OrderProsthesisCreateDTOSchema = BaseOrderProsthesisWithPersonSchema
export const OrderProsthesisUpdateDTOSchema = BaseOrderProsthesisWithPersonSchema

// === Params Schemas ===
export const OrderProsthesisListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
  status: z.array(z.enum(OrderStatus)).optional(),
  priority: z.enum(OrderPriority).optional(),
  query: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const OrderProsthesisStatusPatchDTOSchema = z.object({
  newStatus: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const OrderProsthesisFormValuesSchema = z.object({
  productTypeId: z.number().nullable(),
  diagnosisId: z.number().nullable(),
  prosthesisSide: z.enum(ProsthesisSide).nullable(),
  hospitalized: z.boolean().nullable(),
  orderType: z.enum(OrderType).nullable(),
  priority: z.enum(OrderPriority).nullable(),
  serviceType: z.enum(ServiceFeeType).nullable(),
  weightKg: z.number().nullable(),
  height: z.number().nullable(),
  activityLevel: z.enum(ActivityType).nullable(),
  manufacturingDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  notes: z.string().nullable(),
})

// Order Prosthesis Filter Form Schema
export const OrderProsthesisFilterFormValuesSchema = z.object({
  query: z.string().nullable(),
  status: z.array(z.enum(OrderStatus)),
  priority: z.string().nullable(),
})

export const OrderProsthesisFormValidationSchema = z.object({
  productTypeId: z.number(ZodErrorMessages.REQUIRED),
  diagnosisId: z.number(ZodErrorMessages.REQUIRED),
  prosthesisSide: z.enum(ProsthesisSide, ZodErrorMessages.REQUIRED),
  hospitalized: z.boolean(ZodErrorMessages.REQUIRED),
  orderType: z.enum(OrderType, ZodErrorMessages.REQUIRED),
  priority: z.enum(OrderPriority, ZodErrorMessages.REQUIRED),
  serviceType: z.enum(ServiceFeeType, ZodErrorMessages.REQUIRED),
  weightKg: z.number(ZodErrorMessages.REQUIRED),
  height: z.number(ZodErrorMessages.REQUIRED),
  activityLevel: z.enum(ActivityType, ZodErrorMessages.REQUIRED),
  manufacturingDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  deliveryDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})

// === Assign Workshop Schema ===
export const OrderProsthesisAssignWorkshopDTOSchema = z.object({
  workshopId: IDSchema,
  deadline: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
})
