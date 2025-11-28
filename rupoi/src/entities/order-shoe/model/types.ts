import { z } from 'zod'
import {
  OrderShoeDTOSchema,
  OrderShoeListDTOSchema,
  OrderShoeCreateDTOSchema,
  OrderShoeUpdateDTOSchema,
  OrderShoeListParamsSchema,
  OrderShoeStatusPatchDTOSchema,
  OrderShoeFormValuesSchema,
  OrderShoeFilterFormValuesSchema,
  OrderShoeAssignWorkshopDTOSchema,
} from './schemas'

export type OrderShoeDTO = z.infer<typeof OrderShoeDTOSchema>
export type OrderShoeListDTO = z.infer<typeof OrderShoeListDTOSchema>
export type OrderShoeCreateDTO = z.infer<typeof OrderShoeCreateDTOSchema>
export type OrderShoeUpdateDTO = z.infer<typeof OrderShoeUpdateDTOSchema>
export type OrderShoeListParams = z.infer<typeof OrderShoeListParamsSchema>
export type OrderShoeStatusPatchDTO = z.infer<typeof OrderShoeStatusPatchDTOSchema>
export type OrderShoeFormValues = z.infer<typeof OrderShoeFormValuesSchema>
export type OrderShoeFilterFormValues = z.infer<typeof OrderShoeFilterFormValuesSchema>
export type OrderShoeAssignWorkshopDTO = z.infer<typeof OrderShoeAssignWorkshopDTOSchema>

// Используем общие типы из shared
export type { OrderStatusHistory as OrderShoeStatusHistory, OrderStatusHistoryItem as OrderShoeStatusHistoryItem } from '@rupoi/shared/model'
