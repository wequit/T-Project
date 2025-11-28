import { z } from 'zod'
import { IDSchema } from '@rupoi/shared/model'
import { ZodErrorMessages } from '@rupoi/shared/constant'
import { FittingKind } from '../constant'

const BaseFittingSchema = z.object({
  callDate: z.string(ZodErrorMessages.INVALID_STRING),
  appearanceDate: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
})

export const FittingDTOSchema = BaseFittingSchema.extend({
  id: IDSchema,
  createdAt: z.string(ZodErrorMessages.INVALID_STRING),
  updatedAt: z.string(ZodErrorMessages.INVALID_STRING),
})

const OttobockFittingDTOSchema = FittingDTOSchema.extend({
  ottobockOrderId: IDSchema.nullable(),
})

const ProsthesisFittingDTOSchema = FittingDTOSchema.extend({
  prosthesisOrderId: IDSchema.nullable(),
})

const ReadyMadeFittingDTOSchema = FittingDTOSchema.extend({
  readyPoiOrderId: IDSchema.nullable(),
})

const ShoeFittingDTOSchema = FittingDTOSchema.extend({
  shoeOrderId: IDSchema.nullable(),
})

const RepairFittingDTOSchema = FittingDTOSchema.extend({
  repairOrderId: IDSchema.nullable(),
})

const OttobockFittingCreateDTOSchema = OttobockFittingDTOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const ProsthesisFittingCreateDTOSchema = ProsthesisFittingDTOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const ReadyMadeFittingCreateDTOSchema = ReadyMadeFittingDTOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const ShoeFittingCreateDTOSchema = ShoeFittingDTOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const RepairFittingCreateDTOSchema = RepairFittingDTOSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const OttobockFittingUpdateDTOSchema = OttobockFittingDTOSchema.omit({
  createdAt: true,
  updatedAt: true,
})

const ProsthesisFittingUpdateDTOSchema = ProsthesisFittingDTOSchema.omit({
  createdAt: true,
  updatedAt: true,
})

const ReadyMadeFittingUpdateDTOSchema = ReadyMadeFittingDTOSchema.omit({
  createdAt: true,
  updatedAt: true,
})

const ShoeFittingUpdateDTOSchema = ShoeFittingDTOSchema.omit({
  createdAt: true,
  updatedAt: true,
})

const RepairFittingUpdateDTOSchema = RepairFittingDTOSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const FittingDTOSchemas = {
  [FittingKind.OTTOBOCK]: OttobockFittingDTOSchema,
  [FittingKind.PROSTHESIS]: ProsthesisFittingDTOSchema,
  [FittingKind.READY_MADE]: ReadyMadeFittingDTOSchema,
  [FittingKind.SHOE]: ShoeFittingDTOSchema,
  [FittingKind.REPAIR]: RepairFittingDTOSchema,
} as const

export const FittingUpdateDTOSchemas = {
  [FittingKind.OTTOBOCK]: OttobockFittingUpdateDTOSchema,
  [FittingKind.PROSTHESIS]: ProsthesisFittingUpdateDTOSchema,
  [FittingKind.READY_MADE]: ReadyMadeFittingUpdateDTOSchema,
  [FittingKind.SHOE]: ShoeFittingUpdateDTOSchema,
  [FittingKind.REPAIR]: RepairFittingUpdateDTOSchema,
}

export const FittingCreateDTOSchemas = {
  [FittingKind.OTTOBOCK]: OttobockFittingCreateDTOSchema,
  [FittingKind.PROSTHESIS]: ProsthesisFittingCreateDTOSchema,
  [FittingKind.READY_MADE]: ReadyMadeFittingCreateDTOSchema,
  [FittingKind.SHOE]: ShoeFittingCreateDTOSchema,
  [FittingKind.REPAIR]: RepairFittingCreateDTOSchema,
} as const


export function getFittingCreateDTOSchema(kind: FittingKind) {
  return FittingCreateDTOSchemas[kind]
}

export function getFittingUpdateDTOSchema(kind: FittingKind) {
  return FittingUpdateDTOSchemas[kind]
}
export function getFittingDTOSchema(kind: FittingKind) {
  return FittingDTOSchemas[kind]
}


// === List Schemas ===

export const FittingListDTOSchema = z.array(z.union([
  OttobockFittingDTOSchema,
  ProsthesisFittingDTOSchema,
  ReadyMadeFittingDTOSchema,
  ShoeFittingDTOSchema,
  RepairFittingDTOSchema,
]))

// === Form Schemas ===

// Fitting Form Schema
export const FittingFormValuesSchema = z.object({
  callDate: z.string().nullable(),
  appearanceDate: z.string().nullable(),
  comment: z.string().nullable(),
})

export const FittingFormValidationSchema = z.object({
  callDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  appearanceDate: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
  comment: z.string(ZodErrorMessages.REQUIRED).nonempty(ZodErrorMessages.REQUIRED),
})