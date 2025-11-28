import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskListService } from "../api/service";
import { taskListKeys } from "./keys";
import { projectKeys } from "@/entities/project/model/keys";
import type { TaskCreateDTO, TaskUpdateDTO } from "./types";

// === Task List Mutations ===
export function useCreateTaskList(boardId: number = 0, projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => taskListService.create(boardId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId && boardId !== 0) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}

export function useDeleteTaskList(projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskListService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}

// === Task Mutations ===
export function useCreateTask(projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, data }: { listId: number; data: TaskCreateDTO }) => 
      taskListService.createTask(listId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}

export function useUpdateTask(projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: TaskUpdateDTO }) =>
      taskListService.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}

export function useDeleteTask(projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskListService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}

export function useToggleTask(projectId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, done }: { taskId: number; done: boolean }) =>
      taskListService.toggleTaskDone(taskId, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all() });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
      }
    },
  });
}
