import { z } from 'zod'
import { IDSchema, UUIDSchema } from '../schemas'

// Order File DTO Schema
export const OrderFileDTOSchema = z.object({
  id: IDSchema,
  orderId: IDSchema,
  fileId: UUIDSchema,
})

export const OrderFileCreateDTOSchema = z.object({
  fileId: UUIDSchema,
  filePath: z.string(),
  fileSize: z.number(),
  fileName: z.string(),
})

export type OrderFileDTO = z.infer<typeof OrderFileDTOSchema>
export type OrderFileCreateDTO = z.infer<typeof OrderFileCreateDTOSchema>

