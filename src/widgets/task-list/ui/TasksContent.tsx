import { useCallback, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { TaskInput } from "@/features/task-create";
import { TaskListSection } from "./TaskListSection";
import type { Task, List } from "@/shared/types";

type TasksContentProps = {
  tasks: Task[];
  lists: List[];
  selectedListId: string | null;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  clearAllTasks: () => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
};

export const TasksContent = ({
  tasks,
  lists,
  selectedListId,
  addTask,
  toggleTask,
  clearAllTasks,
  removeTask,
  editTask,
}: TasksContentProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasksByList, completedTasks } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed);
    const byList = lists.map((list) => ({
      list,
      tasks: tasks.filter((t) => t.listId === list.id && !t.completed),
    }));
    return { tasksByList: byList, completedTasks: completed };
  }, [lists, tasks]);

  const handlePromptEdit = useCallback(
    (taskId: string, currentTitle: string) => {
      const newTitle = prompt("Редактировать задачу", currentTitle);
      if (newTitle?.trim()) editTask(taskId, newTitle);
    },
    [editTask]
  );

  const handleSubmit = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <main className="flex-1 space-y-5">
      <section className="bg-white p-6 rounded-3xl shadow-sm border">
        <TaskInput
          value={newTaskTitle}
          onChange={setNewTaskTitle}
          onSubmit={handleSubmit}
          onClear={() => setNewTaskTitle("")}
          disabled={!selectedListId}
        />
        {tasks.length > 0 && (
          <div className="flex justify-end mt-5">
            <button
              onClick={clearAllTasks}
              className="text-xs px-4 py-2.5 bg-white text-red-500 rounded-xl hover:bg-red-50 border border-red-100 flex items-center gap-2"
            >
              <Trash2 size={14} /> Очистить все
            </button>
          </div>
        )}
      </section>

      {/* Группировка задач по спискам */}
      {tasksByList.map(({ list, tasks }) => (
        <TaskListSection
          key={list.id}
          list={list}
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={handlePromptEdit}
          onRemove={removeTask}
        />
      ))}

      {/* Выполненные задачи */}
      {completedTasks.length > 0 && (
        <TaskListSection
          list={{ id: "completed", title: "Выполненные" }}
          tasks={completedTasks}
          onToggle={toggleTask}
          onEdit={handlePromptEdit}
          onRemove={removeTask}
          color="green"
        />
      )}
    </main>
  );
};

