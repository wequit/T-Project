import { z } from 'zod'
import {
  OrderReadyMadeDTOSchema,
  OrderReadyMadeListDTOSchema,
  OrderReadyMadeCreateDTOSchema,
  OrderReadyMadeUpdateDTOSchema,
  OrderReadyMadeListParamsSchema,
  OrderReadyMadeStatusPatchDTOSchema,
  OrderReadyMadeFormValuesSchema,
  OrderReadyMadeFilterFormValuesSchema,
  OrderReadyMadeAssignWorkshopDTOSchema,
} from './schemas'

export type OrderReadyMadeDTO = z.infer<typeof OrderReadyMadeDTOSchema>
export type OrderReadyMadeListDTO = z.infer<typeof OrderReadyMadeListDTOSchema>
export type OrderReadyMadeCreateDTO = z.infer<typeof OrderReadyMadeCreateDTOSchema>
export type OrderReadyMadeUpdateDTO = z.infer<typeof OrderReadyMadeUpdateDTOSchema>
export type OrderReadyMadeListParams = z.infer<typeof OrderReadyMadeListParamsSchema>
export type OrderReadyMadeStatusPatchDTO = z.infer<typeof OrderReadyMadeStatusPatchDTOSchema>
export type OrderReadyMadeFormValues = z.infer<typeof OrderReadyMadeFormValuesSchema>
export type OrderReadyMadeFilterFormValues = z.infer<typeof OrderReadyMadeFilterFormValuesSchema>
export type OrderReadyMadeAssignWorkshopDTO = z.infer<typeof OrderReadyMadeAssignWorkshopDTOSchema>

// Используем общие типы из shared
export type { OrderStatusHistory as OrderReadyMadeStatusHistory, OrderStatusHistoryItem as OrderReadyMadeStatusHistoryItem } from '@rupoi/shared/model'
