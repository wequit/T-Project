import { z } from 'zod'
import { 
  FittingListDTOSchema,
  FittingDTOSchemas,
  FittingCreateDTOSchemas,
  FittingUpdateDTOSchemas,
  FittingFormValuesSchema,
} from './schemas'
import { FittingKind } from '../constant'

// === DTO Types ===

export type FittingListDTO = z.infer<typeof FittingListDTOSchema>

export type OttobockFittingDTO = z.infer<typeof FittingDTOSchemas[FittingKind.OTTOBOCK]>
export type ProsthesisFittingDTO = z.infer<typeof FittingDTOSchemas[FittingKind.PROSTHESIS]>
export type ReadyMadeFittingDTO = z.infer<typeof FittingDTOSchemas[FittingKind.READY_MADE]>
export type ShoeFittingDTO = z.infer<typeof FittingDTOSchemas[FittingKind.SHOE]>
export type RepairFittingDTO = z.infer<typeof FittingDTOSchemas[FittingKind.REPAIR]>

export type OttobockFittingCreateDTO = z.infer<typeof FittingCreateDTOSchemas[FittingKind.OTTOBOCK]>
export type ProsthesisFittingCreateDTO = z.infer<typeof FittingCreateDTOSchemas[FittingKind.PROSTHESIS]>
export type ReadyMadeFittingCreateDTO = z.infer<typeof FittingCreateDTOSchemas[FittingKind.READY_MADE]>
export type ShoeFittingCreateDTO = z.infer<typeof FittingCreateDTOSchemas[FittingKind.SHOE]>
export type RepairFittingCreateDTO = z.infer<typeof FittingCreateDTOSchemas[FittingKind.REPAIR]>

export type OttobockFittingUpdateDTO = z.infer<typeof FittingUpdateDTOSchemas[FittingKind.OTTOBOCK]>
export type ProsthesisFittingUpdateDTO = z.infer<typeof FittingUpdateDTOSchemas[FittingKind.PROSTHESIS]>
export type ReadyMadeFittingUpdateDTO = z.infer<typeof FittingUpdateDTOSchemas[FittingKind.READY_MADE]>
export type ShoeFittingUpdateDTO = z.infer<typeof FittingUpdateDTOSchemas[FittingKind.SHOE]>
export type RepairFittingUpdateDTO = z.infer<typeof FittingUpdateDTOSchemas[FittingKind.REPAIR]>

export type FittingDTO =
  | OttobockFittingDTO
  | ProsthesisFittingDTO
  | ReadyMadeFittingDTO
  | ShoeFittingDTO
  | RepairFittingDTO

export type FittingCreateDTO =
  | OttobockFittingCreateDTO
  | ProsthesisFittingCreateDTO
  | ReadyMadeFittingCreateDTO
  | ShoeFittingCreateDTO
  | RepairFittingCreateDTO

export type FittingUpdateDTO =
  | OttobockFittingUpdateDTO
  | ProsthesisFittingUpdateDTO
  | ReadyMadeFittingUpdateDTO
  | ShoeFittingUpdateDTO
  | RepairFittingUpdateDTO

// === Form Types ===

export type FittingFormValues = z.infer<typeof FittingFormValuesSchema>
