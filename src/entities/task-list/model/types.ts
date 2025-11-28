import { z } from "zod";
import {
  TaskListDTOSchema,
  TaskListListDTOSchema,
  TaskListCreateParamsSchema,
  TaskDTOSchema,
  TaskArrayDTOSchema,
  TaskCreateDTOSchema,
  TaskUpdateDTOSchema,
} from "./schemas";

// Task List types
export type TaskListDTO = z.infer<typeof TaskListDTOSchema>;
export type TaskListListDTO = z.infer<typeof TaskListListDTOSchema>;
export type TaskListCreateParams = z.infer<typeof TaskListCreateParamsSchema>;

// Task types
export type TaskDTO = z.infer<typeof TaskDTOSchema>;
export type TaskArrayDTO = z.infer<typeof TaskArrayDTOSchema>;
export type TaskCreateDTO = z.infer<typeof TaskCreateDTOSchema>;
export type TaskUpdateDTO = z.infer<typeof TaskUpdateDTOSchema>;


