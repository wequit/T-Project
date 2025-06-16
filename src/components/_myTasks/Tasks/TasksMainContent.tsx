import { useCallback, useMemo } from "react";
import { TaskInput } from "./Subcomponents/TaskInput";
import { TaskListSection } from "./Subcomponents/TaskListSection";
import { Trash2 } from "lucide-react";

type TasksMainContentProps = {
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    listId: string;
  }>;
  lists: Array<{ id: string; title: string }>;
  newTaskTitle: string;
  selectedListId: string | null;
  setNewTaskTitle: (title: string) => void;
  addTask: () => void;
  toggleTask: (id: string) => void;
  clearAllTasks: () => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
};

export const TasksMainContent = ({
  tasks,
  lists,
  newTaskTitle,
  selectedListId,
  setNewTaskTitle,
  addTask,
  toggleTask,
  clearAllTasks,
  removeTask,
  editTask,
}: TasksMainContentProps) => {
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

  return (
    <main className="flex-1 space-y-5">
      <section className="bg-white p-6 rounded-3xl shadow-sm border">
        <TaskInput
          value={newTaskTitle}
          onChange={setNewTaskTitle}
          onSubmit={addTask}
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