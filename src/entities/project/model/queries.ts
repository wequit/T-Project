import { useQuery } from "@tanstack/react-query";
import { projectService } from "../api/service";
import { projectKeys } from "./keys";
import type { ProjectListDTO, ProjectDTO } from "./types";

export function useProjectList() {
  return useQuery<ProjectListDTO>({
    queryKey: projectKeys.list(),
    queryFn: projectService.getAll,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });
}

export function useProject(projectId: number | null) {
  return useQuery<ProjectDTO>({
    queryKey: projectKeys.one(projectId!),
    queryFn: () => projectService.getById(projectId!),
    enabled: !!projectId,
  });
}

