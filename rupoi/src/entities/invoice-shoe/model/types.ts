import { z } from 'zod'
import {
  InvoiceShoeDTOSchema,
  InvoiceShoeListDTOSchema,
  InvoiceShoeCreateDTOSchema,
  InvoiceShoeUpdateDTOSchema,
  InvoiceShoeListParamsSchema,
  InvoiceShoeStatusPatchDTOSchema,
  InvoiceShoeFormValuesSchema,
  InvoiceShoeFilterFormValuesSchema,
} from './schemas'

export type InvoiceShoeDTO = z.infer<typeof InvoiceShoeDTOSchema>
export type InvoiceShoeListDTO = z.infer<typeof InvoiceShoeListDTOSchema>
export type InvoiceShoeCreateDTO = z.infer<typeof InvoiceShoeCreateDTOSchema>
export type InvoiceShoeUpdateDTO = z.infer<typeof InvoiceShoeUpdateDTOSchema>
export type InvoiceShoeListParams = z.infer<typeof InvoiceShoeListParamsSchema>
export type InvoiceShoeStatusPatchDTO = z.infer<typeof InvoiceShoeStatusPatchDTOSchema>
export type InvoiceShoeFormValues = z.infer<typeof InvoiceShoeFormValuesSchema>
export type InvoiceShoeFilterFormValues = z.infer<typeof InvoiceShoeFilterFormValuesSchema>

