import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Task = {
  id: string
  title: string
  completed: boolean
  listId: string
}

export type List = {
  id: string
  title: string
}

type TaskStore = {
  tasks: Task[]
  lists: List[]
  newTaskTitle: string
  newListTitle: string | undefined
  selectedListId: string
  setNewTaskTitle: (title: string) => void
  setNewListTitle: (title: string | undefined) => void
  setSelectedListId: (listId: string) => void
  addTask: () => void
  toggleTask: (id: string) => void
  clearAllTasks: () => void
  addList: () => void
  removeList: (id: string) => void
  editTask: (id: string, newTitle: string) => void
  removeTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      lists: [{ id: 'important', title: 'Важные задачи' }],
      newTaskTitle: '',
      newListTitle: undefined,
      selectedListId: 'important',

      setNewTaskTitle: (title) => set({ newTaskTitle: title }),
      setNewListTitle: (title) => set({ newListTitle: title }),
      setSelectedListId: (listId) => set({ selectedListId: listId }),

      addTask: () => {
        const { newTaskTitle, selectedListId, tasks } = get()
        if (!newTaskTitle.trim() || !selectedListId) return
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: newTaskTitle,
          completed: false,
          listId: selectedListId,
        }
        set({
          tasks: [...tasks, newTask],
          newTaskTitle: '',
        })
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  listId: t.completed ? t.listId : 'completed',
                }
              : t
          ),
        })
      },

      clearAllTasks: () => set({ tasks: [] }),

      addList: () => {
        const { newListTitle, lists } = get()
        if (!newListTitle?.trim()) return
        const newList: List = {
          id: crypto.randomUUID(),
          title: newListTitle,
        }
        set({
          lists: [...lists, newList],
          selectedListId: newList.id,
        })
      },

      removeList: (id) => {
        const { lists, tasks, selectedListId } = get()
        if (id === 'important') return 
        
        set({
          lists: lists.filter((l) => l.id !== id),
          tasks: tasks.filter((t) => t.listId !== id),
          selectedListId: selectedListId === id ? 'important' : selectedListId,
        })
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
    { name: 'task-storage' }
  )
)