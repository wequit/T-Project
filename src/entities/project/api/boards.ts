import { z } from "zod";
import { apiClient } from "@/shared/api/client";
import { parseOrThrow } from "@/shared/lib";

// === Schemas ===
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
  tasks: z.array(TaskSchema).nullable().optional(),
});

const BoardDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  taskLists: z.array(TaskListSchema).nullable().optional(),
});

// === Types ===
export type BoardDTO = z.infer<typeof BoardDTOSchema>;

// === API ===
const BASE = "/boards";

async function create(projectId: number, title: string): Promise<BoardDTO> {
  const res = await apiClient.post(`${BASE}/create/${projectId}`, null, {
    params: { title },
  });
  return parseOrThrow(BoardDTOSchema, res.data, `POST /boards/create/${projectId}`);
}

async function deleteById(boardId: number): Promise<void> {
  await apiClient.delete(`${BASE}/${boardId}`);
}

export const boardService = {
  create,
  deleteById,
};


