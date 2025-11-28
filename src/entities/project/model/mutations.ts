import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../api/service";
import { boardService } from "../api/boards";
import { projectKeys } from "./keys";
import type { ProjectCreateParams, ProjectListDTO } from "./types";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ProjectCreateParams) => projectService.create(params),
    onSuccess: (newProject) => {
      queryClient.setQueryData<ProjectListDTO>(
        projectKeys.list(),
        (oldData) => {
          if (!oldData) return [newProject];
          return [...oldData, newProject];
        }
      );
      queryClient.invalidateQueries({ queryKey: projectKeys.all() });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => projectService.deleteById(projectId),
    onSuccess: (_, projectId) => {
      queryClient.setQueryData<ProjectListDTO>(
        projectKeys.list(),
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((project) => project.id !== projectId);
        }
      );
      queryClient.invalidateQueries({ queryKey: projectKeys.all() });
    },
  });
}

// === Board Mutations ===
export function useCreateBoard(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => boardService.create(projectId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
    },
  });
}

export function useDeleteBoard(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number) => boardService.deleteById(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.one(projectId) });
    },
  });
}

