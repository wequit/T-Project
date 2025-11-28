import { z } from 'zod'
import {
  InvoiceProsthesisDTOSchema,
  InvoiceProsthesisListDTOSchema,
  InvoiceProsthesisCreateDTOSchema,
  InvoiceProsthesisUpdateDTOSchema,
  InvoiceProsthesisListParamsSchema,
  InvoiceProsthesisStatusPatchDTOSchema,
  InvoiceProsthesisFormValuesSchema,
  InvoiceProsthesisFilterFormValuesSchema,
} from './schemas'

export type InvoiceProsthesisDTO = z.infer<typeof InvoiceProsthesisDTOSchema>
export type InvoiceProsthesisListDTO = z.infer<typeof InvoiceProsthesisListDTOSchema>
export type InvoiceProsthesisCreateDTO = z.infer<typeof InvoiceProsthesisCreateDTOSchema>
export type InvoiceProsthesisUpdateDTO = z.infer<typeof InvoiceProsthesisUpdateDTOSchema>
export type InvoiceProsthesisListParams = z.infer<typeof InvoiceProsthesisListParamsSchema>
export type InvoiceProsthesisStatusPatchDTO = z.infer<typeof InvoiceProsthesisStatusPatchDTOSchema>
export type InvoiceProsthesisFormValues = z.infer<typeof InvoiceProsthesisFormValuesSchema>
export type InvoiceProsthesisFilterFormValues = z.infer<typeof InvoiceProsthesisFilterFormValuesSchema>

