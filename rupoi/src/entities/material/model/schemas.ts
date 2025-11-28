import { z } from 'zod'
import { IDSchema } from '@rupoi/shared/model'
import { ZodErrorMessages, MeasurementUnit } from '@rupoi/shared/constant'
import { MaterialKind } from '../constant'

const BaseMaterialSchema = z.object({
  articleNumber: z.string(ZodErrorMessages.INVALID_STRING),
  materialName: z.string(ZodErrorMessages.INVALID_STRING),
  measurementUnit: z.enum(MeasurementUnit),
  quantity: z.number(ZodErrorMessages.INVALID_NUMBER),
  amount: z.number(ZodErrorMessages.INVALID_NUMBER),
  note: z.string(ZodErrorMessages.INVALID_STRING),
})

export const MaterialDTOSchema = BaseMaterialSchema.extend({
  id: IDSchema.nullable(),
})

const OttobockMaterialDTOSchema = MaterialDTOSchema.extend({
  ottobockOrderId: IDSchema.nullable(),
})

const ReadyMadeMaterialDTOSchema = MaterialDTOSchema.extend({
  readyPoiOrderId: IDSchema.nullable(),
})

const RepairMaterialDTOSchema = MaterialDTOSchema.extend({
  repairOrderId: IDSchema.nullable(),
})

const OttobockMaterialCreateDTOSchema = OttobockMaterialDTOSchema.omit({
  id: true,
})

const ReadyMadeMaterialCreateDTOSchema = ReadyMadeMaterialDTOSchema.omit({
  id: true,
})

const RepairMaterialCreateDTOSchema = RepairMaterialDTOSchema.omit({
  id: true,
})

const OttobockMaterialUpdateDTOSchema = OttobockMaterialDTOSchema

const ReadyMadeMaterialUpdateDTOSchema = ReadyMadeMaterialDTOSchema

const RepairMaterialUpdateDTOSchema = RepairMaterialDTOSchema

export const MaterialDTOSchemas = {
  [MaterialKind.OTTOBOCK]: OttobockMaterialDTOSchema,
  [MaterialKind.READY_MADE]: ReadyMadeMaterialDTOSchema,
  [MaterialKind.REPAIR]: RepairMaterialDTOSchema,
} as const

export const MaterialCreateDTOSchemas = {
  [MaterialKind.OTTOBOCK]: OttobockMaterialCreateDTOSchema,
  [MaterialKind.READY_MADE]: ReadyMadeMaterialCreateDTOSchema,
  [MaterialKind.REPAIR]: RepairMaterialCreateDTOSchema,
} as const

export const MaterialUpdateDTOSchemas = {
  [MaterialKind.OTTOBOCK]: OttobockMaterialUpdateDTOSchema,
  [MaterialKind.READY_MADE]: ReadyMadeMaterialUpdateDTOSchema,
  [MaterialKind.REPAIR]: RepairMaterialUpdateDTOSchema,
} as const

export function getMaterialCreateDTOSchema(kind: MaterialKind) {
  return MaterialCreateDTOSchemas[kind]
}

export function getMaterialUpdateDTOSchema(kind: MaterialKind) {
  return MaterialUpdateDTOSchemas[kind]
}

export function getMaterialDTOSchema(kind: MaterialKind) {
  return MaterialDTOSchemas[kind]
}

// === List Schemas ===

export const MaterialListDTOSchema = z.array(MaterialDTOSchema.extend({
  ottobockOrderId: IDSchema.optional(),
  readyPoiOrderId: IDSchema.optional(),
  repairOrderId: IDSchema.optional(),
}))

// === Form Schemas ===

// Material Form Schema
export const MaterialFormValuesSchema = z.object({
  articleNumber: z.string().nullable(),
  materialName: z.string().nullable(),
  measurementUnit: z.enum(MeasurementUnit).nullable(),
  quantity: z.number().nullable(),
  amount: z.number().nullable(),
  note: z.string().nullable(),
})

export const MaterialFormValidationSchema = z.object({
  articleNumber: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  materialName: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  measurementUnit: z.enum(MeasurementUnit, ZodErrorMessages.REQUIRED),
  quantity: z.number(ZodErrorMessages.REQUIRED),
  amount: z.number(ZodErrorMessages.REQUIRED),
  note: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})