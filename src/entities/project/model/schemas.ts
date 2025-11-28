import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
});

const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  created: z.string(),
  deadline: z.string().nullable(),
  executor: UserSchema.optional(),
  creator: UserSchema.optional(),
  done: z.boolean(),
});

const TaskListSchema = z.object({
  id: z.number(),
  title: z.string(),
  tasks: z.array(TaskSchema).optional(),
});

const BoardSchema = z.object({
  id: z.number(),
  title: z.string(),
  taskLists: z.array(TaskListSchema).optional(),
});

// === DTO Schemas ===
export const ProjectDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  users: z.array(UserSchema),
  boards: z.array(BoardSchema).nullable().optional(),
});

export const ProjectListDTOSchema = z.array(ProjectDTOSchema);

// === Create Schemas ===
export const ProjectCreateParamsSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
});