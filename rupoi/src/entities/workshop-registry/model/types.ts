import { z } from 'zod'
import {
  WorkshopRegistryDTOSchema,
  WorkshopRegistryListDTOSchema,
  WorkshopRegistryCreateDTOSchema,
  WorkshopRegistryUpdateDTOSchema,
  WorkshopRegistryListParamsSchema,
  WorkshopRegistryFormValuesSchema,
} from './schemas'

export type WorkshopRegistryDTO = z.infer<typeof WorkshopRegistryDTOSchema>
export type WorkshopRegistryListDTO = z.infer<typeof WorkshopRegistryListDTOSchema>
export type WorkshopRegistryCreateDTO = z.infer<typeof WorkshopRegistryCreateDTOSchema>
export type WorkshopRegistryUpdateDTO = z.infer<typeof WorkshopRegistryUpdateDTOSchema>
export type WorkshopRegistryListParams = z.infer<typeof WorkshopRegistryListParamsSchema>
export type WorkshopRegistryFormValues = z.infer<typeof WorkshopRegistryFormValuesSchema>

