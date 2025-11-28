import { z } from 'zod'
import {
  InvoiceOttobockDTOSchema,
  InvoiceOttobockListDTOSchema,
  InvoiceOttobockCreateDTOSchema,
  InvoiceOttobockUpdateDTOSchema,
  InvoiceOttobockListParamsSchema,
  InvoiceOttobockStatusPatchDTOSchema,
  InvoiceOttobockFormValuesSchema,
  InvoiceOttobockFilterFormValuesSchema,
} from './schemas'

export type InvoiceOttobockDTO = z.infer<typeof InvoiceOttobockDTOSchema>
export type InvoiceOttobockListDTO = z.infer<typeof InvoiceOttobockListDTOSchema>
export type InvoiceOttobockCreateDTO = z.infer<typeof InvoiceOttobockCreateDTOSchema>
export type InvoiceOttobockUpdateDTO = z.infer<typeof InvoiceOttobockUpdateDTOSchema>
export type InvoiceOttobockListParams = z.infer<typeof InvoiceOttobockListParamsSchema>
export type InvoiceOttobockStatusPatchDTO = z.infer<typeof InvoiceOttobockStatusPatchDTOSchema>
export type InvoiceOttobockFormValues = z.infer<typeof InvoiceOttobockFormValuesSchema>
export type InvoiceOttobockFilterFormValues = z.infer<typeof InvoiceOttobockFilterFormValuesSchema>


