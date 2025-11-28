import { z } from 'zod'
import {
  ComponentProsthesisCreateDTOSchema,
  ComponentProsthesisDTOSchema,
  ComponentProsthesisListDTOSchema,
  ComponentProsthesisListParamsSchema,
  ComponentProsthesisUpdateDTOSchema,
  ComponentProsthesisFormValuesSchema,
} from './schemas'

// === DTO Types ===

export type ComponentProsthesisDTO = z.infer<typeof ComponentProsthesisDTOSchema>
export type ComponentProsthesisCreateDTO = z.infer<typeof ComponentProsthesisCreateDTOSchema>
export type ComponentProsthesisUpdateDTO = z.infer<typeof ComponentProsthesisUpdateDTOSchema>
export type ComponentProsthesisListDTO = z.infer<typeof ComponentProsthesisListDTOSchema>
export type ComponentProsthesisListParams = z.infer<typeof ComponentProsthesisListParamsSchema>

// === Form Types ===

export type ComponentProsthesisFormValues = z.infer<typeof ComponentProsthesisFormValuesSchema>
