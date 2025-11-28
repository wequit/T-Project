import { z } from "zod";
import {
  ProjectDTOSchema,
  ProjectListDTOSchema,
  ProjectCreateParamsSchema,
} from "./schemas";

export type ProjectDTO = z.infer<typeof ProjectDTOSchema>;
export type ProjectListDTO = z.infer<typeof ProjectListDTOSchema>;
export type ProjectCreateParams = z.infer<typeof ProjectCreateParamsSchema>;

