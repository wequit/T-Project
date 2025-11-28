import { z } from 'zod'
import {
  OrderOttobockDTOSchema,
  OrderOttobockListDTOSchema,
  OrderOttobockCreateDTOSchema,
  OrderOttobockUpdateDTOSchema,
  OrderOttobockListParamsSchema,
  OrderOttobockStatusPatchDTOSchema,
  OrderOttobockFormValuesSchema,
  OrderOttobockFilterFormValuesSchema,
  OrderOttobockAssignWorkshopDTOSchema,
} from './schemas'

export type OrderOttobockDTO = z.infer<typeof OrderOttobockDTOSchema>
export type OrderOttobockListDTO = z.infer<typeof OrderOttobockListDTOSchema>
export type OrderOttobockCreateDTO = z.infer<typeof OrderOttobockCreateDTOSchema>
export type OrderOttobockUpdateDTO = z.infer<typeof OrderOttobockUpdateDTOSchema>
export type OrderOttobockListParams = z.infer<typeof OrderOttobockListParamsSchema>
export type OrderOttobockStatusPatchDTO = z.infer<typeof OrderOttobockStatusPatchDTOSchema>
export type OrderOttobockFormValues = z.infer<typeof OrderOttobockFormValuesSchema>
export type OrderOttobockFilterFormValues = z.infer<typeof OrderOttobockFilterFormValuesSchema>
export type OrderOttobockAssignWorkshopDTO = z.infer<typeof OrderOttobockAssignWorkshopDTOSchema>

// Используем общие типы из shared
export type { OrderStatusHistory as OrderOttobockStatusHistory, OrderStatusHistoryItem as OrderOttobockStatusHistoryItem } from '@rupoi/shared/model'
