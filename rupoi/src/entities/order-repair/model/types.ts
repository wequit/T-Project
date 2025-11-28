import { z } from 'zod'
import {
  OrderRepairDTOSchema,
  OrderRepairListDTOSchema,
  OrderRepairCreateDTOSchema,
  OrderRepairUpdateDTOSchema,
  OrderRepairListParamsSchema,
  OrderRepairStatusPatchDTOSchema,
  OrderRepairFormValuesSchema,
  OrderRepairFilterFormValuesSchema,
  OrderRepairAssignWorkshopDTOSchema,
} from './schemas'

export type OrderRepairDTO = z.infer<typeof OrderRepairDTOSchema>
export type OrderRepairListDTO = z.infer<typeof OrderRepairListDTOSchema>
export type OrderRepairCreateDTO = z.infer<typeof OrderRepairCreateDTOSchema>
export type OrderRepairUpdateDTO = z.infer<typeof OrderRepairUpdateDTOSchema>
export type OrderRepairListParams = z.infer<typeof OrderRepairListParamsSchema>
export type OrderRepairStatusPatchDTO = z.infer<typeof OrderRepairStatusPatchDTOSchema>
export type OrderRepairFormValues = z.infer<typeof OrderRepairFormValuesSchema>
export type OrderRepairFilterFormValues = z.infer<typeof OrderRepairFilterFormValuesSchema>
export type OrderRepairAssignWorkshopDTO = z.infer<typeof OrderRepairAssignWorkshopDTOSchema>

// Используем общие типы из shared
export type { OrderStatusHistory as OrderRepairStatusHistory, OrderStatusHistoryItem as OrderRepairStatusHistoryItem } from '@rupoi/shared/model'
