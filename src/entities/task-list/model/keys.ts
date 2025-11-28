export const taskListKeys = {
  all: () => ["task-list"] as const,
  list: () => [...taskListKeys.all(), "list"] as const,
  one: (id: number) => [...taskListKeys.all(), "one", id] as const,
  tasks: (listId: number) => [...taskListKeys.all(), "tasks", listId] as const,
};


