import { z } from "zod";
import {
  ReferenceDTOSchema,
  ReferenceListAllDTOSchema,
  ReferenceListPagedDTOSchema,
  ReferenceListAllParamsSchema,
  ReferenceListPagedParamsSchema,
} from "./schemas.ts";

export type ReferenceDTO = z.infer<typeof ReferenceDTOSchema>;
export type ReferenceListAllDTO = z.infer<typeof ReferenceListAllDTOSchema>;
export type ReferenceListPagedDTO = z.infer<typeof ReferenceListPagedDTOSchema>;
export type ReferenceListAllParams = z.infer<typeof ReferenceListAllParamsSchema>;
export type ReferenceListPagedParams = z.infer<typeof ReferenceListPagedParamsSchema>;
