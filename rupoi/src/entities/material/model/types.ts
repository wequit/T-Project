import { z } from 'zod'
import { 
  MaterialDTOSchema, 
  MaterialListDTOSchema,
  MaterialDTOSchemas,
  MaterialCreateDTOSchemas,
  MaterialUpdateDTOSchemas,
  MaterialFormValuesSchema,
} from './schemas'
import { MaterialKind } from '../constant'

// === DTO Types ===

export type MaterialDTO = z.infer<typeof MaterialDTOSchema>
export type MaterialListDTO = z.infer<typeof MaterialListDTOSchema>

export type OttobockMaterialDTO = z.infer<typeof MaterialDTOSchemas[MaterialKind.OTTOBOCK]>
export type ReadyMadeMaterialDTO = z.infer<typeof MaterialDTOSchemas[MaterialKind.READY_MADE]>
export type RepairMaterialDTO = z.infer<typeof MaterialDTOSchemas[MaterialKind.REPAIR]>

export type OttobockMaterialCreateDTO = z.infer<typeof MaterialCreateDTOSchemas[MaterialKind.OTTOBOCK]>
export type ReadyMadeMaterialCreateDTO = z.infer<typeof MaterialCreateDTOSchemas[MaterialKind.READY_MADE]>
export type RepairMaterialCreateDTO = z.infer<typeof MaterialCreateDTOSchemas[MaterialKind.REPAIR]>

export type OttobockMaterialUpdateDTO = z.infer<typeof MaterialUpdateDTOSchemas[MaterialKind.OTTOBOCK]>
export type ReadyMadeMaterialUpdateDTO = z.infer<typeof MaterialUpdateDTOSchemas[MaterialKind.READY_MADE]>
export type RepairMaterialUpdateDTO = z.infer<typeof MaterialUpdateDTOSchemas[MaterialKind.REPAIR]>

export type MaterialCreateDTO =
  | OttobockMaterialCreateDTO
  | ReadyMadeMaterialCreateDTO
  | RepairMaterialCreateDTO

export type MaterialUpdateDTO =
  | OttobockMaterialUpdateDTO
  | ReadyMadeMaterialUpdateDTO
  | RepairMaterialUpdateDTO

// === Form Types ===

export type MaterialFormValues = z.infer<typeof MaterialFormValuesSchema>
