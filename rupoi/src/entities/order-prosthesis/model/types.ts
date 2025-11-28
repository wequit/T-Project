import { z } from 'zod'
import {
  OrderProsthesisDTOSchema,
  OrderProsthesisListDTOSchema,
  OrderProsthesisCreateDTOSchema,
  OrderProsthesisUpdateDTOSchema,
  OrderProsthesisListParamsSchema,
  OrderProsthesisStatusPatchDTOSchema,
  OrderProsthesisFormValuesSchema,
  OrderProsthesisFilterFormValuesSchema,
  OrderProsthesisAssignWorkshopDTOSchema,
} from './schemas'

export type OrderProsthesisDTO = z.infer<typeof OrderProsthesisDTOSchema>
export type OrderProsthesisListDTO = z.infer<typeof OrderProsthesisListDTOSchema>
export type OrderProsthesisCreateDTO = z.infer<typeof OrderProsthesisCreateDTOSchema>
export type OrderProsthesisUpdateDTO = z.infer<typeof OrderProsthesisUpdateDTOSchema>
export type OrderProsthesisListParams = z.infer<typeof OrderProsthesisListParamsSchema>
export type OrderProsthesisStatusPatchDTO = z.infer<typeof OrderProsthesisStatusPatchDTOSchema>
export type OrderProsthesisFormValues = z.infer<typeof OrderProsthesisFormValuesSchema>
export type OrderProsthesisFilterFormValues = z.infer<typeof OrderProsthesisFilterFormValuesSchema>
export type OrderProsthesisAssignWorkshopDTO = z.infer<typeof OrderProsthesisAssignWorkshopDTOSchema>

// Используем общие типы из shared
export type { OrderStatusHistory as OrderProsthesisStatusHistory, OrderStatusHistoryItem as OrderProsthesisStatusHistoryItem } from '@rupoi/shared/model'
