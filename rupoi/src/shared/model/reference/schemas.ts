import { z } from "zod";
import { ZodErrorMessages } from "@rupoi/shared/constant";
import { PageableDTOSchema, PageableResponseSchema, SortResponseSchema } from "@rupoi/shared/model";

export const ReferenceDTOSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  code: z.string(ZodErrorMessages.INVALID_STRING),
  nameRu: z.string(ZodErrorMessages.INVALID_STRING),
  nameKy: z.string(ZodErrorMessages.INVALID_STRING),
  isActive: z.boolean(ZodErrorMessages.INVALID_BOOLEAN),
  orderNumber: z.number(ZodErrorMessages.INVALID_NUMBER),
  createdDate: z.string(ZodErrorMessages.INVALID_STRING),
  lastModifiedDate: z.string(ZodErrorMessages.INVALID_STRING),
});

export const ReferenceListAllParamsSchema = z.object({
  code: z.string().optional(),
  nameKy: z.string().optional(),
  nameRu: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const ReferenceListPagedParamsSchema = z.object({
  code: z.string().optional(),
  nameKy: z.string().optional(),
  nameRu: z.string().optional(),
  isActive: z.boolean().optional(),
  pageable: PageableDTOSchema.optional(),
});

export const ReferenceListAllDTOSchema = z.array(ReferenceDTOSchema);

export const ReferenceListPagedDTOSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  pageable: PageableResponseSchema,
  numberOfElements: z.number(),
  size: z.number(),
  content: z.array(ReferenceDTOSchema),
  number: z.number(),
  sort: SortResponseSchema,
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});
