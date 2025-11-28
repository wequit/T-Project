import { z } from "zod";

// === Base Schemas ===
const UserSchema = z.object({
  username: z.string(),
});

// === Task Schema ===
export const TaskDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  created: z.string(),
  deadline: z.string().nullable(),
  executor: UserSchema.optional(),
  creator: UserSchema.optional(),
  done: z.boolean(),
});

// TaskListDTO - это массив задач (используется в API /tasks/{listId}/all)
export const TaskArrayDTOSchema = z.array(TaskDTOSchema);

// === Task Create/Update Schemas ===
export const TaskCreateDTOSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string(),
  deadline: z.string(),
  executor: z.object({
    username: z.string(),
  }).optional(),
});

export const TaskUpdateDTOSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
  executor: z.object({
    username: z.string(),
  }).optional(),
  done: z.boolean().optional(),
});

// === DTO Schemas ===
export const TaskListDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  tasks: z.array(TaskDTOSchema).nullable().optional(),
});

export const TaskListListDTOSchema = z.array(TaskListDTOSchema);

// === Create/Update Schemas ===
export const TaskListCreateParamsSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
});


