import { z } from 'zod'
import {
  MedicalInfoDTOSchema,
  MedicalInfoCreateDTOSchema,
  MedicalInfoUpdateDTOSchema,
  MedicalInfoListDTOSchema,
  MedicalInfoListParamsSchema,
  MedicalInfoFormValuesSchema,
} from './schemas'

// === DTO Types ===
export type MedicalInfoDTO = z.infer<typeof MedicalInfoDTOSchema>
export type MedicalInfoListParams = z.infer<typeof MedicalInfoListParamsSchema>
export type MedicalInfoCreateDTO = z.infer<typeof MedicalInfoCreateDTOSchema>
export type MedicalInfoUpdateDTO = z.infer<typeof MedicalInfoUpdateDTOSchema>
export type MedicalInfoListDTO = z.infer<typeof MedicalInfoListDTOSchema>

// === Form Types ===
export type MedicalInfoFormValues = z.infer<typeof MedicalInfoFormValuesSchema>

