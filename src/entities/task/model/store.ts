import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, List } from "@/shared/types";

type TaskStore = {
  tasks: Task[];
  lists: List[];
  selectedListId: string;
  setSelectedListId: (listId: string) => void;
  addTask: (title: string, listId: string) => void;
  toggleTask: (id: string) => void;
  clearAllTasks: () => void;
  addList: (title: string) => void;
  removeList: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  removeTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      lists: [{ id: "important", title: "Важные задачи" }],
      selectedListId: "important",

      setSelectedListId: (listId) => set({ selectedListId: listId }),

      addTask: (title, listId) => {
        if (!title.trim() || !listId) return;
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          listId,
        };
        set({ tasks: [...get().tasks, newTask] });
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  listId: t.completed ? t.listId : "completed",
                }
              : t
          ),
        });
      },

      clearAllTasks: () => set({ tasks: [] }),

      addList: (title) => {
        if (!title.trim()) return;
        const newList: List = {
          id: crypto.randomUUID(),
          title,
        };
        set({
          lists: [...get().lists, newList],
          selectedListId: newList.id,
        });
      },

      removeList: (id) => {
        const { lists, tasks, selectedListId } = get();
        if (id === "important") return;

        set({
          lists: lists.filter((l) => l.id !== id),
          tasks: tasks.filter((t) => t.listId !== id),
          selectedListId: selectedListId === id ? "important" : selectedListId,
        });
      },

      editTask: (id, newTitle) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, title: newTitle } : t
          ),
        }),

      removeTask: (id) =>
        set({
          tasks: get().tasks.filter((t) => t.id !== id),
        }),
    }),
    { name: "task-storage" }
  )
);


