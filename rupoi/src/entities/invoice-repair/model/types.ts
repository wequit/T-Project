import { z } from 'zod'
import {
  InvoiceRepairDTOSchema,
  InvoiceRepairListDTOSchema,
  InvoiceRepairCreateDTOSchema,
  InvoiceRepairUpdateDTOSchema,
  InvoiceRepairListParamsSchema,
  InvoiceRepairStatusPatchDTOSchema,
  InvoiceRepairFormValuesSchema,
  InvoiceRepairFilterFormValuesSchema,
} from './schemas'

export type InvoiceRepairDTO = z.infer<typeof InvoiceRepairDTOSchema>
export type InvoiceRepairListDTO = z.infer<typeof InvoiceRepairListDTOSchema>
export type InvoiceRepairCreateDTO = z.infer<typeof InvoiceRepairCreateDTOSchema>
export type InvoiceRepairUpdateDTO = z.infer<typeof InvoiceRepairUpdateDTOSchema>
export type InvoiceRepairListParams = z.infer<typeof InvoiceRepairListParamsSchema>
export type InvoiceRepairStatusPatchDTO = z.infer<typeof InvoiceRepairStatusPatchDTOSchema>
export type InvoiceRepairFormValues = z.infer<typeof InvoiceRepairFormValuesSchema>
export type InvoiceRepairFilterFormValues = z.infer<typeof InvoiceRepairFilterFormValuesSchema>

