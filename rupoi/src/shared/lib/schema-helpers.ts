import { z } from 'zod'
import { PageableResponseSchema, SortResponseSchema } from '@rupoi/shared/model'

/**
 * Создает схему для пагинированного списка
 */
export function createPaginatedListSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: PageableResponseSchema,
    numberOfElements: z.number(),
    size: z.number(),
    content: z.array(itemSchema),
    number: z.number(),
    sort: SortResponseSchema,
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  })
}

/**
 * Создает схему для patch статуса заказа
 */
export function createStatusPatchSchema() {
  return z.object({
    newStatus: z.string({ message: 'Invalid string' }),
    comment: z.string({ message: 'Invalid string' }),
  })
}
