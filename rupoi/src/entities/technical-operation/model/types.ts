import { z } from 'zod'
import { 
  TechnicalOperationCreateDTOSchema, 
  TechnicalOperationDTOSchema, 
  TechnicalOperationListDTOSchema,
  TechnicalOperationUpdateDTOSchema,
  TechnicalOperationFormValuesSchema,
} from './schemas'

// === DTO Types ===

export type TechnicalOperationDTO = z.infer<typeof TechnicalOperationDTOSchema>
export type TechnicalOperationListDTO = z.infer<typeof TechnicalOperationListDTOSchema>
export type TechnicalOperationCreateDTO = z.infer<typeof TechnicalOperationCreateDTOSchema>
export type TechnicalOperationUpdateDTO = z.infer<typeof TechnicalOperationUpdateDTOSchema>

// === Form Types ===

export type TechnicalOperationFormValues = z.infer<typeof TechnicalOperationFormValuesSchema>
