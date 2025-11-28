import { z } from 'zod'
import { PageableDTOSchema, UUIDSchema, IDSchema, ReferenceDTOSchema, OrderFileDTOSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, OrderStatus, OrderType, OrderPriority, ServiceFeeType } from '@rupoi/shared/constant'
import { getFittingDTOSchema } from '@rupoi/entities/fitting/model/schemas'
import { TechnicalOperationDTOSchema } from '@rupoi/entities/technical-operation/model/schemas'
import {createPaginatedListSchema} from "@rupoi/shared/lib/schema-helpers.ts";
import { FittingKind } from '@rupoi/entities/fitting'
import { PersonDTOSchema } from '@rupoi/entities/person'
import { WorkshopRegistryDTOSchema } from '@rupoi/entities/workshop-registry'

// === Base Schema ===
const BaseOrderShoeSchema = z.object({
  diagnosisId: z.number(ZodErrorMessages.INVALID_NUMBER),
  modelId: z.number(ZodErrorMessages.INVALID_NUMBER),
  shoeColorId: z.number(ZodErrorMessages.INVALID_NUMBER),
  materialId: z.number(ZodErrorMessages.INVALID_NUMBER),
  heelHeight: z.number(ZodErrorMessages.INVALID_NUMBER),
  heelMaterialId: z.number(ZodErrorMessages.INVALID_NUMBER),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
  manufacturingDate: z.string(ZodErrorMessages.INVALID_STRING),
  deliveryDate: z.string(ZodErrorMessages.INVALID_STRING),
  notes: z.string(ZodErrorMessages.INVALID_STRING),
  priority: z.enum(OrderPriority),
  serviceType: z.enum(ServiceFeeType),
})

const BaseOrderShoeWithPersonSchema = BaseOrderShoeSchema.extend({
  personId: UUIDSchema,
})

// === DTO Schema ===
export const OrderShoeDTOSchema = z.object({
  id: IDSchema,
  diagnosisRef: ReferenceDTOSchema.nullable(),
  modelRef: ReferenceDTOSchema.nullable(),
  shoeColorRef: ReferenceDTOSchema.nullable(),
  materialRef: ReferenceDTOSchema.nullable(),
  heelMaterialRef: ReferenceDTOSchema.nullable(),
  heelHeight: z.number(ZodErrorMessages.INVALID_NUMBER),
  hospitalized: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderType: z.enum(OrderType),
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
  fittingOrders: z.array(getFittingDTOSchema(FittingKind.SHOE)).nullable(),
  technicalOperations: z.array(TechnicalOperationDTOSchema).nullable(),
  workshop: WorkshopRegistryDTOSchema.nullable(),
  deadline: z.string(ZodErrorMessages.INVALID_STRING).nullable(), // date (YYYY-MM-DD)
  files: z.array(OrderFileDTOSchema).nullable(),
})

// === List Schemas ===
export const OrderShoeListDTOSchema = createPaginatedListSchema(OrderShoeDTOSchema)

// === Create/Update Schemas ===
export const OrderShoeCreateDTOSchema = BaseOrderShoeWithPersonSchema
export const OrderShoeUpdateDTOSchema = BaseOrderShoeWithPersonSchema

// === Params Schemas ===
export const OrderShoeListParamsSchema = z.object({
  personId: UUIDSchema.optional(),
  status: z.array(z.enum(OrderStatus)).optional(),
  priority: z.enum(OrderPriority).optional(),
  query: z.string().optional(),
  pageable: PageableDTOSchema.optional(),
})

// === Status Patch Schema ===
export const OrderShoeStatusPatchDTOSchema = z.object({
  newStatus: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

// === Form Schemas ===
export const OrderShoeFormValuesSchema = z.object({
  diagnosisId: z.number().nullable(),
  modelId: z.number().nullable(),
  shoeColorId: z.number().nullable(),
  materialId: z.number().nullable(),
  heelHeight: z.number().nullable(),
  heelMaterialId: z.number().nullable(),
  hospitalized: z.boolean().nullable(),
  priority: z.enum(OrderPriority).nullable(),
  serviceType: z.enum(ServiceFeeType).nullable(),
  orderType: z.enum(OrderType).nullable(),
  manufacturingDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  notes: z.string().nullable(),
})

// Order Shoe Filter Form Schema
export const OrderShoeFilterFormValuesSchema = z.object({
  query: z.string().nullable(),
  status: z.array(z.enum(OrderStatus)),
  priority: z.string().nullable(),
})

export const OrderShoeFormValidationSchema = z.object({
  diagnosisId: z.number(ZodErrorMessages.REQUIRED),
  modelId: z.number(ZodErrorMessages.REQUIRED),
  shoeColorId: z.number(ZodErrorMessages.REQUIRED),
  materialId: z.number(ZodErrorMessages.REQUIRED),
  heelHeight: z.number(ZodErrorMessages.REQUIRED),
  heelMaterialId: z.number(ZodErrorMessages.REQUIRED),
  hospitalized: z.boolean(ZodErrorMessages.REQUIRED),
  priority: z.enum(OrderPriority, ZodErrorMessages.REQUIRED),
  serviceType: z.enum(ServiceFeeType, ZodErrorMessages.REQUIRED),
  orderType: z.enum(OrderType, ZodErrorMessages.REQUIRED),
  manufacturingDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  deliveryDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  notes: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})

// === Assign Workshop Schema ===
export const OrderShoeAssignWorkshopDTOSchema = z.object({
  workshopId: IDSchema,
  deadline: z.string(ZodErrorMessages.INVALID_STRING), // date (YYYY-MM-DD)
})
