import {z} from "zod";
import {
  IDSchema,
  PageableDTOSchema,
  PageableResponseSchema,
  SortResponseSchema,
  UUIDSchema
} from "./schemas.ts";

export type SortResponse = z.infer<typeof SortResponseSchema>
export type PageableDTO = z.infer<typeof PageableDTOSchema>
export type PageableResponse = z.infer<typeof PageableResponseSchema>
export type UUID = z.infer<typeof UUIDSchema>
export type ID = z.infer<typeof IDSchema>

export type SelectOption = {
  label: string
  value: string | number | boolean
}