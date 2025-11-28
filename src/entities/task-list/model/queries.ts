import { useQuery } from "@tanstack/react-query";
import { taskListService } from "../api/service";
import { taskListKeys } from "./keys";
import type { TaskListListDTO, TaskArrayDTO } from "./types";

export function useTaskListList() {
  return useQuery<TaskListListDTO>({
    queryKey: taskListKeys.all(),
    queryFn: taskListService.getAll,
  });
}

export function useTaskList(listId: number | null) {
  return useQuery<TaskArrayDTO>({
    queryKey: taskListKeys.tasks(listId!),
    queryFn: () => taskListService.getAllTasks(listId!),
    enabled: !!listId,
  });
}
