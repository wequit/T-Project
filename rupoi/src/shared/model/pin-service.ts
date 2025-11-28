import { z } from 'zod'
import { ZodErrorMessages } from '@rupoi/shared/constant'

// === PIN Service Schemas ===

export const PinDataParamsSchema = z.object({
  pin: z.string(ZodErrorMessages.INVALID_STRING),
})

export const PinDataResponseSchema = z.object({
  pin: z.string().nullable(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  patronymic: z.string().nullable(),
  gender: z.string().nullable(),
  maritalStatus: z.string().nullable(),
  maritalStatusId: z.number().nullable(),
  nationality: z.string().nullable(),
  nationalityId: z.number().nullable(),
  citizenship: z.string().nullable(),
  citizenshipId: z.number().nullable(),
  pinBlocked: z.boolean().nullable(),
  pinGenerationDate: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  deathDate: z.string().nullable(),
  faultcode: z.string().nullable(),
  faultstring: z.string().nullable(),
})

// === Types ===

export type PinDataParams = z.infer<typeof PinDataParamsSchema>
export type PinDataResponse = z.infer<typeof PinDataResponseSchema>

