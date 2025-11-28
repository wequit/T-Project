import { apiClient } from "@/shared/api/client";
import { parseOrThrow } from "@/shared/lib";
import {
  TaskListDTOSchema,
  TaskListListDTOSchema,
  TaskArrayDTOSchema,
  TaskDTOSchema,
  TaskCreateDTOSchema,
  TaskUpdateDTOSchema,
} from "../model/schemas";
import type {
  TaskListDTO,
  TaskListListDTO,
  TaskDTO,
  TaskArrayDTO,
  TaskCreateDTO,
  TaskUpdateDTO,
} from "../model/types";

const TASK_LIST_BASE = "/task-list";
const TASKS_BASE = "/tasks";

// === Task List Methods ===
async function getAll(): Promise<TaskListListDTO> {
  const res = await apiClient.get(`${TASK_LIST_BASE}/all`);
  return parseOrThrow(TaskListListDTOSchema, res.data, "GET /task-list/all");
}

async function create(boardId: number, title: string): Promise<TaskListDTO> {
  const res = await apiClient.post(`${TASK_LIST_BASE}/create/${boardId}`, null, {
    params: { title },
  });
  return parseOrThrow(TaskListDTOSchema, res.data, `POST /task-list/create/${boardId}`);
}

async function deleteById(id: number): Promise<void> {
  await apiClient.delete(`${TASK_LIST_BASE}/delete/${id}`);
}

// === Task Methods ===
async function getAllTasks(listId: number): Promise<TaskArrayDTO> {
  const res = await apiClient.get(`${TASKS_BASE}/${listId}/all`);
  return parseOrThrow(TaskArrayDTOSchema, res.data, `GET /tasks/${listId}/all`);
}

async function createTask(listId: number, data: TaskCreateDTO): Promise<TaskDTO> {
  const payload = parseOrThrow(TaskCreateDTOSchema, data, "Create task payload");
  const res = await apiClient.post(`${TASKS_BASE}/${listId}/create`, payload);
  return parseOrThrow(TaskDTOSchema, res.data, `POST /tasks/${listId}/create`);
}

async function updateTask(taskId: number, data: TaskUpdateDTO): Promise<TaskDTO> {
  const payload = parseOrThrow(TaskUpdateDTOSchema, data, "Update task payload");
  const res = await apiClient.post(`/tasks/update/${taskId}`, payload);
  return parseOrThrow(TaskDTOSchema, res.data, `POST /tasks/update/${taskId}`);
}

async function deleteTask(taskId: number): Promise<void> {
  await apiClient.delete(`${TASKS_BASE}/delete/${taskId}`);
}

async function toggleTaskDone(taskId: number, done: boolean): Promise<TaskDTO> {
  const res = await apiClient.post(`${TASKS_BASE}/change-status/${taskId}`, done);
  return parseOrThrow(TaskDTOSchema, res.data, `POST ${TASKS_BASE}/change-status/${taskId}`);
}

export const taskListService = {
  // Task List methods
  getAll,
  create,
  deleteById,
  // Task methods
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskDone,
};


