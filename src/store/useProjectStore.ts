import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Project as BaseProject, Board } from "../lib/types";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project extends BaseProject {
  boards: Board[];
}

export interface ProjectStore {
  project: Project | null;
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string) => void;
  addBoard: (name: string) => void;
  renameBoard: (id: string, name: string) => void;
  removeBoard: (id: string) => void;
  addColumn: (boardId: string, name: string) => void;
  renameColumn: (boardId: string, columnId: string, name: string) => void;
  removeColumn: (boardId: string, columnId: string) => void;
  addTask: (boardId: string, columnId: string, title: string) => void;
  removeTask: (boardId: string, columnId: string, taskId: string) => void;
  toggleTask: (boardId: string, columnId: string, taskId: string) => void;
  renameTask: (boardId: string, columnId: string, taskId: string, title: string) => void;
  updateProject: (updates: Partial<Project>) => void;
}

const createProjectStore = (projectId: string | undefined) => {
  const initialBoardId = uuidv4();
  const initialColumnId = uuidv4();
  const now = new Date().toISOString();

  return create<ProjectStore>()(
    persist(
      (set) => ({
        project: {
          id: projectId || "",
          name: "Yougile-проект",
          description: "",
          color: "#3b82f6",
          members: 1,
          createdAt: now,
          updatedAt: now,
          boards: [
            {
              id: initialBoardId,
              name: "Новая доска",
              createdAt: now,
              updatedAt: now,
              columns: [
                {
                  id: initialColumnId,
                  name: "Завершённые",
                  createdAt: now,
                  updatedAt: now,
                  tasks: [],
                },
              ],
            },
          ],
        },
        selectedBoardId: initialBoardId,
        setSelectedBoardId: (id) => set({ selectedBoardId: id }),
        addBoard: (name) => set((state) => {
          const newId = uuidv4();
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: [
                ...(state.project.boards || []),
                { 
                  id: newId, 
                  name, 
                  columns: [],
                  createdAt: now,
                  updatedAt: now,
                },
              ],
              updatedAt: now,
            },
            selectedBoardId: newId,
          };
        }),
        renameBoard: (id, name) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) => 
                b.id === id ? { ...b, name, updatedAt: now } : b
              ),
              updatedAt: now,
            },
          };
        }),
        removeBoard: (id) => set((state) => {
          if (!state.project) return {};
          const now = new Date().toISOString();
          const boards = (state.project.boards || []).filter((b) => b.id !== id);
          return {
            project: { 
              ...state.project, 
              boards,
              updatedAt: now,
            },
            selectedBoardId: boards[0]?.id || null,
          };
        }),
        addColumn: (boardId, name) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? { 
                      ...b, 
                      columns: [...b.columns, { 
                        id: uuidv4(), 
                        name, 
                        tasks: [],
                        createdAt: now,
                        updatedAt: now,
                      }],
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        renameColumn: (boardId, columnId, name) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? {
                      ...b,
                      columns: b.columns.map((c) => 
                        c.id === columnId ? { ...c, name, updatedAt: now } : c
                      ),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        removeColumn: (boardId, columnId) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? { 
                      ...b, 
                      columns: b.columns.filter((c) => c.id !== columnId),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        addTask: (boardId, columnId, title) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? {
                      ...b,
                      columns: b.columns.map((c) =>
                        c.id === columnId
                          ? { 
                              ...c, 
                              tasks: [...c.tasks, { 
                                id: uuidv4(), 
                                title, 
                                completed: false,
                                createdAt: now,
                                updatedAt: now,
                              }],
                              updatedAt: now,
                            }
                          : c
                      ),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        removeTask: (boardId, columnId, taskId) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? {
                      ...b,
                      columns: b.columns.map((c) =>
                        c.id === columnId
                          ? { 
                              ...c, 
                              tasks: c.tasks.filter((t) => t.id !== taskId),
                              updatedAt: now,
                            }
                          : c
                      ),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        toggleTask: (boardId, columnId, taskId) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? {
                      ...b,
                      columns: b.columns.map((c) =>
                        c.id === columnId
                          ? {
                              ...c,
                              tasks: c.tasks.map((t) =>
                                t.id === taskId ? { ...t, completed: !t.completed, updatedAt: now } : t
                              ),
                              updatedAt: now,
                            }
                          : c
                      ),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        renameTask: (boardId, columnId, taskId, title) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              boards: (state.project.boards || []).map((b) =>
                b.id === boardId
                  ? {
                      ...b,
                      columns: b.columns.map((c) =>
                        c.id === columnId
                          ? {
                              ...c,
                              tasks: c.tasks.map((t) =>
                                t.id === taskId ? { ...t, title, updatedAt: now } : t
                              ),
                              updatedAt: now,
                            }
                          : c
                      ),
                      updatedAt: now,
                    }
                  : b
              ),
              updatedAt: now,
            },
          };
        }),
        updateProject: (updates) => set((state) => {
          const now = new Date().toISOString();
          return {
            project: state.project && {
              ...state.project,
              ...updates,
              updatedAt: now,
            },
          };
        }),
      }),
      {
        name: `project-${projectId}-storage`,
        partialize: (state) => ({ project: state.project }),
      }
    )
  );
};

const projectStores = new Map<string, ReturnType<typeof createProjectStore>>();

export const useProjectStore = (projectId: string | undefined) => {
  if (!projectId) throw new Error("Project ID is required");
  if (!projectStores.has(projectId)) {
    projectStores.set(projectId, createProjectStore(projectId));
  }
  return projectStores.get(projectId)!();
}; 