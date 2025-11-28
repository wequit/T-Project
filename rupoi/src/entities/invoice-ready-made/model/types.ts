import { z } from 'zod'
import {
  InvoiceReadyMadeDTOSchema,
  InvoiceReadyMadeListDTOSchema,
  InvoiceReadyMadeCreateDTOSchema,
  InvoiceReadyMadeUpdateDTOSchema,
  InvoiceReadyMadeListParamsSchema,
  InvoiceReadyMadeStatusPatchDTOSchema,
  InvoiceReadyMadeFormValuesSchema,
  InvoiceReadyMadeFilterFormValuesSchema,
} from './schemas'

export type InvoiceReadyMadeDTO = z.infer<typeof InvoiceReadyMadeDTOSchema>
export type InvoiceReadyMadeListDTO = z.infer<typeof InvoiceReadyMadeListDTOSchema>
export type InvoiceReadyMadeCreateDTO = z.infer<typeof InvoiceReadyMadeCreateDTOSchema>
export type InvoiceReadyMadeUpdateDTO = z.infer<typeof InvoiceReadyMadeUpdateDTOSchema>
export type InvoiceReadyMadeListParams = z.infer<typeof InvoiceReadyMadeListParamsSchema>
export type InvoiceReadyMadeStatusPatchDTO = z.infer<typeof InvoiceReadyMadeStatusPatchDTOSchema>
export type InvoiceReadyMadeFormValues = z.infer<typeof InvoiceReadyMadeFormValuesSchema>
export type InvoiceReadyMadeFilterFormValues = z.infer<typeof InvoiceReadyMadeFilterFormValuesSchema>

