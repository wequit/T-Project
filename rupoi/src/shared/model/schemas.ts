import {z} from "zod";
import {ZodErrorMessages} from "@rupoi/shared/constant";

export const SortResponseSchema = z.array(z.object({
    ascending: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
    descending: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
    direction: z.enum(['ASC', 'DESC']),
    ignoreCase: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
    nullHandling: z.enum(['NATIVE', 'NULLS_FIRST', 'NULLS_LAST']),
    property: z.string(),
    // unsorted: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
    // sorted: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
    // empty: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  }))

export const PageableDTOSchema = z.object({
  page: z.number(ZodErrorMessages.INVALID_NUMBER),
  size: z.number(ZodErrorMessages.INVALID_NUMBER),
  sort: z.array(z.string(ZodErrorMessages.INVALID_STRING), ZodErrorMessages.INVALID_ARRAY_VALUES).optional(),
})

export const PageableResponseSchema = z.object({
  pageNumber: z.number(ZodErrorMessages.INVALID_NUMBER),
  unpaged: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  paged: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  pageSize: z.number(ZodErrorMessages.INVALID_NUMBER),
  offset: z.number(ZodErrorMessages.INVALID_NUMBER),
  sort: SortResponseSchema,
});
export const UUIDSchema = z.string(ZodErrorMessages.INVALID_UUID)
export const IDSchema = z.union([z.number(ZodErrorMessages.INVALID_NUMBER), z.string(ZodErrorMessages.INVALID_UUID)]);
